import WebSocket from 'ws';
import users from '../databases/users';
import resToClients from '../responce_handlers/resToClients';

const updateWinners = (server: WebSocket.Server) => {
  resToClients(server, JSON.stringify({ type: 'update_winners', data: JSON.stringify(users), id: 0 }));
};

export default updateWinners;
