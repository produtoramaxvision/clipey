---
title: "Como fazer anotações na tela durante uma gravação"
description: "Veja como o desenho ao vivo deve funcionar no Clipey 1.15, quais ferramentas estão previstas e como conferir os traços na edição."
slug: "desenho-ao-vivo-durante-gravacao"
lang: "pt-BR"
translationKey: "desenho-ao-vivo-durante-gravacao"
category: "tutoriais"
tags: ["Gravação", "Edição com IA", "Windows"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 4
cover: "/blog/covers/desenho-ao-vivo-durante-gravacao.webp"
coverAlt: "Anotação desenhada sobre uma gravação de tela"
ogImage: "/blog/og/desenho-ao-vivo-durante-gravacao.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15. O desenho ao vivo é planejado para gravações no Windows; a exclusão dos traços da captura depende do método de captura do Windows e aguarda validação final.

Para fazer anotações na tela durante uma gravação no Clipey, o fluxo previsto utiliza o atalho global Ctrl+Shift+D para abrir a barra de desenho com caneta, marca-texto, setas e formas. As anotações são capturadas como dados vetoriais temporizados fora dos pixels do vídeo, permitindo que apareçam sincronizadas e editáveis na linha do tempo. Como esse recurso depende de proteção de captura no Windows e ainda aguarda validação final, utilize este guia como referência para a funcionalidade planejada.

## Antes de desenhar

Prepare um trecho de teste curto e abra o aplicativo ou a página que será demonstrada. A anotação é armazenada como vetor com coordenadas normalizadas em relação à superfície capturada e tempo relativo ao início da gravação. Isso permite que a edição reposicione os traços sobre o vídeo e os acompanhe quando o clipe for aparado ou acelerado. Não é uma camada de tinta permanente na tela nem uma anotação solta que ignore a linha do tempo.

O atalho global previsto para entrar no modo de desenho é **Ctrl+Shift+D**. A tarefa prevê que o modo só esteja disponível durante uma gravação ativa, não durante uma pausa. O atalho poderá ser configurado junto das opções de atalhos. Como é global, confira se outro aplicativo já usa a mesma combinação antes de adotá-la.

## Fluxo previsto

1. Inicie uma gravação e espere a contagem regressiva terminar. Com a captura ativa, use o atalho de desenho configurado; **Ctrl+Shift+D** é o padrão previsto.
2. Confirme o modo pelo contorno visível de desenho. Esse indicador é importante: enquanto o modo estiver ligado, os movimentos do ponteiro criam marcas em vez de interagir normalmente com o conteúdo atrás da sobreposição.
3. Na barra flutuante, escolha uma ferramenta: caneta, marca-texto, seta, retângulo ou elipse. Em seguida, selecione uma das seis cores da marca e uma das três espessuras previstas. Faça o traço deliberadamente e solte para terminá-lo.
4. Use desfazer para remover o último traço. Use limpar para remover o conjunto atual quando quiser recomeçar; a especificação prevê uma segunda tecla para essa ação. **Esc** sai do modo de desenho sem encerrar a gravação.
5. Volte ao modo normal para continuar usando o computador e retorne ao desenho quando necessário. Ao parar a gravação, os traços devem ser guardados com seus tempos para que o editor os associe ao trecho correto.
6. Abra a gravação no editor e confira o trecho anotado. A seção de anotações e desenhos prevista no inspetor deve permitir controlar a sobreposição e indicar quando o ativo não contém desenhos. Confira a prévia em movimento e também um quadro parado antes de exportar.

## Escolha a ferramenta pelo objetivo

A caneta serve para traços livres e curtos, por exemplo, sublinhar uma palavra. O marca-texto é mais adequado para destacar uma área sem sugerir que ela seja um controle. A seta dá direção a um passo; retângulo e elipse delimitam uma região. Escolha uma espessura legível no tamanho final do vídeo: uma linha que parece fina no monitor pode desaparecer em uma exportação menor.

Se a demonstração exigir precisão, desenhe pausadamente e faça uma gravação de ensaio. O sistema previsto suaviza os traços, mas não transforma uma linha feita à mão em uma forma geométrica perfeita. Para apontar um elemento pequeno, posicione o início da seta fora dele para não cobrir o próprio alvo.

## O que revisar na edição

Os desenhos devem ser reproduzidos como sobreposição vetorial rasterizada, alinhada ao tempo da gravação. A sobreposição de desenhos deverá controlar se a camada aparece, o esmaecimento e a animação de revelação do traço. Confira se uma anotação começa depois do corte pretendido e se permanece tempo suficiente para a pessoa ler. Acelerar ou aparar uma região também muda o tempo em que o traço aparece, pois ele acompanha o material editado.

Uma gravação sem traços não deve exibir controles que pareçam ativos. Se a seção mostrar estado vazio, volte à gravação e confira se o modo foi realmente acionado e se você desenhou durante um intervalo gravado. A sobreposição não cria anotações retroativas só porque foi ativada no inspetor.

## Dicas

1. Anote apenas o ponto necessário; várias marcas simultâneas disputam a atenção com a interface.
2. Use cor e espessura consistentes dentro de uma mesma explicação para que a pessoa reconheça a mesma categoria de destaque.
3. Deixe o contorno do modo visível ser seu sinal de que o ponteiro está desenhando. Saia com **Esc** para clicar normalmente.
4. Reproduza o resultado depois de aparar ou acelerar o clipe: o tempo das marcas segue a gravação editada.
5. Faça um ensaio descartável antes de uma demonstração importante e confira a captura sem a sobreposição ao vivo.

## Limitações

Este fluxo descreve a implementação prevista para o Clipey 1.15 e requer confirmação na compilação final. A exclusão dos traços do vídeo capturado depende da proteção de conteúdo da captura do Windows; não presuma o mesmo comportamento em outras plataformas. O modo só deve funcionar enquanto a gravação está ativa e deve ser fechado ao parar ou sair do aplicativo. A ferramenta é para marcações temporizadas, não para desenhar sobre a área de trabalho fora de uma gravação.

Para contexto sobre o modo de cursor, leia [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/) e [efeitos de mouse](/blog/efeitos-de-mouse-cliques-halo-spotlight/). Veja os [recursos](/#recursos) do Clipey e acompanhe a disponibilidade na página de [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
