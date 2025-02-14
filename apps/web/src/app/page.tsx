import { Button } from "@repo/ui/button";
export default function Home() {
  return (
    <>
      <div className="text-red-500">button</div>

      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </>
  );
}
