import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { seo } from "@/lib/seo";

export const alt = seo.headline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public/rei.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 72px",
          background: "#0A172B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(226,232,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        {/* Amber glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-40px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.18) 0%, rgba(245,166,35,0.04) 45%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
          <div
            style={{
              width: "4px",
              height: "20px",
              background: "#F5A623",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "18px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#F5A623",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {seo.tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            marginTop: "36px",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={140} height={140} style={{ objectFit: "contain" }} />

          <div style={{ display: "flex", flexDirection: "column", maxWidth: "820px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "64px",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#F5F0E8",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
              }}
            >
              <span>
                We build{" "}
                <span style={{ color: "#F5A623", fontStyle: "italic" }}>digital products</span>
                {" "}that shine.
              </span>
            </div>

            <p
              style={{
                marginTop: "28px",
                fontSize: "26px",
                lineHeight: 1.45,
                color: "#A8A090",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              {seo.description}
            </p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "72px",
            fontSize: "20px",
            color: "#5C5650",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.1em",
          }}
        >
          faroldigital.app
        </div>
      </div>
    ),
    { ...size }
  );
}
