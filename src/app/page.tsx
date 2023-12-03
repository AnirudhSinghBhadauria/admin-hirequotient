import React from "react";
import UserPanel from "@/components/users-panel";
import { getUsers } from "@/lib/hooks/get-users";
import Link from "next/link";
import Github from "@/assets/svg/git";

const Homepage = async () => {
  // Directly Fetching data in server component on server side! That's the beauty of next14!
  const users = await getUsers();
  return (
    <section className="w-full flex flex-row justify-center items-center py-10">
      <div className="w-full max-w-[1400px] px-8">
        {/* Add Heading text here! */}
        <section className="relative flex w-full flex-col items-start gap-2 px-4 pt-12 pb-12">
          <div className="inline-flex items-center rounded-lg bg-[var(--muted)] px-3 py-1 text-sm font-medium space-x-2">
            <p>🎉</p>
            <p>Welcome to our new admin panel !</p>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
            Gateway to seamless control
          </h1>
          <p className="max-w-[650px] text-lg text-[var(--muted-foreground)] sm:text-xl">
            Take control of your experience and manage everything from one
            convenient place. Streamline your tasks, access powerful tools, and
            customize your settings effortlessly.{" "}
          </p>

          <Link
            className="absolute top-0 right-0"
            href="https://github.com/AnirudhSinghBhadauria/admin-hirequotient"
            target="_blank"
          >
            <Github />
          </Link>
        </section>

        <div className="border-[1px] border-[var(--muted-border)] shadow rounded-[0.5rem] p-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-[var(--muted-foreground)]">
              Here's a list of your active users!
            </p>
          </div>
          {/* Panel + Filter + pagination */}
          <UserPanel users={users} />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
