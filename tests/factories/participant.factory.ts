import { faker } from '@faker-js/faker/locale/en_US';
import prisma from '@/database/db.connection';
import { MAX_INT_32, MIN_PARTICIPANT_BALANCE } from '@/utils/constants.utils';
import { OutputParticipantDto } from '@/protocols/participant.protocols';

function build(name: string, balance: number): Promise<OutputParticipantDto> {
  return prisma.participant.create({
    data: { name, balance },
  });
}

async function buildRandom(): Promise<OutputParticipantDto> {
  return build(
    faker.person.fullName(),
    faker.number.int({
      min: MIN_PARTICIPANT_BALANCE,
      max: MAX_INT_32,
    }),
  );
}

async function buildRandomList(length: number): Promise<OutputParticipantDto[]> {
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(await buildRandom());
  }
  return list;
}

const participantFactory = {
  build,
  buildRandom,
  buildRandomList,
};
export default participantFactory;
