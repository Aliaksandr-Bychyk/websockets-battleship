import IReqAddShips from './IReqAddShips';
import IReqAddUserToRoom from './IReqAddUserToRoom';
import IReqCreateRoom from './IReqCreateRoom';
import IReqReg from './IReqReg';

type IReq = IReqReg | IReqCreateRoom | IReqAddUserToRoom | IReqAddShips;
export default IReq;
