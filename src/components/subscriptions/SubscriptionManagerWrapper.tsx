"use client";

import React from "react";
import SubscriptionManager from "./SubscriptionManager";
import { useSupabase } from "../providers/SupabaseProvider";

const SubscriptionManagerWrapper = () => {
  const { user } = useSupabase();

  if (!user) return <div>Please log in to manage your subscription.</div>;

  return <SubscriptionManager userId={user.id} />;
};

export default SubscriptionManagerWrapper;
