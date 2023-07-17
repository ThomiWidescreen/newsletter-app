from apiflask import APIBlueprint as Blueprint
from flask import jsonify, request
from api.db import db
from api.models import Categories, Statistics, Subscribers, Campaigns
from api.schemas import categories_schema, subscribers_schema, campaigns_schema, subscriber_schema, category_schema, campaign_schema, statistics_schema
import secrets

bp = Blueprint("main", __name__)

@bp.route("/subscriber", methods=["POST", "GET"])
def subscriber():
    if request.method == "POST":
        try:
            data = request.get_json()
            newSubscriber = Subscribers(mail=data["mail"], unsuscribeToken=str(secrets.token_urlsafe(16)))

            category_ids = data["categories"]  # Obtener array de IDs de categorías

            for category_id in category_ids:
                category = Categories.query.get(category_id)  # Obtener la categoría por su ID
                if category:
                    newSubscriber.categories.append(category)

            db.session.add(newSubscriber)
            db.session.commit()
            return jsonify(data=subscriber_schema.dump(newSubscriber),ok=True)
        except Exception as e:
            # Manejo de errores
            return jsonify(ok=False,error=str(e))
    if request.method == "GET":

        subscribersData = db.session.query(Subscribers).all()
        
        return jsonify(data=subscribers_schema.dump(subscribersData))
    
@bp.route("/categories", methods=["POST", "GET"])
def categories():
    if request.method == "POST":
        try:
            newCategory = Categories(name=request.get_json()["name"])
            db.session.add(newCategory)
            db.session.commit()
            return jsonify(data=category_schema.dump(newCategory),ok=True)
        except:
            return jsonify(ok=False)
    if request.method == "GET":
        
        r = db.session.execute(db.select(Categories)).scalars()
        return jsonify(data=categories_schema.dump(r))

@bp.route("/campaigns", methods=["GET","POST"])
def campaigns():
    if request.method == "POST":
        try:
            data = request.get_json()
            newCampaign = Campaigns(name=data["name"], subject=data["subject"], file=data["file"], body=data["body"])
            category_id = data["category"]
            category = Categories.query.filter(Categories.id == category_id).first()
            newCampaign.category = category
            db.session.add(newCampaign)
            db.session.commit()
            return jsonify(data=campaign_schema.dump(newCampaign),ok=True)
        except Exception as e:
            
            return jsonify(ok=False, message="Error al crear la campaña.")
    if request.method == "GET":
        r = db.session.query(Campaigns).all()
        return jsonify(data=campaigns_schema.dump(r))
    
@bp.route("/statistics", methods=["GET"])
def statistics():
    r = db.session.query(Statistics).all()
    return jsonify(data=statistics_schema.dump(r))
    
        

@bp.route("/unsuscribe/<unsuscribeToken>", methods=["POST"])
def unsuscribe(unsuscribeToken):
    try:
        r = db.session.query(Subscribers).filter_by(unsuscribeToken=unsuscribeToken).one()
        db.session.delete(r)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify(ok=False, error=str(e))
    
    return jsonify(ok=True)

        
