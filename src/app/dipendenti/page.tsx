"use client";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import type { Dipendenti } from "@prisma/client";
import { PenIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useEffect } from "react";

export default function Dipendenti() {
  const router = useRouter();
  const [dipendenti, setDipendenti] = useState<Dipendenti[]>([]);

  useEffect(() => {
    const getDipendenti = async () => {
      try {
        const res = await fetch("/api/dipendenti");
        const data = await res.json();
        setDipendenti(data);
      } catch (err) {
        console.error("Errore nel recupero utenti:", err);
      }
    };

    getDipendenti();
  }, []);

  async function deleteDipendente(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/dipendenti/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del dipendente.");
      }

      setDipendenti((prevDipendenti) =>
        prevDipendenti.filter((dipendente) => dipendente.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dipendenti</h1>

      <div className="mb-4">
        <Button onClick={() => router.push("dipendenti/crea")}>Aggiungi</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>&nbsp;</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Cognome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Ruolo</TableHead>
            <TableHead>Stipendio</TableHead>
            <TableHead>Attivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dipendenti.map((dipendente) => (
            <TableRow key={dipendente.id}>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`dipendenti/modifica/${dipendente.id}`)
                  }
                >
                  <PenIcon />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteDipendente(dipendente.id)}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
              <TableCell>{dipendente.id}</TableCell>
              <TableCell>{dipendente.nome}</TableCell>
              <TableCell>{dipendente.cognome}</TableCell>
              <TableCell>{dipendente.email}</TableCell>
              <TableCell>{dipendente.telefono}</TableCell>
              <TableCell>{dipendente.ruolo}</TableCell>
              <TableCell>{dipendente.stipendio}</TableCell>
              <TableCell>{dipendente.attivo ? "Si" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
