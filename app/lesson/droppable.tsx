"use client";

import type React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: number;
  children: React.ReactNode;
  label: string;
}

export function Droppable({ id, children, label }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-[400px] flex flex-col items-center justify-start p-4 rounded-lg ${
        id % 2 === 0 ? "bg-blue-100" : "bg-rose-100"
      } ${isOver ? "border-2 border-green-500" : ""}`}
    >
      <h3 className="text-lg font-bold mb-4">{label}</h3>
      <div className="flex flex-wrap gap-4 justify-center">{children}</div>
    </div>
  );
}
