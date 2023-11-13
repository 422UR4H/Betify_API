import prisma from '@/database/db.connection';
import { faker } from '@faker-js/faker';
import { Game } from '@prisma/client';

function build(homeTeamName: string, awayTeamName: string): Promise<Game> {
  return prisma.game.create({
    data: { homeTeamName, awayTeamName },
  });
}

async function buildRandom() {
  return build(faker.lorem.words({ min: 1, max: 5 }), faker.lorem.words({ min: 1, max: 5 }));
}

const gameFactory = {
  build,
  buildRandom,
};
export default gameFactory;
