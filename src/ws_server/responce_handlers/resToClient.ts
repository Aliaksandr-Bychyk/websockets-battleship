import WebSocket from 'ws';

const resToClient = (ws: WebSocket, response: string) => {
  ws.send(response);
};

export default resToClient;
