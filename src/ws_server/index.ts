import deepParser from '../utils/deepParser';
import { WebSocketServer } from 'ws';

const initWebSocet = () => {
  const WS_SERVER = new WebSocketServer({ port: 3000 });
  WS_SERVER.on('connection', (ws) => {
    console.log('connecting');
    ws.on('message', (data) =>
      console.log('received:', deepParser(data.toString())),
    );
  });
};

export default initWebSocet;
