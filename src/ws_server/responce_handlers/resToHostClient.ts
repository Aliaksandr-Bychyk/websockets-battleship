import IGame from '../../interfaces/IGame';
import WebSocket from 'ws';

const resToHostClient = (
  server: WebSocket.Server,
  sockets: Map<number, WebSocket>,
  game: IGame,
  resonse: {
    host: string;
    client: string;
  },
) => {
  server.clients.forEach((client) => {
    sockets.forEach((socket, key) => {
      if (game.hostId === key && socket === client) {
        client.send(resonse.host);
      }
      if (game.clientId === key && socket === client) {
        client.send(resonse.client);
      }
    });
  });
};

export default resToHostClient;
