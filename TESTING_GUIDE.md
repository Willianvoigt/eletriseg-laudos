# Guia de Testes - Gerador de Laudos NR-12

## Status Atual

✅ **PDF Generation Working!**
- Sistema de geração de PDFs funcional
- Suporte a dados de empresa, máquina, dispositivos de segurança e análise de riscos HRN
- Tratamento de caracteres especiais em português
- Integração com template original

## Endpoints Disponíveis

### 1. Teste Público (sem autenticação)
```
POST /api/test-pdf
Content-Type: application/json
```

**Exemplo de Request:**
```bash
curl -X POST http://localhost:3006/api/test-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "empresaNome": "EletriSeg Engenharia LTDA",
    "empresaCNPJ": "12.345.678/0001-99",
    "empresaEndereco": "Rua das Flores, 123",
    "empresaDataAbertura": "01/01/2020",
    "empresaCNAE": "7112900",
    "maquinaNome": "Centro de Dobra",
    "maquinaModelo": "CD-500",
    "maquinaSerial": "SN123456",
    "maquinaFabricante": "Industrias LTDA",
    "maquinaAno": "2020",
    "maquinaSetor": "Producao",
    "maquinaDescricao": "Maquina de corte e dobra",
    "dispositivosSeguranca": [
      {
        "descricao": "Protecao contra esmagamento"
      }
    ],
    "perigos": [
      {
        "cicloVida": "Operacao",
        "numeroPerigo": "1",
        "tarefa": "Alimentacao",
        "descricaoPerigo": "Esmagamento de maos",
        "loAntes": 0.5,
        "feAntes": 0.5,
        "dphAntes": 0.5,
        "npAntes": 1.0,
        "hrnAntes": 0.125,
        "loDepois": 0.1,
        "feDepois": 0.2,
        "dphDepois": 0.3,
        "npDepois": 0.5,
        "hrnDepois": 0.003,
        "medidasEngenharia": "Instalacao de protecao"
      }
    ],
    "tipoConlusao": "B"
  }'
```

### 2. Endpoint Principal (requer autenticação Supabase)
```
POST /api/laudos
Authorization: Bearer <token>
Content-Type: application/json
```

Mesma estrutura de dados do `/api/test-pdf`.

## Estrutura de Dados

### LaudoData
```typescript
{
  // Empresa
  empresaNome: string
  empresaCNPJ: string
  empresaEndereco: string
  empresaDataAbertura: string
  empresaCNAE: string

  // Máquina
  maquinaNome: string
  maquinaModelo: string
  maquinaSerial: string
  maquinaFabricante: string
  maquinaAno: string
  maquinaSetor: string
  maquinaDescricao: string

  // Fotos (URLs - opcional)
  fotoPlacar?: string
  fotoVisaoGeral?: string

  // Dispositivos de Segurança
  dispositivosSeguranca: Array<{
    descricao: string
    foto?: string
  }>

  // Análise de Riscos (HRN)
  perigos: Array<{
    cicloVida: string
    numeroPerigo: string
    tarefa: string
    descricaoPerigo: string
    loAntes: number (0-1)
    feAntes: number (0-1)
    dphAntes: number (0-1)
    npAntes: number (0-1)
    hrnAntes: number (calculado)
    loDepois: number (0-1)
    feDepois: number (0-1)
    dphDepois: number (0-1)
    npDepois: number (0-1)
    hrnDepois: number (calculado)
    medidasEngenharia: string
  }>

  // Conclusão
  tipoConlusao: 'A' | 'B'
  artNumero?: string
}
```

## Recursos Implementados

### ✅ Concluído
- [x] Geração de PDF a partir do template original
- [x] Preenchimento de dados da empresa
- [x] Preenchimento de dados da máquina
- [x] Lista de dispositivos de segurança
- [x] Análise de riscos com cálculo HRN
- [x] Tratamento de caracteres especiais (acentos, ç)
- [x] Endpoint público para testes
- [x] Estrutura de código modular

### ⚠️ Em Desenvolvimento
- [ ] Integração com fotos (URLs do Supabase Storage)
- [ ] Autenticação Supabase (criar test user)
- [ ] Formulário web de 7 etapas
- [ ] Dashboard com lista de laudos
- [ ] Edição e duplicação de laudos

### ⏳ Próximas Fases
- [ ] Análise detalhada do template original
- [ ] Replicação exata do layout das páginas internas
- [ ] Suporte para múltiplos templates (Centro de dobra, Laser, etc)
- [ ] Otimização de fontes e espaçamento
- [ ] Testes com dados reais do Bruno

## Como Testar

### Teste Rápido no Terminal
```bash
# Testar geração básica
curl -X POST http://localhost:3006/api/test-pdf \
  -H "Content-Type: application/json" \
  -d '{"empresaNome":"Teste LTDA","maquinaNome":"Centro de Dobra","empresaCNPJ":"12.345.678/0001-99"}' \
  -o ~/Downloads/laudo-teste.pdf
```

### Próximos Passos
1. ✅ PDF generation backend - FEITO
2. 🔄 Criar test user no Supabase
3. 🔄 Teste end-to-end com formulário completo
4. 🔄 Comparar com PDFs originais e ajustar layout
5. 🔄 Deploy para produção

## Notas Importantes

- **Caracteres especiais**: Devido à limitação do WinAnsi, acentos são convertidos (á → a, é → e)
- **Tamanho de arquivo**: PDFs base ~2.1 MB (contém template original)
- **Port**: Servidor rodando em 3006 (3000 estava em uso)
- **Autenticação**: Implementar teste com credenciais reais

## Arquivos-Chave

- `lib/pdf/generator.ts` - Gerador principal de PDF
- `app/api/test-pdf/route.ts` - Endpoint público para testes
- `app/api/laudos/route.ts` - Endpoint principal (com autenticação)
- `lib/pdf/sanitize.ts` - Sanitização de caracteres
