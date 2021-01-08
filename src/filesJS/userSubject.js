import { BehaviorSubject } from "rxjs";
const currentUser = new BehaviorSubject(null);
const authState = new BehaviorSubject(false);
const signingOut = new BehaviorSubject(false);
const messageUser = new BehaviorSubject(null);
// Regresa el usuario actual obtenido del local storage
const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    return false;
  }
  return JSON.parse(user);
};

const login = (dataUser) => {
  localStorage.setItem("currentUser", JSON.stringify(dataUser));
  currentUser.next(dataUser);
  authState.next(dataUser.Ok);
  signingOut.next(!dataUser.Ok);
  return dataUser;
};

const logout = () => {
  console.log('removeItem')
  localStorage.removeItem("currentUser");
  currentUser.next(null);
  authState.next(false);
  signingOut.next(true);
};

const setMessageUser = (msg) => {
  messageUser.next(msg);
};

export {
  login,
  logout,
  setMessageUser,
  getCurrentUser,
  authState,
  currentUser,
  messageUser,
};
