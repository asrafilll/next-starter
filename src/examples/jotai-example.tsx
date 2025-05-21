"use client";

import { useAtom } from "jotai";
import { countAtom, doubledCountAtom } from "@/lib/store/counterAtoms";
import { Button } from "@/components/ui/button"; // Using Shadcn Button

export default function JotaiExamplePage() {
  const [count, setCount] = useAtom(countAtom);
  const [doubledCount] = useAtom(doubledCountAtom);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jotai Counter Example</h1>
      <div className="space-y-2">
        <p>Current count: {count}</p>
        <p>Doubled count: {doubledCount}</p>
      </div>
      <div className="space-x-2 mt-4">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement} variant="outline">
          Decrement
        </Button>
      </div>
    </div>
  );
}
