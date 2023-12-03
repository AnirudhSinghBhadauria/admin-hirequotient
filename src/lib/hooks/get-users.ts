import { Users } from "../interface/users-interface";

export const getUsers = async () => {
  const response = await fetch(`${process.env.USER_DATA}`, {
    cache: "force-cache",
  });
  const users: Users[] = await response.json();
  return users;
};
