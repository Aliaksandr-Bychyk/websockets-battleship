import games from '../databases/games';
import IReq from '../../interfaces/IReq';

const addShipsHandler = (reqObj: IReq) => {
  if (reqObj.type === 'add_ships') {
    const game = games.filter((game) => game.idGame === reqObj.data.gameId)[0];
    if (game) {
      game.data[game.data.length] = { ships: reqObj.data.ships, indexPlayer: reqObj.data.indexPlayer };
      if (game.data.length === 2) {
        return game;
      }
    }
  }
};

export default addShipsHandler;
