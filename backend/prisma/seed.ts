import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.ship.createMany({
    data: [
      { name: 'Battleship 1', length: 4 },
      { name: 'Destroyer 1', length: 2 },
      { name: 'Destroyer 2', length: 2 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
