import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { getBrandingSettings } from "@/lib/actions/branding";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LGU Monkayo - Official Website",
  description: "Official website of the Local Government Unit of Monkayo, Davao de Oro. Access e-services, news, transparency reports, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branding = await getBrandingSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={branding.logos.favicon || "/favicon.ico"} />
      </head>
      <body
        className={`${raleway.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
