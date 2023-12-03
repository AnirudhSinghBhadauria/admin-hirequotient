import React from "react";
import UserPanel from "@/components/users-panel";
import { getUsers } from "@/lib/hooks/get-users";
import { Users } from "@/lib/interface/users-interface";

const Homepage = async () => {
  // Directly Fetching data in server component on server side! That's the beauty of next14!
  const users = await getUsers();
  // let usersForCurrentPage = users;

  // const getUserDataFromPanel = async (userData: Users[]) => {
  //   "use server";

  //   const page = searchParams["page"] ?? "1";
  //   const per_page = searchParams["per_page"] ?? "10";

  //   const start = (Number(page) - 1) * Number(per_page);
  //   const end = start + Number(per_page);

  //   usersForCurrentPage = userData.slice(start, end);

  //   console.log(userData);
  // };

  return (
    <section className="w-full flex flex-row justify-center items-center py-10">
      <div className="w-full max-w-[1400px] px-8">
        {/* Add Heading text here! */}
        <div className="border-[1px] border-[var(--muted-border)] shadow rounded-[0.5rem] p-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-[var(--muted-foreground)]">
              Here's a list of your active users!
            </p>
          </div>
          {/* Table + Filter + pagination */}
          <UserPanel
            users={users}
            // updateUsers={usersForCurrentPage}
            // getUser={getUserDataFromPanel}
          />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
