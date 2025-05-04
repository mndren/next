"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dipendenti } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

export default function ModificaDipendente() {
  const router = useRouter();
  const params = useParams();
  const dipendenteId = params.id;

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [stipendio, setStipendio] = useState("");
  const [attivo, setAttivo] = useState(true);

  useEffect(() => {
    const fetchDipendente = async () => {
      const res = await fetch(`/api/dipendenti/${dipendenteId}`);
      const data = (await res.json()) as Dipendenti;

      setNome(data.nome ?? "");
      setCognome(data.cognome ?? "");
      setEmail(data.email ?? "");
      setTelefono(data.telefono ?? "");
      setRuolo(data.ruolo ?? "");
      setStipendio(data.stipendio.toString() ?? "");
      setAttivo(data.attivo ?? true);
    };
    if (dipendenteId) fetchDipendente();
  }, [dipendenteId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/dipendenti?id=${dipendenteId}`, {
      method: "PUT",
      body: JSON.stringify({
        nome,
        cognome,
        email,
        telefono,
        ruolo,
        stipendio,
        attivo,
      }),
    });
    if (res.ok) {
      router.push("/dipendenti");
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
          onClick={() => router.push("/dipendenti")}
        >
          Torna alla lista
        </Button>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          placeholder="Nome"
          value={nome}
          type="text"
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          placeholder="Cognome"
          value={cognome}
          type="text"
          onChange={(e) => setCognome(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Telefono"
          value={telefono}
          type="text"
          onChange={(e) => setTelefono(e.target.value)}
        />
        <Input
          placeholder="Ruolo"
          value={ruolo}
          type="text"
          onChange={(e) => setRuolo(e.target.value)}
        />
        <Input
          placeholder="Stipendio"
          value={stipendio}
          type="number"
          onChange={(e) => setStipendio(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="attivo"
            checked={attivo}
            onCheckedChange={(checked) => setAttivo(checked === true)}
          />
          <label htmlFor="attivo" className="text-sm font-medium text-gray-700">
            Attivo
          </label>
        </div>
        <Button type="submit">Modifica dipendente</Button>
      </form>
    </div>
  );
}
