import { Bet } from '@prisma/client';
import { SystemData } from './participant.protocols';

export type InputBetDto = Omit<Bet, SystemData | 'id' | 'status' | 'amountWon'>;
export type CreateBetDto = Omit<Bet, SystemData | 'id' | 'amountWon'>;
export type OutputBetDto = Bet;
export type FinishBetDto = Pick<Bet, 'id' | 'amountWon' | 'status'>;
export type FinishParticipantDto = Pick<Bet, 'participantId' | 'amountWon'>;
