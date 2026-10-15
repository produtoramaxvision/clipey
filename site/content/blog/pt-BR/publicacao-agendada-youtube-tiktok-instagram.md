---
title: "Como agendar publicações de vídeo no Clipey"
description: "Agende um vídeo para YouTube, TikTok, Instagram ou Facebook, confira o horário local e saiba por que o Clipey precisa continuar aberto."
slug: "publicacao-agendada-youtube-tiktok-instagram"
lang: "pt-BR"
translationKey: "publicacao-agendada-youtube-tiktok-instagram"
category: "tutoriais"
tags: ["Publicação", "Windows"]
author: "Equipe Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 13
cover: "/blog/covers/publicacao-agendada-youtube-tiktok-instagram.webp"
coverAlt: "Fila de publicações agendadas no Clipey"
ogImage: "/blog/og/publicacao-agendada-youtube-tiktok-instagram.png"
appliesTo: "1.15"
---

> **Aplica-se a:** Clipey 1.15 para Windows.

Agendar não é o mesmo que enviar o arquivo para um serviço de nuvem. O Clipey mantém uma fila local e envia o vídeo quando o horário chega. Por isso, o computador e o aplicativo precisam estar disponíveis. Este guia mostra como preparar um MP4 ou MOV, escolher o destino e conferir a fila antes de fechar o editor.

## Antes de marcar um horário

Conclua a edição e exporte o vídeo primeiro. A publicação agendada usa o arquivo exportado e os campos de título e descrição do painel de publicação. Os destinos exibidos são YouTube, Facebook, Instagram e TikTok; cada rede exige uma conta conectada e pode pedir opções adicionais. A disponibilidade de uma conta não significa que todas as páginas ou perfis estejam prontos: o Clipey mostra estados como conta desconectada, sessão expirada ou ausência de página do Instagram.

Também escolha um horário que faça sentido no fuso local do computador. A interface mostra o nome do fuso detectado e a data é escolhida em um campo de data e hora local. Não copie um horário de outro fuso sem convertê-lo antes.

## Passo a passo

1. No editor, finalize o projeto e escolha **Exportar**. Espere o arquivo terminar de ser criado.
2. Na etapa de publicação, conecte a rede desejada se ainda não estiver conectada. O login é feito no navegador padrão; depois, volte ao Clipey e confirme que a conta aparece como conectada.
3. Preencha **Título** e **Descrição**. Revise o texto e selecione a privacidade ou a página quando essas opções aparecerem para a rede escolhida.
4. Abra a aba **Agendar**. O campo **Data e hora** mostra a data no horário local. Escolha um horário pelo menos dois minutos à frente; horários inválidos ou próximos demais são recusados.
5. Se desejar que o Clipey abra junto com o Windows, marque **Abrir ao iniciar**. Isso ajuda a retomar a fila após reiniciar, mas não substitui manter o aplicativo funcionando quando a publicação vencer.
6. Acione o agendamento para a rede pretendida. A linha muda para um estado agendado e a publicação passa a aparecer na fila.
7. Confira a **Fila de agendamentos**. Cada item mostra a rede, o título, o estado e o horário. Use **Atualizar fila** se quiser buscar novamente os dados.

Na fila, um item agendado pode ser cancelado ou remarcado. Itens com falha, publicação perdida ou necessidade de reconexão podem oferecer **Publicar agora** ou **Reagendar**, dependendo do estado. Se a sessão expirou, reconecte a conta antes de tentar de novo.

## O que acontece quando chega a hora

O Clipey verifica a fila enquanto está em execução e tenta publicar o item vencido. A tela pode exibir progresso de envio, processamento, sucesso ou uma mensagem de falha. A publicação também depende da rede social aceitar o arquivo, a conta e as permissões; o agendamento não garante que a plataforma aprove o conteúdo.

Se o computador suspender, desligar ou o aplicativo for encerrado, não conte com um envio em segundo plano na nuvem. A política de recuperação não publica automaticamente itens vencidos enquanto o app estava fechado: ao iniciar, eles são marcados como **Perdido** para revisão. Isso evita publicar um vídeo num horário inesperado depois de uma longa interrupção.

O comportamento da bandeja importa: fechar a janela principal pode deixar o Clipey na bandeja do Windows, mas sair pelo menu do ícone encerra o aplicativo. Antes de um agendamento importante, confira se o aplicativo continua na bandeja e se o Windows não está programado para dormir.

## Dicas

- Faça uma publicação de teste com antecedência e veja se o destino, a conta e a privacidade selecionada são os esperados.
- Prefira horários com margem para ligar o computador e corrigir uma sessão expirada.
- Use **Reagendar** se precisar ajustar um item da fila; cancelar e criar outro não é necessário quando o item ainda pode ser editado pela fila.
- Um status **Publicado** e um link de resultado indicam que o processo retornou sucesso; abra o link para conferir o post na própria plataforma.
- Se o arquivo mudou depois de agendar, exporte a versão final novamente e revise qual arquivo o item usa antes de depender dele.

## Limitações

O agendamento é local ao Clipey e exige que o app esteja em execução no horário. **Abrir ao iniciar** é uma conveniência do Windows, não um serviço remoto nem uma garantia de que o computador permanecerá acordado. Itens vencidos durante um período fechado são marcados como perdidos em vez de publicados automaticamente. As redes podem rejeitar conteúdo, exigir nova autorização ou impor regras próprias de formato e conta.

Para preparar um pacote de arquivos antes de publicar, leia [como salvar um kit de publicação](/blog/kit-de-publicacao-video-capas-textos/). Para conferir o arquivo final antes de enviá-lo, veja [presets e verificação da exportação](/blog/exportacao-confiavel-presets-e-verificacao/). Consulte também os [recursos de publicação](/#publicar).

Quando tiver revisado a fila e a conta, mantenha o Clipey aberto e o computador disponível até o horário escolhido. [Baixe o Clipey](/#download) se ainda não tiver a versão 1.15.

## Histórico desta página

- {{RELEASE_DATE}}: publicado.
