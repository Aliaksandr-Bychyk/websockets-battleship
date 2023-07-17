import IShip from './IShip';

type data =
  | {
      indexPlayer: number;
      ships: IShip[];
      grid: number[][];
    }[]
  | [];

export default interface IGame {
  idGame: number;
  hostId: number;
  clientId: number;
  data: data;
  turn?: number;
  isOnline: boolean;
}
