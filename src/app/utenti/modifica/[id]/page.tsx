"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

export default function Modifica() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users?id=${userId}`);
      const data = (await res.json()) as User[];

      setName(data[0].name ?? "");
      setEmail(data[0].email ?? "");
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/users?id=${userId}`, {
      method: "PUT",
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
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/utenti")}
        >
          Torna alla lista
        </Button>
      </div>
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
