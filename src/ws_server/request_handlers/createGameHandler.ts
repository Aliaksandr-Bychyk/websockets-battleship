import IGameInitData from '../../interfaces/IGameInitData';
import games from '../databases/games';

const createGameHandler = (data: IGameInitData) => {
  const newGame = {
    idGame: data.host,
  };
  games.push(newGame);
};

export default createGameHandler;
