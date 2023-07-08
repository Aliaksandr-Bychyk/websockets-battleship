import IReqCreateRoom from '../interfaces/IReqCreateRoom';
import games from './games';

const gameRoom = (requestsObj: IReqCreateRoom) => {
  games.push({ index: games.length });
  return {
    type: 'create_game',
    data: JSON.stringify({
      idGame: games.length - 1,
      idPlayer: 0,
    }),
    id: 0,
  };
};

export default gameRoom;
