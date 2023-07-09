import IReq from '../../interfaces/IReq';
import rooms from '../databases/rooms';
import users from '../databases/users';

const createRoomHandler = (reqObj: IReq, socketID: number) => {
  if (reqObj.type === 'create_room') {
    const room = rooms.filter((room) => room.roomId === socketID)[0];
    if (!room) {
      const user = users.filter((user) => user.index === socketID)[0];
      const data = {
        roomId: socketID,
        roomUsers: [
          {
            name: user?.name as string,
            index: user?.index as number,
          },
        ],
      };
      rooms.push(data);
    }
  }
};

export default createRoomHandler;
