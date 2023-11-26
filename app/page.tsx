"use client";
import { Theme } from "@radix-ui/themes";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Theme appearance="dark"></Theme>
    </main>
  );
};
export default HomePage;
