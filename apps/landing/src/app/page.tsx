"use client";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
export default function Home() {
  return (
    <>
      <div className=" text-blue-400">this is the home page</div>
      <Button variant={"outline"}>this is the button</Button>
      <Input></Input>
      {/* <Calendar /> */}
    </>
  );
}
