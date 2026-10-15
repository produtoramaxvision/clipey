---
title: "Como gravar a tela no Windows com cursor e cliques"
description: "Escolha o modo de cursor no HUD, planeje cliques laterais e roda, e confira os eventos na edição antes de exportar uma demonstração."
slug: "gravar-tela-windows-com-cursor-e-cliques"
lang: "pt-BR"
translationKey: "gravar-tela-windows-com-cursor-e-cliques"
category: "tutoriais"
tags: ["Gravação", "Windows", "Edição com IA"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 2
cover: "/blog/covers/gravar-tela-windows-com-cursor-e-cliques.webp"
coverAlt: "Capa do tutorial de gravação de tela no Windows"
ogImage: "/blog/og/gravar-tela-windows-com-cursor-e-cliques.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 no Windows. A captura de botões laterais e roda descrita neste artigo depende do caminho de gravação do Windows.

Para gravar a tela no Windows com cursor e cliques legíveis, abra o controle de gravação do Clipey e selecione o modo Cursor editável no HUD. Essa opção registra a telemetria do ponteiro, cliques e eventos da roda em uma trilha separada dos pixels do vídeo. Durante a edição, você pode destacar botões individuais, aplicar autozoom e ajustar o estilo do cursor sem alterar o conteúdo original gravado.

## 1. Escolha como o cursor será gravado

No HUD, use o botão do cursor para alternar entre **Cursor editável** e **Cursor do sistema**. **Cursor editável** grava dados do ponteiro separadamente. No editor, isso permite reestilizá-lo e usar o movimento no autozoom. **Cursor do sistema** deixa o cursor do Windows nos pixels do vídeo; não será possível separá-lo depois para mudar sua aparência ou aplicar autozoom.

Para uma demonstração de software, escolha o modo editável se quiser ajustar tamanho e destaque durante a edição. Se a posição exata do cursor não for importante, o modo do sistema pode bastar. Essa escolha é feita antes da gravação, então faça um teste curto quando não tiver certeza.

## 2. Prepare uma tomada que seja fácil de acompanhar

Feche janelas que não fazem parte da explicação e abra a tela inicial da tarefa. Mova o ponteiro deliberadamente, sem atravessar áreas irrelevantes. Uma pausa curta antes de cada clique ajuda quem assiste a perceber a mudança de estado. Isso é uma recomendação de apresentação, não uma configuração automática do Clipey.

Se o roteiro exigir menu de contexto, botão do meio ou rolagem, anote esses momentos para conferir depois. A captura no Windows registra interações laterais e eventos da roda do mouse. O botão esquerdo permanece separado dos botões direito e do meio para as funções de bounce, impacto e autozoom já existentes.

## 3. Faça uma gravação de teste

1. Abra o Clipey e confira a fonte de tela na janela de gravação.
2. Selecione o modo de cursor no controle correspondente do HUD. Confirme a dica exibida para saber se está em **Cursor editável** ou **Cursor do sistema**.
3. Inicie a gravação e reproduza uma sequência curta: movimento, clique esquerdo, clique direito, clique do meio e rolagem, se esses gestos fizerem parte do tutorial.
4. Pare e abra a gravação no editor. Verifique se o cursor acompanha o movimento e se os eventos pretendidos aparecem nos momentos certos.
5. Só então grave o conteúdo final. Se o cursor estiver embutido e você precisar de efeitos editáveis, refaça a tomada com **Cursor editável**.

O teste também revela se a explicação depende de um clique lateral. Não confie apenas no som do clique: o som e os dados visuais são aspectos distintos da gravação.

## 4. Use os eventos na edição sem confundir seus papéis

Os cliques laterais são destinados aos novos efeitos visuais por botão. Eles não devem disparar o bounce, o impacto visual ou o autozoom que respondem ao clique esquerdo. A roda tem seus próprios dados e pode alimentar o indicador de rolagem; ela não equivale a uma sequência de cliques.

Se estiver criando um tutorial com menus, confira primeiro se a interação aparece. Depois escolha se precisa de um destaque no cursor, um efeito por clique ou um indicador de rolagem. Vários sinais ao mesmo tempo podem cobrir o texto do aplicativo. Para entender os controles de estilo, siga para [efeitos de mouse](/blog/efeitos-de-mouse-cliques-halo-spotlight/). Para conhecer os demais recursos planejados, consulte [as novidades do Clipey 1.15](/blog/clipey-1-15-novidades/).

## Dicas

- Prefira **Cursor editável** quando a posição do ponteiro for parte da explicação e você quiser alterá-la depois.
- Mova o cursor até o controle, faça uma pausa breve e só então clique.
- Role em etapas que correspondam ao que você está narrando, em vez de percorrer a página inteira de uma vez.
- Confira a gravação em reprodução e também pausada: eventos rápidos podem passar despercebidos em velocidade normal.
- Se a gravação não registrar os dados esperados, repita o teste antes de investir tempo na edição.

## Limitações

O cursor do sistema é parte da imagem capturada e não pode ser editado separadamente. A captura de botões laterais e roda é específica do Windows. O modo editável depende de telemetria do cursor; ele não recupera eventos de uma gravação antiga feita sem esses dados.

## Perguntas frequentes

### Posso transformar o cursor do sistema em cursor editável após a gravação?
Não. O cursor do sistema fica fundido diretamente aos pixels do vídeo capturado, tornando impossível separar ou reestilizar o ponteiro após o término da gravação.

### O Clipey registra cliques do botão direito e da roda do mouse?
Sim. No Windows, o Clipey captura eventos de clique esquerdo, direito, botão central e rolagem da roda quando gravado com o cursor editável.

### A sobreposição de teclas registra tudo o que eu digito no teclado?
Não. A captura opcional de teclas no Windows filtra digitação comum e foca em atalhos e teclas de navegação, protegendo senhas e textos comuns.

Para começar um novo projeto, consulte a página de [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
