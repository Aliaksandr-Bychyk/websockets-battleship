import games from '../databases/games';
import IReq from '../../interfaces/IReq';

const getCellAround = (grid: number[][], y: number, x: number) => {
  const cells: { x: number; y: number }[] = [];
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (j >= 0 && j < 10 && i >= 0 && i < 10 && (i !== y || j !== x) && grid[i][j] === 0) {
        cells.push({ x: j, y: i });
      }
    }
  }
  return cells;
};

const generateResponse = (x: number, y: number, indexPlayer: number, status: 'miss' | 'killed' | 'shot') => {
  return JSON.stringify({
    type: 'attack',
    data: JSON.stringify({
      position: {
        x,
        y,
      },
      currentPlayer: indexPlayer,
      status: status,
    }),
    id: 0,
  });
};

// 0 - empty, 1 - ship, 2 - miss 3 - shot, 4 - killed
const attackHandler = (reqObj: IReq) => {
  if (reqObj.type === 'attack') {
    const game = games.filter((game) => game.idGame === reqObj.data.gameId)[0];
    if (game.turn === reqObj.data.indexPlayer) {
      const responses: string[] = [];
      const grid = game.data.filter((user) => user.indexPlayer !== reqObj.data.indexPlayer)[0].grid;

      const targetCell = grid[reqObj.data.y][reqObj.data.x];
      console.log('targetCell', targetCell);
      if (targetCell === 0) {
        grid[reqObj.data.y][reqObj.data.x] = 2;
        responses.push(generateResponse(reqObj.data.x, reqObj.data.y, reqObj.data.indexPlayer, 'miss'));
      }
      if (targetCell === 1) {
        console.log('if 1');
        const shipsCells = game.data
          .filter((user) => user.indexPlayer !== reqObj.data.indexPlayer)[0]
          .ships.map((ship) => ship.shipCells);
        const shipCells = shipsCells
          .filter((ship) => {
            const currShip = ship?.filter((cells) => cells.y === reqObj.data.y && cells.x === reqObj.data.x);
            return currShip && currShip?.length > 0;
          })
          .flat();
        const cell = shipCells.filter((cell) => cell && cell.x === reqObj.data.x && cell.y === reqObj.data.y)[0];
        if (cell && cell.status === 1) {
          console.log('if 2');
          if (shipCells.filter((cell) => cell?.status === 3).length === shipCells.length - 1) {
            console.log('if 3');
            shipCells.forEach((cell) => {
              if (cell) {
                console.log('if 4');
                cell.status = 4;
                grid[cell.y][cell.x] = 4;
                responses.push(generateResponse(cell.x, cell.y, reqObj.data.indexPlayer, 'killed'));
                getCellAround(grid, cell.y, cell.x).forEach((cell) =>
                  responses.push(generateResponse(cell.x, cell.y, reqObj.data.indexPlayer, 'miss')),
                );
              }
            });
          } else {
            cell.status = 3;
            grid[reqObj.data.y][reqObj.data.x] = 3;
            responses.push(generateResponse(reqObj.data.x, reqObj.data.y, reqObj.data.indexPlayer, 'shot'));
          }
        }
      }
      return { game, responses: responses.length > 0 ? responses : undefined };
    }
  }
  return { game: undefined, responses: undefined };
};

export default attackHandler;
