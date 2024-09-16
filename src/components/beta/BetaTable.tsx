import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/utils/supabase/types";
import Link from "next/link";
export const BetaTable = (props: {
  data?: Database["public"]["Tables"]["beta_reports"]["Row"][] | null;
}) => {
  const { data } = props;

  return (
    <Table>
      <TableCaption>Recent beta</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">Type</TableHead>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-right">
              <Link href={`/beta/${item.id}`} className="w-full">
                {item.beta_type?.toLocaleUpperCase()}
              </Link>
            </TableCell>
            <TableCell className="font-medium">
              <Link href={`/beta/${item.id}`} className="w-full">
                {item.title}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/beta/${item.id}`} className="w-full">
                {new Date(item.updated_at ?? "").toLocaleString()}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/beta/${item.id}`} className="w-full">
                {`[${item.location[0]}, ${item.location[1]}]`}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
