import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MTG Library FAQ - Frequently Asked Questions";
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
            fontSize: 80,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          FAQ
        </div>

        <div
          style={{
            fontSize: 36,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Everything You Need to Know About MTG Library
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

