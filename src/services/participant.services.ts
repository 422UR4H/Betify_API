import customErrors from '@/errors/customErrors';
import { InputParticipantDto, OutputParticipantDto } from '@/protocols/participant.protocols';
import participantRepository, {
  liquidatePayment as liquidatePaymentRepository,
} from '@/repositories/participant.repository';

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

function liquidatePayment(): Function {
  // ready to scale: put new validation logic here
  return liquidatePaymentRepository;
}

const participantService = { findAll, findById, create, liquidatePayment };
export default participantService;
