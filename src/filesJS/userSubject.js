import { BehaviorSubject } from "rxjs";
const currentUser = new BehaviorSubject(null);
const authState = new BehaviorSubject(false);
const signingOut = new BehaviorSubject(false);
const messageUser = new BehaviorSubject(null);

const login = (dataUser) => {
  currentUser.next(dataUser);
  authState.next(dataUser.Ok);
  signingOut.next(!dataUser.Ok);
  return dataUser;
};

const logout = () => {
  currentUser.next(null);
  authState.next(false);
  signingOut.next(true);
};

const setMessageUser = (msg) => {
  messageUser.next(msg)
}

export { login, logout, setMessageUser, authState, currentUser, messageUser };
