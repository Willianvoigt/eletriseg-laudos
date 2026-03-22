/*
  Warnings:

  - You are about to drop the column `dataLaudoCapa` on the `Laudo` table. All the data in the column will be lost.
  - You are about to drop the column `dataLaudoTexto` on the `Laudo` table. All the data in the column will be lost.
  - You are about to drop the column `numeroRevisao` on the `Laudo` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaNbr` on the `Perigo` table. All the data in the column will be lost.
  - You are about to drop the column `eventosPerigosos` on the `Perigo` table. All the data in the column will be lost.
  - You are about to drop the column `f` on the `Perigo` table. All the data in the column will be lost.
  - You are about to drop the column `p` on the `Perigo` table. All the data in the column will be lost.
  - You are about to drop the column `s` on the `Perigo` table. All the data in the column will be lost.
  - You are about to drop the column `situacoesPerigosas` on the `Perigo` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Laudo" DROP CONSTRAINT "Laudo_userId_fkey";

-- AlterTable
ALTER TABLE "Laudo" DROP COLUMN "dataLaudoCapa",
DROP COLUMN "dataLaudoTexto",
DROP COLUMN "numeroRevisao",
ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "tipoLaudo" TEXT,
ALTER COLUMN "status" SET DEFAULT 'CONCLUIDO',
ALTER COLUMN "dataAbertura" DROP NOT NULL,
ALTER COLUMN "atividadeEconomica" DROP NOT NULL,
ALTER COLUMN "modelo" DROP NOT NULL,
ALTER COLUMN "numeroSerie" DROP NOT NULL,
ALTER COLUMN "setor" DROP NOT NULL,
ALTER COLUMN "descricaoFuncao" DROP NOT NULL,
ALTER COLUMN "fabricante" DROP NOT NULL,
ALTER COLUMN "anoFabricacao" DROP NOT NULL,
ALTER COLUMN "potenciaValor" DROP NOT NULL,
ALTER COLUMN "potenciaUnidade" DROP NOT NULL,
ALTER COLUMN "gravidadeLesao" DROP NOT NULL,
ALTER COLUMN "frequencia" DROP NOT NULL,
ALTER COLUMN "possibilidadeEvitar" DROP NOT NULL,
ALTER COLUMN "categoriaRequerida" DROP NOT NULL,
ALTER COLUMN "numeroArt" DROP NOT NULL,
ALTER COLUMN "tipoConclusao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Perigo" DROP COLUMN "categoriaNbr",
DROP COLUMN "eventosPerigosos",
DROP COLUMN "f",
DROP COLUMN "p",
DROP COLUMN "s",
DROP COLUMN "situacoesPerigosas",
ALTER COLUMN "classificacaoAntes" DROP NOT NULL,
ALTER COLUMN "classificacaoDepois" DROP NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE INDEX "Laudo_userId_idx" ON "Laudo"("userId");
