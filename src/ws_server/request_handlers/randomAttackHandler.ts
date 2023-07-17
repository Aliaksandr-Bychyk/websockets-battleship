import IReqAttack from '../../interfaces/IReqAttack';
import IReq from '../../interfaces/IReq';
import games from '../databases/games';

const getRandomCell = (grid: number[][]): { x: number; y: number } => {
  const cell = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
  return grid[cell.y][cell.x] !== 0 && grid[cell.y][cell.x] !== 1 ? getRandomCell(grid) : cell;
};

const randomAttackHandler = (reqObj: IReq) => {
  if (reqObj.type === 'randomAttack') {
    const game = games.filter((game) => game.idGame === reqObj.data.gameId)[0];
    const grid = game.data.filter((user) => user.indexPlayer !== reqObj.data.indexPlayer)[0].grid;
    const { x, y } = getRandomCell(grid);
    const { data, id } = reqObj;
    const newReqObj: IReqAttack = {
      type: 'attack',
      data: { ...data, x, y },
      id,
    };
    return newReqObj;
  }

  return;
};

export default randomAttackHandler;
