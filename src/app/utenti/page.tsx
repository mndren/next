"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

export default function UtentiList() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Errore nel recupero utenti:", err);
      }
    };

    getUsers();
  }, []);

  const deleteUser = async (id: number) => {
    await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista utenti</h1>

      <div className="mb-4">
        <Button onClick={() => router.push("utenti/crea")}>Crea utente</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nessun utente trovato
              </TableCell>
            </TableRow>
          )}
          {users.length > 0 &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`utenti/modifica/${user.id}`)}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteUser(user.id)}
                  >
                    Elimina
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
