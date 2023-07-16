import IGame from '../../interfaces/IGame';
import WebSocket from 'ws';

const resToHostClient = (
  server: WebSocket.Server,
  sockets: Map<number, WebSocket>,
  game: IGame,
  responseForHost: string,
  responseForClient: string,
) => {
  server.clients.forEach((client) => {
    sockets.forEach((socket, key) => {
      if (game.hostId === key && socket === client) {
        client.send(responseForHost);
      }
      if (game.clientId === key && socket === client) {
        client.send(responseForClient);
      }
    });
  });
};

export default resToHostClient;
