import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

// Chakra Petch: squared, engineering-silkscreen display face for headings, status and scores.
const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// IBM Plex Sans: quiet, highly readable body text.
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE = "Engr. Marco's Tic-Tac-Toe";
const DESCRIPTION = "Two players, one board. Good luck!";

export const metadata: Metadata = {
  metadataBase: new URL("https://tic-tac-toe-sigma-six-42.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1428",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${chakra.variable} ${plex.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
