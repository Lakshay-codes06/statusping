import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",
    subsets: ["latin"],
  });

export const metadata: Metadata =
  {
    title: {
      default:
        "StatusPing",
      template:
        "%s | StatusPing",
    },

    description:
      "Realtime website monitoring, SSL tracking, incident management and public status pages.",

    keywords: [
      "uptime monitoring",
      "status page",
      "website monitoring",
      "incident management",
      "SSL monitoring",
      "StatusPing",
    ],

    openGraph: {
      title: "StatusPing",

      description:
        "Realtime website monitoring, SSL tracking, incident management and public status pages.",

      type: "website",

      siteName:
        "StatusPing",
    },

    icons: {
      icon: "/favicon.ico",
    },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950">
        {children}

        <Toaster
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}