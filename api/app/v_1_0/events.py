import logging 
from flask_socketio import emit, join_room, leave_room

@socketio.on('connect')
def connect():
  emit('connect_info',{'type': 'EMIT_CON', 'data': 'Connected'},broadcast=True)
  print('Server Side Client Connected is not authenticated')   

@socketio.on('disconnect')
def disconnect():   
  print('Client Disconnected')   

@socketio.on('reconnect')
def reconnect():   
  print('Client reconnect')    

@socketio.on('ping')
def ping():   
  print('Ping fired')    

@socketio.on('pong')
def pong(latency):   
  print('Pong fired',latency)   
  
@socketio.on_error()
def error_handler(e):
  print('Hata oluştu', e)  
