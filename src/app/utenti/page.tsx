import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";

export default async function UtentiList() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista utenti</h1>

      <div className="mb-4">
        <Button>
          {" "}
          <Link href={"utenti/crea"}>Crea utente</Link>
        </Button>
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
                  <Button variant="outline">
                    <Link href={`utenti/modifica/${user.id}`}> Modifica</Link>
                  </Button>
                  <Button variant="destructive">Elimina</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
