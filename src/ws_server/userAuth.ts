import IReqReq from '../interfaces/IReqReq';
import generateHash from '../utils/generateHash';
import users from './users';

const userAuth = (requestsObj: IReqReq, socketID: number) => {
  const user = users.filter((user) => user.name === requestsObj.data.name)[0];
  let userIndex: number;
  let isError: boolean;
  let errorText: string;

  if (!user) {
    users.push({
      index: socketID,
      name: requestsObj.data.name,
      password: generateHash(requestsObj.data.password),
    });
    userIndex = socketID;
    isError = false;
    errorText = '';
  } else {
    userIndex = socketID;
    if (user.password === generateHash(requestsObj.data.password)) {
      isError = false;
      errorText = '';
      user.index = socketID;
    } else {
      isError = true;
      errorText = 'Wrong password';
    }
  }
  return {
    type: 'reg',
    data: JSON.stringify({
      name: requestsObj.data.name,
      index: userIndex,
      error: isError,
      errorText: errorText,
    }),
    id: 0,
  };
};

export default userAuth;
