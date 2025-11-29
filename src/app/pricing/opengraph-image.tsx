import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MTG Library Pricing - Free & Premium Plans";
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
          Simple, Transparent Pricing
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
          Start free, upgrade when you need more
        </div>

        <div
          style={{
            display: "flex",
            gap: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 40,
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 16,
              minWidth: 300,
            }}
          >
            <div style={{ fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 16 }}>
              Free
            </div>
            <div style={{ fontSize: 56, fontWeight: "bold", color: "white" }}>$0</div>
            <div style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.8)" }}>/month</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 40,
              background: "white",
              borderRadius: 16,
              minWidth: 300,
            }}
          >
            <div style={{ fontSize: 32, fontWeight: "bold", color: "#7c3aed", marginBottom: 16 }}>
              Premium
            </div>
            <div style={{ fontSize: 56, fontWeight: "bold", color: "#7c3aed" }}>$9.99</div>
            <div style={{ fontSize: 24, color: "#9333ea" }}>/month</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

