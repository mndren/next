import { prisma } from "../../../lib/prisma";
import UtentiClient from "./utenti-client";

export default async function Utenti() {
  const users = await prisma.user.findMany();

  return <UtentiClient users={users} />;
}
