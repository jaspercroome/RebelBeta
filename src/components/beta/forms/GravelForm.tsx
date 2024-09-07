import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { baseFormSchema } from "../utils";

export const GravelForm = () => {
  const gravelSchema = {
    ...baseFormSchema,
    bike: z.string().min(1).max(40),
    tireWidth: z.number().min(19).max(200),
    spice: z.number().min(1).max(5),
    tubeless: z.boolean(),
    flats: z.number().min(0).max(Infinity),
    psi: z.number().min(0).max(120),
  };

  const form = useForm<z.infer<typeof gravelSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof gravelSchema>) => {
    console.log(values);
  };

  return <Form></Form>;
};
