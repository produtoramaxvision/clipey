---
title: "Como destacar cliques, rolagem e cursor no vídeo"
description: "Configure efeitos visuais para cliques por botão, rolagem, arraste, halo e spotlight; entenda o que cada ajuste muda na gravação editada."
slug: "efeitos-de-mouse-cliques-halo-spotlight"
lang: "pt-BR"
translationKey: "efeitos-de-mouse-cliques-halo-spotlight"
category: "tutoriais"
tags: ["Edição com IA", "Gravação", "Windows"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 3
cover: "/blog/covers/efeitos-de-mouse-cliques-halo-spotlight.webp"
coverAlt: "Capa sobre efeitos de cursor e cliques"
ogImage: "/blog/og/efeitos-de-mouse-cliques-halo-spotlight.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15. Captura de cliques laterais e rolagem é voltada ao Windows; os efeitos descritos aguardam validação final.

Em uma gravação de tela, um clique pode ser difícil de localizar e um scroll rápido pode passar despercebido. Os efeitos de mouse planejados para 1.15 ajudam a marcar essas ações sem desenhar cada destaque manualmente. O melhor resultado costuma vir de poucos sinais consistentes, não de todas as opções ligadas ao mesmo tempo.

## O que cada efeito comunica

Os estilos de clique são **ripple**, **rings** e **pulse**. A forma também distingue o botão: clique esquerdo usa um anel, direito usa anel duplo e botão do meio usa um anel quadrado. A cor pode ser configurada por botão. Assim, um tutorial pode mostrar o clique primário e ainda deixar claro quando abriu um menu contextual.

O indicador de rolagem representa a direção do movimento da roda. O rastro de arraste acompanha o caminho entre pressionar e soltar o botão e desaparece gradualmente. O halo é um disco suave em torno do ponteiro. O spotlight escurece o restante do quadro e preserva uma área visível ao redor do cursor. São recursos com funções diferentes: use o indicador para gesto, halo para localização contínua e spotlight para guiar a atenção a uma região.

## Configure em etapas

1. Abra as configurações do cursor no painel de edição e localize o grupo **Mouse effects**. O rótulo do grupo pode variar na tradução final.
2. Ative a opção principal. As opções secundárias ficam desabilitadas quando o grupo está desligado, em vez de desaparecer; isso deixa claro por que não podem ser ajustadas.
3. Escolha o estilo de clique e defina as cores de esquerdo, direito e meio. Prefira cores distinguíveis entre si e do fundo da gravação.
4. Ajuste **Size** e **Duration**. A duração controla quanto tempo o efeito de clique permanece; o tamanho altera a escala, não a posição do cursor.
5. Ative o indicador de rolagem se o gesto de roda for relevante. Ligue o rastro e ajuste seu fade quando o caminho do arraste fizer parte da explicação.
6. Ative o halo ou o spotlight individualmente. Ajuste raio e opacidade do halo; para spotlight, ajuste raio e intensidade do escurecimento.
7. Ative **Reduced motion** se preferir reduzir o deslocamento animado. O efeito de clique passa a usar uma transição breve de opacidade.
8. Revise o resultado em trechos com clique, rolagem e arraste. Volte ao grupo para reduzir qualquer efeito que encubra texto ou controles.

Os nomes acima refletem a especificação do painel e podem aparecer traduzidos na versão instalada. Não é necessário ligar todos os efeitos para que o clique continue gravado.

## Uma receita para tutoriais de interface

Para ensinar uma sequência de menus, comece com **rings** e cores de botão separadas. Deixe o halo desligado até verificar se o cursor já é fácil de localizar. Se a página exigir rolagem, acrescente o indicador só nesse material. Use spotlight quando houver uma área concorrente na tela, e mantenha o escurecimento leve o bastante para ler as regiões fora do foco.

Para uma demonstração de desenho ou edição gráfica, um rastro pode explicar o caminho do arraste. Um halo permanente também pode distrair quando há muitos movimentos pequenos. Compare uma versão com e sem halo antes de exportar.

## Dicas

- Teste cada efeito isolado num trecho curto; isso ajuda a saber qual opção realmente melhorou a leitura.
- Diferencie as cores por função e confirme o contraste sobre a tela gravada.
- Use duração curta em interações frequentes para não acumular círculos na tela.
- Spotlight e halo podem coexistir, mas ambos centralizam atenção no cursor; reduza intensidade se o conteúdo perder contraste.
- Movimento reduzido altera o estilo de animação, não a quantidade de dados capturados.

## Limitações

Os efeitos dependem dos eventos disponíveis na gravação. Cliques laterais e roda têm captura voltada ao Windows e, para 1.15, estão pendentes de validação final. Botões direito e do meio alimentam os efeitos visuais, mas não devem acionar o bounce, o impacto nem o autozoom, que continuam associados ao clique esquerdo. O rastro também depende de dados de movimento entre pressionar e soltar; não reconstrói um arraste ausente.

Veja como [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/) e conheça [as novidades do Clipey 1.15](/blog/clipey-1-15-novidades/). Para obter o aplicativo, visite [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: published.
