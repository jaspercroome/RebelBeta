"use client";

import React from "react";
import { useSubscription } from "@/utils/hooks";

interface SubscriptionManagerProps {
  userId: string;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  userId,
}) => {
  const { data: subscription, isLoading, error } = useSubscription(userId);

  if (isLoading) return <div>Loading subscription info...</div>;
  if (error) return <div>Error loading subscription: {error.message}</div>;

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const { url } = await response.json();
      window.location.assign(url);
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const { url } = await response.json();
      window.location.assign(url);
    } catch (error) {
      console.error("Failed to create portal session:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Your Subscription</h2>
      <p className="mb-4">
        Status: {subscription?.is_premium ? "Premium" : "Free"}
      </p>
      {subscription?.is_premium ? (
        <Button
          onClick={handleManageSubscription}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Manage Subscription
        </Button>
      ) : (
        <Button
          onClick={handleSubscribe}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upgrade to Premium
        </Button>
      )}
    </div>
  );
};

export default SubscriptionManager;
