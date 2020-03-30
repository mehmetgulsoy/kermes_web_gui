import os
from flask import Flask
from flask_socketio import SocketIO 
from config import Config 

socketio = SocketIO()


def create_app(config_class=Config):
  """Flask uygulaması oluşturur."""
  app = Flask(__name__)
  app.config.from_object(config_class)
 
  from app.v_1_0 import db  
  db.init_app(app)

  from app.v_1_0 import main as main_blueprint
  app.register_blueprint(main_blueprint)
  
  from app.v_1_0 import events
  
  socketio.init_app(app)  
  return app
