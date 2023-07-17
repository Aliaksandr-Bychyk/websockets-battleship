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
import attackHandler from './request_handlers/attackHandler';
import randomAttackHandler from './request_handlers/randomAttackHandler';
import finishHandler from './request_handlers/finishHandler';
import updateWinners from './request_handlers/updateWinners';
import wsCloseHandler from './request_handlers/wsCloseHandler';

const sockets = new Map<number, WebSocket>();
let socketID = 0;

const attack = (WS_SERVER: WebSocketServer, reqObj: IReq, ws: WebSocket) => {
  const { game, responses } = attackHandler(reqObj);
  if (game && responses) {
    responses.forEach((response) => resToHostClient(WS_SERVER, sockets, game, response, response));
    const responseTurn = generateResponse('turn', game);
    resToHostClient(WS_SERVER, sockets, game, responseTurn.host, responseTurn.client);
    const response = finishHandler(reqObj);
    if (response) {
      resToHostClient(WS_SERVER, sockets, response.game, response.response, response.response);
      updateWinners(WS_SERVER);
    } else if (!game.isOnline && game.turn === responseTurn.clienId) {
      setTimeout(() => {
        ws.emit(
          'message',
          JSON.stringify({
            type: 'randomAttack',
            data: JSON.stringify({
              gameId: game?.idGame,
              indexPlayer: -1,
            }),
            id: 0,
          }),
        );
      }, 1000);
    }
  }
};

const initWebSocet = () => {
  const WS_SERVER = new WebSocketServer({ port: 3000 });
  WS_SERVER.on('connection', (ws) => {
    const currentSocketID = socketID++;
    sockets.set(currentSocketID, ws);

    ws.on('close', () => {
      const game = wsCloseHandler(ws, currentSocketID);
      if (game) {
        const response = finishHandler({
          type: 'attack',
          data: {
            gameId: game.idGame,
            x: 0,
            y: 0,
            indexPlayer: game.clientId === currentSocketID ? game.hostId : game.clientId,
          },
          id: 0,
        });
        if (response) {
          resToHostClient(WS_SERVER, sockets, response.game, response.response, response.response);
        }
      }
      updateRoomHandler(WS_SERVER);
      updateWinners(WS_SERVER);
    });

    ws.on('message', (reqData) => {
      const reqObj: IReq = deepParser(reqData.toString());
      const requestTypes: IREquestType[] = [
        {
          type: 'reg',
          handler: () => {
            regHandler(ws, reqObj, currentSocketID);
            updateRoomHandler(WS_SERVER);
            updateWinners(WS_SERVER);
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
              resToHostClient(WS_SERVER, sockets, game, response.host, response.client);
            }
          },
        },
        {
          type: 'add_ships',
          handler: () => {
            const game = addShipsHandler(reqObj);
            if (game) {
              const responseStartGame = generateResponse('start_game', game);
              resToHostClient(WS_SERVER, sockets, game, responseStartGame.host, responseStartGame.client);
              const responseTurn = generateResponse('turn_init', game);
              resToHostClient(WS_SERVER, sockets, game, responseTurn.host, responseTurn.client);
              if (!game.isOnline && game.turn === responseTurn.clienId) {
                ws.emit(
                  'message',
                  JSON.stringify({
                    type: 'randomAttack',
                    data: JSON.stringify({
                      gameId: game?.idGame,
                      indexPlayer: game?.clientId,
                    }),
                    id: 0,
                  }),
                );
              }
            }
          },
        },
        {
          type: 'attack',
          handler: () => {
            attack(WS_SERVER, reqObj, ws);
          },
        },
        {
          type: 'randomAttack',
          handler: () => {
            const newReqObj = randomAttackHandler(reqObj);
            if (newReqObj) {
              attack(WS_SERVER, newReqObj, ws);
            }
          },
        },
        {
          type: 'single_play',
          handler: () => {
            const game = createGameHandler({ host: currentSocketID, client: -1, isOnline: false });
            const response = generateResponse('create_game', game);
            resToHostClient(WS_SERVER, sockets, game, response.host, response.client);
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
