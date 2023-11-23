"use client";
import Image from "next/image";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import * as Label from "@radix-ui/react-label";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Card, Button, TextArea } from "@radix-ui/themes";

const HomePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card size="1" style={{ width: 350 }}>
        <form>
          <div>Sign in</div>

          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="firstName"
            >
              FirstName
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="input"
              id="firstName"
              defaultValue="FirstName"
            />
          </div>
          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="LastName"
            >
              Lastame
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="input"
              id="LastName"
              defaultValue="LastName"
            />
          </div>

          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="Email"
            >
              Email
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="email"
              id="email"
              defaultValue="Email"
            />
          </div>

          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="password"
            >
              Password
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="pasword"
              id="password"
              defaultValue="password"
            />
          </div>

          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="phone"
            >
              Phone
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="input"
              id="phone"
              defaultValue="phone"
            />
          </div>
        </form>
      </Card>
      <form>
        <Card size="1" style={{ width: 350 }}>
          <div>Login</div>

          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="Email"
            >
              Email
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="email"
              id="email"
              defaultValue="Email"
            />
          </div>

          <div className="flex flex-wrap items-center gap-[15px] px-5">
            <Label.Root
              className="text-[15px] font-medium leading-[35px] text-black"
              htmlFor="password"
            >
              Password
            </Label.Root>
            <input
              className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="pasword"
              id="password"
              defaultValue="password"
            />
          </div>
        </Card>
      </form>

      {/*
      <div> <Link href={"/customers"}>Customers</Link></div>
*/}
    </main>
  );
};
export default HomePage;
