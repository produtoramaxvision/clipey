---
title: "Como mostrar os botões do controle em uma gravação de gameplay"
description: "Entenda a captura e a sobreposição de gamepad previstas no Clipey 1.15, os estilos de exibição e como alinhar os comandos ao vídeo."
slug: "overlay-de-gamepad-para-gameplay"
lang: "pt-BR"
translationKey: "overlay-de-gamepad-para-gameplay"
category: "tutoriais"
tags: ["Gravação", "Windows", "Edição com IA"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 5
cover: "/blog/covers/overlay-de-gamepad-para-gameplay.webp"
coverAlt: "Sobreposição de controle de jogo sobre uma gravação"
ogImage: "/blog/og/overlay-de-gamepad-para-gameplay.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15. A captura de gamepad está prevista para Windows. A sobreposição de edição requer uma gravação que contenha eventos do controle.

Em um vídeo de gameplay, mostrar a tela nem sempre explica qual botão foi pressionado. A captura de gamepad e sua sobreposição no editor foram planejadas para exibir os comandos junto com a ação, sem depender de uma câmera apontada ao controle. A captura e a visualização são etapas diferentes: primeiro é preciso gravar os eventos; depois, escolher como eles aparecem.

## Habilite a captura antes de gravar

A opção prevista chama-se **Capture gamepad** (capturar gamepad) nos controles de captura do HUD. Ela fica disponível no Windows e vem desligada por padrão segundo a especificação. Ative-a antes de começar a gravação que deverá mostrar comandos. Caso o amostrador do controle esteja ausente, a tarefa prevê que a gravação continue sem gamepad e que a interface informe a indisponibilidade uma vez; isso não cria os eventos que faltaram.

Faça um trecho curto de teste e pressione alguns botões, um gatilho e os analógicos. A captura armazena o índice do controle, os identificadores dos controles e seus valores; não guarda o tipo ou modelo do dispositivo nos eventos salvos. A lista de entradas contempla layouts Xbox, PlayStation, Switch e genérico. Isso não significa que todos os controles terão rótulos específicos corretamente reconhecidos em qualquer configuração; confira o resultado na prévia.

## Configure a sobreposição no editor

1. Importe a gravação de teste e selecione seu clipe. A seção de sobreposição de gamepad prevista no inspetor fica ao lado dos controles de teclado.
2. Se o inspetor indicar que o ativo não tem dados de gamepad, não basta ligar a sobreposição: grave novamente com **Capture gamepad** habilitado. O estado vazio existe para explicar a falta de eventos, não para simular entradas.
3. Ative **Gamepad overlay** (sobreposição de gamepad) e escolha um dos estilos. **Compact** (compacto) mostra etiquetas dos botões pressionados. **Full** (completo) desenha a silhueta do controle e destaca os botões ativos; com **Show sticks** (mostrar analógicos), inclui também suas posições.
4. Ajuste posição, tamanho, escala e opacidade para que o overlay não cubra elementos importantes do jogo. O atraso de entrada pode deslocar a exibição se os eventos parecerem adiantados ou atrasados em relação ao vídeo.
5. Reproduza a parte de teste, inclusive depois de aparar ou alterar a velocidade. Os eventos devem acompanhar o tempo editado, e toques curtos precisam permanecer legíveis por um mínimo de quadros.
6. Confira uma exportação curta. A sobreposição deve aparecer no mesmo momento que na prévia e respeitar o layout de controle escolhido.

## Escolha o estilo conforme o vídeo

O estilo compacto ocupa menos espaço e é útil quando basta identificar os botões, por exemplo, em uma explicação de combos. O estilo completo ajuda quando a posição do analógico faz parte da demonstração. Se a orientação do movimento importa, habilite a visualização dos analógicos e deixe uma área sem informação de jogo para a silhueta.

Os eventos são ajustados à linha do tempo editada, incluindo cortes e trechos acelerados. Assim, não use o tempo original como referência ao comparar um comando com o vídeo depois de uma edição. Quando o ajuste estiver errado, verifique primeiro se o atraso está configurado e se o trecho foi alterado; não compense um corte incorreto apenas movendo o overlay.

## Dicas

1. Faça uma gravação curta com entradas variadas antes da sessão completa, especialmente se alternar entre mais de um controle.
2. Deixe espaço no enquadramento antes de escolher a posição e o tamanho do overlay.
3. Prefira o estilo compacto quando só os botões importam; use o completo quando os analógicos forem parte da explicação.
4. Se nada aparecer, confira se os dados foram capturados antes de ajustar a aparência.
5. Compare prévia e exportação após aplicar cortes ou mudanças de velocidade.

## Limitações

A captura é específica do Windows e depende do componente de amostragem disponível. Uma gravação sem eventos de gamepad não pode ser preenchida pela sobreposição. A tarefa prevê suporte a estados de botões, gatilhos e analógicos e a layouts Xbox, PlayStation, Switch e genérico; valide rótulos e comportamento com seu dispositivo. A implementação ainda requer confirmação na compilação final.

Leia também [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/) e [desenhar durante a gravação](/blog/desenho-ao-vivo-durante-gravacao/). Consulte os [recursos](/#recursos) e a página de [download](/#download) do Clipey.

## Histórico desta página

- {{RELEASE_DATE}}: published.
