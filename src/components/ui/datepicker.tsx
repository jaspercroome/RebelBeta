"use client";

import * as React from "react";
import { format, setMinutes, setHours } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ChangeEventHandler, useEffect } from "react";
import { Input } from "./input";

interface DatePickerProps {
  handleSelect: (date?: Date) => void;
  range?: "past" | "future";
  prompt?: string;
  showTime?: boolean;
  value?: Date;
}

export function DatePicker({
  handleSelect,
  range,
  prompt,
  value,
}: DatePickerProps) {
  const dateValue = value ? new Date(value) : undefined;
  const timeValue = dateValue?.getTime();
  const [date, setDate] = React.useState<Date | undefined>(dateValue);
  const [time, setTime] = React.useState<string>("00:00");

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!date) {
      setTime(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(date, minutes), hours);
    setDate(newSelectedDate);
    setTime(time);
    handleSelect(newSelectedDate);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!time || !date) {
      setDate(date);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setDate(newDate);
    handleSelect(newDate);
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
          {date ? format(date, "Pp") : <span>{prompt ?? "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Input
          type="time"
          onChange={handleTimeChange}
          value={time}
          className="w-fit border-none"
        />
        <Calendar
          mode="single"
          selected={date}
          fromDate={range === "future" ? new Date() : undefined}
          toDate={range === "past" ? new Date() : undefined}
          onSelect={handleDaySelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
