import { Participant } from '@prisma/client';

export type SystemData = 'createdAt' | 'updatedAt';

export type InputParticipantDto = Omit<OutputParticipantDto, SystemData | 'id'>;
export type OutputParticipantDto = Participant;
