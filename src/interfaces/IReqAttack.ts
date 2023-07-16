export default interface IReqAttack {
  type: 'attack';
  data: {
    gameId: number;
    x: number;
    y: number;
    indexPlayer: number;
  };
  id: 0;
}
