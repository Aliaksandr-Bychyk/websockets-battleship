import IReqAddShips from './IReqAddShips';
import IReqAddUserToRoom from './IReqAddUserToRoom';
import IReqAttack from './IReqAttack';
import IReqCreateRoom from './IReqCreateRoom';
import IReqReg from './IReqReg';

type IReq = IReqReg | IReqCreateRoom | IReqAddUserToRoom | IReqAddShips | IReqAttack;
export default IReq;
