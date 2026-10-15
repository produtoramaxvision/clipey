---
title: "Como reenquadrar uma gravação verticalmente pelo rosto"
description: "Ative o reenquadramento por rosto, escolha o comportamento de fallback e confira o resultado vertical no preview antes de exportar."
slug: "reenquadramento-vertical-por-rosto"
lang: "pt-BR"
translationKey: "reenquadramento-vertical-por-rosto"
category: "tutoriais"
tags: ["Edição com IA", "Gravação", "Privacidade"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 11
cover: "/blog/covers/reenquadramento-vertical-por-rosto.webp"
coverAlt: "Preview vertical do Clipey com o enquadramento acompanhando a pessoa"
ogImage: "/blog/og/reenquadramento-vertical-por-rosto.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 no Windows.

Uma gravação de tela pode ter sido feita em formato largo, mesmo quando o destino é um vídeo vertical. O reenquadramento por rosto ajuda a manter a pessoa visível dentro do novo quadro. Ele não transforma automaticamente toda gravação em um vídeo pronto: revise o movimento, escolha o que acontece quando o rosto não é encontrado e confira o conteúdo que ficará fora do recorte.

## Prepare o formato de saída

1. Abra o projeto com o vídeo que deseja adaptar e confirme que a mídia está carregada.
2. No painel de formato, escolha a proporção vertical, como 9:16. Observe o preview: o quadro fixo seleciona apenas parte da imagem original.
3. Ative **Face reframe**. O Clipey analisa a mídia para construir uma trajetória de foco. Essa análise ocorre quando o recurso é ativado ou quando o ativo ainda não tem uma trilha; o objetivo não é detectar rostos a cada quadro durante a reprodução.
4. Ajuste a suavização para equilibrar acompanhamento e estabilidade. Uma resposta mais suave reduz mudanças bruscas, mas pode demorar a acompanhar um deslocamento rápido. Reproduza trechos em que a pessoa muda de posição antes de decidir.
5. Se nenhum rosto estiver disponível em parte do vídeo, escolha o fallback: seguir o cursor ou centralizar o quadro. Reproduza o intervalo sem rosto e confira se a alternativa mantém informação útil.

## Revise o movimento do quadro

Assista à gravação desde o início e preste atenção em mudanças de posição. A trajetória segue o rosto detectado e é suavizada para evitar que o quadro salte de uma posição para outra. Quando o rosto some por um período, o comportamento configurado como fallback assume o enquadramento. Verifique se essa transição parece intencional e se o quadro não fica preso em uma posição que corta a demonstração.

O preview e a exportação devem refletir o reenquadramento. Ainda assim, reveja os trechos importantes após exportar, especialmente se o vídeo tiver vários clipes ou cortes. Um enquadramento adequado em um plano pode não servir no plano seguinte. Ajuste os limites do clipe ou use outro formato se a pessoa e a interface precisarem aparecer ao mesmo tempo.

## Escolha como preencher as laterais

Ao converter uma fonte horizontal para 9:16, é comum que sobrem áreas vazias ou que seja necessário cortar bastante. O modo **Blurred backdrop** preenche as laterais com uma versão ampliada e desfocada da própria imagem, mantendo a fonte principal centralizada e inteira. Compare esse modo com o preenchimento que corta a imagem: o fundo desfocado preserva o contexto do vídeo, mas pode deixar elementos da interface pouco legíveis.

Use a opção conforme a finalidade do conteúdo. Para uma pessoa falando, o fundo desfocado pode evitar barras pretas sem ampliar a área principal além do necessário. Para ensinar um detalhe da tela, cortar para preencher pode esconder controles; o fundo desfocado também não torna o texto de fundo legível. Confira o resultado com movimento e com legendas ligadas.

## Dicas

- Comece pelo formato final e só então avalie o foco. Assim você vê exatamente o que o público verá.
- Escolha um trecho com a pessoa falando e outro em que ela se desloca para testar o acompanhamento.
- Mantenha suavização suficiente para que pequenos movimentos não façam o enquadramento tremer, mas reduza-a se o rosto escapar durante mudanças rápidas.
- Verifique o fallback em trechos sem rosto; não presuma que o centro ou o cursor sempre apontem para a ação principal.
- Para vídeos de tutorial, confira se o reenquadramento não remove menus, ponteiros ou texto que expliquem a etapa.
- Assista à exportação final em tela pequena, onde o formato vertical será visto com mais frequência.

## Limitações

O reenquadramento depende de detecção facial no dispositivo e de uma trilha de foco gerada para o ativo. Não é garantia de que todos os rostos serão detectados em todas as condições, nem identifica automaticamente qual elemento da interface importa. O recurso acompanha um rosto escolhido, e não necessariamente a pessoa que está falando. Em períodos sem detecção, o comportamento de fallback é usado. O fundo desfocado pode reduzir a legibilidade de conteúdo visual e não substitui uma edição manual para cenas complexas.

Para selecionar momentos curtos da gravação, leia [como revisar clipes do Auto Clip](/blog/auto-clip-shorts-de-videos-longos/). Para trabalhar com cortes e zooms, veja [edição com IA](/blog/edicao-com-ia-cortes-zooms-silencio/). Consulte também os [recursos do Clipey](/#recursos).

Próximo passo: aplique o reenquadramento a um trecho curto, confira o fallback e assista à exportação antes de processar o vídeo inteiro.

## Histórico desta página

- {{RELEASE_DATE}}: published.
