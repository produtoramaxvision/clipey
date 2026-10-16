---
title: "Privacidade no Clipey: o que fica no seu PC"
description: "Entenda o que gravação e transcrição processam localmente, o que revisar nos diagnósticos e quando um provedor externo de IA participa."
slug: "privacidade-no-clipey-o-que-fica-no-seu-pc"
lang: "pt-BR"
translationKey: "privacidade-no-clipey-o-que-fica-no-seu-pc"
category: "guias"
tags: ["Privacidade", "Windows", "Edição com IA"]
author: "Equipe Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 17
cover: "/blog/covers/privacidade-no-clipey-o-que-fica-no-seu-pc.webp"
coverAlt: "Ajustes de privacidade e fluxo de mídia local no Clipey"
ogImage: "/blog/og/privacidade-no-clipey-o-que-fica-no-seu-pc.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 para Windows.

No Clipey, todas as gravações de tela, edições de linha do tempo e transcrições de fala com modelos Whisper rodam inteiramente no seu computador sem enviar dados para a nuvem. Conexões externas ocorrem apenas se você configurar intencionalmente provedores remotos de IA ou acionar a publicação em redes sociais. Arquivos de diagnóstico gerados para suporte não contêm gravações de vídeo e devem ser inspecionados antes do envio para proteger dados do sistema.

## Gravações e arquivos do projeto

As gravações de tela e as mídias do projeto são processadas pelo aplicativo de desktop no seu computador. O documento do projeto referencia os arquivos de mídia e mantém o estado da edição, como clipes e legendas. Ao mover um projeto, leve também os arquivos de origem: o editor precisa deles para reconstruir o resultado.

Isso também ajuda a separar o arquivo do projeto da mídia original. O documento não é necessariamente um vídeo consolidado: ele descreve o trabalho e aponta para os recursos usados. Mantenha cópias dos dois antes de liberar espaço ou apagar uma gravação que serviu de origem.

Para transcrever, o Clipey usa um modelo de fala local. No primeiro uso, pode ser necessário preparar os arquivos do modelo; depois, esses recursos baixados podem ser reutilizados a partir da pasta local de modelos. Isso é diferente de enviar a gravação a um serviço hospedado. Processamento local também não significa resultado instantâneo: materiais mais longos podem levar tempo, dependendo do computador.

## Saiba quando há um provedor externo

Algumas operações de IA usam o provedor configurado no Clipey. Antes de pedir um resultado, confira o provedor e a descrição da função selecionada. Não presuma que tudo usa o caminho local de transcrição só porque o editor é um aplicativo de desktop. Quando você conecta um cliente externo de IA ou MCP, também se aplicam as práticas desse cliente e do provedor dele.

Se o fluxo pedir credenciais de uma conta externa, trate-as como segredos e não as inclua em capturas de tela nem em arquivos de projeto compartilhados. Para compreender a diferença entre uma operação local e uma chamada feita por um provedor, procure a indicação da função específica em vez de aplicar uma regra geral a todas as ferramentas.

## Revise as exportações de diagnóstico

Antes de gravar um pacote de diagnóstico, o Clipey oculta automaticamente segredos reconhecidos, tokens bearer e OAuth, endereços de e-mail, nomes de usuário do Windows em caminhos e texto de transcrições. A transcrição é excluída por padrão; você pode optar por incluí-la na exportação. A proteção usa padrões e não remove todos os dados identificáveis, então confira o arquivo antes de compartilhá-lo.

1. Exporte diagnósticos somente quando forem necessários para suporte ou investigação.
2. Abra o arquivo gerado e confira o conteúdo antes de anexá-lo.
3. Confirme se a transcrição só foi incluída quando necessária e remova os dados identificáveis que ainda estiverem presentes.
4. Compartilhe apenas pelo canal de suporte que você pretendia usar.

Se um relatório envolver um erro de exportação, descreva as configurações escolhidas e o ponto em que o problema aparece. Assim, pode ser possível reproduzi-lo sem compartilhar o vídeo completo. Se o arquivo de diagnóstico incluir caminhos locais, nomes de projeto ou trechos de texto, considere se esses dados são necessários para a investigação antes de enviar.

Se o relatório envolve uma falha de transcrição ou edição, descreva os passos para reproduzi-la e a versão do aplicativo. Evite anexar a gravação inteira quando um trecho pequeno, sem conteúdo sensível, for suficiente. Se precisar enviar um exemplo de mídia, escolha conscientemente o arquivo e confirme que tem autorização para compartilhá-lo.

## Dicas

- Não inclua tokens de acesso ou credenciais de provedores em capturas de tela, nomes de projeto ou mensagens de suporte.
- Use a transcrição local quando esse for o caminho selecionado e confira o provedor antes de acionar outros recursos de IA.
- Guarde as gravações originais separadamente se precisar de uma fonte recuperável; o projeto editado não substitui um backup.
- Se um cliente MCP usar o próprio provedor de IA, confira as práticas desse provedor à parte.

## Limitações

Transcrição no dispositivo não quer dizer que todos os recursos funcionem sem conexão. Recursos apoiados por provedores dependem do serviço configurado e podem exigir conta ou rede. A redação automática reconhece padrões específicos de segredos e caminhos; não garante anonimizar todo o pacote. Confira o arquivo exportado antes de compartilhá-lo.

Para conectar agentes, leia [configuração e permissões MCP](/blog/clipey-com-agentes-de-ia-mcp/). Para iniciar uma gravação local, veja [primeiros passos no Clipey](/blog/primeiros-passos-no-clipey/). Consulte as informações de [privacidade](/#privacidade).

Antes de compartilhar diagnósticos, inspecione o pacote real. [Baixe o Clipey](/#download) para trabalhar com gravações e projetos no seu próprio fluxo.

## Histórico desta página

- 2026-10-15: publicado.
