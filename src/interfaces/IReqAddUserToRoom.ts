export default interface IReqAddUserToRoom {
  type: 'add_user_to_room';
  data: {
    indexRoom: number;
  };
  id: 0;
}
