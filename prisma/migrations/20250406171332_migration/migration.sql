-- CreateTable
CREATE TABLE "Dipendenti" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "dataAssunzione" TIMESTAMP(3) NOT NULL,
    "stipendio" DOUBLE PRECISION NOT NULL,
    "ruolo" TEXT NOT NULL,
    "attivo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Dipendenti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mansione" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "stipendio" DOUBLE PRECISION NOT NULL,
    "attivo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Mansione_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progetto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "dataInizio" TIMESTAMP(3) NOT NULL,
    "dataFine" TIMESTAMP(3) NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "attivo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Progetto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dipendenti_email_key" ON "Dipendenti"("email");
