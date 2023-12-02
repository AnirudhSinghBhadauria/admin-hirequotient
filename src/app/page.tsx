import React from "react";
import UserPanel from "@/components/users-panel";
import { getUsers } from "@/lib/hooks/get-users";

const Homepage = async () => {
  const users = await getUsers();

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
          <UserPanel users={users} />
        </div>
      </div>
    </section>
  );
};

export default Homepage;

