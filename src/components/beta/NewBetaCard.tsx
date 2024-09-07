import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { BetaButton } from "./BetaButton";

export const NewBetaCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Want to add to <em>The Knowledge?</em>
        </CardTitle>
        <CardDescription>make someone's day!</CardDescription>
      </CardHeader>
      <CardContent>
        <BetaButton />
      </CardContent>
    </Card>
  );
};
