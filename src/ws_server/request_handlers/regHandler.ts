import IReq from '../../interfaces/IReq';
import { WebSocket } from 'ws';
import userAuth from '../userAuth';
import resToClient from '../responce_handlers/resToClient';

const regHandler = (ws: WebSocket, reqObj: IReq, socketID: number) => {
  if (reqObj.type === 'reg') {
    const response = userAuth(reqObj, socketID);
    resToClient(ws, JSON.stringify(response));
  }
};

export default regHandler;
