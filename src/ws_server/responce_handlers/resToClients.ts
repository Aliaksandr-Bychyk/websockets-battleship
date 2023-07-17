import WebSocket from 'ws';

const resToClients = (server: WebSocket.Server, response: string) => {
  server.clients.forEach((client) => {
    client.send(response);
  });
};

export default resToClients;
