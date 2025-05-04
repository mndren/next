import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../../../../../lib/prisma";
import { updateUser } from "../../actions";

export async function Modifica({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    return <div>Utente non trovato</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-4">
        <Button type="button" variant="outline">
          <Link href="/utenti">Torna alla lista</Link>
        </Button>
      </div>
      <form
        action={(f) => updateUser(f, parseInt(params.id))}
        className="space-y-4"
      >
        <Input
          placeholder="Nome"
          name="name"
          defaultValue={user.name}
          type="text"
        />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          defaultValue={user.email}
        />
        <Button type="submit">Modifica utente</Button>
      </form>
    </div>
  );
}
