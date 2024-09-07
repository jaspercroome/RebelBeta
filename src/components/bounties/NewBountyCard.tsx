import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BountyButton } from "./BountyButton";

export const NewBountyCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Not seeing what you need?</CardTitle>
        <CardDescription>be the change!</CardDescription>
      </CardHeader>
      <CardContent>
        <BountyButton />
      </CardContent>
    </Card>
  );
};
