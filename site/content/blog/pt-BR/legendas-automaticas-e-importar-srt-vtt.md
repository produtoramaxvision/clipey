---
title: "Como criar legendas e importar arquivos SRT ou VTT"
description: "Transcreva a gravação, ajuste a aparência das legendas e importe uma faixa SRT ou VTT sem substituir texto sem confirmação."
slug: "legendas-automaticas-e-importar-srt-vtt"
lang: "pt-BR"
translationKey: "legendas-automaticas-e-importar-srt-vtt"
category: "tutoriais"
tags: ["Legendas", "Edição com IA", "Exportação"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 9
cover: "/blog/covers/legendas-automaticas-e-importar-srt-vtt.webp"
coverAlt: "Painel de transcrição e controles de legendas do Clipey"
ogImage: "/blog/og/legendas-automaticas-e-importar-srt-vtt.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 no Windows.

Legendas ajudam a acompanhar uma gravação sem depender apenas do áudio, mas nem sempre é preciso transcrever tudo outra vez. O Clipey permite trabalhar com a transcrição do projeto, ajustar a apresentação das legendas e importar legendas existentes nos formatos SRT e VTT. A importação cria texto temporizado; não executa reconhecimento de fala.

## Gere ou confira uma transcrição

1. Abra o projeto e selecione a gravação que contém a fala.
2. No painel **Transcript**, escolha **Transcribe now** se ainda não houver transcrição. Espere a tarefa terminar antes de revisar palavras ou abrir os controles de legenda.
3. Leia o texto e corrija nomes, números e termos técnicos. A transcrição é editável: uma legenda incorreta deve ser corrigida na origem antes de ajustar o estilo visual.
4. Abra **Captions** no painel de transcrição para acessar as opções de apresentação. Esse controle abre a configuração no lugar do painel de transcrição; feche-a para voltar ao texto.

Ao usar a transcrição gerada, o Clipey associa palavras a tempos e pode apresentar legendas no vídeo. As opções incluem exibir ou ocultar legendas, estilo, posição e quantidade de palavras por linha. Faça mudanças com o preview visível: uma configuração legível em um trecho pode cobrir um controle importante em outro.

## Importe um arquivo SRT ou VTT

Se já recebeu uma faixa de legendas, use **Import subtitles** no painel de transcrição. Escolha o arquivo .srt ou .vtt. Quando existe uma transcrição no projeto, o Clipey pede confirmação antes de substituí-la; cancele se quiser manter o conteúdo atual. Se o Clipey detectar uma faixa sidecar com o mesmo nome-base do vídeo, ele mostra a opção de importá-la em vez de trocar a transcrição automaticamente.

A importação interpreta os tempos dos blocos e cria uma transcrição a partir do texto. Isso é útil quando a fala já foi legendada por outro processo: você reutiliza os tempos e palavras sem iniciar reconhecimento de áudio. Ainda assim, compare pontos de sincronização ao começo, ao meio e ao final do vídeo. Uma faixa criada para outra versão da mídia pode começar alinhada e terminar fora de sincronia.

## Faça a revisão das legendas

1. Reproduza o início e confirme se a primeira fala aparece no momento correto.
2. Salte para o meio e para perto do final. Confira se a sincronização se mantém ao longo do arquivo.
3. Revise blocos longos. Se a quebra de linha separar palavras de maneira ruim, ajuste o texto e as configurações de palavras por linha.
4. Confira nomes próprios e pontuação. Arquivos importados preservam o texto fornecido, que pode ter erros, linhas extensas ou capitalização diferente do padrão desejado.
5. Exporte um pequeno trecho de teste antes de concluir um trabalho longo e confira o resultado renderizado.

Para CJK (chinês, japonês e coreano), a quebra de linha precisa considerar que ideogramas não se comportam como palavras separadas por espaços. O tratamento de largura visual e pontos de quebra é parte do suporte de legendas do Clipey; confira o resultado em frases mistas com caracteres latinos e CJK, especialmente junto a sinais de pontuação. Não force uma quebra manual que deixe um caractere de abertura no fim da linha ou separe uma palavra latina.

## Dicas

- Use a transcrição como base editável e revise-a antes de aplicar estilo. Estilo não corrige uma palavra reconhecida incorretamente.
- Para uma faixa externa, mantenha uma cópia do SRT/VTT original. Assim você pode comparar o texto e os tempos caso a importação não corresponda ao vídeo esperado.
- Se o vídeo e a legenda vieram de versões diferentes, ajuste a sincronização antes de trabalhar na aparência.
- Prefira linhas curtas o suficiente para serem lidas sem pausar o vídeo. Considere a largura real do texto, não apenas a contagem de caracteres.
- Confira as legendas com o áudio desligado também: o texto precisa comunicar a fala sem depender de uma palavra inaudível.

## Limitações

O Clipey não verifica se o conteúdo ou a tradução de um arquivo importado estão corretos. A importação aproveita texto e tempos já existentes; não reconhece automaticamente o áudio. Diferenças de duração ou edição entre o arquivo de vídeo e o SRT/VTT podem causar dessincronização. A transcrição automática também pode errar, então revise antes de exportar.

Para editar pausas e palavras com auxílio do agente, leia [edição com IA](/blog/edicao-com-ia-cortes-zooms-silencio/). Para transformar uma gravação longa em candidatos curtos, veja [Auto Clip](/blog/auto-clip-shorts-de-videos-longos/). Saiba mais sobre [recursos de IA](/#ia).

Próximo passo: importe uma faixa existente ou transcreva um trecho, corrija o texto e confira a sincronização no preview.

## Histórico desta página

- {{RELEASE_DATE}}: published.
