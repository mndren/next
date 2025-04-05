"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreaUtente() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Errore durante la creazione dell'utente", data);
      return;
    }
    router.push("/utenti");
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
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit">Crea utente</Button>
      </form>
    </div>
  );
}
