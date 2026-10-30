import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ControlAlt — Open-Source Directory",
    template: "%s · ControlAlt",
  },
  description:
    "Take control. Go open. A directory of open-source software powered by live GitHub data.",
  keywords: [
    "open-source",
    "software directory",
    "self-hosted",
    "github repositories",
    "developer tools",
    "controlalt",
  ],
  applicationName: "ControlAlt",
  openGraph: {
    title: "ControlAlt — Open-Source Directory",
    description:
      "Take control. Go open. A directory of open-source software powered by live GitHub data.",
    siteName: "ControlAlt",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-ca-bg text-ca-text antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["light", "dark"]}
        >
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-ca focus:bg-ca-blue focus:px-3 focus:py-2 focus:text-xs focus:font-medium focus:text-ca-on-accent"
            >
              Skip to content
            </a>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
