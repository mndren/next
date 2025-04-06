## Come avviare il progetto

### Prerequisiti

1. Assicurati di avere [Docker](https://www.docker.com/) installato e in esecuzione.
2. Installa le dipendenze del progetto con il comando:
   ```bash
   npm install
   ```

### Avviare il database PostgreSQL

Il progetto utilizza PostgreSQL come database. Per avviarlo, esegui il seguente comando Docker:

```bash
docker run --name postgres-container -e POSTGRES_USER=utente -e POSTGRES_PASSWORD=password -e POSTGRES_DB=nome_database -p 5432:5432 -d postgres
```

### Configurare Prisma

Prisma è un ORM (Object-Relational Mapping) che facilita l'interazione con il database. Per configurarlo:

1. Modifica il file `.env` per includere la stringa di connessione al database:
   ```
   DATABASE_URL="postgresql://utente:password@localhost:5432/nome_database"
   ```
2. Sincronizza il modello Prisma con il database eseguendo:
   ```bash
   npx prisma migrate dev
   ```

### Avviare il progetto

Una volta configurato tutto, avvia il progetto con:

```bash
npm run dev
```

Il progetto sarà disponibile su `http://localhost:3000`.
