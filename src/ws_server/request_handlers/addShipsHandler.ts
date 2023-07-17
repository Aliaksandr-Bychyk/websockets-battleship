import games from '../databases/games';
import IReq from '../../interfaces/IReq';
import IShip from '../../interfaces/IShip';

const botShips: IShip[] = [
  {
    position: { x: 5, y: 0 },
    direction: false,
    type: 'huge',
    length: 4,
  },
  {
    position: { x: 2, y: 0 },
    direction: true,
    type: 'large',
    length: 3,
  },
  {
    position: { x: 0, y: 5 },
    direction: false,
    type: 'large',
    length: 3,
  },
  {
    position: { x: 7, y: 5 },
    direction: true,
    type: 'medium',
    length: 2,
  },
  {
    position: { x: 4, y: 3 },
    direction: true,
    type: 'medium',
    length: 2,
  },
  {
    position: { x: 5, y: 8 },
    direction: false,
    type: 'medium',
    length: 2,
  },
  {
    position: { x: 4, y: 6 },
    direction: false,
    type: 'small',
    length: 1,
  },
  {
    position: { x: 9, y: 5 },
    direction: false,
    type: 'small',
    length: 1,
  },
  {
    position: { x: 0, y: 1 },
    direction: true,
    type: 'small',
    length: 1,
  },
  {
    position: { x: 3, y: 8 },
    direction: true,
    type: 'small',
    length: 1,
  },
];

const addShipsHandler = (reqObj: IReq) => {
  if (reqObj.type === 'add_ships') {
    const game = games.filter((game) => game.idGame === reqObj.data.gameId)[0];
    if (game) {
      game.data[game.data.length] = {
        ships: generateShipCells(reqObj.data.ships),
        indexPlayer: reqObj.data.indexPlayer,
        grid: generateGrid(reqObj.data.ships),
      };
      if (!game.isOnline) {
        game.data[game.data.length] = {
          ships: generateShipCells(botShips),
          indexPlayer: -1,
          grid: generateGrid(botShips),
        };
      }
      if (game.data.length === 2) {
        return game;
      }
    }
  }
};

function generateShipCells(ships: IShip[]) {
  return ships.map((ship) => {
    ship.shipCells = [];
    for (let i = 0; i < ship.length; i++) {
      ship.shipCells.push({
        y: ship.direction ? ship.position.y + i : ship.position.y,
        x: ship.direction ? ship.position.x : ship.position.x + i,
        status: 1,
      });
    }
    ship.isKilled = false;
    return ship;
  });
}

function generateGrid(ships: IShip[]): number[][] {
  const grid: number[][] = Array(10)
    .fill(0)
    .map(() => Array(10).fill(0)) as number[][];

  ships.forEach((ship) => {
    for (let i = 0; i < ship.length; i++) {
      grid[ship.direction ? ship.position.y + i : ship.position.y][
        ship.direction ? ship.position.x : ship.position.x + i
      ] = 1;
    }
  });

  return grid;
}

export default addShipsHandler;
