// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function HomePage() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch("/api/users/count"),
          fetch("/api/posts/count"),
        ]);
        const usersData = (await usersRes.json()) || { count: 0 };
        const postsData = (await postsRes.json()) || { count: 0 };
        setUserCount(usersData.count);
        setPostCount(postsData.count);
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Utenti Totali</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {userCount !== null ? userCount : "Caricamento..."}
            </p>
            <Link href="/utenti" className="underline mt-2 block">
              Visualizza tutti gli utenti
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Post Totali</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postCount !== null ? postCount : "Caricamento..."}
            </p>
            <Link href="/posts" className="underline mt-2 block">
              Visualizza tutti i post
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
