import IReqAddShips from './IReqAddShips';
import IReqAddUserToRoom from './IReqAddUserToRoom';
import IReqAttack from './IReqAttack';
import IReqCreateRoom from './IReqCreateRoom';
import IReqRandomAttack from './IReqRandomAttack';
import IReqReg from './IReqReg';
import IReqSinglePlay from './IReqSinglePlay';

type IReq =
  | IReqReg
  | IReqCreateRoom
  | IReqAddUserToRoom
  | IReqAddShips
  | IReqAttack
  | IReqRandomAttack
  | IReqSinglePlay;
export default IReq;
