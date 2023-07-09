import IShip from './IShip';

type data =
  | {
      indexPlayer: number;
      ships: IShip[];
    }[]
  | [];

export default interface IGame {
  idGame: number;
  hostId: number;
  clientId: number;
  data: data;
}
