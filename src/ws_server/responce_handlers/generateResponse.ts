import IGame from '../../interfaces/IGame';

const generateResponse = (type: 'create_game' | 'start_game' | 'turn' | 'turn_init', game: IGame) => {
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
  if (type === 'turn_init') {
    game.turn = game.data.map((user) => user.indexPlayer)[Math.floor(Math.random())];
  }
  if (type === 'turn') {
    game.turn = game.data.filter((user) => user.indexPlayer !== game.turn)[0]?.indexPlayer;
  }
  if (type === 'turn' || type === 'turn_init') {
    hostResponse = JSON.stringify({
      type: 'turn',
      data: JSON.stringify({
        currentPlayer: game.turn,
      }),
      id: 0,
    });
    clientResponse = hostResponse;
  }
  return {
    host: hostResponse,
    client: clientResponse,
  };
};

export default generateResponse;
