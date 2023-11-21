import prisma from '@/database/db.connection';
import { faker } from '@faker-js/faker/locale/en_US';
import { MAX_INT_32, MIN_PARTICIPANT_BALANCE } from '@/utils/constants.utils';
import { OutputParticipantDto } from '@/protocols/participant.protocols';

function build(name: string, balance: number): Promise<OutputParticipantDto> {
  return prisma.participant.create({
    data: { name, balance },
  });
}

async function buildRandom() {
  return build(
    faker.person.fullName(),
    faker.number.int({
      min: MIN_PARTICIPANT_BALANCE,
      max: MAX_INT_32,
    }),
  );
}

const participantFactory = {
  build,
  buildRandom,
};
export default participantFactory;
