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

> **Aplica-se a:** Clipey 1.15. A gravação principal é para Windows; o desenho ao vivo ainda aguarda validação final.

O Clipey 1.15 traz efeitos de cursor com destaque de cliques e rolagem, sobreposição de controle para gameplay, atalhos rápidos na linha do tempo e geração automática de clipes curtos. A versão também adiciona importação de legendas e links, suporte a servidores MCP para agentes locais e predefinições de exportação com verificação técnica de entrega. Todas as ferramentas de captura e edição continuam sendo executadas no seu próprio computador, sem transferir seus arquivos para servidores remotos.

## Comece pela gravação

O seletor do cursor no HUD permite alternar entre **Cursor editável** e **Cursor do sistema**. No modo editável, o cursor é gravado separadamente para poder receber estilo e participar do autozoom no editor. No modo do sistema, o cursor real já aparece no vídeo e não pode ser reestilizado nem usado pelo autozoom. Para uma demonstração com cliques legíveis, o modo editável é o ponto de partida mais flexível.

No Windows, a gravação de interações inclui cliques laterais e eventos da roda do mouse, além do movimento contínuo do ponteiro. Os botões direito e do meio alimentam os efeitos visuais de anel duplo e anel quadrado, sem alterar o salto, o impacto ou o autozoom existentes, que permanecem vinculados ao clique esquerdo. Esses dados tornam-se úteis na edição sem interferir nos comandos principais de corte.

## Edite com mais contexto

O editor recebe recursos para destacar ações sem redesenhar a gravação original. Os efeitos de mouse combinam formas de clique por botão, indicador de rolagem, rastro durante arraste, halo e holofote. Uma configuração de movimento reduzido troca a animação por uma mudança breve de opacidade. Ajuste só os elementos necessários: halo e holofote podem competir com o conteúdo se ficarem fortes demais.

O desenho ao vivo foi pensado para anotações rápidas enquanto a gravação acontece: caneta, marca-texto, seta, retângulo e elipse, com cor e espessura escolhidas numa barra flutuante. Os traços devem permanecer fora do vídeo capturado e ser armazenados como vetores para reaparecer no editor e na exportação. Por depender de proteções de captura no Windows, esse recurso permanece em validação final; os traços acompanham os tempos da gravação.

Para gameplay, a sobreposição de controle mostra botões pressionados em estilo **Compacto** ou **Completo**, conforme a escolha no inspetor. A visualização completa também pode exibir a posição dos analógicos com **Mostrar analógicos**. Os eventos seguem o tempo editado do vídeo, então aparas e trechos acelerados mantêm a sincronia com a sobreposição.

## Aproveite os ajustes da timeline

Na timeline, segurar **Shift** durante o arraste ou o ajuste de uma apara desativa o encaixe temporariamente, exibindo o aviso **Ajuste desativado (Shift)** sem mudar uma preferência permanente. O menu de contexto reúne ações para clipes e modificadores, como **Dividir / Cortar**, **Duplicar** e **Excluir**, com atalhos de teclado. Marcadores nomeados ajudam a voltar a pontos do projeto com a tecla **M**, e um duplo clique no divisor restaura seu tamanho padrão.

Esses controles são complementares. Use Shift quando o encaixe estiver atrapalhando um ajuste pontual; use marcadores para localizar momentos que você revisará mais tarde. Não use um marcador como substituto de uma apara: ele identifica uma posição e não remove conteúdo.

## Um fluxo de teste antes do projeto final

1. Inicie uma gravação curta no Windows e escolha o modo de cursor adequado. Se a intenção for reposicionar ou destacar o ponteiro depois, escolha **Cursor editável**.
2. Faça alguns cliques e movimentos de roda, e ative **Capturar controle** se for demonstrar um jogo. Para o desenho ao vivo em validação, o fluxo previsto utiliza o atalho **Ctrl+Shift+D** para entrar em modo de anotação e **Esc** para sair.
3. Abra a gravação no editor. Confira se os eventos aparecem nos trechos corretos antes de ativar várias camadas de sobreposição. Ajuste o atraso de entrada ou as opções visuais apenas se perceber um desencontro.
4. Na timeline, teste uma apara segurando Shift e adicione um marcador ao playhead com **M**. Renomeie o marcador para que a lista continue útil em projetos com várias revisões.
5. Exporte um trecho de conferência e observe a leitura em movimento. Assim fica mais fácil detectar efeitos que escondam texto ou marcações fora de sincronia.

Os recursos de mouse, controle e timeline já estão integrados na versão 1.15. Apenas o desenho ao vivo durante a captura permanece como funcionalidade planejada em validação final.

## O que muda entre os modos de cursor?

No modo editável, o cursor pode ser composto na edição a partir de dados gravados à parte. No modo do sistema, o ponteiro já está nos pixels da captura: o editor não consegue separá-lo do restante da imagem. Se houver dúvida, faça duas gravações de poucos segundos e compare o que aparece no editor, em vez de decidir só pela aparência do HUD.

## E se um overlay não mostrar nada?

Uma configuração visual precisa dos eventos correspondentes. A sobreposição de controle, por exemplo, não inventa entradas que não foram gravadas: o painel exibe o aviso "Grave com Capturar controle ativado" quando o arquivo não possui eventos de gamepad. Da mesma forma, dados de cursor separado dependem de gravar com o modo editável ativo. Primeiro confira a origem dos dados, depois o posicionamento e o estilo.

## Outros caminhos úteis

O Clipey 1.15 também reúne mudanças no fluxo de edição assistida, voz, legendas, importação e publicação. Para os detalhes práticos, continue com [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/), [efeitos de mouse](/blog/efeitos-de-mouse-cliques-halo-spotlight/) e [atalhos na timeline](/blog/atalhos-e-produtividade-na-timeline/). Veja ainda [recursos do Clipey](/#recursos).

## Dicas

1. Faça uma gravação curta de teste antes de produzir uma aula ou demonstração longa.
2. Decida entre cursor editável e cursor do sistema antes de começar: o modo do sistema não oferece reestilização posterior.
3. Use efeitos visuais com parcimônia e confira a leitura em movimento reduzido.
4. Se usar controles de jogo, ative Capturar controle antes da gravação para registrar os comandos.
5. Para uma edição precisa, segure Shift apenas enquanto arrasta; o encaixe volta quando você solta a tecla.

## Limitações

A captura de comandos de controle, botões laterais e roda é voltada ao Windows. Os recursos de efeitos de mouse, sobreposição de controle e atalhos de linha do tempo estão incorporados ao Clipey 1.15. Já o desenho ao vivo durante a gravação continua em fase de implementação e validação técnica final.

Para obter Clipey e acompanhar a versão, visite a página de [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
