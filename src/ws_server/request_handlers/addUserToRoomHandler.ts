import IReq from '../../interfaces/IReq';
import rooms from '../databases/rooms';

const addUserToRoomHandler = (reqObj: IReq, socketID: number) => {
  if (reqObj.type === 'add_user_to_room') {
    if (reqObj.data.indexRoom !== socketID) {
      const clientRoom = rooms.filter((room) => room.roomId === socketID)[0];
      if (clientRoom) {
        rooms.splice(rooms.indexOf(clientRoom), 1);
      }
      const hostRoom = rooms.filter((room) => room.roomId === reqObj.data.indexRoom)[0];
      if (hostRoom) {
        rooms.splice(rooms.indexOf(hostRoom), 1);
      }
      return { host: reqObj.data.indexRoom, client: socketID, isOnline: true };
    }
  }
};

export default addUserToRoomHandler;
