import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Auth from "@/components/auth/Auth";
import NavBar from "@/components/auth/NavBar";
import { isAuthenticated } from "@/utils/amplify-utils";

// Load Google Fonts: Geist and Geist_Mono
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // Use Latin subset
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], // Use Latin subset
});

// Define metadata for the HTML document
export const metadata: Metadata = {
  title: "Brgy News",
  description: "Brgy News & Announcements",
};

// Define the root layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {" "}
      {/* Set the language attribute to English */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render NavBar component with authentication status */}
        <NavBar isSignedIn={await isAuthenticated()} />

        {/* Render the Auth component, passing in child components */}
        <Auth>{children}</Auth>
      </body>
    </html>
  );
}
