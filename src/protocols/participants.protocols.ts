import { Participant } from "@prisma/client";

export type SystemData = "createdAt" | "updatedAt"

export type OutputParticipantDto = Omit<Participant, SystemData>;
export type InputParticipantDto = Omit<OutputParticipantDto, "id">;
