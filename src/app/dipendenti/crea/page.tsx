"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

export default function Crea() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dataAssunzione, setDataAssunzione] = useState("");
  const [stipendio, setStipendio] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [attivo, setAttivo] = useState(true);

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
    <div className="max-w-md mt-14">
      <div className="pl-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dipendenti")}
        >
          Torna alla lista
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 ">
        <Input
          placeholder="Nome*"
          value={nome}
          type="text"
          onChange={(e) => setNome(e.target.value)}
          className="w-full"
          required
        />
        <Input
          placeholder="Cognome*"
          value={cognome}
          type="text"
          onChange={(e) => setCognome(e.target.value)}
          className="w-full"
          required
        />
        <Input
          placeholder="Email*"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
        <Input
          placeholder="Telefono*"
          value={telefono}
          type="text"
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full"
          required
        />
        <Input
          placeholder="Stipendio*"
          value={stipendio}
          type="number"
          onChange={(e) => setStipendio(e.target.value)}
          className="w-full"
          required
        />
        <Input
          placeholder="Ruolo*"
          value={ruolo}
          type="text"
          onChange={(e) => setRuolo(e.target.value)}
          className="w-full"
          required
        />
        <Input
          placeholder="Data Assunzione*"
          type="date"
          value={dataAssunzione}
          onChange={(e) => setDataAssunzione(e.target.value)}
          className="w-full"
          required
        />
        <div className="flex items-center space-x-2">
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
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Crea utente
        </Button>
      </form>
    </div>
  );
}
