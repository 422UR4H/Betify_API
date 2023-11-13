import prisma from '@/database/db.connection';
import { faker } from '@faker-js/faker/locale/en_US';
import { Participant } from '@prisma/client';

function build(name: string, balance: number): Promise<Participant> {
  return prisma.participant.create({
    data: { name, balance },
  });
}

async function buildRandom() {
  return build(faker.person.fullName(), faker.number.int({ min: 1, max: 99999999999 }));
}

const participantFactory = {
  build,
  buildRandom,
};

export default participantFactory;
