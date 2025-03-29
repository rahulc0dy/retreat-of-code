import React from "react";
import Link from "next/link";
import SignInButton from "@/components/SignInButton";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

interface NavLink {
  label: string;
  href: string;
}

interface NavLinks {
  sections: Array<NavLink>;
  info: Array<NavLink>;
}

const navLinks: NavLinks = {
  sections: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ],
  info: [
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "Stats",
      href: "/stats",
    },
  ],
};

const Navigation = async () => {
  const session = await auth();
  return (
    <nav className="items-center p-2">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-lavender text-lg font-medium">Retreat of Code</h1>
        {navLinks.sections.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="text-lavender/60 hover:text-lavender"
          >
            [{item.label}]
          </Link>
        ))}
        {/*  TODO: Profile logic */}
        <div className="flex flex-wrap items-center">
          {!session?.user ? (
            <SignInButton />
          ) : (
            <>
              <SignOutButton className={"mr-4"} />
              <p className="mr-2 inline">{session?.user.name}</p>
              <span className="text-yellow">12*</span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {/* TODO: Year logic */}
        <h1 className="text-lavender/40">year=2025</h1>
        {navLinks.info.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="text-lavender/60 hover:text-lavender"
          >
            [{item.label}]
          </Link>
        ))}
      </div>
    </nav>
  );
};
export default Navigation;
