import IReq from '../../interfaces/IReq';
import games from '../databases/games';

const finishHandler = (reqObj: IReq) => {
  if (reqObj.type === 'attack') {
    const game = games.filter((game) => game.idGame === reqObj.data.gameId)[0];
    const ships = game.data.filter((user) => user.indexPlayer !== reqObj.data.indexPlayer)[0].ships;
    if (ships.length === ships.reduce((acc, ship) => (ship.isKilled ? acc + 1 : acc), 0)) {
      games.splice(games.indexOf(games.filter((game) => game.idGame === reqObj.data.gameId)[0]), 1);
      return {
        game,
        response: JSON.stringify({
          type: 'finish',
          data: JSON.stringify({
            winPlayer: reqObj.data.indexPlayer,
          }),
          id: 0,
        }),
      };
    }
  } else {
    return undefined;
  }
};

export default finishHandler;
