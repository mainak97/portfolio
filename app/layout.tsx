import type { Metadata } from "next";
import {
  photographyNameFont, technologyNameFont,
  photographySubHeaderFont, aboutPhotographyText,
  technologySubHeaderFont, technologyF1, technologyF2, technologyF3,
  photographyCaptionFont
} from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mainak Bose",
  description: "Portfolio of Mainak Bose, a full stack developer and photographer. Explore my work in technology and photography, showcasing my skills and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${photographyNameFont.variable} ${technologyNameFont.variable}
        ${photographySubHeaderFont.variable} ${aboutPhotographyText.variable} ${technologySubHeaderFont.variable}
        ${technologyF1.variable} ${technologyF2.variable} ${technologyF3.variable} ${photographyCaptionFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
