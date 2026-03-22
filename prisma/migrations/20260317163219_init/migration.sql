-- CreateEnum
CREATE TYPE "LaudoStatus" AS ENUM ('RASCUNHO', 'CONCLUIDO', 'ARQUIVADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laudo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "LaudoStatus" NOT NULL DEFAULT 'RASCUNHO',
    "numeroRevisao" TEXT NOT NULL DEFAULT '00',
    "dataLaudoCapa" TEXT NOT NULL,
    "dataLaudoTexto" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "dataAbertura" TEXT NOT NULL,
    "atividadeEconomica" TEXT NOT NULL,
    "nomeMaquina" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "descricaoFuncao" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "anoFabricacao" TEXT NOT NULL,
    "potenciaValor" TEXT NOT NULL,
    "potenciaUnidade" TEXT NOT NULL,
    "dimensoes" TEXT,
    "materiaPrima" TEXT,
    "usoPretendido" TEXT,
    "modoOperacao" TEXT,
    "tipoUso" TEXT[],
    "restricaoMotora" BOOLEAN NOT NULL DEFAULT false,
    "restricaoSexo" BOOLEAN NOT NULL DEFAULT false,
    "treinamentos" TEXT[],
    "gravidadeLesao" TEXT NOT NULL,
    "frequencia" TEXT NOT NULL,
    "possibilidadeEvitar" TEXT NOT NULL,
    "categoriaRequerida" INTEGER NOT NULL,
    "numeroArt" TEXT NOT NULL,
    "tipoConclusao" TEXT NOT NULL,
    "fotoPlacaMaquina" TEXT,
    "fotoVisaoGeral" TEXT,

    CONSTRAINT "Laudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DispositivoSeguranca" (
    "id" TEXT NOT NULL,
    "laudoId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoUrl" TEXT,

    CONSTRAINT "DispositivoSeguranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perigo" (
    "id" TEXT NOT NULL,
    "laudoId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "cicloVida" TEXT NOT NULL,
    "numeroPerigo" TEXT NOT NULL,
    "tarefa" TEXT NOT NULL,
    "descricaoPerigo" TEXT NOT NULL,
    "situacoesPerigosas" TEXT NOT NULL,
    "eventosPerigosos" TEXT NOT NULL,
    "loAntes" DOUBLE PRECISION NOT NULL,
    "feAntes" DOUBLE PRECISION NOT NULL,
    "dphAntes" DOUBLE PRECISION NOT NULL,
    "npAntes" DOUBLE PRECISION NOT NULL,
    "hrnAntes" DOUBLE PRECISION NOT NULL,
    "classificacaoAntes" TEXT NOT NULL,
    "s" TEXT NOT NULL,
    "f" TEXT NOT NULL,
    "p" TEXT NOT NULL,
    "categoriaNbr" INTEGER NOT NULL,
    "medidasEngenharia" TEXT NOT NULL,
    "loDepois" DOUBLE PRECISION NOT NULL,
    "feDepois" DOUBLE PRECISION NOT NULL,
    "dphDepois" DOUBLE PRECISION NOT NULL,
    "npDepois" DOUBLE PRECISION NOT NULL,
    "hrnDepois" DOUBLE PRECISION NOT NULL,
    "classificacaoDepois" TEXT NOT NULL,

    CONSTRAINT "Perigo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Laudo" ADD CONSTRAINT "Laudo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispositivoSeguranca" ADD CONSTRAINT "DispositivoSeguranca_laudoId_fkey" FOREIGN KEY ("laudoId") REFERENCES "Laudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perigo" ADD CONSTRAINT "Perigo_laudoId_fkey" FOREIGN KEY ("laudoId") REFERENCES "Laudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
