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
      <Theme appearance="dark"></Theme>
    </main>
  );
};
export default HomePage;
