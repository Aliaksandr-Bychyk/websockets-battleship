import IUser from './IUser';

export default interface IRoom {
  roomId: number;
  roomUsers: IUser[];
}
