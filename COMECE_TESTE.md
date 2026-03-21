# 🚀 COMECE OS TESTES AGORA!

## Status
✅ **Sistema Pronto para Teste**
- Geração de PDF: ✅ Funcionando
- Endpoint público: ✅ Disponível
- Dev server: ✅ Rodando (porta 3006)

## Teste Rápido (1 minuto)

### No Terminal
```bash
# Copie e execute este comando:
curl -X POST http://localhost:3006/api/test-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "empresaNome": "EletriSeg Engenharia LTDA",
    "maquinaNome": "Centro de Dobra",
    "empresaCNPJ": "12.345.678/0001-99",
    "maquinaModelo": "CD-500",
    "maquinaSerial": "SN123456",
    "maquinaFabricante": "Industrias LTDA",
    "maquinaAno": "2020"
  }' -o laudo-teste.pdf

# Abra o arquivo gerado
open laudo-teste.pdf  # macOS
# ou
xdg-open laudo-teste.pdf  # Linux
# ou
start laudo-teste.pdf  # Windows
```

## Teste Completo (com riscos e dispositivos)

```bash
curl -X POST http://localhost:3006/api/test-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "empresaNome": "EletriSeg Engenharia LTDA",
    "empresaCNPJ": "12.345.678/0001-99",
    "empresaEndereco": "Rua das Flores, 123",
    "maquinaNome": "Centro de Dobra CNC-500",
    "maquinaModelo": "CD-500",
    "maquinaSerial": "SN123456789",
    "maquinaFabricante": "Industrias Tecnicas LTDA",
    "maquinaAno": "2020",
    "maquinaSetor": "Producao",
    "maquinaDescricao": "Maquina de corte e dobra de chapas metalicas",
    "dispositivosSeguranca": [
      {"descricao": "Protecao contra esmagamento - Grade de aco"},
      {"descricao": "Parada de emergencia tipo cogumelo"},
      {"descricao": "Sensor de presenca"}
    ],
    "perigos": [
      {
        "cicloVida": "Operacao",
        "numeroPerigo": "1",
        "tarefa": "Alimentacao de chapa",
        "descricaoPerigo": "Esmagamento de maos",
        "loAntes": 0.5, "feAntes": 0.5, "dphAntes": 0.5, "npAntes": 1.0, "hrnAntes": 0.125,
        "loDepois": 0.1, "feDepois": 0.2, "dphDepois": 0.3, "npDepois": 0.5, "hrnDepois": 0.003,
        "medidasEngenharia": "Instalacao de protecao fisica e sensor de presenca"
      },
      {
        "cicloVida": "Manutencao",
        "numeroPerigo": "2",
        "tarefa": "Limpeza e troca de ferramentais",
        "descricaoPerigo": "Contato com arestas vivas",
        "loAntes": 0.3, "feAntes": 0.4, "dphAntes": 0.8, "npAntes": 0.8, "hrnAntes": 0.077,
        "loDepois": 0.05, "feDepois": 0.2, "dphDepois": 0.5, "npDepois": 0.4, "hrnDepois": 0.002,
        "medidasEngenharia": "Procedimento de bloqueio de energia e EPI de protecao"
      }
    ],
    "tipoConlusao": "B",
    "artNumero": "ART2026001234"
  }' -o laudo-completo.pdf
```

## O Que Procurar no PDF

Ao abrir o PDF gerado, você deve ver:

### ✅ Deve estar preenchido:
- [ ] Nome da empresa (EletriSeg Engenharia LTDA)
- [ ] CNPJ (12.345.678/0001-99)
- [ ] Nome da máquina (Centro de Dobra CNC-500)
- [ ] Modelo, série, fabricante, ano
- [ ] Dados dos dispositivos de segurança
- [ ] Análise de riscos (perigos 1 e 2)
- [ ] Data de emissão (data atual)

### ⚠️ Observar:
- Layout da página 1 (capa)
- Posicionamento dos textos
- Se acentos foram removidos corretamente
- Se as tabelas de riscos estão legíveis

## Próximas Fases

### Após validar o PDF:
1. **Criar test user** no Supabase
   - Email: bruno@eletriseg.com
   - Senha: Senha@123

2. **Testar via web**
   - Acessar http://localhost:3006/login
   - Fazer login
   - Ir para /dashboard/teste-pdf
   - Clicar "Gerar PDF Teste"

3. **Formulário completo** (próximas semanas)
   - 7 etapas de preenchimento
   - Upload de fotos
   - Dashboard com listagem

## Troubleshooting

### Erro: "Conexão recusada"
```
Solução: Verificar se o dev server está rodando
npm run dev
```

### Erro: "WinAnsi cannot encode"
```
Solução: Acentos são removidos automaticamente
"São Paulo" → "Sao Paulo"
```

### PDF vazio ou com erro
```
Solução: Verificar dados do JSON
- Todos os campos estão preenchidos?
- Não tem valores null ou undefined?
```

## Documentação Completa

- `TESTING_GUIDE.md` - Guia detalhado de testes
- `STATUS_ATUAL.md` - Status completo do projeto
- `lib/pdf/generator.ts` - Código da geração
- `CLAUDE.md` - Instruções para Claude Code (se houver)

## Precisa de Ajuda?

Se algo não funcionar:
1. Verificar erro no console do dev server
2. Confirmar que porta 3006 está disponível
3. Limpar .next cache: `rm -rf .next`
4. Reiniciar dev server: `npm run dev`

---

**Tudo pronto! Comece pelo teste rápido acima e nos informe dos resultados.** ✅
