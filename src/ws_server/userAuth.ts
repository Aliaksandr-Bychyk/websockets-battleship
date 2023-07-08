import IReqReq from '../interfaces/IReqReq';
import generateHash from '../utils/generateHash';
import users from './users';

const userAuth = (requestsObj: IReqReq) => {
  const user = users.filter((user) => user.name === requestsObj.data.name)[0];
  let userIndex: number;
  let isError: boolean;
  let errorText: string;

  if (!user) {
    users.push({
      index: users.length,
      name: requestsObj.data.name,
      password: generateHash(requestsObj.data.password),
    });
    userIndex = users.length - 1;
    isError = false;
    errorText = '';
  } else {
    userIndex = user.index;
    if (user.password === generateHash(requestsObj.data.password)) {
      isError = false;
      errorText = '';
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
