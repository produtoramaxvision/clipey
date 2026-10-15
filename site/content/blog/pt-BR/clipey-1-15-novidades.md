---
title: "Clipey 1.15: novidades em gravação, edição e exportação"
description: "Conheça as mudanças previstas para Clipey 1.15, saiba onde encontrá-las e veja quais recursos dependem de Windows ou ainda aguardam validação."
slug: "clipey-1-15-novidades"
lang: "pt-BR"
translationKey: "clipey-1-15-novidades"
category: "novidades"
tags: ["Gravação", "Edição com IA", "Exportação"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: true
order: 1
cover: "/blog/covers/clipey-1-15-novidades.webp"
coverAlt: "Capa das novidades do Clipey 1.15"
ogImage: "/blog/og/clipey-1-15-novidades.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15. A gravação principal é para Windows; alguns recursos novos são específicos dessa plataforma ou ainda dependem de validação final.

Uma atualização traz mais valor quando você sabe qual controle usar e quando um recurso ainda depende do seu sistema. Este guia organiza as principais novidades do 1.15 por tarefa. Antes de começar, confira a versão instalada e salve uma cópia do projeto se for experimentar mudanças no editor.

## Comece pela gravação

O seletor do cursor no HUD permite alternar entre **Editable cursor** e **System cursor**. No modo editável, o cursor é gravado separadamente para poder receber estilo e participar do autozoom no editor. No modo do sistema, o cursor real já aparece no vídeo e não pode ser reestilizado nem usado pelo autozoom. Para uma demonstração com cliques legíveis, o modo editável é o ponto de partida mais flexível.

No Windows, a gravação de interações deve incluir cliques laterais e roda do mouse, além do movimento. A intenção é usar os botões direito e do meio nos novos efeitos visuais, sem alterar o bounce, o impacto ou o autozoom existentes, que continuam ligados ao clique esquerdo. Esses dados tornam-se úteis na edição; não confunda indicação visual com um novo comando de edição.

## Edite com mais contexto

O editor recebe recursos para destacar ações sem redesenhar a gravação original. Os efeitos de mouse combinam formas de clique por botão, indicador de rolagem, rastro durante arraste, halo e spotlight. Uma configuração de movimento reduzido troca a animação por uma mudança breve de opacidade. Ajuste só os elementos necessários: halo e spotlight podem competir com o conteúdo se ficarem fortes demais.

O desenho ao vivo foi pensado para anotações rápidas enquanto a gravação acontece: caneta, marca-texto, seta, retângulo e elipse, com cor e espessura escolhidas numa barra flutuante. Os traços devem permanecer fora do vídeo capturado e ser armazenados como vetores para reaparecer no editor e na exportação. Isso não transforma o recurso em um quadro de desenho permanente; os traços acompanham os tempos da gravação.

Para gameplay, a sobreposição de controle mostra botões pressionados como etiquetas ou como um controle visual, conforme o estilo escolhido. A visualização completa também pode mostrar a posição dos analógicos. Os eventos seguem o tempo editado do vídeo, então aparas e trechos acelerados afetam quando a sobreposição aparece.

## Aproveite os ajustes da timeline

Na timeline, segurar **Shift** durante o arraste ou o ajuste de uma apara desativa o encaixe temporariamente, sem mudar uma preferência permanente. O menu de contexto reúne ações que já existem para clipes e pílulas de modificador, com atalhos; ele também pode ser aberto pelo teclado. Marcadores nomeados ajudam a voltar a pontos do projeto, e um duplo clique no divisor restaura seu tamanho padrão.

Esses controles são complementares. Use Shift quando o encaixe estiver atrapalhando um ajuste pontual; use marcadores para localizar momentos que você revisará mais tarde. Não use um marcador como substituto de uma apara: ele identifica uma posição e não remove conteúdo.

## Um fluxo de teste antes do projeto final

1. Inicie uma gravação curta no Windows e escolha o modo de cursor adequado. Se a intenção for reposicionar ou destacar o ponteiro depois, escolha **Editable cursor**.
2. Faça alguns cliques e movimentos de roda, e anote se pretende desenhar ou mostrar um controle de jogo. Para desenho ao vivo, entre no modo com o atalho configurado durante a gravação; a especificação prevê **Ctrl+Shift+D** como padrão, **Esc** para sair e uma segunda tecla para limpar.
3. Abra a gravação no editor. Confira se os eventos aparecem nos trechos corretos antes de ativar várias camadas de overlay. Ajuste o atraso de entrada ou as opções visuais apenas se perceber um desencontro.
4. Na timeline, teste uma apara segurando Shift e adicione um marcador ao playhead com **M**. Renomeie o marcador para que a lista continue útil em projetos com várias revisões.
5. Exporte um trecho de conferência e observe a leitura em movimento. Assim fica mais fácil detectar efeitos que escondam texto ou desenho que pareça fora de sincronia.

Os atalhos e controles descritos para as funções em desenvolvimento são os previstos nas especificações e podem ser ajustados antes da versão estável. Faça esse teste com conteúdo descartável, sem depender de um comando que ainda não esteja disponível na sua compilação.

## O que muda entre os modos de cursor?

No modo editável, o cursor pode ser composto na edição a partir de dados gravados à parte. No modo do sistema, o ponteiro já está nos pixels da captura: o editor não consegue separá-lo do restante da imagem. Se houver dúvida, faça duas gravações de poucos segundos e compare o que aparece no editor, em vez de decidir só pela aparência do HUD.

## E se um overlay não mostrar nada?

Uma configuração visual precisa dos eventos correspondentes. O overlay de gamepad, por exemplo, não inventa entradas que não foram gravadas; a especificação prevê um estado vazio quando o arquivo não tem dados do controle e uma indicação para gravar com a captura habilitada. Da mesma forma, dados de cursor separado dependem do modo de captura e de uma gravação com movimento ou interação. Primeiro confira a origem dos dados, depois o posicionamento e o estilo.

## Outros caminhos úteis

O Clipey 1.15 também reúne mudanças no fluxo de edição assistida, voz, legendas, importação e publicação. Para os detalhes práticos, continue com [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/), [efeitos de mouse](/blog/efeitos-de-mouse-cliques-halo-spotlight/) e [atalhos na timeline](/blog/atalhos-e-produtividade-na-timeline/). Veja ainda [recursos do Clipey](/#recursos).

## Dicas

1. Faça uma gravação curta de teste antes de produzir uma aula ou demonstração longa.
2. Decida entre cursor editável e cursor do sistema antes de começar: o modo do sistema não oferece reestilização posterior.
3. Use efeitos visuais com parcimônia e confira a leitura em movimento reduzido.
4. Se usar controles de jogo, teste se os eventos foram capturados antes de configurar a sobreposição.
5. Para uma edição precisa, segure Shift apenas enquanto arrasta; o encaixe volta quando você solta a tecla.

## Limitações

Captura de gamepad, botões laterais e roda é voltada ao Windows. A exclusão do desenho ao vivo do vídeo depende da captura do Windows. As funções de mouse, desenho ao vivo, gamepad e timeline descritas aqui estão em implementação e precisam de validação na versão final; os detalhes podem mudar antes da publicação estável. Não trate esta lista como garantia de que cada opção já aparece em toda instalação.

Para obter Clipey e acompanhar a versão, visite a página de [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: published.
