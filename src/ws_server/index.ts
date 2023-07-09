import deepParser from '../utils/deepParser';
import { WebSocket, WebSocketServer } from 'ws';
// import userAuth from './userAuth';
// import gameRoom from './gameRoom';
// import gameShips from './gameShips';
// import gameAddUserToRoom from './gameAddUserToRoom';
// import games from './games';
// import util from 'node:util';
import regHandler from './request_handlers/regHandler';
import IREquestType from '../interfaces/IRequestType';
import IReq from '../interfaces/IReq';
import createRoomHandler from './request_handlers/createRoomHandler';
import updateRoomHandler from './request_handlers/updateRoomHandler';
import addUserToRoomHandler from './request_handlers/addUserToRoomHandler';
import createGameHandler from './request_handlers/createGameHandler';
import IGameInitData from 'interfaces/IGameInitData';
import resToHostClient from './responce_handlers/resToHostClient';

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
              createGameHandler(gameInitData);
              updateRoomHandler(WS_SERVER);
              resToHostClient(WS_SERVER, sockets, gameInitData);
            }
          },
        },
      ];

      requestTypes.forEach((req) => {
        if (req.type === reqObj.type) {
          req.handler();
        }
      });
      // if (requestsObj.type === 'add_ships') {
      //   console.log(games[0]);
      //   gameShips(requestsObj);
      //   const playerIndexes: number[] = games
      //     .filter((game) => game.idGame === requestsObj.data.gameId)[0]
      //     ?.data.map((el) => el.indexPlayer) as number[];
      //   console.log(util.inspect(playerIndexes, false, null, true));
      //   if (playerIndexes) {
      //     if (playerIndexes.length === 2) {
      //       WS_SERVER.clients.forEach((client) => {
      //         sockets.forEach((socket, key) => {
      //           if ((playerIndexes[0] === key || playerIndexes[1] === key) && socket === client) {
      //             client.send(
      //               JSON.stringify({
      //                 type: 'start_game',
      //                 data: JSON.stringify({ ships: requestsObj.data.ships, currentPlayerIndex: key }),
      //                 id: 0,
      //               }),
      //             );
      //           }
      //         });
      //         client.send(JSON.stringify(gameRoom()));
      //       });
      //     }
      //   }
      // }
    });
  });
};

export default initWebSocet;
