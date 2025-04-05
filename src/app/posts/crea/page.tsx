"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

export default function Crea() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [authors, setAuthors] = useState<User[]>([]);
  const [a, setA] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      const res = await fetch("/api/users");
      const data = (await res.json()) as User[];
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        authorId: parseInt(a),
        published: published,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Errore durante la creazione del post", data);
      return;
    }
    router.push("/posts");
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
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Select onValueChange={setA}>
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
        <Button type="submit">Crea Post</Button>
      </form>
    </div>
  );
}
