import prisma from '@/database/db.connection'

export async function cleanDB() {
  await prisma.participant.deleteMany();
  await prisma.game.deleteMany();
}
