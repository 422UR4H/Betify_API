import customErrors from '@/errors/customErrors';
import { InputParticipantDto, OutputParticipantDto } from '@/protocols/participant.protocols';
import participantRepository from '@/repositories/participant.repository';

async function findAll(): Promise<OutputParticipantDto[]> {
  return await participantRepository.findAll();
}

async function findById(id: number): Promise<OutputParticipantDto> {
  const participant = await participantRepository.findById(id);
  if (!participant) throw customErrors.notFound('Participant');
  return participant;
}

async function create(participant: InputParticipantDto): Promise<OutputParticipantDto> {
  return await participantRepository.create(participant);
}

async function liquidatePayment(id: number, balance: number, amountBet: number): Promise<OutputParticipantDto> {
  const newBalance = balance - amountBet;
  return await participantRepository.updateBalance(id, newBalance);
}

const participantService = { findAll, findById, create, liquidatePayment };
export default participantService;
