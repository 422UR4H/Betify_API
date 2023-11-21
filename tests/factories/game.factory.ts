import prisma from '@/database/db.connection';
import { faker } from '@faker-js/faker';
import { Game } from '@prisma/client';

function build(homeTeamName: string, awayTeamName: string): Promise<Game> {
  return prisma.game.create({
    data: { homeTeamName, awayTeamName },
  });
}

async function buildRandom(): Promise<Game> {
  return build(faker.lorem.words({ min: 1, max: 5 }), faker.lorem.words({ min: 1, max: 5 }));
}

function buildRandomFinishedGame(): Promise<Game> {
  return prisma.game.create({
    data: {
      homeTeamName: faker.lorem.words({ min: 1, max: 5 }),
      awayTeamName: faker.lorem.words({ min: 1, max: 5 }),
      isFinished: true,
    },
  });
}

const gameFactory = {
  build,
  buildRandom,
  buildRandomFinishedGame,
};
export default gameFactory;
