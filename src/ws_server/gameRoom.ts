import IReqCreateRoom from '../interfaces/IReqCreateRoom';
import rooms from './rooms';
import users from './users';

const gameRoom = (requestsObj: IReqCreateRoom, socketID: number) => {
  rooms.push({ index: rooms.length });
  const user = users.filter((user) => user.index === socketID)[0];
  return {
    type: 'update_room',
    data: JSON.stringify([
      {
        roomId: rooms.length - 1,
        roomUsers: [
          {
            name: user?.name,
            index: user?.index,
          },
        ],
      },
    ]),
    id: 0,
  };
};

export default gameRoom;
