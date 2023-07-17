import { WebSocket } from 'ws';
import rooms from '../databases/rooms';
import games from '../databases/games';

const createGridArray = () =>
  Array(10)
    .fill(0)
    .map(() => Array(10).fill(0)) as number[][];

const createShipsArray = () =>
  Array(10).fill({
    position: {
      x: 0,
      y: 0,
    },
    direction: true,
    length: 1,
    type: 'small',
    isKilled: false,
  });

const wsCloseHandler = (ws: WebSocket, socketID: number) => {
  const room = rooms.filter((room) => room.roomId === socketID)[0];
  if (room) {
    rooms.splice(rooms.indexOf(room), 1);
  }
  const game = games.filter((game) => game.clientId === socketID || game.hostId === socketID)[0];
  if (game) {
    game.data = [
      { indexPlayer: game.clientId, grid: createGridArray(), ships: createShipsArray() },
      { indexPlayer: game.hostId, grid: createGridArray(), ships: createShipsArray() },
    ];
    game.data.filter((data) => data.indexPlayer === socketID)[0].ships.forEach((ship) => (ship.isKilled = true));
    return game;
  }
};

export default wsCloseHandler;
