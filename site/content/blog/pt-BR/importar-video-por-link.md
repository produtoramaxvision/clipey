---
title: "Como importar um vídeo por link com segurança"
description: "Cole um link, confira os dados e a qualidade disponíveis e importe o vídeo para o projeto sem publicar automaticamente."
slug: "importar-video-por-link"
lang: "pt-BR"
translationKey: "importar-video-por-link"
category: "tutoriais"
tags: ["Gravação", "Privacidade", "Edição com IA"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 12
cover: "/blog/covers/importar-video-por-link.webp"
coverAlt: "Janela de importação por link com prévia das informações do vídeo"
ogImage: "/blog/og/importar-video-por-link.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 no Windows.

Quando um vídeo que você tem permissão para usar está hospedado em um serviço online, importar por link evita baixar o arquivo separadamente para depois localizá-lo no projeto. O Clipey consulta as informações disponíveis, permite escolher uma qualidade e adiciona a mídia ao projeto. A importação não publica o vídeo, e você continua responsável por ter direito de baixar e reutilizar o conteúdo.

## Cole o link e confira a prévia

1. Abra um projeto no editor ou comece pelo estado vazio e selecione **Import from link**.
2. Cole o endereço do vídeo no campo. A ferramenta aceita links HTTP ou HTTPS compatíveis; não use caminhos locais, endereços privados ou links que exijam contornar controles de acesso.
3. Aguarde a consulta dos metadados. Confira título, duração, miniatura e canal ou autor quando esses dados forem fornecidos pelo site.
4. Leia a licença exibida. Se o serviço não informar uma licença, o Clipey deixa isso claro como **No licence information**; ausência de informação não significa que o conteúdo seja livre para reutilizar.
5. Escolha uma das opções de qualidade e confirme a importação. A opção padrão busca a melhor qualidade até 1080p; também há opções até 720p, melhor qualidade disponível e somente áudio.

O Clipey usa uma ferramenta de linha de comando para consultar e baixar a mídia. Primeiro recebe metadados e depois faz o download com a opção escolhida. Durante a transferência, acompanhe o progresso. Você pode cancelar se mudou de ideia ou colou o link errado. Ao terminar, o arquivo é adicionado aos recursos do projeto, como uma mídia importada.

## Escolha a qualidade pelo uso

Não escolha automaticamente a maior opção. Para consultar uma fala ou editar um corte curto, uma qualidade menor pode bastar e reduzir o tamanho do arquivo. Para usar a imagem em uma edição que exige mais detalhe, escolha a qualidade mais alta disponível que faça sentido para o seu projeto. **Best available** não significa que o serviço ofereça uma resolução específica: disponibilidade depende da fonte.

**Audio only** é apropriado quando você precisa trabalhar com a faixa de som, não com a imagem. Confira novamente a opção antes de iniciar para não baixar apenas áudio quando o objetivo era editar um vídeo.

Após a importação, localize o novo recurso na mídia do projeto e abra-o para conferir duração e reprodução. Uma prévia de metadados não garante que a fonte continuará acessível nem que o download será concluído: o vídeo pode estar privado, bloqueado por região ou exigir uma conta. Se houver um erro, confira o link, a rede e as permissões da fonte antes de tentar outra vez.

## Direitos, licença e responsabilidade

Use a importação somente para conteúdo que você possui ou tem autorização para usar. O campo de licença reflete o que a fonte informa, quando essa informação existe; ele não concede direitos e não verifica se a licença cobre seu uso planejado. Leia os termos do site e da licença e considere autorização, atribuição, uso comercial e restrições territoriais. Não use a ferramenta para contornar conteúdo privado, controles de acesso ou limitações impostas pela fonte.

O arquivo importado fica no projeto para edição; isso não equivale a publicar ou compartilhar. Antes de exportar, verifique se o conteúdo de terceiros pode ser incorporado ao vídeo final. Uma licença aberta também pode impor condições, e a ausência de licença visível exige cautela adicional.

## Dicas

- Use o link canônico da página do vídeo, não um link de playlist se quiser apenas um item. A importação trata a mídia selecionada, não uma coleção inteira.
- Confira duração e título antes de escolher qualidade; esses dados ajudam a confirmar que você colou o vídeo certo.
- Prefira uma opção de qualidade adequada ao trabalho para evitar ocupar espaço sem necessidade.
- Aguarde a transferência terminar antes de fechar o projeto e verifique a reprodução após o arquivo entrar na mídia.
- Se precisar de áudio para transcrever, escolha a opção apropriada e confirme o resultado antes de iniciar outras etapas.
- Guarde a origem e a informação de licença junto ao seu registro editorial, quando relevante.

## Limitações

O suporte depende do site e do acesso que ele oferece no momento. Vídeos privados, indisponíveis, bloqueados por região ou removidos podem falhar. Clipey mostra a licença apenas quando a fonte fornece essa informação e não decide se você tem direitos suficientes. Links não são uma forma de contornar autenticação ou restrições. A disponibilidade de formatos e resoluções depende da origem, e erros de rede ou de espaço em disco podem interromper a transferência.

Depois de importar, veja [como transformar uma gravação longa em clipes curtos](/blog/auto-clip-shorts-de-videos-longos/) ou [prepare legendas com SRT/VTT](/blog/legendas-automaticas-e-importar-srt-vtt/). Para entender como proteger seus dados, consulte [privacidade](/#privacidade).

Próximo passo: importe somente um link autorizado, confira o arquivo no projeto e revise os direitos antes de exportar ou compartilhar.

## Histórico desta página

- {{RELEASE_DATE}}: published.
