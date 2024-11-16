# Sistema de Análise de Preços de Combustíveis

Este projeto nasceu como parte de um desafio acadêmico e, apesar de parecer simples, representou um enorme aprendizado. Como iniciante, cada etapa concluída foi uma grande vitória, e as duas noites em claro valeram a pena ao ver o projeto funcionando. 

Com um prazo de 30 dias, optei por trabalhar sozinho em vez de formar um grupo. Foi um desafio e tanto, especialmente conciliando trabalho e estudos. Ainda há funcionalidades a serem adicionadas e ajustes a serem feitos, mas o projeto já está funcional.

---

## Tecnologias Utilizadas

### Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn
- Node.js

### Backend:
- SQL Server
- Azure
- JavaScript
- Node.js

### Deploy:
- Render

---

## O Desafio

O objetivo era criar um **sistema de banco de dados relacional** para armazenar e disponibilizar informações sobre os preços dos combustíveis da região em um período de 30 dias. 

### Etapas do Projeto:

#### **Fase 1 - Projeto Conceitual:**
- Elaboração de entidades, relacionamentos, cardinalidades, restrições e chaves primárias.

#### **Fase 2 - Projeto Lógico e Físico:**
- Conversão do modelo conceitual para o modelo lógico e implementação física no **SQL Server**.

#### **Fase 3 - Desenvolvimento:**
- Escolha entre criar um App ou Site (relacionado à matéria de Frontend) ou disponibilizar gráficos e planilhas com os resultados.
- **Opção escolhida:** desenvolver um **site** como interface para visualização e análise dos dados, adiantando a matéria de Frontend.

---

## Requisitos

- **Coleta de dados:**
  - Informações de pelo menos **6 postos de gasolina**.
  - Cobertura dos seguintes combustíveis:
    1. Gasolina
    2. Gasolina Aditivada
    3. Etanol
    4. Diesel
  - **10 coletas de preços** em datas diferentes para cada posto.
  - Dados de **pelo menos dois bairros diferentes**.

- **Banco de Dados:**
  - Estruturas normalizadas até a **3ª Forma Normal (3FN)**.

---

## Funcionalidades do Banco de Dados

Para facilitar a extração de informações, foram criadas consultas específicas:

1. **Menor Preço:**
   - Store procedure que retorna o menor preço de cada combustível.
   - Possibilidade de filtrar por bairro e tipo de combustível ou visualizar todos os dados.

2. **Preço Médio:**
   - Consulta para calcular o preço médio geral ou por bairro.
   - Opção de definir um período específico.

3. **Relatório por Posto:**
   - Consulta que lista o nome de cada posto, bairro e o preço médio de cada combustível.
   - Filtros por data inicial e final definidos pelo usuário.

---

## Status do Projeto

- [x] Sistema funcional.
- [ ] Adicionar mais funcionalidades.
- [ ] Realizar ajustes e melhorias na interface e backend.

---

## Conclusão

Este projeto foi uma experiência desafiadora e recompensadora. Ele me proporcionou uma visão prática sobre o desenvolvimento de sistemas e me ajudou a consolidar conhecimentos em **banco de dados, frontend e backend**. Ainda há muito a melhorar, mas fico feliz com o resultado alcançado até aqui.
