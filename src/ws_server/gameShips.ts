import IReqAddShips from '../interfaces/IReqAddShips';

const gameShips = (requestsObj: IReqAddShips) => {
  return {
    type: 'start_game',
    data: JSON.stringify({
      ships: requestsObj.data.ships,
      currentPlayerIndex: requestsObj.data.indexPlayer,
    }),
    id: 0,
  };
};

export default gameShips;
