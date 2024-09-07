"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";
import { categoryOptions, subcategoryOptions } from "./utils";

export const BetaForm = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categoryOptions)[number]>();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<(typeof subcategoryOptions)["hike" | "bike"][number]>();

  const dynamicForm = (selectedCategory, selectedSubCategory) => {
    switch (selectedCategory) {
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Beta</CardTitle>
        <CardDescription>Sharing is Caring</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
