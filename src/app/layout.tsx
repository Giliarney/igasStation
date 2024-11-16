"use client"
import { Heebo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
const queryClient = new QueryClient();
import { Toaster } from "@/components/ui/toaster"

const heebo = Heebo({weight:'500',  subsets: ["latin"]} );

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="pt-br"  
      title="iGasStation"
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="https://i.imgur.com/MKiQNpb.png"></link>
      </head>
      <body
        className={cn("min-h-screen bg-slate-50  font-serif antialiased", heebo.className)}
      >
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
