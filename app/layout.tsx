"use client";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

import { ThemeProvider } from "@/components/ThemeProvider";
import Toaster from "@/components/ToastContainer";
import Header from "@/components/Header";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/context/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} dark:bg-[#00113B] bg-[#fff]`}
        suppressHydrationWarning
      >
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <Toaster />
              <Header />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
