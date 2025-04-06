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
import { Post, User } from "@prisma/client";

type PostWithAuthor = Post & {
  author: User;
};

export default function PostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Errore nel recupero utenti:", err);
      }
    };

    getPosts();
  }, []);

  const deletePost = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista post</h1>

      <div className="mb-4">
        <Button onClick={() => router.push("posts/crea")}>Crea post</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Autore</TableHead>
            <TableHead>Titolo</TableHead>
            <TableHead>Contenuto</TableHead>
            <TableHead>Pubblicato</TableHead>
            <TableHead>Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nessun post trovato
              </TableCell>
            </TableRow>
          )}
          {posts.length > 0 &&
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post?.author?.name}</TableCell>
                {/* Assuming you have a way to get the author's name */}
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.published ? "Si" : "No"}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`posts/modifica/${post.id}`)}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deletePost(post.id)}
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
