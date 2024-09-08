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

export const GravelForm = () => {
  const gravelSchema = z.object({
    ...baseFormSchema,
    gear: z.object({
      bike: z.string().min(1).max(40).optional(),
      tireWidth: z.number().min(19).max(200).optional(),
      tubeless: z.boolean().optional(),
      psi: z.number().min(0).max(120),
      flats: z.number().min(0).max(Infinity),
    }),
    spice: z.number().min(1).max(5),
  });

  const form = useForm<z.infer<typeof gravelSchema>>({
    resolver: zodResolver(gravelSchema),
    defaultValues: {
      title: "new Beta",
    },
  });

  const onSubmit = (values: z.infer<typeof gravelSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold">Gravel</p>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="New Gravel Beta" {...field} />
              </FormControl>
              <FormDescription>Title for your Beta Report</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={() => (
            <FormItem className="flex flex-col w-full items-start">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker
                  handleSelect={(d) => {
                    if (d !== undefined) form.setValue("date", d);
                  }}
                  range="past"
                />
              </FormControl>
              <FormDescription>When was this?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location{field.value ? `: ${field.value}` : ""}
              </FormLabel>
              <FormDescription>Where did it happen?</FormDescription>
              <FormControl>
                <div className="w-full h-[400px]">
                  <FormMap
                    onClick={(lnglat) => {
                      form.setValue("location", lnglat);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="funType"
          render={() => {
            const funTypes = FUN_TYPE;
            return (
              <FormItem>
                <FormLabel>How fun was it?</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue={funTypes[1]}>
                    {funTypes.map((item) => (
                      <div className="flex items-center space-x-2">
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
        {/* <FormField
        control={form.control}
        name=""
        render={({ field }) => (
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl></FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      </div>
    </Form>
  );
};
