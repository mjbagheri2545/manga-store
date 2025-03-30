import { PrismaClient } from "@prisma/client";

import createSeed from "./createSeed";

async function deleteAllSeedFunction(prisma: PrismaClient) {
  console.log("Deleting All Records");
  await prisma.$executeRawUnsafe(`
        DO $$ 
        DECLARE 
            r RECORD;
        BEGIN
            FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
            LOOP 
                EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE'; 
            END LOOP; 
        END $$;
    `);
}

export const deleteAll = createSeed(deleteAllSeedFunction);
