from flask_marshmallow import Marshmallow
from api.models import Categories, Subscribers, Campaigns , Statistics

ma = Marshmallow()

class SubscriberShema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Subscribers
        include_relationships = True
        load_instance = True
    

class CategorieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Categories
        include_relationships = True
        load_instance = True

class CampaignSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Campaigns
        exclude = ["file"]
        include_relationships = True
        load_instance = True

class StatisticsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Statistics
        include_relationships = True
        load_instance = True

categories_schema = CategorieSchema(many=True)
category_schema = CategorieSchema()
subscribers_schema = SubscriberShema(many=True)
subscriber_schema = SubscriberShema()
campaigns_schema = CampaignSchema(many=True)
campaign_schema = CampaignSchema()
statistics_schema = StatisticsSchema(many=True)

