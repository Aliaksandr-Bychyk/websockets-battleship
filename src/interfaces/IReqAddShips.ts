import IShip from './IShip';

export default interface IReqAddShips {
  type: 'add_ships';
  data: {
    gameId: number;
    ships: IShip[];
    indexPlayer: number;
  };
  id: 0;
}
