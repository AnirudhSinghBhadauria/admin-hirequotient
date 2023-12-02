import { Users } from "../interface/users-interface";

export const getUsers = async () => {
  const res = await fetch(`/api/users`, {
    method: "GET",
  });

  // Declaring Users Type!
  const users: Users[] = await res.json();

  if (!res.ok) {
    throw new Error("Users not found!");
  }

  return users;
};
