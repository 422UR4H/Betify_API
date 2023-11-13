import prisma from '@/database/db.connection';
// import { faker } from '@faker-js/faker';
import { Bet } from '@prisma/client';

function build(
  homeTeamScore: number,
  awayTeamScore: number,
  participantId: number,
  amountBet: number,
  gameId: number,
): Promise<Bet> {
  return prisma.bet.create({
    data: { homeTeamScore, awayTeamScore, participantId, amountBet, gameId },
  });
}

// async function buildRandom() {
//   return build(
//     faker.number.int({ min: 0, max: 10 }),
//     faker.number.int({ min: 0, max: 10 }),
//     faker.number.int({ min: })
//     );
// }

const betFactory = {
  build,
  // buildRandom,
};

export default betFactory;
