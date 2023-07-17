from io import BytesIO
from apiflask import APIBlueprint as Blueprint
from flask import request, jsonify
from api.mailing import mail
from flask_mail import Message
from api.models import Campaigns, Subscribers, Statistics
from api.db import db
import base64
from mimetypes import guess_extension, guess_type

bp = Blueprint("mailing", __name__)

DEFAULT_FROM = ('Atrowik', 'alejoidecano@gmail.com')

@bp.route("/startCampaign/<id>", methods=["POST"])
def suscriber(id):
    campaign = db.session.query(Campaigns).filter(Campaigns.id == id).first()
    campaign_category_id = campaign.category_id

    subscribers = db.session.query(Subscribers).filter(Subscribers.categories.any(id=campaign_category_id)).all()
    
    subscribersMails = [subscriber.mail for subscriber in subscribers]
    
    if(campaign.file is not ""):
        file_info, file_data = campaign.file.split(",", 1)
        file_type = guess_type(file_info + ",")[0]
        file_extension = guess_extension(file_type)
    
    

    try:
        for suscriber in subscribers:
        
            message = Message(campaign.subject,
                        sender=DEFAULT_FROM,
                        recipients=[suscriber.mail],
                        html=f'<section>{campaign.body}</section><a href="http://localhost:3000/unsuscribe/{suscriber.unsuscribeToken}">Unsubscribe</a>'
                        )
            
            if(campaign.file is not ""):
                message.attach("adjunto" + file_extension, file_type, BytesIO(base64.b64decode(file_data)).getvalue())
            
            mail.send(message)
    
        newStatistic = Statistics(campaign_id=campaign.id, mailsSended=len(subscribersMails))
        db.session.add(newStatistic)
        db.session.commit()
    except Exception as e:
        
        return jsonify({"error": e}), 400
        
    return jsonify({"message": "ok"}), 200