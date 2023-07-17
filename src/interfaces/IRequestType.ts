import IReq from './IReq';

export default interface IREquestType extends Pick<IReq, 'type'> {
  handler: () => void;
}
