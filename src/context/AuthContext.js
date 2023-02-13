import { createContext, useState, useEffect, useContext } from "react";
import { getIdFromLocalCookie, getUserFromLocalCookie } from "../auth";

let idState;
let userState;

const UserId = createContext({ id: null, user: null });

export const UserIdProvider = ({ value, children }) => {
  const { id, user } = value;

  useEffect(() => {
    if (!idState && id) {
      idState = id;
    }
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <UserId.Provider value={value}>{children}</UserId.Provider>;
};

export const useUserId = () => useContext(UserId);

export const useFetchUserId = () => {
  const [userId, setUserId] = useState({
    id: idState || null,
    user: userState || null,
  });

  useEffect(() => {
    if (idState !== undefined && userState !== undefined) {
      return;
    }

    let isMounted = true;

    const id = getIdFromLocalCookie();
    const user = getUserFromLocalCookie();
    if (isMounted) {
      setUserId({ id, user });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return userId;
};
