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
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>
          <p className="text-4xl font-black">New Beta</p>
        </CardTitle>
        <CardDescription>Sharing is Caring</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={CategoryOption.BIKE} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {Object.entries(CategoryOption).map(([_key, item]) => (
              <TabsTrigger value={item}>{item}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={CategoryOption.BIKE}>
            <Tabs defaultValue={undefined} className="w-full">
              <TabsList className={`grid w-full grid-cols-4`}>
                {Object.entries(SubCategoryBikeOption).map(([_key, item]) => (
                  <TabsTrigger value={item}>{item}</TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(SubCategoryBikeOption).map(([_key, item]) => (
                <TabsContent value={item}>
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
                {Object.entries(SubCategoryHikeOption).map(([_key, item]) => (
                  <TabsTrigger value={item}>{item}</TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(SubCategoryHikeOption).map(([_key, item]) => (
                <TabsContent value={item}>
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
