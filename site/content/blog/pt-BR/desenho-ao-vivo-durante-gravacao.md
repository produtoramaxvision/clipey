---
title: "Como fazer anotações na tela durante uma gravação"
description: "Anote uma gravação ativa do Clipey 1.15 com a sobreposição protegida e revise os traços temporizados no editor."
slug: "desenho-ao-vivo-durante-gravacao"
lang: "pt-BR"
translationKey: "desenho-ao-vivo-durante-gravacao"
category: "tutoriais"
tags: ["Gravação", "Edição com IA", "Windows"]
author: "Equipe Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 4
cover: "/blog/covers/desenho-ao-vivo-durante-gravacao.webp"
coverAlt: "Anotação desenhada sobre uma gravação de tela"
ogImage: "/blog/og/desenho-ao-vivo-durante-gravacao.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15. O desenho ao vivo fica disponível quando o Clipey consegue proteger a sobreposição da captura de tela. No Windows, exige Windows 11 22H2 (build 22621) ou posterior; versões anteriores desativam a sobreposição por não oferecerem captura protegida com clique através da janela. No macOS 26, a proteção também é desativada porque janelas protegidas não são exibidas.

Para fazer anotações durante uma gravação no Clipey, use o atalho global configurável **Ctrl+Shift+D** por padrão para abrir a sobreposição de desenho protegida. Escolha **Caneta**, **Marca-texto**, **Seta**, **Retângulo** ou **Elipse**, uma cor e uma das três espessuras. Os traços são armazenados com tempo, excluídos da tela capturada e reproduzidos como uma camada editável sincronizada à linha do tempo.

## Antes de desenhar

Prepare um trecho de teste curto e abra o aplicativo ou a página que será demonstrada. Os traços são armazenados com coordenadas relativas à superfície capturada e tempos relativos ao início da gravação. Assim, o editor os posiciona sobre o vídeo e os mantém alinhados quando o clipe é aparado ou acelerado. Não é uma camada de tinta permanente na tela nem uma anotação solta que ignore a linha do tempo.

O atalho global padrão é **Ctrl+Shift+D** no Windows e **Command+Shift+D** no macOS; ele pode ser alterado nas configurações de atalhos. O modo de desenho só fica disponível durante uma gravação ativa e não pausada. Como o atalho é global, outro aplicativo pode usar a mesma combinação.

## Fluxo

1. Inicie uma gravação e espere a contagem regressiva terminar. Com a captura ativa, use o atalho configurado; **Ctrl+Shift+D** é o padrão.
2. Confirme o modo pelo contorno visível de desenho. Esse indicador é importante: enquanto o modo estiver ligado, os movimentos do ponteiro criam marcas em vez de interagir normalmente com o conteúdo atrás da sobreposição.
3. Na barra flutuante, escolha **Caneta**, **Marca-texto**, **Seta**, **Retângulo** ou **Elipse**. Selecione uma cor e uma das três espessuras do traço; desenhe deliberadamente e solte para terminá-lo.
4. Use **Desfazer** para remover o último traço ou **Limpar** para apagar os desenhos. **Esc** sai do modo de desenho sem encerrar a gravação. O atalho padrão para limpar é **Ctrl+Shift+X** no Windows e **Command+Shift+X** no macOS.
5. Volte ao modo normal para continuar usando o computador e retorne ao desenho quando necessário. Ao parar a gravação, os traços devem ser guardados com seus tempos para que o editor os associe ao trecho correto.
6. Abra a gravação no editor e confira o trecho anotado em **Sobreposição de desenhos**. Use **Mostrar desenhos**, **Desaparecimento gradual** e **Animar desenho** para controlar a reprodução. O inspetor também informa quando nenhum desenho foi gravado. Confira a prévia em movimento e um quadro parado antes de exportar.

## Escolha a ferramenta pelo objetivo

A caneta serve para traços livres e curtos, por exemplo, sublinhar uma palavra. O marca-texto é mais adequado para destacar uma área sem sugerir que ela seja um controle. A seta dá direção a um passo; retângulo e elipse delimitam uma região. Escolha uma espessura legível no tamanho final do vídeo: uma linha que parece fina no monitor pode desaparecer em uma exportação menor.

Se a demonstração exigir precisão, desenhe pausadamente e faça uma gravação de ensaio. As ferramentas registram os traços feitos, mas não transformam uma linha à mão em uma forma geométrica perfeita. Para apontar um elemento pequeno, posicione o início da seta fora dele para não cobrir o alvo.

## O que revisar na edição

Os desenhos são reproduzidos como sobreposição alinhada ao tempo da gravação. Em **Sobreposição de desenhos**, **Mostrar desenhos** controla a visibilidade, **Desaparecimento gradual** define por quanto tempo os traços permanecem antes de sumir e **Animar desenho** reproduz os traços dinamicamente. Confira se uma anotação começa depois do corte pretendido e permanece tempo suficiente para ser lida. Acelerar ou aparar uma região também muda quando o traço aparece, pois ele acompanha o material editado.

Uma gravação sem traços não deve exibir controles que pareçam ativos. Se a seção mostrar estado vazio, volte à gravação e confira se o modo foi realmente acionado e se você desenhou durante um intervalo gravado. A sobreposição não cria anotações retroativas só porque foi ativada no inspetor.

## Dicas

1. Anote apenas o ponto necessário; várias marcas simultâneas disputam a atenção com a interface.
2. Use cor e espessura consistentes dentro de uma mesma explicação para que a pessoa reconheça a mesma categoria de destaque.
3. Deixe o contorno do modo visível ser seu sinal de que o ponteiro está desenhando. Saia com **Esc** para clicar normalmente.
4. Reproduza o resultado depois de aparar ou acelerar o clipe: o tempo das marcas segue a gravação editada.
5. Faça um ensaio descartável antes de uma demonstração importante e confira a captura sem a sobreposição ao vivo.

## Limitações

O Clipey só cria a sobreposição quando consegue aplicar proteção de conteúdo, que mantém os traços fora da tela gravada. Windows 11 22H2 (build 22621) ou posterior atende ao requisito de janela protegida com clique através. No Windows 10 e no Windows 11 21H2 ou anteriores, o app desativa a sobreposição porque a proteção impediria essa janela de funcionar; não grava traços desprotegidos como alternativa. No macOS 26, ela também fica indisponível porque a proteção torna a janela invisível. Em outros sistemas, o Clipey exige suporte à captura de tela protegida. O desenho fica disponível durante uma gravação ativa e não pausada; a sobreposição fecha quando a gravação para. A ferramenta é para marcações temporizadas, não para desenhar na área de trabalho fora de uma gravação.

Para contexto sobre o modo de cursor, leia [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/) e [efeitos de mouse](/blog/efeitos-de-mouse-cliques-halo-spotlight/). Veja os [recursos](/#recursos) do Clipey e acompanhe a disponibilidade na página de [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
