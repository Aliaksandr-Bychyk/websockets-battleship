import IShip from './IShip';

export default interface IGame {
  idGame: number;
  data?:
    | {
        indexPlayer: number;
        ships: IShip[];
      }[]
    | [];
}
