/*
  Warnings:

  - You are about to alter the column `homeTeamName` on the `games` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `awayTeamName` on the `games` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `name` on the `participants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- DropForeignKey
ALTER TABLE "bets" DROP CONSTRAINT "bets_gameId_fkey";

-- DropForeignKey
ALTER TABLE "bets" DROP CONSTRAINT "bets_participantId_fkey";

-- AlterTable
ALTER TABLE "bets" ALTER COLUMN "homeTeamScore" SET DEFAULT 0,
ALTER COLUMN "awayTeamScore" SET DEFAULT 0,
ALTER COLUMN "amountBet" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "games" ALTER COLUMN "homeTeamName" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "awayTeamName" SET DATA TYPE VARCHAR(64);

-- AlterTable
ALTER TABLE "participants" ALTER COLUMN "name" SET DATA TYPE VARCHAR(64);

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
