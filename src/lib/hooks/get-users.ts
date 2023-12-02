import { Users } from "../interface/users-interface";

export const getUsers = async () => {
  // const res = await fetch(`${process.env.APP_DOMAIN}/api/users`, {
  //   method: "GET",
  // });

  // // Declaring Users Type!
  // const users: Users[] = await res.json();

  // if (!res.ok) {
  //   throw new Error("Users not found!");
  // }

  // return users;

  const response = await fetch(`${process.env.USER_DATA}`, {
    cache: "force-cache",
  });
  const users:Users[] = await response.json();
  return users;
};
