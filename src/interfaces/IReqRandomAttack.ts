export default interface IReqRandomAttack {
  type: 'randomAttack';
  data: {
    gameId: number;
    indexPlayer: number;
  };
  id: 0;
}
