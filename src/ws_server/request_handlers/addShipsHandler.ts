import games from '../databases/games';
import IReq from '../../interfaces/IReq';
import IShip from '../../interfaces/IShip';

const addShipsHandler = (reqObj: IReq) => {
  if (reqObj.type === 'add_ships') {
    const game = games.filter((game) => game.idGame === reqObj.data.gameId)[0];
    if (game) {
      game.data[game.data.length] = {
        ships: generateShipCells(reqObj.data.ships),
        indexPlayer: reqObj.data.indexPlayer,
        grid: generateGrid(reqObj.data.ships),
      };
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
