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

Para criar legendas ou importar arquivos SRT e VTT no Clipey, use o painel de transcrição do editor para transcrever a fala no dispositivo ou clique em Importar legendas para carregar um arquivo externo. O aplicativo mapeia os tempos dos blocos de texto diretamente para o projeto, com suporte a quebras inteligentes e ajuste de largura visual para caracteres CJK. Antes de exportar, você pode personalizar posição, cores e tamanho das fontes com visualização em tempo real.

## Gere ou confira uma transcrição

1. Abra o projeto e selecione a gravação que contém a fala.
2. No painel de transcrição, clique em **Transcrever** se ainda não houver texto gerado. Espere o modelo concluir a conversão antes de revisar as palavras ou abrir as configurações visuais.
3. Leia o texto e corrija nomes, números e termos técnicos. A transcrição é editável diretamente no painel: corrigir a palavra na transcrição garante que a legenda e as ações de edição com IA reflitam o texto certo.
4. Abra a seção de **Legendas** no painel lateral para acessar as opções de apresentação e estilo.

Ao usar a transcrição gerada, o Clipey associa palavras a tempos e pode apresentar legendas no vídeo. As opções incluem exibir ou ocultar legendas, estilo, posição e quantidade de palavras por linha. Faça mudanças com o preview visível: uma configuração legível em um trecho pode cobrir um controle importante em outro.

## Importe um arquivo SRT ou VTT

Se você já possui uma faixa de legendas pronta, use o botão **Importar legendas** no painel de transcrição. Escolha um arquivo `.srt` ou `.vtt`. Quando já existe uma transcrição no projeto, o Clipey abre a confirmação **Substituir transcrição?** alertando sobre a sobreposição do texto; clique em **Substituir** para prosseguir ou **Cancelar** para manter o texto atual. Se o Clipey detectar um arquivo sidecar com o mesmo nome do vídeo na pasta, ele exibe a opção **Importar arquivo anexo**.

A importação interpreta os tempos dos blocos e cria uma transcrição a partir do texto. Isso é útil quando a fala já foi legendada por outro processo: você reutiliza os tempos e palavras sem iniciar reconhecimento de áudio. Ainda assim, compare pontos de sincronização ao começo, ao meio e ao final do vídeo. Uma faixa criada para outra versão da mídia pode começar alinhada e terminar fora de sincronia.

## Faça a revisão das legendas

1. Reproduza o início e confirme se a primeira fala aparece no momento correto.
2. Salte para o meio e para perto do final. Confira se a sincronização se mantém ao longo do arquivo.
3. Revise blocos longos. Se a quebra de linha separar palavras de maneira inadequada, ajuste o texto e as configurações de palavras por linha.
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

## Perguntas frequentes

### Quais formatos de arquivo de legenda são suportados para importação?
O Clipey suporta arquivos nos formatos SubRip (`.srt`) e WebVTT (`.vtt`), preservando as marcações de tempo e o texto das falas.

### A importação de legendas apaga as edições manuais feitas na transcrição?
Sim. Ao importar um arquivo SRT ou VTT em um projeto com transcrição existente, o Clipey exibe uma confirmação e substitui o texto atual pelas novas falas importadas.

### O Clipey consegue exportar arquivos de legenda separados do vídeo?
Sim. Na janela de exportação, você pode marcar a opção para gerar arquivos de legenda sidecar (`.srt` ou `.vtt`) na mesma pasta de destino do arquivo de vídeo.

Para editar pausas e palavras com auxílio do agente, leia [edição com IA](/blog/edicao-com-ia-cortes-zooms-silencio/). Para transformar uma gravação longa em candidatos curtos, veja [Auto Clip](/blog/auto-clip-shorts-de-videos-longos/). Saiba mais sobre [recursos de IA](/#ia).

Próximo passo: importe uma faixa existente ou transcreva um trecho, corrija o texto e confira a sincronização no preview.

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
