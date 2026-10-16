---
title: "Como salvar um kit de publicação de vídeo"
description: "Reúna o vídeo exportado, textos por plataforma, legendas exportadas e uma capa existente em uma pasta ou arquivo ZIP."
slug: "kit-de-publicacao-video-capas-textos"
lang: "pt-BR"
translationKey: "kit-de-publicacao-video-capas-textos"
category: "tutoriais"
tags: ["Publicação", "Exportação"]
author: "Equipe Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 14
cover: "/blog/covers/kit-de-publicacao-video-capas-textos.webp"
coverAlt: "Arquivos de vídeo e textos organizados em um kit de publicação"
ogImage: "/blog/og/kit-de-publicacao-video-capas-textos.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 para Windows.

Para salvar um kit de publicação de vídeo no Clipey, conclua a exportação do seu arquivo e acesse a seção Kit de publicação e copy no painel de publicação. O recurso empacota o vídeo finalizado, a arte de capa existente, legendas sidecar e arquivos com os textos formatados para cada rede social em uma pasta local ou em um arquivo ZIP consolidado. Você também pode gerar títulos e legendas com o botão Sugerir copy com base na transcrição do clipe antes de exportar o pacote.

## O que entra no kit

O ponto de partida é o vídeo exportado. O kit também pode incluir um arquivo `copy-<plataforma>.txt` para cada plataforma, além de um `copy.json` com os mesmos dados estruturados. Se você exportou um arquivo de legendas separado, ele acompanha o pacote. Uma capa só entra quando já existe no projeto: o Clipey não gera uma imagem de capa automaticamente.

Essa distinção evita uma surpresa comum: o kit organiza material pronto, mas não é um editor de capas. Se o projeto não tiver capa, não espere que o Clipey invente uma. E revise os textos antes de compartilhar: sugestões de copy ajudam a começar, mas continuam sendo editáveis.

## Salve uma pasta ou um ZIP

1. Abra o projeto e finalize o vídeo. Use **Exportar** para criar o arquivo final antes de montar o pacote.
2. Na seção **Kit de publicação e copy**, preencha e revise o título, a descrição e as hashtags disponíveis para cada rede social. Se preferir, clique em **Sugerir copy** para gerar propostas automáticas fundamentadas na transcrição do clipe.
3. Clique em **Salvar kit de publicação**.
4. No campo **Formato do kit**, selecione entre **Pasta** ou **Arquivo ZIP**. A pasta é a opção inicial para edição rápida; use ZIP quando quiser um único arquivo comprimido para transferir ou arquivar.
5. Escolha o destino em **Escolher destino** e aguarde a indicação de progresso. Não feche o aplicativo enquanto o arquivo ZIP está sendo gravado.
6. Abra o destino e confira se o vídeo e os textos esperados estão presentes. Se tiver exportado legendas, confira também o arquivo lateral; se o projeto já tiver uma capa, verifique a imagem incluída.

Os arquivos de texto são separados por plataforma para você copiar a versão correta sem misturar instruções. O `copy.json` reúne os mesmos dados em formato estruturado, útil quando outro fluxo de trabalho consome os campos sem copiar manualmente.

## Como revisar a cópia sugerida

O botão **Sugerir copy** analisa a transcrição e o alcance do clipe selecionado para sugerir título, legenda e hashtags pertinentes ao tema. Leia os textos gerados e corrija nomes próprios, termos técnicos e chamadas para ação antes de salvar o kit. A sugestão automatiza a redação inicial, mantendo você no controle editorial de cada palavra.

Uma boa checagem é comparar cada frase factual com o que realmente aparece no vídeo. Se a transcrição não contém o nome de uma marca ou pessoa, não presuma que a sugestão tenha acertado. Se você digitar uma correção própria, confira-a também no arquivo por plataforma depois de salvar.

## Dicas

- Use nomes de projeto claros antes de exportar; assim fica mais fácil reconhecer o vídeo no destino.
- Abra pelo menos um `copy-<plataforma>.txt` após salvar. O formato simples deixa a revisão e a cópia rápidas.
- Trate o `copy.json` como uma versão estruturada da mesma copy, não como um segundo texto independente.
- Confira o tamanho do ZIP e o espaço livre se o vídeo for grande. O pacote inclui o vídeo exportado, não apenas os textos.
- Faça uma pasta separada por campanha se precisar manter versões diferentes; o kit registra os arquivos da exportação que você escolheu.

## Limitações

O kit não cria capas, não envia arquivos para redes sociais e não garante que cada rede aceite o vídeo ou o texto. A capa só é incluída quando já existe no projeto; legendas só acompanham quando foram exportadas como arquivo separado. O ZIP pode demorar porque contém o próprio vídeo e sua criação deve terminar antes de você mover ou fechar o destino.

Para programar a publicação a partir do Clipey, consulte [como agendar vídeos](/blog/publicacao-agendada-youtube-tiktok-instagram/). Para preparar um vídeo com as dimensões e checagens adequadas, veja [presets e verificação da exportação](/blog/exportacao-confiavel-presets-e-verificacao/). Os [recursos de publicação](/#publicar) explicam o fluxo geral.

Depois de revisar o vídeo e os textos de cada destino, você pode entregar o kit a quem fará a publicação ou seguir para a fila do Clipey. [Baixe o Clipey](/#download) para montar o próximo pacote.

## Histórico desta página

- 2026-10-15: publicado.
