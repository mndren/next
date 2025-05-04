"use server";

import { prisma } from "../../../lib/prisma";

export async function updateUser(user: FormData, id: number) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: user.get("name") as string,
      email: user.get("email") as string,
    },
  });
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function createUser(user: FormData) {
  await prisma.user.create({
    data: {
      name: user.get("name") as string,
      email: user.get("email") as string,
    },
  });
}
