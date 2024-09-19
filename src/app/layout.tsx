"use client"

import { Heebo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import React, { useState } from "react";
const queryClient = new QueryClient();

const heebo = Heebo({weight:'500',  subsets: ["latin"]} );

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="pt-br">
      <body
        className={cn("min-h-screen bg-background font-serif antialiased", heebo.className)}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
