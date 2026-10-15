---
title: "Como editar mais rápido com os atalhos da timeline"
description: "Use Shift para ignorar o encaixe, abra ações pelo menu de contexto, marque posições importantes e restaure o divisor do editor."
slug: "atalhos-e-produtividade-na-timeline"
lang: "pt-BR"
translationKey: "atalhos-e-produtividade-na-timeline"
category: "tutoriais"
tags: ["Edição com IA", "Atalhos", "Gravação"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 6
cover: "/blog/covers/atalhos-e-produtividade-na-timeline.webp"
coverAlt: "Timeline de edição com clipes e marcadores"
ogImage: "/blog/og/atalhos-e-produtividade-na-timeline.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15. Os ajustes descritos são controles do editor e devem ser confirmados na compilação final.

Na timeline, o encaixe ajuda a alinhar clipes, mas pode atrapalhar um ajuste que precisa parar entre dois pontos próximos. Menus com ações e marcadores também reduzem idas e voltas durante a revisão. As melhorias previstas para o 1.15 são pequenas, mas cada uma resolve um tipo diferente de fricção: precisão momentânea, acesso a comandos, navegação e organização do espaço.

## Arraste sem encaixe usando Shift

1. Selecione o clipe ou a apara que deseja ajustar e comece a arrastar.
2. Enquanto mantém o botão do mouse pressionado, segure **Shift** para desativar temporariamente o encaixe. A especificação prevê uma indicação visual enquanto a tecla estiver pressionada.
3. Solte o elemento no ponto desejado e depois solte Shift. O encaixe volta sem alterar uma configuração permanente.

O modificador serve para aquela ação, não para desligar o encaixe em todo o projeto. Use-o quando o clipe insiste em grudar num limite vizinho e você precisa posicioná-lo entre referências. Se o arraste já terminou, pressionar Shift depois não corrige a posição; repita o ajuste com a tecla pressionada.

Uma boa situação para esse recurso é acertar o início de uma fala depois de remover uma pausa. Primeiro aproxime o clipe com o encaixe ligado para conservar a referência visual; depois segure Shift no último movimento para escolher o ponto fino. Assim, o encaixe continua ajudando durante a maior parte da edição e você não precisa desligá-lo para todo o projeto.

## Abra as ações no próprio clipe

O menu de contexto previsto reúne as ações existentes para clipes e pílulas de modificador, incluindo opções como dividir, excluir, duplicar e alterar velocidade quando aplicáveis ao item. Clique com o botão direito no elemento para abrir o menu e confira os atalhos mostrados ao lado dos comandos. Isso ajuda a descobrir uma ação antes de memorizar sua combinação.

O menu também deve funcionar pelo teclado: selecione o elemento e use **Shift+F10** ou a tecla de menu de contexto. Pressione **Esc** para fechar; o foco deve voltar ao clipe, permitindo continuar navegando sem localizar o elemento novamente. As ações disponíveis dependem do tipo de elemento selecionado, portanto não espere que todas apareçam para todo item.

Use o menu quando ainda não souber o atalho ou quando quiser confirmar que selecionou o alvo certo. Em um clipe, dividir ou duplicar atua sobre o clipe escolhido; em uma pílula de modificador, as opções pertinentes são diferentes. Leia o rótulo e o selo do atalho antes de confirmar uma ação destrutiva como excluir. Se o foco voltar ao clipe ao fechar, você pode abrir o menu de outro elemento pela navegação do teclado sem reiniciar a busca.

## Crie marcadores para pontos de revisão

1. Posicione o playhead no momento que deseja revisitar.
2. Pressione **M** para adicionar um marcador nomeado nesse ponto.
3. Abra a lista de marcadores para saltar de volta a uma posição enquanto revisa. Renomeie, escolha uma cor ou remova os marcadores que perderam utilidade.

Marcadores identificam posições do projeto; eles não cortam, ocultam nem alteram o vídeo. Dê nomes úteis como “rever texto” ou “validar áudio” para transformar a lista em uma pauta de revisão. Se um trecho mudar de lugar após a edição, confira se o marcador ainda representa o ponto que você queria guardar.

Em uma revisão, crie marcadores para perguntas distintas: uma para conferir uma legenda, outra para validar uma transição e outra para verificar o áudio. Saltar pela lista permite comparar cada ponto sem arrastar o playhead por toda a gravação. A cor pode ajudar a distinguir categorias de revisão, mas o nome deve continuar claro por si só, inclusive para quem não conhece a convenção de cores do projeto.

## Restaure o tamanho do painel

Quando um painel fica estreito demais depois de redimensionar o divisor, dê um duplo clique no divisor. O comportamento previsto restaura o tamanho padrão daquele painel. Isso é diferente de maximizar o editor: o objetivo é recuperar a distribuição inicial sem ajustar manualmente até encontrar uma largura confortável.

Antes de restaurar, lembre que o duplo clique é uma ação sobre o divisor, não sobre o conteúdo do painel. Se estiver tentando aumentar espaço para a prévia, primeiro use o divisor normalmente; o reset é útil quando perdeu a distribuição que considera legível ou não sabe qual era o tamanho inicial. Em seguida, ajuste de novo se a tarefa pedir mais espaço para timeline ou inspetor.

## Dicas

1. Use Shift só enquanto arrasta ou apara com encaixe indesejado; ele não altera uma preferência persistente.
2. Consulte os rótulos de atalho do menu antes de decorar comandos. A ação depende do clipe ou modificador escolhido.
3. Nomeie marcadores pelo próximo passo de revisão, não apenas pelo conteúdo visível naquele instante.
4. Remova marcadores obsoletos para que a lista continue útil em projetos longos.
5. Se perder espaço no inspetor, teste o duplo clique no divisor antes de redimensionar painéis repetidamente.

## Limitações

Esses recursos são especificados para a timeline e os painéis do editor e precisam ser validados na versão final do Clipey 1.15. Shift desativa o encaixe somente durante a interação prevista; não muda a configuração global. O menu oferece ações existentes e relevantes ao elemento, não um conjunto universal. Marcadores guardam pontos de navegação, não são substitutos para aparas ou divisões.

Para preparar o material, veja [gravar a tela no Windows](/blog/gravar-tela-windows-com-cursor-e-cliques/). Para destacar ações na imagem, leia [efeitos de mouse](/blog/efeitos-de-mouse-cliques-halo-spotlight/) e [desenho ao vivo](/blog/desenho-ao-vivo-durante-gravacao/). Explore os [recursos](/#recursos) e baixe o Clipey em [download](/#download).

## Histórico desta página

- {{RELEASE_DATE}}: published.
