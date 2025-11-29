import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MTG Library Features - AI Scanner, Analytics & More";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed 0%, #7c3aed 33%, #6366f1 66%, #2563eb 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Powerful Features
        </div>

        <div
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: 900,
            marginBottom: 60,
          }}
        >
          Everything You Need to Manage Your Collection
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 40,
            maxWidth: 1000,
          }}
        >
          {["AI Scanner", "Analytics", "Price Tracking", "Deck Builder", "Trade Calculator", "LGS Locator"].map((feature) => (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 32px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 12,
                color: "white",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

