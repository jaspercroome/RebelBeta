"use client";
import Image from 'next/image'
import { getStatus } from "@/utils/getStatus";
import { getAllBeta } from "@/utils/queries";
import { useQuery } from "@tanstack/react-query";

const ListBeta = () => {
  const { data } = useQuery({
    queryKey: ["hydrate-beta"],
    queryFn: () => getAllBeta(),
    staleTime: 10 * 1000,
  });

  const getDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay().toString();
    const filledDate = day.length === 2 ? day : "0" + day;
    return `${year}-${month}-${filledDate}`;
  };

  const defaultImageString = 'https://zemcazjvgjpzzohlsgug.supabase.co/storage/v1/object/public/'

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <p className="text-4xl font-black">{item.title}</p>
          <Image alt={item.title} src={defaultImageString+item.media_url} className="w-[200px]"/>
          <p>{getDate(new Date(item.beta_date))}</p>
          <div className="flex flex-row space-x-2">
            <p className="text-xl">{item.body}</p>
            <p>{item.gear_desc}</p>
          </div>
          <p className="font-black text-6xl">
            {getStatus(item.safety_rating).icon}
          </p>
          <p className="font-black text-2xl">
            {getStatus(item.safety_rating).description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListBeta;
