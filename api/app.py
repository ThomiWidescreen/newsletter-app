from flask import Flask
from dotenv import load_dotenv
import os
from flask_migrate import Migrate
from api.config import config
from flask_cors import CORS

load_dotenv()

from api.db import db
from api.schemas import ma
from api.mailing import mail

migrate = Migrate()


def inits(app):
    db.init_app(app)
    ma.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db)
    CORS(app)


def registers(app):
    from api.routes.main import bp as main_bp
    from api.routes.mailing import bp as mailing_bp
    app.register_blueprint(main_bp, url_prefix="/")
    app.register_blueprint(mailing_bp, url_prefix="/mailing")


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    inits(app)
    registers(app)
    return app


app = create_app()

from api import models

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0")