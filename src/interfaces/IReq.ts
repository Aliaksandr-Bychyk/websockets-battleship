import IReqAddShips from './IReqAddShips';
import IReqAddUserToRoom from './IReqAddUserToRoom';
import IReqAttack from './IReqAttack';
import IReqCreateRoom from './IReqCreateRoom';
import IReqRandomAttack from './IReqRandomAttack';
import IReqReg from './IReqReg';

type IReq = IReqReg | IReqCreateRoom | IReqAddUserToRoom | IReqAddShips | IReqAttack | IReqRandomAttack;
export default IReq;
