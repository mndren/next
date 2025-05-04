"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDialogMansioni } from "@/components/app-dialog-mansioni";

export default function Crea() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dataAssunzione, setDataAssunzione] = useState("");
  const [stipendio, setStipendio] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [attivo, setAttivo] = useState(true);
  const [roles, setRoles] = useState<string[]>([
    "Programmatore",
    "Grafico",
    "Amministrativo",
  ]);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataAssunzioneDate = dataAssunzione ? new Date(dataAssunzione) : null;
    const stipendioNumber = stipendio ? parseFloat(stipendio) : null;
    const res = await fetch("/api/dipendenti", {
      method: "POST",
      body: JSON.stringify({
        nome,
        cognome,
        email,
        telefono,
        dataAssunzione: dataAssunzioneDate,
        ruolo,
        stipendio: stipendioNumber,
        attivo,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Errore durante la creazione del dipendente", data);
      return;
    }
    router.push("/dipendenti");
  };

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 p-6 w-full"
      >
        <Input
          placeholder="Nome*"
          value={nome}
          type="text"
          onChange={(e) => setNome(e.target.value)}
          className="col-span-1"
          required
        />
        <Input
          placeholder="Cognome*"
          value={cognome}
          type="text"
          onChange={(e) => setCognome(e.target.value)}
          className="col-span-1"
          required
        />
        <Input
          placeholder="Email*"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="col-span-1"
          required
        />
        <Input
          placeholder="Telefono*"
          value={telefono}
          type="text"
          onChange={(e) => setTelefono(e.target.value)}
          className="col-span-1"
          required
        />
        <Input
          placeholder="Stipendio*"
          value={stipendio}
          type="number"
          onChange={(e) => setStipendio(e.target.value)}
          className="col-span-1"
          required
        />
        <Select onValueChange={(value) => setRuolo(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selezione un ruolo*" />
          </SelectTrigger>
          <SelectContent>
            {roles && roles.length > 0 ? (
              roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="0">Nessun ruolo disponibile</SelectItem>
            )}
          </SelectContent>
        </Select>
        <AppDialogMansioni ruolo={ruolo} className="col-span-2" />
        <Input
          placeholder="Data Assunzione*"
          type="date"
          value={dataAssunzione}
          onChange={(e) => setDataAssunzione(e.target.value)}
          className="col-span-1"
          required
        />
        <div className="flex items-center space-x-2 col-span-2">
          <Checkbox
            id="attivo"
            checked={attivo}
            onCheckedChange={(checked) => setAttivo(checked === true)}
            required
          />
          <label htmlFor="attivo" className="text-sm font-medium text-gray-700">
            Attivo*
          </label>
        </div>

        <Button
          type="submit"
          className="col-span-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          Crea utente
        </Button>
      </form>
    </div>
  );
}
