"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  handleSelect: (date?: Date) => void;
  range?: "past" | "future";
}

export function DatePicker({ handleSelect, range }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const handleClick = (d?: Date) => {
    setDate(d);
    handleSelect(d);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          fromDate={range === "future" ? new Date() : undefined}
          toDate={range === "past" ? new Date() : undefined}
          onSelect={handleClick}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
