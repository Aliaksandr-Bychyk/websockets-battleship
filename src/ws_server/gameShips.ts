import IReqAddShips from '../interfaces/IReqAddShips';
import games from './databases/games';

const gameShips = (requestsObj: IReqAddShips) => {
  const currentGame = games.filter((game) => game.idGame === requestsObj.data.gameId)[0];
  if (currentGame?.data?.length === 0) {
    currentGame.data[0] = { indexPlayer: currentGame.data[0]?.indexPlayer as number, ships: requestsObj.data.ships };
  } else if (currentGame?.data.length === 1) {
    currentGame.data[1] = { indexPlayer: requestsObj.data.indexPlayer, ships: requestsObj.data.ships };
  }
};

export default gameShips;
