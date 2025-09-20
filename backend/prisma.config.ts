import { defineConfig } from 'prisma/config';
import path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
    seed: 'ts-node prisma/seed.ts',
  },
});
