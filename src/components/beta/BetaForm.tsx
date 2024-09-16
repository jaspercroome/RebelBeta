"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import {
  CategoryOption,
  SubCategoryBikeOption,
  SubCategoryHikeOption,
} from "./utils";
import { GravelForm } from "./forms/GravelForm";

export const BetaForm = () => {
  const DynamicForm = (props: {
    category: CategoryOption;
    subCategory: SubCategoryBikeOption | SubCategoryHikeOption;
  }) => {
    const { category, subCategory } = props;
    switch (category) {
      case CategoryOption.BIKE: {
        switch (subCategory) {
          case SubCategoryBikeOption.GRAVEL: {
            return <GravelForm />;
          }
        }
      }
      default:
        return (
          <p className="text-xl font-bold">{subCategory} - Coming Soon!</p>
        );
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-4xl font-black">New Beta</CardTitle>
        <CardDescription>Sharing is Caring</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={CategoryOption.BIKE} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {Object.entries(CategoryOption).map(([key, item]) => (
              <TabsTrigger value={item} key={key}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={CategoryOption.BIKE}>
            <Tabs defaultValue={undefined} className="w-full">
              <TabsList className={`grid w-full grid-cols-4`}>
                {Object.entries(SubCategoryBikeOption).map(([key, item]) => (
                  <TabsTrigger value={item} key={key}>
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(SubCategoryBikeOption).map(([key, item]) => (
                <TabsContent value={item} key={key}>
                  <DynamicForm
                    category={CategoryOption.BIKE}
                    subCategory={item}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
          <TabsContent value={CategoryOption.HIKE}>
            <Tabs defaultValue={undefined}>
              <TabsList className={`grid w-full grid-cols-3`}>
                {Object.entries(SubCategoryHikeOption).map(([key, item]) => (
                  <TabsTrigger value={item} key={key}>
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(SubCategoryHikeOption).map(([key, item]) => (
                <TabsContent value={item} key={key}>
                  <DynamicForm
                    category={CategoryOption.HIKE}
                    subCategory={item}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
