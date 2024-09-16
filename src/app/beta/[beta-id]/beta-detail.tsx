"use client";

import {
  doItAgainMap,
  funTypeMap,
  spicinessMap,
} from "@/components/beta/utils";
import { DetailMap } from "@/components/map/DetailMap";
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
      <CardHeader>
        <p className="text-2xl font-black">{beta.title}</p>
        <p className="text-sm italic">{`${beta.location[0]}, ${beta.location[1]}`}</p>
        {beta.gear && <p>{JSON.stringify(beta.gear, null, 2)}</p>}
      </CardHeader>
      <CardContent className="flex-col p-4 gap-2">
        <div className="flex flex-wrap flex-row bg-slate-300 p-4 gap-2 rounded-sm justify-between">
          <div className="w-1/5 h-fit">
            <p className="text-xl font-bold">{funTypeMap[beta.fun_type]}</p>
          </div>
          <div className="w-1/5 h-fit">
            <p className="text-xl font-bold">{spicinessMap[beta.spice]}</p>
          </div>
          <div className="w-1/5 h-fit">
            <p className="text-xl font-bold">
              {doItAgainMap[beta.do_it_again]}
            </p>
          </div>
        </div>
        <DetailMap value={beta.location as [number, number]} />
        <p className="text-lg">{beta.body}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
