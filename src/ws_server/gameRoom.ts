import rooms from './rooms';
import users from './users';

const gameRoom = (socketID?: number) => {
  if (socketID !== undefined) {
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
  return {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0,
  };
};

export default gameRoom;
