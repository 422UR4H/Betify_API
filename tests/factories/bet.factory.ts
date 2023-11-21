import { Bet } from '@prisma/client';
import prisma from '@/database/db.connection';
// import { MAX_INT_32, MIN_PARTICIPANT_BALANCE } from '@/utils/constants.utils';
// import { faker } from '@faker-js/faker';

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

// async function buildRandom(participantId: number, gameId: number): Promise<Bet> {
//   return build(
//     faker.number.int({ min: 0, max: MAX_INT_32 }),
//     faker.number.int({ min: 0, max: MAX_INT_32 }),
//     participantId,
//     faker.number.int({ min: 1, max: MIN_PARTICIPANT_BALANCE }),
//     gameId,
//   );
// }

const betFactory = {
  build,
  // buildRandom,
};

export default betFactory;
