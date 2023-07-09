import deepParser from '../utils/deepParser';
import { WebSocket, WebSocketServer } from 'ws';
import regHandler from './request_handlers/regHandler';
import IREquestType from '../interfaces/IRequestType';
import IReq from '../interfaces/IReq';
import createRoomHandler from './request_handlers/createRoomHandler';
import updateRoomHandler from './request_handlers/updateRoomHandler';
import addUserToRoomHandler from './request_handlers/addUserToRoomHandler';
import createGameHandler from './request_handlers/createGameHandler';
import IGameInitData from 'interfaces/IGameInitData';
import resToHostClient from './responce_handlers/resToHostClient';
import addShipsHandler from './request_handlers/addShipsHandler';
import generateResponse from './responce_handlers/generateResponse';

const sockets = new Map<number, WebSocket>();
let socketID = 0;

const initWebSocet = () => {
  const WS_SERVER = new WebSocketServer({ port: 3000 });
  WS_SERVER.on('connection', (ws) => {
    const currentSocketID = socketID++;
    sockets.set(currentSocketID, ws);

    ws.on('message', (reqData) => {
      const reqObj: IReq = deepParser(reqData.toString());
      const requestTypes: IREquestType[] = [
        {
          type: 'reg',
          handler: () => {
            regHandler(ws, reqObj, currentSocketID);
            updateRoomHandler(WS_SERVER);
          },
        },
        {
          type: 'create_room',
          handler: () => {
            createRoomHandler(reqObj, currentSocketID);
            updateRoomHandler(WS_SERVER);
          },
        },
        {
          type: 'add_user_to_room',
          handler: () => {
            const gameInitData = addUserToRoomHandler(reqObj, currentSocketID) as IGameInitData;
            if (gameInitData) {
              const game = createGameHandler(gameInitData);
              updateRoomHandler(WS_SERVER);
              const response = generateResponse('create_game', game);
              resToHostClient(WS_SERVER, sockets, game, response);
            }
          },
        },
        {
          type: 'add_ships',
          handler: () => {
            const game = addShipsHandler(reqObj);
            if (game) {
              const response = generateResponse('start_game', game);
              resToHostClient(WS_SERVER, sockets, game, response);
            }
          },
        },
      ];

      requestTypes.forEach((req) => {
        if (req.type === reqObj.type) {
          req.handler();
        }
      });
    });
  });
};

export default initWebSocet;
