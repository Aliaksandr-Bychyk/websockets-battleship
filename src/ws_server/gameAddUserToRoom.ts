import IReqAddUserToRoom from '../interfaces/IReqAddUserToRoom';
import rooms from './rooms';
import games from './games';

const gameAddUserToRoom = (requestsObj: IReqAddUserToRoom, socketID: number) => {
  const clientRoom = rooms.filter((room) => room.roomId === socketID)[0];
  if (clientRoom) {
    rooms.splice(rooms.indexOf(clientRoom), 1);
  }
  const hostRoom = rooms.filter((room) => room.roomId === requestsObj.data.indexRoom)[0];
  if (hostRoom) {
    rooms.splice(rooms.indexOf(hostRoom), 1);
  }
  games.push({ idGame: socketID });
  return {
    type: 'create_game',
    data: {
      idGame: socketID,
      idPlayer: hostRoom?.roomUsers[0]?.index,
    },
    id: 0,
  };
};

export default gameAddUserToRoom;
