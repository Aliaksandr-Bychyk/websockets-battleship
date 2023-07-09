import WebSocket from 'ws';
import rooms from '../databases/rooms';
import resToClients from '../responce_handlers/resToClients';

const updateRoomHandler = (server: WebSocket.Server) => {
  resToClients(server, JSON.stringify({ type: 'update_room', data: JSON.stringify(rooms), id: 0 }));
};

export default updateRoomHandler;
