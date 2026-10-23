import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

export const alt = `${SITE.name} · ${SITE.brand}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0a 0%, #132a8e 100%)",
          color: "#f6f9fc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#1bff3c", letterSpacing: 4, textTransform: "uppercase" }}>
          {SITE.brand}
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 34, marginTop: 28, maxWidth: 900, color: "#e5e7eb" }}>
          {SITE.shortDescription}
        </div>
        <div style={{ marginTop: 48, width: 160, height: 8, borderRadius: 8, background: "#1bff3c" }} />
      </div>
    ),
    size,
  );
}
