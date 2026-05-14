"use client";

import dynamic from "next/dynamic";

const VapiWidget = dynamic(() => import("@vapi-ai/client-sdk-react").then(mod => mod.VapiWidget), { ssr: false });

export function VapiBridge() {
  const pk = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const asst = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  if (!pk || !asst) return null;

  return (
    <VapiWidget
      publicKey={pk}
      assistantId={asst}
      mode="hybrid"
      theme="dark"
      accentColor="#B89968"
      baseBgColor="#131210"
      ctaButtonColor="#211e19"
      ctaButtonTextColor="#f1ede4"
      position="bottom-right"
      title="Booking concierge"
      chatPlaceholder="Ask about availability, suites, or Bhurban…"
      hybridEmptyMessage="Voice or text — same concierge."
    />
  );
}
