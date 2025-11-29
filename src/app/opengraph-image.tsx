import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MTG Library - Manage Your Collection";
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
        {/* Logo/Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 24,
            background: "white",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#7c3aed",
            }}
          >
            M
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          MTG Library
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Manage Your MTG Collection Like Never Before
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            marginTop: 60,
            gap: 60,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", color: "white", fontSize: 24 }}>
            <span style={{ marginRight: 12 }}>✓</span> AI Scanner
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "white", fontSize: 24 }}>
            <span style={{ marginRight: 12 }}>✓</span> Price Tracking
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "white", fontSize: 24 }}>
            <span style={{ marginRight: 12 }}>✓</span> Deck Builder
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

