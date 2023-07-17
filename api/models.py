import datetime
from typing import Any

from api.db import db

Model: Any = db.Model

subscriber_categories = db.Table(
    'subscriber_categories',
    db.Column('subscriber_id', db.Integer, db.ForeignKey('subscribers.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

class Subscribers(Model):
    __tablename__ = "subscribers"
    id = db.Column(db.Integer, primary_key=True)
    mail = db.Column(db.String(64), unique=True, nullable=False)
    unsuscribeToken = db.Column(db.String(64), unique=True, nullable=False)
    active = db.Column(db.Boolean, default=True)
    categories = db.relationship('Categories', secondary=subscriber_categories,
                                 backref=db.backref('subscribers', lazy='subquery'))

class Categories(Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    active = db.Column(db.Boolean, default=True)

class Campaigns(Model):
    __tablename__ = "campaigns"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    subject = db.Column(db.String(64), nullable=False)
    body = db.Column(db.String(64), nullable=False)
    file = db.Column(db.String(64), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Categories', backref=db.backref('campaigns', lazy='subquery'))
    count = db.Column(db.Integer, default=0)
    lastSended = db.Column(db.DateTime, nullable=True, onupdate=datetime.datetime.utcnow)
    
class Statistics(Model):
    __tablename__ = "statistics"
    id = db.Column(db.Integer, primary_key=True)
    mailsSended = db.Column(db.Integer, default=0)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)