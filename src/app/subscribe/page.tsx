import { SubscriptionManagerWrapper } from "@/components/subscriptions";

export default function SubscribePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Your Subscription</h1>
      <SubscriptionManagerWrapper />
    </div>
  );
}
