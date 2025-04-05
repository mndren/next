"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Post, User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";

export default function Modifica() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${postId}`);
      const data = (await res.json()) as Post;

      setTitle(data.title ?? "");
      setContent(data.content ?? "");
      setPublished(data.published ?? false);
      setAuthorId(data.authorId.toString() ?? "");
      setPublished(data.published ?? false);
    };
    if (postId) fetchPost();
  }, [postId]);
  const [authors, setAuthors] = useState<User[]>([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const res = await fetch("/api/users");
      const data = (await res.json()) as User[];
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content, published, authorId }),
    });
    if (res.ok) {
      router.push("/posts");
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
          onClick={() => router.push("/posts")}
        >
          Torna alla lista
        </Button>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          placeholder="Titolo"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Contenuto"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Select onValueChange={setAuthorId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selezione un autore" />
          </SelectTrigger>
          <SelectContent>
            {authors && authors.length > 0 ? (
              authors.map((author) => (
                <SelectItem key={author.id} value={author.id.toString()}>
                  {author.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="0">Nessun autore disponibile</SelectItem>
            )}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <label htmlFor="published">Pubblicato</label>
        </div>
        <Button type="submit">Modifica post</Button>
      </form>
    </div>
  );
}
