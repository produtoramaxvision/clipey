---
title: "Como mostrar comandos do controle no gameplay"
description: "Entenda a captura e a sobreposição de gamepad previstas no Clipey 1.15, os estilos de exibição e como alinhar os comandos ao vídeo."
slug: "overlay-de-gamepad-para-gameplay"
lang: "pt-BR"
translationKey: "overlay-de-gamepad-para-gameplay"
category: "tutoriais"
tags: ["Gravação", "Windows", "Edição com IA"]
author: "Equipe Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 5
cover: "/blog/covers/overlay-de-gamepad-para-gameplay.webp"
coverAlt: "Sobreposição de controle de jogo sobre uma gravação"
ogImage: "/blog/og/overlay-de-gamepad-para-gameplay.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 no Windows. A sobreposição de edição requer uma gravação que contenha eventos do controle.

Para mostrar comandos do controle no gameplay, ative a opção Capturar controle no HUD do Clipey para Windows antes de iniciar a gravação. No editor, abra o painel Sobreposição de controle e escolha entre o estilo Compacto, que exibe etiquetas dos botões pressionados, ou Completo, que desenha a silhueta do controle com os analógicos. Os comandos gravados acompanham automaticamente os cortes e ajustes de velocidade da sua linha do tempo.

## Habilite a captura antes de gravar

A opção de gravação chama-se **Capturar controle** nos controles de captura do HUD. Ela fica disponível no Windows e vem desativada por padrão. Ative-a antes de começar a gravação para registrar os comandos. Caso o amostrador do controle não esteja disponível no sistema, o Clipey exibe um aviso e continua a gravação de tela sem telemetria de gamepad.

Faça um trecho curto de teste e pressione alguns botões, gatilhos e os analógicos. A captura armazena o índice do controle, os identificadores dos comandos e seus valores de intensidade. A lista de entradas contempla layouts Xbox, PlayStation, Switch e Genérico. Você pode selecionar o layout correspondente no editor para que as etiquetas e os botões reflitam o formato do seu controle.

## Configure a sobreposição no editor

1. Importe a gravação de teste e selecione seu clipe. A seção **Sobreposição de controle** no painel de edição fica junto aos controles de interação.
2. Se o painel exibir a mensagem "Grave com Capturar controle ativado", isso indica ausência de telemetria; faça uma nova gravação com a opção habilitada no HUD. O estado vazio existe para orientar a configuração, não para inventar eventos inexistentes.
3. Marque **Mostrar controle** e escolha o estilo visual. O estilo **Compacto** mostra etiquetas dos botões pressionados em formato de pílulas. O estilo **Completo** desenha a silhueta do controle e destaca os botões ativos; com **Mostrar analógicos**, inclui também as posições das alavancas.
4. Ajuste **Posição**, **Tamanho**, limites de **Limiar dos gatilhos** e zona morta dos analógicos para evitar acionamentos acidentais. O controle de **Atraso de entrada** permite compensar qualquer diferença milimétrica de sincronia com a imagem do jogo.
5. Reproduza a gravação de teste após aplicar cortes ou alterar a velocidade. Os eventos acompanham a linha do tempo editada, e a opção **Quadros mín. de toque** mantém toques muito rápidos visíveis na tela pelo tempo necessário para leitura.
6. Confira uma exportação curta para validar o resultado final na mesma posição e escala escolhidas.

## Escolha o estilo conforme o vídeo

O estilo compacto ocupa menos espaço e é ideal quando basta identificar comandos rápidos, como sequências de combate ou atalhos em simuladores. O estilo completo ajuda quando a inclinação ou a direção dos analógicos é indispensável para explicar uma manobra. Nesse caso, posicione a silhueta em um canto da tela que não oculte medidores vitais do jogo.

Os eventos gravados são sincronizados com a linha do tempo editada, acompanhando cortes e trechos acelerados. Se você remover uma pausa na timeline, a exibição dos comandos salta na mesma medida, mantendo a coerência entre o que o espectador vê na tela e o que ouve na narração.

## Dicas

1. Faça uma gravação curta com entradas variadas antes da sessão completa, especialmente se alternar entre mais de um controle.
2. Deixe espaço no enquadramento antes de escolher a posição e o tamanho da sobreposição.
3. Prefira o estilo compacto quando só os botões importam; use o completo quando os analógicos forem parte da explicação.
4. Se nada aparecer, confira se os dados foram gravados antes de ajustar a aparência.
5. Compare prévia e exportação após aplicar cortes ou mudanças de velocidade.

## Limitações

A amostragem de controle é específica do Windows. Uma gravação feita sem a opção Capturar controle ativa não contém telemetria de botões e não pode ser preenchida retroativamente pela sobreposição. O sistema suporta botões, gatilhos analógicos e alavancas nos padrões Xbox, PlayStation, Switch e Genérico.

Leia também [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/) e [desenhar durante a gravação](/blog/desenho-ao-vivo-durante-gravacao/). Consulte os [recursos](/#recursos) e a página de [download](/#download) do Clipey.

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
