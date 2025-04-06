"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Test con Next/Prisma/Shadcn",
  description: "Test con Next/Prisma/Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-6">
              <>
                <Breadcrumb className="ml-4">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.map((segment, index) => {
                      const href = "/" + segments.slice(0, index + 1).join("/");
                      const isLast = index === segments.length - 1;
                      return (
                        <React.Fragment key={href}>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {isLast ? (
                              <span className="text-muted-foreground capitalize">
                                {segment}
                              </span>
                            ) : (
                              <BreadcrumbLink
                                href={href}
                                className="capitalize"
                              >
                                {segment}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </React.Fragment>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
                {children}
              </>
            </main>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
