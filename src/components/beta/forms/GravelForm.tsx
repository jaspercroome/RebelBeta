"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Label,
  DatePicker,
  Slider,
  Textarea,
  Button,
} from "@/components/ui";
import { FormMap } from "@/components/map/FormMap";

import { usePostBetaMutation } from "@/utils/hooks";
import {
  baseFormSchema,
  retrieveLocalForm,
  saveFormLocally,
  clearLocalForm,
  FUN_TYPE,
  funTypeMap,
  spicinessMap,
} from "../utils";
import { Database } from "@/utils/supabase/types";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import { useSupabase } from "@/components/providers/SupabaseProvider";

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
const formTitle = "newGravelForm";

export const GravelForm = () => {
  const savedState = retrieveLocalForm(formTitle) as
    | {
        saveDate: string;
        data: GravelSchema;
      }
    | undefined;

  const supa = useSupabase();

  const savedValues = savedState?.data;
  const form = useForm<z.infer<typeof gravelSchema>>({
    resolver: zodResolver(gravelSchema),
    defaultValues: {
      spice: 2,
      doItAgain: true,
      funType: "Type 1",
      ...savedValues,
    },
  });

  const { mutateAsync: supabaseUpdate } = usePostBetaMutation();

  const router = useRouter();

  const formValues = form.watch();

  useEffect(() => {
    const handleChange = (values: GravelSchema) => {
      saveFormLocally(values, formTitle);
    };

    handleChange(formValues);
  }, [formValues]);

  const onSubmit = async (values: GravelSchema) => {
    if (!supa.user) return;
    const data: Database["public"]["Tables"]["beta_reports"]["Insert"] = {
      do_it_again: values.doItAgain,
      date: values.date.toLocaleDateString(),
      body: values.body,
      gear: values.gear,
      location: values.location,
      title: values.title,
      spice: values.spice,
      fun_type: values.funType,
      beta_type: "gravel",
      user_id: supa.user?.id,
    };
    await supabaseUpdate(data)
      .then((d) => {
        toast("Beta submitted successfully.");
        clearLocalForm(formTitle);
        router.push("/beta");
      })
      .catch((e) => {
        toast(`An error occurred: ${e}`);
      });
  };

  const handleClear = () => {
    clearLocalForm(formTitle);
    form.reset({ title: "New Gravel Report" });
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-2xl font-bold">Gravel</p>
          {savedState && (
            <div className="w-full justify-between flex flex-row">
              <p className="text-xs italic">
                Draft - Last saved{" "}
                {new Date(savedState?.saveDate).toLocaleString()}
              </p>
              <Button onClick={handleClear} className="w-fit" size="sm">
                Clear Data
              </Button>
            </div>
          )}
          <div className="flex flex-row w-full items-end flex-wrap flex-start gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col w-3/5">
                  <FormLabel className="text-lg font-bold">Title</FormLabel>
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
                <FormItem className="flex flex-col w-1/6 flex-start">
                  <FormLabel className="text-md">Activity date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      handleSelect={(d) => {
                        if (d !== undefined) form.setValue("date", new Date(d));
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
                <FormLabel className="text-lg font-bold">
                  {field.value
                    ? `Location: ${field.value}`
                    : "Where did it happen?"}
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
                    <FormLabel className="text-lg font-bold">
                      What type of fun was it?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onValueChange={field.onChange}
                      >
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
                  <FormLabel className="text-lg font-bold">
                    How Spicy was it?
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      value={[field.value]}
                      onValueChange={(e) => field.onChange(e[0])}
                    />
                  </FormControl>
                  <FormDescription
                    className="text-2xl font-bold"
                    title={field.value?.toString()}
                  >
                    {spicinessMap[field?.value as 1 | 2 | 3 | 4 | 5]}
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
                  <FormLabel className="text-lg font-bold">
                    Would you do it again?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "true" : "false"}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      onValueChange={(val) => field.onChange(val === "true")}
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
                <FormLabel className="text-2xl font-black inline-block">
                  Details
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  {field.value?.length < 100
                    ? `${100 - field.value.length} more characters needed`
                    : "Nice Description!"}
                </FormDescription>
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
                    <FormLabel className="text-lg font-bold">
                      What kind of bike were you on?
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
                      <FormLabel className="text-lg font-bold">
                        What tires were you running?
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
                        <FormLabel className="text-md">Width (mm)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            max={200}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
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
                        <FormLabel className="text-md">PSI</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            max={200}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
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
                        <FormLabel className="text-md">Any flats?</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
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
