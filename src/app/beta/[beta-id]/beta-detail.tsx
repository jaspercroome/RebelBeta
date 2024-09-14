"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useBetaQuery } from "@/utils/hooks";
import { AlertCircleIcon, LoaderIcon } from "lucide-react";

export const BetaDetail = (props: { id: string }) => {
  const { id } = props;
  const { data, status } = useBetaQuery(id);
  const beta = data?.[0];

  if (status === "pending") {
    return (
      <Card>
        <CardHeader className="text-2xl">loading</CardHeader>
        <CardContent>
          <LoaderIcon />
        </CardContent>
      </Card>
    );
  }

  if (!beta) {
    return (
      <Card>
        <CardHeader className="text-2xl">No Beta found</CardHeader>
        <AlertCircleIcon />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-2xl">{beta.title}</CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
