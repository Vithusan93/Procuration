"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrClearOption } from "react-icons/gr";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Customers", href: "/customers" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Staffs", href: "/staffs" },
    { label: "Appointment", href: "/appointment" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GrClearOption />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900 ": link.href === currentPath,
              "text-zinc-500 ": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
