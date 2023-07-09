import IGame from '../../interfaces/IGame';

const generateResponse = (type: 'create_game' | 'start_game', game: IGame) => {
  let hostResponse = '';
  let clientResponse = '';
  if (type === 'create_game') {
    hostResponse = JSON.stringify({
      type: 'create_game',
      data: JSON.stringify({ idGame: game.hostId, idPlayer: game.hostId }),
      id: 0,
    });
    clientResponse = JSON.stringify({
      type: 'create_game',
      data: JSON.stringify({ idGame: game.hostId, idPlayer: game.clientId }),
      id: 0,
    });
  }
  if (type === 'start_game') {
    hostResponse = JSON.stringify({
      type: 'start_game',
      data: JSON.stringify({
        ships: game.data.filter((user) => user.indexPlayer === game.hostId)[0]?.ships,
        currentPlayerIndex: game.hostId,
      }),
      id: 0,
    });
    clientResponse = JSON.stringify({
      type: 'start_game',
      data: JSON.stringify({
        ships: game.data.filter((user) => user.indexPlayer === game.clientId)[0]?.ships,
        currentPlayerIndex: game.clientId,
      }),
      id: 0,
    });
  }
  return {
    host: hostResponse,
    client: clientResponse,
  };
};

export default generateResponse;
