---
title: "Como conectar agentes de IA ao Clipey com MCP"
description: "Configure Claude Code, Cursor ou VS Code para conversar com o Clipey por MCP, escolhendo entre stdio e o servidor local da aplicação."
slug: "clipey-com-agentes-de-ia-mcp"
lang: "pt-BR"
translationKey: "clipey-com-agentes-de-ia-mcp"
category: "guias"
tags: ["Agentes de IA", "Privacidade"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 16
cover: "/blog/covers/clipey-com-agentes-de-ia-mcp.webp"
coverAlt: "Agente de IA conectado ao projeto do Clipey por MCP"
ogImage: "/blog/og/clipey-com-agentes-de-ia-mcp.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 para Windows. Os passos de configuração variam conforme o cliente MCP.

Um cliente compatível com MCP pode pedir ao Clipey informações ou ações sobre um projeto. A integração não dá acesso irrestrito ao computador: ela apresenta ferramentas específicas, e o servidor HTTP integrado fica desativado até você habilitá-lo. A permissão para alterar projetos também é separada da conexão. Este guia ajuda a escolher entre o modo local da aplicação e o processo stdio iniciado pelo cliente.

## Escolha um transporte

O servidor MCP da aplicação usa HTTP local em `127.0.0.1`, uma porta configurada e um token. Ele é útil quando você quer que o cliente alcance o Clipey que já está aberto e trabalhando com um projeto. O MCP por stdio, por outro lado, é iniciado como um processo próprio pelo cliente. A configuração de cada modo tem de ser feita no cliente; não use um token real em documentação ou em um arquivo que será compartilhado.

O servidor HTTP vem desativado por padrão. Ative-o somente quando for usar a conexão, proteja o token e desative-o depois se não precisar dele. As opções e nomes exatos no cliente variam, então consulte o guia de configuração incluído com a versão instalada antes de colar um bloco.

## Configuração geral

1. Atualize e abra o Clipey 1.15; mantenha aberto o projeto que o agente deverá consultar.
2. Abra **Servidor MCP** nas configurações de IA e ative **Ativar servidor MCP** para usar HTTP. Confirme o estado **Em execução** e confira o campo **Porta**.
3. Use o comando exibido na seção **Claude Code** ou **Codex**, conforme o cliente que você usa. O servidor integrado apresenta comandos para esses clientes; para Cursor, VS Code ou outro host, consulte a documentação MCP do próprio cliente e configure a URL local e o token sem compartilhar o segredo.
4. Recarregue o cliente e confira se Clipey aparece conectado. Comece com uma pergunta de leitura sobre o projeto aberto.
5. Mantenha **Permitir que clientes MCP editem seus projetos, gravem e exportem** desligado até precisar dessas ações. Se o ligar, revise cada alteração no editor; as mudanças são salvas assim que chegam.

No HTTP, o servidor integrado usa o endereço local, a porta e o token de acesso que aparecem no painel **Servidor MCP**. O botão para mostrar o token permite revelá-lo temporariamente; **Copiar** o envia à área de transferência, e **Regenerar** invalida o token anterior e desconecta os clientes que o usam. Em stdio, o cliente inicia um processo separado, com ciclo de vida diferente do editor. Não configure os dois modos ao mesmo tempo sem uma razão: isso pode deixar pouco claro qual conexão está atendendo o agente.

## O que pedir ao agente

Use pedidos pequenos e verificáveis: por exemplo, solicitar um resumo do documento atual antes de pedir uma mudança. As ferramentas de mídia podem oferecer acesso a informações do projeto e operações de edição. A transcrição é feita com o mecanismo local do Clipey, mas pode levar alguns minutos, sobretudo no primeiro uso enquanto o modelo de fala é obtido. Um arquivo sem áudio não produz transcrição.

Leia as descrições e as permissões das ferramentas mostradas pelo cliente. Algumas ações alteram o projeto; uma resposta do agente não substitui a revisão do editor. Faça uma cópia do projeto antes de um fluxo de alterações importante e confirme o resultado visualmente.

## Dicas

- Comece sem permitir edição e amplie permissões somente quando o fluxo exigir.
- Mantenha o token fora de prompts, capturas e repositórios. Se suspeitar de exposição, gere outro nas configurações do Clipey.
- Depois de regenerar o token, atualize as configurações locais de cada cliente; as conexões que guardam o token anterior deixam de funcionar.
- Ao usar HTTP, mantenha o endereço restrito a `127.0.0.1`; não exponha a porta na rede.
- No modo stdio, encerre o cliente que iniciou o processo quando terminar de usar a conexão.
- Se o projeto não aparecer, verifique se o editor está aberto, se o HTTP está habilitado ou se o cliente iniciou o transporte correto.

## Limitações

O MCP não é uma sessão remota de desktop. O que o agente consegue fazer depende das ferramentas registradas, das permissões e do projeto disponível naquele modo. As alterações precisam ser revisadas. A transcrição é local, mas o conteúdo enviado a um modelo externo pelo cliente de IA obedece às regras desse cliente, não apenas às configurações de privacidade do Clipey.

Para entender o que fica local e o que pode sair do computador, leia [privacidade no Clipey](/blog/privacidade-no-clipey-o-que-fica-no-seu-pc/). Para preparar o arquivo final, veja [como revisar uma exportação](/blog/exportacao-confiavel-presets-e-verificacao/). Consulte também os [recursos de IA](/#ia).

Depois de conectar o cliente, teste uma leitura simples e confirme o projeto antes de solicitar edições. [Baixe o Clipey](/#download) para começar com um projeto local.

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
