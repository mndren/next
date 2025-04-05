"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ModificaUtente() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      router.push("/utenti");
    } else {
      console.error("Errore durante l'aggiornamento");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          placeholder="Nome"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Modifica utente</Button>
      </form>
    </div>
  );
}
