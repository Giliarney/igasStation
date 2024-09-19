"use client"
import { Heebo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
const queryClient = new QueryClient();

const heebo = Heebo({weight:'500',  subsets: ["latin"]} );

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="pt-br"  
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="https://i.imgur.com/MKiQNpb.png"></link>
      </head>
      <body
        className={cn("min-h-screen bg-background font-serif antialiased", heebo.className)}
      >
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
