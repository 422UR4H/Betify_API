import { Bet } from '@prisma/client';
import { SystemData } from './participant.protocols';

export type InputBetDto = Omit<Bet, SystemData | 'id' | 'status' | 'amountWon'>;
export type CreateBetDto = Omit<Bet, SystemData | 'id' | 'amountWon'>;
export type OutputBetDto = Bet;
export type FinishParticipantDto = Pick<Bet, 'participantId' | 'amountWon'>;
export type FinishBetDto = Pick<Bet, 'id' | 'participantId' | 'amountWon' | 'status'>;

// export class FinishBetDto {
//   constructor(
//     public id: string,
//     public participantId: number,
//     public amountWon: number,
//     public status: Status,
//   ) {}
// }
