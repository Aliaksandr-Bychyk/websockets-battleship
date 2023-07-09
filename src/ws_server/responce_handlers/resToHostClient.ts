import IGameInitData from 'interfaces/IGameInitData';
import WebSocket from 'ws';

const resToHostClient = (server: WebSocket.Server, sockets: Map<number, WebSocket>, gameInitData: IGameInitData) => {
  server.clients.forEach((client) => {
    sockets.forEach((socket, key) => {
      if (gameInitData.host === key && socket === client) {
        client.send(
          JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame: gameInitData.host, idPlayer: gameInitData.host }),
            id: 0,
          }),
        );
      }
      if (gameInitData.client === key && socket === client) {
        client.send(
          JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame: gameInitData.host, idPlayer: gameInitData.client }),
            id: 0,
          }),
        );
      }
    });
  });
};

export default resToHostClient;
