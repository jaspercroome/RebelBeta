"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FUN_TYPE, baseFormSchema, funTypeMap } from "../utils";
import { FormMap } from "@/components/map/FormMap";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datepicker";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePostBetaMutation } from "@/utils/hooks";
import React from "react";
import { clearLocalForm, retrieveLocalForm, saveFormLocally } from "./utils";

const gravelSchema = z.object({
  ...baseFormSchema,
  gear: z.object({
    bike: z.string().min(1).max(40).optional(),
    tires: z.string().min(1).max(40).optional(),
    tireWidth: z.number().min(19).max(200).optional(),
    psi: z.number().min(0).max(120),
    flats: z.number().min(0).max(Infinity),
  }),
  spice: z.number().min(1).max(5),
});

type GravelSchema = z.infer<typeof gravelSchema>;

const savedState = retrieveLocalForm("newGravelForm") as
  | {
      saveDate: Date;
      data: GravelSchema;
    }
  | undefined;

const savedValues = savedState?.data;

export const GravelForm = () => {
  const form = useForm<z.infer<typeof gravelSchema>>({
    resolver: zodResolver(gravelSchema),
    defaultValues: {
      ...savedValues,
      spice: 3,
      funType: "Type 1",
    },
  });

  const supabaseUpdate = usePostBetaMutation();

  const onSubmit = (values: GravelSchema) => {
    supabaseUpdate.mutateAsync({
      ...values,
      date: values.date.toLocaleDateString(),
    });
    clearLocalForm("newGravelForm");
  };

  const handleChange = (values: GravelSchema) => {
    saveFormLocally(values, "newGravelForm");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onBlur={() => handleChange(form.getValues())}
      >
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold">Gravel</p>
          {JSON.stringify(savedState, null, 2)}
          {Boolean(savedState?.saveDate) ?? (
            <p className="text-xs italic">
              Last saved {savedState?.saveDate.toUTCString()}
            </p>
          )}
          <div className="flex flex-row w-full gap-4 items-end">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col w-3/4">
                  <FormLabel>
                    <p className="text-lg font-bold">Title</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title for your Beta Report"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col w-1/6 items-start">
                  <FormLabel>
                    <p className="text-md">Activity date</p>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      handleSelect={(d) => {
                        if (d !== undefined) form.setValue("date", d);
                      }}
                      range="past"
                      prompt="Pick a date & time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="text-lg font-bold">
                    {field.value
                      ? `Location: ${field.value}`
                      : "Where did it happen?"}
                  </p>
                </FormLabel>
                <div className="w-full h-[400px]">
                  <FormMap
                    onLocationChange={(lnglat) => {
                      form.setValue("location", lnglat, {
                        shouldDirty: true,
                      });
                      field.onChange(lnglat);
                    }}
                    value={field.value as [number, number]}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2 w-full justify-between">
            <FormField
              control={form.control}
              name="funType"
              render={({ field }) => {
                const funTypes = FUN_TYPE;
                return (
                  <FormItem className="flex flex-col w-1/4">
                    <FormLabel>
                      <p className="text-lg font-bold">
                        What type of fun was it?
                      </p>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup defaultValue={funTypes[1]}>
                        {funTypes.map((item) => (
                          <div
                            className="flex items-center space-x-2"
                            key={item}
                          >
                            <RadioGroupItem value={item} id={item} />
                            <Label
                              htmlFor={item}
                            >{`${item} - ${funTypeMap[item]}`}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="spice"
              render={({ field }) => (
                <FormItem className="flex flex-col w-1/3">
                  <FormLabel>
                    <p className="text-lg font-bold">How Spicy was it?</p>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[field.value]}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onValueChange={(e) => field.onChange(e[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    <p
                      className="text-2xl font-bold"
                      title={field.value.toString()}
                    >
                      {field.value < 2
                        ? "🧊 - so chill"
                        : field.value < 3
                          ? "🥛 - chill"
                          : field.value < 4
                            ? "🫑 - decent"
                            : field.value < 5
                              ? "🌶️ - spicy"
                              : "🔥 - yowzers"}
                    </p>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doItAgain"
              render={({ field }) => (
                <FormItem className="flex flex-col w-1/4">
                  <FormLabel>
                    <p className="text-lg font-bold">Would you do it again?</p>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue="true"
                      value={field.value?.toString()}
                      onBlur={field.onBlur}
                      onValueChange={field.onChange}
                      ref={field.ref}
                    >
                      {["true", "false"].map((item) => (
                        <div className="flex items-center space-x-2" key={item}>
                          <RadioGroupItem value={item} id={item} />
                          <Label htmlFor={item}>
                            {item === "true" ? "Yeah" : "Nope"}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="text-2xl font-black inline-block">Details</p>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-fit w-full">
            <p className="text-2xl font-black inline-block">
              Let&apos;s talk gear!
            </p>
            <div className="flex flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name="gear.bike"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-1/2">
                    <FormLabel>
                      <p className="text-lg font-bold">
                        What kind of bike were you on?
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-1/2">
                <FormField
                  control={form.control}
                  name="gear.tires"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="text-lg font-bold">
                          What tires were you running?
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-2 justify-evenly">
                  <FormField
                    control={form.control}
                    name="gear.tireWidth"
                    render={({ field }) => (
                      <FormItem className="w-fit">
                        <FormLabel>
                          <p className="text-md">Width (mm)</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min={0} max={200} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gear.psi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p className="text-md">PSI</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min={0} max={200} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gear.flats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p className="text-md">Any flats?</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min={0} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit">Submit Beta</Button>
      </form>
    </Form>
  );
};
