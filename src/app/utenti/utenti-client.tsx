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

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UtentiClient({ users }: { users: User[] }) {
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista utenti</h1>

      <div className="mb-4">
        <Button onClick={() => router.push("/crea-utente")}>Crea utente</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/modifica-utente/${user.id}`)}
                >
                  Modifica
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    fetch(`/api/users/${user.id}`, { method: "DELETE" }).then(
                      () => router.refresh()
                    );
                  }}
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
