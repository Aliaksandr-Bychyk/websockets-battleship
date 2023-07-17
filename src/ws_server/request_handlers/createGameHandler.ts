import IGameInitData from '../../interfaces/IGameInitData';
import games from '../databases/games';

const createGameHandler = (data: IGameInitData) => {
  const newGame = {
    idGame: data.host,
    hostId: data.host,
    clientId: data.client,
    data: [],
    isOnline: data.isOnline,
  };
  games.push(newGame);
  return newGame;
};

export default createGameHandler;
