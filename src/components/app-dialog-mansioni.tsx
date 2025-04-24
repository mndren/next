"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";

export function AppDialogMansioni({ ruolo }: { ruolo: string }) {
  const [mansioni, setMansioni] = useState<string[]>([]);
  const [selectedMansioni, setSelectedMansioni] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const prevPrompt = useRef("");

  useEffect(() => {
    if (open && ruolo) {
      const currentPrompt = `Elencami 10 mansioni associate al ruolo: ${ruolo}, separate da virgola senza numeri e senza parentesi tonde`;

      if (currentPrompt === prevPrompt.current) {
        return;
      }

      setLoading(true);
      const fetchMansioni = async () => {
        try {
          const res = await fetch("/api/renext", {
            method: "POST",
            body: JSON.stringify({
              prompt: currentPrompt,
            }),
          });

          const { response } = await res.json();
          setMansioni(
            (response as string)
              .replace(".", "")
              .split(",")
              .map((m: string) => m.trim())
          );
          prevPrompt.current = currentPrompt;
        } catch (error) {
          console.error("Errore nel caricamento delle mansioni:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMansioni();
    }
  }, [open, ruolo]);

  const handleMansioneChange = (mansione: string, checked: boolean) => {
    if (checked) {
      setSelectedMansioni([...selectedMansioni, mansione]);
    } else {
      setSelectedMansioni(selectedMansioni.filter((m) => m !== mansione));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" disabled={!ruolo}>
          Aggiungi mansione
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiungi Mansione</DialogTitle>
          <div className="text-muted-foreground text-sm mt-2">
            {loading ? (
              <div className="space-y-2">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ))}
              </div>
            ) : mansioni.length > 0 ? (
              <div className="space-y-2">
                {mansioni.map((mansione, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mansione-${index}`}
                      checked={selectedMansioni.includes(mansione)}
                      onCheckedChange={(checked) =>
                        handleMansioneChange(mansione, checked === true)
                      }
                    />
                    <label
                      htmlFor={`mansione-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {mansione}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p>Nessuna mansione trovata per questo ruolo</p>
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
