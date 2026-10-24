/**
 * Copy of the v3 landing, one object per site language. pt-BR is the owner-approved design text (Claude Design canvas,
 * Main.dc.html and Mobile.dc.html); en and es translate it without adding claims. Facts it relies on: interface in 15
 * languages, captions translated into 15 languages, Windows/macOS/Linux, installers unsigned in this version, publishing
 * to YouTube, Instagram, Facebook and TikTok in 1.15, with the platform reviews still pending (unverified-app warning).
 *
 * `hud.labels` are the recording bar's own strings, copied verbatim from the app locale files
 * (src/i18n/locales/<lang>/launch.json), in the order of the buttons on the bar:
 *   1 recording.selectSource   2 audio.systemAudio   3 audio.microphone   4 webcam.camera
 *   5 deviceSettings.title     6 cursor.name         7 recording.start    8 tooltips.openStudio
 *   9 tooltips.openNotes      10 languageWithName, with the language written in itself
 */
export const LANDING = {
	"pt-BR": {
		nav: {
			aria: "Seções",
			items: [
				["record", "Gravar"],
				["edit", "Editar"],
				["agents", "Agentes"],
				["games", "Games"],
				["publish", "Publicar"],
				["phone", "No celular"],
			],
			blog: "Blog",
			download: "Baixar grátis",
			downloadShort: "Baixar",
		},
		hero: {
			rec: "REC 00:00:00",
			platforms: "para Windows, macOS e Linux",
			title: ["Grave a tela.", "O Clipey", "edita", "e clipa."],
			sub: "A IA corta os silêncios, dá zoom em cada clique e legenda em 15 idiomas. O Auto Clip encontra os melhores momentos e entrega clipes verticais prontos para Shorts, Reels e TikTok. Gratuito, com seus arquivos no seu computador.",
			cta: ["Baixar para Windows", "macOS e Linux"],
			ctaPhone: ["Baixar para o computador", "Usar no celular com o PC"],
			meta: "Versão {version} · interface em 15 idiomas · download gratuito · instaladores sem assinatura nesta versão",
			timelineAria: "Do gravar ao publicar",
			ticks: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"],
			lanes: [
				["record", "Gravar", "00:00"],
				["edit", "Editar", "Zoom 1,8×"],
				["clip", "Clipar", "3 clipes"],
				["publish", "Publicar", ""],
			],
			videoLabel:
				"O editor do Clipey em uso: fundos, proporção, moldura, sombra, zoom e velocidade na linha do tempo, painéis e reprodução",
			caption:
				"Gravado no Clipey {version} de verdade · cada clique muda a prévia e a linha do tempo",
		},
		compat: {
			aria: "Compatibilidade",
			list: "Plataformas, sistemas e idiomas",
			groups: [
				["PUBLICA EM", ["Instagram", "Facebook", "TikTok"]],
				["RODA EM", ["Windows 10 e 11", "macOS", "Linux"]],
				["FALA", ["15 idiomas"]],
			],
			langs: ["PT", "EN", "ES", "FR", "DE", "IT", "日本語", "한국어", "中文"],
			pause: "Pausar a faixa de plataformas",
			play: "Retomar a faixa de plataformas",
		},
		record: {
			marker: "00:00 · GRAVAR",
			title: "Uma barra. Nenhum projeto para criar antes.",
			text: "Escolha a tela ou a janela, ligue câmera e microfone se quiser e grave. O Clipey registra o cursor e os cliques junto com o vídeo, então a edição começa pronta.",
			list: [
				"Tela inteira ou janela",
				"Áudio do sistema",
				"Microfone e câmera",
				"Cursor e cliques gravados",
			],
			hud: {
				alt: "Barra de gravação do Clipey: tela, áudio do sistema, microfone, câmera, dispositivos, cursor editável, gravar, abrir Studio, notas e idioma",
				legendAria: "Botões da barra de gravação",
				labels: [
					"Escolha uma tela ou janela para gravar",
					"Áudio do sistema",
					"Microfone",
					"Câmera",
					"Configurações de dispositivos",
					"Cursor editável",
					"Iniciar gravação",
					"Abrir Studio: o editor das suas gravações",
					"Abrir notas: texto para ler durante a gravação",
					"Idioma: Português",
				],
				pause: "Pausar a demonstração da barra",
				play: "Retomar a demonstração da barra",
				caption: "Barra real do Clipey {version} · os rótulos são os do app",
			},
		},
		edit: {
			marker: "00:21 · O QUE O CLIPEY FAZ POR VOCÊ",
			title: ["Tudo o que um editor faria.", "Só que sozinho."],
			text: "Escolha uma aba e veja cada recurso funcionando, do jeito que ele aparece no app. Sem termos técnicos: três passos e pronto.",
			tabsAria: "Recursos do Clipey",
			pause: "Pausar as animações das abas",
			play: "Retomar as animações das abas",
			tabs: {
				edit: {
					label: "Edição automática",
					title: "Você grava. O vídeo sai editado.",
					steps: [
						[
							"Grave como sempre",
							"Enquanto você usa o computador, o Clipey anota onde cada clique aconteceu.",
						],
						[
							"Abra o editor",
							"Cada clique já virou um zoom suave. Você não marca nada.",
						],
						[
							"Ajuste se quiser",
							"As partes paradas ficam 2× mais rápidas. Arraste, apague ou desfaça com Ctrl+Z.",
						],
					],
					also: [
						"Fundos, molduras e sombra prontos",
						"16:9, 9:16 ou 1:1 em um clique",
						"Anotações e setas na tela",
						"Corte qualquer trecho com uma tecla",
					],
					videoLabel:
						"No Clipey: um zoom e um trecho 2× são criados e tocam na prévia, depois o formato vertical",
				},
				clip: {
					label: "Auto Clip",
					title: "Um vídeo longo vira clipes prontos para postar.",
					steps: [
						[
							"Abra o vídeo longo",
							"Live, aula, podcast ou reunião. O Clipey escreve tudo o que foi falado.",
						],
						[
							"A IA marca os melhores trechos",
							"Ela procura frases de impacto, perguntas que geram debate e dicas, e dá a cada trecho uma nota de 0 a 100 com o motivo.",
						],
						[
							"Você só aprova",
							"Cada trecho já vira um clipe em pé (9:16), com legenda e o rosto no centro. Mantenha ou rejeite e clique em “Aplicar clipes aceitos”.",
						],
					],
					also: [
						"15–30 s, 30–60 s ou 60–90 s",
						"O rosto de quem fala sempre no quadro",
						"Dois falantes divididos na tela",
						"Revise os clipes pelo celular",
					],
					stage: {
						file: "Live de terça.mp4",
						duration: "42 min",
						status: [
							"1 de 3 · Lendo o que foi falado",
							"2 de 3 · Escolhendo os melhores momentos",
							"3 de 3 · Clipes prontos para você revisar",
						],
						transcriptAria: "Trecho da transcrição com três destaques marcados",
						lines: [
							["…passei três anos editando tudo na mão.", ""],
							["E foi aí que tudo mudou.", "frase de impacto · 92"],
							["Muita gente me pergunta qual programa eu uso.", ""],
							[
								"Live longa, ninguém assiste inteira. Concorda?",
								"pergunta que gera debate · 87",
							],
							["Hoje eu gravo, e o resto sai sozinho.", ""],
							["Em três cliques o corte está pronto.", "dica prática · 84"],
						],
						clips: [
							["e foi aí que", "tudo mudou", ""],
							["ninguém assiste", "inteira?", ""],
							["em ", "3 cliques", "está pronto"],
						],
						clipsAria:
							"Três clipes verticais com nota: dois mantidos, um rejeitado",
						keep: "✓ Mantido",
						reject: "Rejeitado",
						apply: "Aplicar clipes aceitos (2)",
					},
				},
				cap: {
					label: "Legendas",
					title: "Legendas certas, em qualquer idioma.",
					steps: [
						[
							"O Clipey escuta o vídeo",
							"E escreve tudo o que foi falado. A transcrição pode rodar inteira no seu computador.",
						],
						[
							"Corrija com dois cliques",
							"Errou uma palavra? Clique duas vezes nela e digite. Apagar a palavra corta o trecho do vídeo junto.",
						],
						[
							"Escolha o visual e o idioma",
							"Estilo, cor e posição. Traduza para outro idioma com um clique, sem perder o tempo das falas.",
						],
					],
					also: [
						"Palavra por palavra, estilo karaokê",
						"15 idiomas de tradução",
						"Importe legendas que você já tem",
						"Fontes, tamanhos e cores livres",
					],
					stage: {
						tagOriginal: "Fala original · inglês",
						tagTranslated: "Legenda traduzida · português",
						original: "To move a task forward, just drag its card.",
						translated: "Para avançar uma tarefa, basta arrastar o cartão.",
						target: "Português",
						shotAlt: "Prévia do Clipey tocando um tutorial",
						paneAlt:
							"Painel Legendas do Clipey: estilo, idioma e tradução para o português",
					},
				},
				voice: {
					label: "Voz e dublagem",
					title: "O mesmo vídeo, falando outro idioma.",
					steps: [
						["Escolha uma voz", "Uma voz pronta ou a sua própria, clonada."],
						["Escolha o idioma", "Português, inglês, espanhol e mais 11."],
						[
							"Clique em “Gerar dublagem”",
							"O vídeo passa a falar no novo idioma, cada frase no tempo certo.",
						],
					],
					also: [
						"ElevenLabs, OpenAI, Gemini e Grok",
						"Abaixe o som original ou substitua",
						"Narração a partir de um texto",
						"Limite de gastos por sessão",
					],
					stage: {
						tagOriginal: "EN · original",
						tagDub: "PT-BR · sua voz",
						original: "“To move a task forward, just drag its card.”",
						dub: "“Para avançar uma tarefa, basta arrastar o cartão.”",
						tracksAria:
							"Linha do tempo: o som original é substituído pela dublagem",
						lanes: ["Som original", "Dublagem"],
						states: [
							["tocando", "substituído"],
							["gerando…", "pronta"],
						],
						meta: "Voz clonada da sua gravação · cada frase cai no mesmo tempo da original",
					},
				},
				cam: {
					label: "Câmera",
					title: "Seu rosto, do jeito certo.",
					steps: [
						[
							"Ligue a webcam na gravação",
							"Ela é salva separada da tela, para você mexer depois.",
						],
						[
							"Escolha o layout",
							"Janelinha no canto, empilhado para vídeos em pé ou lado a lado.",
						],
						[
							"Cuide do fundo",
							"Desfoque, troque ou recorte só o seu contorno.",
						],
					],
					also: [
						"Câmera em tela cheia nos trechos que você quiser",
						"A câmera encolhe quando o vídeo dá zoom",
						"Formato redondo, quadrado ou original",
						"Espelhar a imagem",
					],
					stage: {
						aria: "Três layouts de câmera: janelinha no canto, empilhado e lado a lado",
						layouts: [
							"Janelinha no canto",
							"Empilhado para vídeo em pé",
							"Tela e rosto lado a lado",
						],
					},
				},
			},
			captionsLabel: "Legendas do Clipey traduzidas para 15 idiomas",
			captionsCaption:
				"Legendas em 15 idiomas · transcrição editável palavra por palavra",
		},
		agents: {
			marker: "EDIÇÃO AGÊNTICA · MCP",
			title: ["Peça em português.", "Seu agente edita no Clipey."],
			text: "Ligue o servidor MCP nas configurações e conecte o assistente de IA que você já usa. Ele grava, corta, legenda e publica com as ferramentas do próprio Clipey.",
			chatAria: "Exemplo de conversa: o agente edita no Clipey",
			assistant: "Seu assistente de IA",
			connected: "Clipey conectado",
			ask: "Grave a demonstração do checkout, tire as pausas e me dê 3 clipes em pé para o Reels.",
			reply: "Claro. Vou fazer tudo no Clipey:",
			tools: [
				["Gravando a janela “Checkout”", "2:14"],
				["Tirando as pausas", "−0:31"],
				["Zoom em cada clique", "9 zooms"],
				["Encontrando os melhores trechos", "3 clipes"],
				["Exportando em 9:16", "3 MP4"],
				["Agendando no Instagram", "hoje 18:00"],
			],
			done: "Pronto! Os 3 clipes saem hoje às 18:00. Quer revisar antes no Clipey?",
			editorAlt: "O editor do Clipey recebendo as edições do agente",
			caption:
				"À direita, o Clipey de verdade: cada pedido aparece na linha do tempo enquanto o agente trabalha.",
			railTitle: "FUNCIONA COM QUALQUER AGENTE QUE FALE MCP",
			note: "O agente entra com a conta dele; o Clipey nunca vê as suas chaves. Por padrão ele só lê seus projetos: gravar, editar e exportar dependem de você liberar. Comando pronto para Claude Code e Codex nas configurações.",
			pause: "Pausar a demonstração do agente",
			play: "Retomar a demonstração do agente",
		},
		games: {
			marker: "GAMES, WEBCAM E MAIS",
			title: "Seu controle aparece no vídeo.",
			text: "Grave a partida com o controle na tela, cada botão acendendo na hora certa. Ou mostre os atalhos do teclado e desenhe por cima enquanto explica.",
			list: [
				"Controle de PlayStation, Xbox, Switch ou genérico, com analógicos e a força dos gatilhos",
				"Atalhos de teclado aparecem na tela enquanto você digita",
				"Desenhe na tela durante a gravação",
				"Grave em até 4K e exporte a 60 quadros por segundo",
				"Cursor 3D com rastro ao arrastar",
			],
			keys: "atalhos na tela, ao vivo",
			rec: "REC 4K · 60 fps",
			videoLabel:
				"Gameplay de Session: Skate Sim e MTG gravado com a sobreposição do controle",
			credit:
				"Gameplay: {session} (crea-ture Studios / Nacon) e {mtg} (Virtual MX Studios), trailers oficiais.",
			pad: {
				title: "Gameplay com controle",
				body: "O controle aparece no canto do vídeo: cada botão acende quando é apertado e os gatilhos mostram a força.",
				chips: [
					"Gatilho mostra a força",
					"Botão apertado acende",
					"Analógico mostra a direção",
				],
				pressed: "apertado",
			},
			cam: {
				title: "Aula com webcam",
				body: "Seu rosto fica num canto, redondo ou quadrado. Quando o vídeo dá zoom, a câmera encolhe para não tapar nada.",
				chips: ["Câmera no canto da aula", "Zoom no clique: a câmera encolhe"],
				alt: "Tela de uma aula gravada no Clipey",
			},
			draw: {
				title: "Tutorial com desenhos e atalhos",
				body: "Desenhe setas e círculos enquanto grava. Quem assiste vê o traço e cada atalho que você apertou.",
				label: "Clique aqui",
				alt: "Tela de um tutorial gravado no Clipey",
			},
			pause: "Pausar as demonstrações",
			play: "Retomar as demonstrações",
		},
		publish: {
			marker: "01:12 · PUBLICAR",
			title: "YouTube, Instagram, Facebook e TikTok.",
			text: "Exporte em MP4 ou GIF e, quando a exportação terminar, clique em Publicar em cada rede que quiser usar — ou agende o horário. As contas ficam salvas só no seu computador.",
			note: "O YouTube, a Meta e o TikTok ainda estão revisando o app: ao conectar uma conta, pode aparecer um aviso de app não verificado.",
			alt: "Janela Exportar e publicar do Clipey",
		},
		phone: {
			marker: "NO CELULAR",
			title: "O celular vira o controle do estúdio.",
			text: "Pareie pelo código QR e controle a gravação no computador, revise os cortes automáticos e ajuste legendas de onde estiver. No Android, há o app; no iPhone, o navegador.",
			rotate: "Ver na horizontal",
			portrait: "O Clipey no celular, em pé: a tela Início",
			landscape: "O Clipey no celular, deitado: o editor",
		},
		local: {
			marker: "SEU PC",
			title: "A transcrição pode rodar inteira no seu computador.",
			text: "Seus vídeos ficam nos seus arquivos. Os recursos de IA na nuvem usam a sua chave ou créditos, e você escolhe quando usar.",
			link: "Como tratamos seus dados",
			alt: "Configurações do Clipey: transcrição neste computador",
		},
		download: {
			marker: "01:30 · FIM DA EDIÇÃO",
			title: "Download",
			aria: "Baixar o Clipey",
			buttons: [
				"Baixar para Windows",
				"Baixar para macOS",
				"Baixar para Linux",
			],
		},
		footer: { support: "Suporte" },
		video: { pause: "Pausar vídeo", play: "Reproduzir vídeo" },
	},
	en: {
		nav: {
			aria: "Sections",
			items: [
				["record", "Record"],
				["edit", "Edit"],
				["agents", "Agents"],
				["games", "Games"],
				["publish", "Publish"],
				["phone", "On your phone"],
			],
			blog: "Blog",
			download: "Download free",
			downloadShort: "Download",
		},
		hero: {
			rec: "REC 00:00:00",
			platforms: "for Windows, macOS and Linux",
			title: ["Record your screen.", "Clipey", "edits", "and clips."],
			sub: "AI cuts the silences, zooms in on every click and captions in 15 languages. Auto Clip finds the best moments and hands you vertical clips ready for Shorts, Reels and TikTok. Free, with your files on your computer.",
			cta: ["Download for Windows", "macOS and Linux"],
			ctaPhone: [
				"Download for your computer",
				"Use it on your phone with your PC",
			],
			meta: "Version {version} · interface in 15 languages · free download · installers unsigned in this version",
			timelineAria: "From recording to publishing",
			ticks: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"],
			lanes: [
				["record", "Record", "00:00"],
				["edit", "Edit", "Zoom 1.8×"],
				["clip", "Clip", "3 clips"],
				["publish", "Publish", ""],
			],
			videoLabel:
				"The Clipey editor in use: backgrounds, aspect ratio, frame, shadow, zoom and speed on the timeline, panels and playback",
			caption:
				"Recorded in the real Clipey {version} · every click changes the preview and the timeline",
		},
		compat: {
			aria: "Compatibility",
			list: "Platforms, systems and languages",
			groups: [
				["PUBLISHES TO", ["Instagram", "Facebook", "TikTok"]],
				["RUNS ON", ["Windows 10 and 11", "macOS", "Linux"]],
				["SPEAKS", ["15 languages"]],
			],
			langs: ["PT", "EN", "ES", "FR", "DE", "IT", "日本語", "한국어", "中文"],
			pause: "Pause the platforms strip",
			play: "Resume the platforms strip",
		},
		record: {
			marker: "00:00 · RECORD",
			title: "One bar. No project to set up first.",
			text: "Pick the screen or the window, turn on the camera and microphone if you want, and record. Clipey records the cursor and the clicks along with the video, so the edit starts ready.",
			list: [
				"Full screen or window",
				"System audio",
				"Microphone and camera",
				"Cursor and clicks recorded",
			],
			hud: {
				alt: "The Clipey recording bar: screen, system audio, microphone, camera, devices, editable cursor, record, open Studio, notes and language",
				legendAria: "Buttons of the recording bar",
				labels: [
					"Choose a screen or window to record",
					"System audio",
					"Microphone",
					"Camera",
					"Device settings",
					"Editable cursor",
					"Start recording",
					"Open Studio: the editor for your recordings",
					"Open Notes: text to read while you record",
					"Language: English",
				],
				pause: "Pause the recording bar demo",
				play: "Resume the recording bar demo",
				caption: "The real Clipey {version} bar · the labels are the app's own",
			},
		},
		edit: {
			marker: "00:21 · WHAT CLIPEY DOES FOR YOU",
			title: ["Everything an editor would do.", "On its own."],
			text: "Pick a tab and watch each feature at work, the way it looks in the app. No jargon: three steps and you're done.",
			tabsAria: "Clipey features",
			pause: "Pause the tab animations",
			play: "Resume the tab animations",
			tabs: {
				edit: {
					label: "Automatic editing",
					title: "You record. The video comes out edited.",
					steps: [
						[
							"Record as usual",
							"While you use your computer, Clipey notes where every click happened.",
						],
						[
							"Open the editor",
							"Every click is already a smooth zoom. You don't mark a thing.",
						],
						[
							"Adjust if you like",
							"The still parts play 2× faster. Drag, delete or undo with Ctrl+Z.",
						],
					],
					also: [
						"Backgrounds, frames and shadow ready",
						"16:9, 9:16 or 1:1 in one click",
						"Notes and arrows on screen",
						"Cut any part with one key",
					],
					videoLabel:
						"In Clipey: a zoom and a 2× part are created and play in the preview, then the vertical format",
				},
				clip: {
					label: "Auto Clip",
					title: "A long video becomes clips ready to post.",
					steps: [
						[
							"Open the long video",
							"A stream, class, podcast or meeting. Clipey writes down everything that was said.",
						],
						[
							"The AI marks the best parts",
							"It looks for strong lines, questions that spark debate and tips, and gives each part a score from 0 to 100 with the reason.",
						],
						[
							"You just approve",
							"Each part is already an upright (9:16) clip with captions and the face centred. Keep or reject, then click “Apply accepted clips”.",
						],
					],
					also: [
						"15–30 s, 30–60 s or 60–90 s",
						"The speaker's face always in frame",
						"Two speakers split on screen",
						"Review the clips on your phone",
					],
					stage: {
						file: "Tuesday stream.mp4",
						duration: "42 min",
						status: [
							"1 of 3 · Reading what was said",
							"2 of 3 · Picking the best moments",
							"3 of 3 · Clips ready for you to review",
						],
						transcriptAria:
							"Part of the transcript with three highlights marked",
						lines: [
							["…I spent three years editing everything by hand.", ""],
							["And that's when everything changed.", "strong line · 92"],
							["Lots of people ask me which app I use.", ""],
							[
								"Nobody watches a long stream to the end. Agree?",
								"question that sparks debate · 87",
							],
							["Now I just record, and the rest happens on its own.", ""],
							["In three clicks the clip is ready.", "practical tip · 84"],
						],
						clips: [
							["and that's when", "everything changed", ""],
							["nobody watches", "to the end?", ""],
							["", "3 clicks", "and it's ready"],
						],
						clipsAria:
							"Three vertical clips with a score: two kept, one rejected",
						keep: "✓ Kept",
						reject: "Rejected",
						apply: "Apply accepted clips (2)",
					},
				},
				cap: {
					label: "Captions",
					title: "Accurate captions, in any language.",
					steps: [
						[
							"Clipey listens to the video",
							"And writes down everything that was said. Transcription can run entirely on your computer.",
						],
						[
							"Fix it with a double click",
							"Got a word wrong? Double-click it and type. Deleting a word cuts that bit of the video too.",
						],
						[
							"Pick the look and the language",
							"Style, colour and position. Translate into another language in one click, keeping the timing of every line.",
						],
					],
					also: [
						"Word by word, karaoke style",
						"Translation into 15 languages",
						"Import captions you already have",
						"Any font, size and colour",
					],
					stage: {
						tagOriginal: "Original speech · English",
						tagTranslated: "Translated captions · Spanish",
						original: "To move a task forward, just drag its card.",
						translated: "Para avanzar una tarea, solo arrastra su tarjeta.",
						target: "Español",
						shotAlt: "The Clipey preview playing a tutorial",
						paneAlt:
							"The Clipey Captions pane: style, language and a translation into Spanish",
					},
				},
				voice: {
					label: "Voice and dubbing",
					title: "The same video, speaking another language.",
					steps: [
						["Pick a voice", "A ready-made voice or your own, cloned."],
						["Pick the language", "Portuguese, English, Spanish and 11 more."],
						[
							"Click “Generate dub”",
							"The video now speaks the new language, every line on time.",
						],
					],
					also: [
						"ElevenLabs, OpenAI, Gemini and Grok",
						"Lower the original sound or replace it",
						"Narration from a script",
						"Spending limit per session",
					],
					stage: {
						tagOriginal: "EN · original",
						tagDub: "ES · your voice",
						original: "“To move a task forward, just drag its card.”",
						dub: "“Para avanzar una tarea, solo arrastra su tarjeta.”",
						tracksAria: "Timeline: the original sound is replaced by the dub",
						lanes: ["Original sound", "Dub"],
						states: [
							["playing", "replaced"],
							["generating…", "ready"],
						],
						meta: "A voice cloned from your recording · every line lands at the same time as the original",
					},
				},
				cam: {
					label: "Camera",
					title: "Your face, the right way.",
					steps: [
						[
							"Turn on the webcam when you record",
							"It's saved apart from the screen, so you can change it later.",
						],
						[
							"Pick the layout",
							"A small window in the corner, stacked for upright videos, or side by side.",
						],
						[
							"Take care of the background",
							"Blur it, replace it or cut out just your outline.",
						],
					],
					also: [
						"Full-screen camera on the parts you choose",
						"The camera shrinks when the video zooms",
						"Round, square or original shape",
						"Mirror the image",
					],
					stage: {
						aria: "Three camera layouts: a small window in the corner, stacked and side by side",
						layouts: [
							"Small window in the corner",
							"Stacked for upright video",
							"Screen and face side by side",
						],
					},
				},
			},
			captionsLabel: "Clipey captions translated into 15 languages",
			captionsCaption:
				"Captions in 15 languages · a transcript you can edit word by word",
		},
		agents: {
			marker: "AGENTIC EDITING · MCP",
			title: ["Ask in plain English.", "Your agent edits in Clipey."],
			text: "Turn on the MCP server in the settings and connect the AI assistant you already use. It records, cuts, captions and publishes with Clipey's own tools.",
			chatAria: "Example conversation: the agent edits in Clipey",
			assistant: "Your AI assistant",
			connected: "Clipey connected",
			ask: "Record the checkout demo, take out the pauses and give me 3 upright clips for Reels.",
			reply: "Sure. I'll do it all in Clipey:",
			tools: [
				["Recording the “Checkout” window", "2:14"],
				["Taking out the pauses", "−0:31"],
				["Zoom on every click", "9 zooms"],
				["Finding the best parts", "3 clips"],
				["Exporting in 9:16", "3 MP4"],
				["Scheduling on Instagram", "today 6 pm"],
			],
			done: "Done! The 3 clips go out today at 6 pm. Want to review them in Clipey first?",
			editorAlt: "The Clipey editor receiving the agent's edits",
			caption:
				"On the right, the real Clipey: each request shows up on the timeline while the agent works.",
			railTitle: "WORKS WITH ANY AGENT THAT SPEAKS MCP",
			note: "The agent signs in with its own account; Clipey never sees your keys. By default it can only read your projects: recording, editing and exporting wait for you to allow them. A ready-made command for Claude Code and Codex is in the settings.",
			pause: "Pause the agent demo",
			play: "Resume the agent demo",
		},
		games: {
			marker: "GAMES, WEBCAM AND MORE",
			title: "Your controller shows up in the video.",
			text: "Record the match with the controller on screen, every button lighting up at the right moment. Or show your keyboard shortcuts and draw on top while you explain.",
			list: [
				"PlayStation, Xbox, Switch or generic controller, with sticks and trigger pressure",
				"Keyboard shortcuts appear on screen as you type",
				"Draw on the screen while you record",
				"Record in up to 4K and export at 60 frames per second",
				"3D cursor with a trail when you drag",
			],
			keys: "shortcuts on screen, live",
			rec: "REC 4K · 60 fps",
			videoLabel:
				"Session: Skate Sim and MTG gameplay recorded with the controller overlay",
			credit:
				"Gameplay: {session} (crea-ture Studios / Nacon) and {mtg} (Virtual MX Studios), official trailers.",
			pad: {
				title: "Gameplay with a controller",
				body: "The controller shows in a corner of the video: every button lights up when it's pressed and the triggers show how hard.",
				chips: [
					"Triggers show the pressure",
					"Pressed buttons light up",
					"Sticks show the direction",
				],
				pressed: "pressed",
			},
			cam: {
				title: "Class with a webcam",
				body: "Your face sits in a corner, round or square. When the video zooms, the camera shrinks so it covers nothing.",
				chips: [
					"Camera in the corner of the class",
					"Zoom on a click: the camera shrinks",
				],
				alt: "A class recorded in Clipey",
			},
			draw: {
				title: "Tutorial with drawings and shortcuts",
				body: "Draw arrows and circles while you record. Viewers see the stroke and every shortcut you pressed.",
				label: "Click here",
				alt: "A tutorial recorded in Clipey",
			},
			pause: "Pause the demos",
			play: "Resume the demos",
		},
		publish: {
			marker: "01:12 · PUBLISH",
			title: "YouTube, Instagram, Facebook and TikTok.",
			text: "Export as MP4 or GIF and, when the export finishes, click Publish on each network you want to use — or schedule a time. Your accounts are saved only on your computer.",
			note: "YouTube, Meta and TikTok are still reviewing the app: connecting an account may show an unverified-app warning.",
			alt: "The Clipey Export and publish window",
		},
		phone: {
			marker: "ON YOUR PHONE",
			title: "Your phone becomes the studio remote.",
			text: "Pair with the QR code and control the recording on your computer, review the automatic cuts and adjust captions from wherever you are. On Android there is the app; on iPhone, the browser.",
			rotate: "View in landscape",
			portrait: "Clipey on a phone, upright: the Home screen",
			landscape: "Clipey on a phone, sideways: the editor",
		},
		local: {
			marker: "YOUR PC",
			title: "Transcription can run entirely on your computer.",
			text: "Your videos stay in your files. Cloud AI features use your own key or credits, and you choose when to use them.",
			link: "How we handle your data",
			alt: "Clipey settings: transcription on this computer",
		},
		download: {
			marker: "01:30 · END OF THE EDIT",
			title: "Download",
			aria: "Download Clipey",
			buttons: [
				"Download for Windows",
				"Download for macOS",
				"Download for Linux",
			],
		},
		footer: { support: "Support" },
		video: { pause: "Pause video", play: "Play video" },
	},
	es: {
		nav: {
			aria: "Secciones",
			items: [
				["record", "Grabar"],
				["edit", "Editar"],
				["agents", "Agentes"],
				["games", "Juegos"],
				["publish", "Publicar"],
				["phone", "En el móvil"],
			],
			blog: "Blog",
			download: "Descargar gratis",
			downloadShort: "Descargar",
		},
		hero: {
			rec: "REC 00:00:00",
			platforms: "para Windows, macOS y Linux",
			title: ["Graba la pantalla.", "Clipey", "edita", "y crea clips."],
			sub: "La IA corta los silencios, hace zoom en cada clic y subtitula en 15 idiomas. Auto Clip encuentra los mejores momentos y te entrega clips verticales listos para Shorts, Reels y TikTok. Gratis, con tus archivos en tu computadora.",
			cta: ["Descargar para Windows", "macOS y Linux"],
			ctaPhone: ["Descargar para la computadora", "Usar en el móvil con la PC"],
			meta: "Versión {version} · interfaz en 15 idiomas · descarga gratuita · instaladores sin firmar en esta versión",
			timelineAria: "De grabar a publicar",
			ticks: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"],
			lanes: [
				["record", "Grabar", "00:00"],
				["edit", "Editar", "Zoom 1,8×"],
				["clip", "Clips", "3 clips"],
				["publish", "Publicar", ""],
			],
			videoLabel:
				"El editor de Clipey en uso: fondos, proporción, marco, sombra, zoom y velocidad en la línea de tiempo, paneles y reproducción",
			caption:
				"Grabado en Clipey {version} de verdad · cada clic cambia la vista previa y la línea de tiempo",
		},
		compat: {
			aria: "Compatibilidad",
			list: "Plataformas, sistemas e idiomas",
			groups: [
				["PUBLICA EN", ["Instagram", "Facebook", "TikTok"]],
				["FUNCIONA EN", ["Windows 10 y 11", "macOS", "Linux"]],
				["HABLA", ["15 idiomas"]],
			],
			langs: ["PT", "EN", "ES", "FR", "DE", "IT", "日本語", "한국어", "中文"],
			pause: "Pausar la franja de plataformas",
			play: "Reanudar la franja de plataformas",
		},
		record: {
			marker: "00:00 · GRABAR",
			title: "Una barra. Ningún proyecto que crear antes.",
			text: "Elige la pantalla o la ventana, activa la cámara y el micrófono si quieres y graba. Clipey registra el cursor y los clics junto con el video, así la edición empieza lista.",
			list: [
				"Pantalla completa o ventana",
				"Audio del sistema",
				"Micrófono y cámara",
				"Cursor y clics grabados",
			],
			hud: {
				alt: "La barra de grabación de Clipey: pantalla, audio del sistema, micrófono, cámara, dispositivos, cursor editable, grabar, abrir Studio, notas e idioma",
				legendAria: "Botones de la barra de grabación",
				labels: [
					"Por favor selecciona una fuente para grabar",
					"Audio del sistema",
					"Micrófono",
					"Cámara",
					"Ajustes de dispositivos",
					"Cursor editable",
					"Iniciar grabación",
					"Abrir Studio: el editor de tus grabaciones",
					"Abrir notas: texto para leer mientras grabas",
					"Idioma: Español",
				],
				pause: "Pausar la demostración de la barra",
				play: "Reanudar la demostración de la barra",
				caption:
					"La barra real de Clipey {version} · las etiquetas son las de la app",
			},
		},
		edit: {
			marker: "00:21 · LO QUE CLIPEY HACE POR TI",
			title: ["Todo lo que haría un editor.", "Pero solo."],
			text: "Elige una pestaña y mira cada función en acción, tal como aparece en la app. Sin tecnicismos: tres pasos y listo.",
			tabsAria: "Funciones de Clipey",
			pause: "Pausar las animaciones de las pestañas",
			play: "Reanudar las animaciones de las pestañas",
			tabs: {
				edit: {
					label: "Edición automática",
					title: "Tú grabas. El video sale editado.",
					steps: [
						[
							"Graba como siempre",
							"Mientras usas la computadora, Clipey anota dónde ocurrió cada clic.",
						],
						[
							"Abre el editor",
							"Cada clic ya es un zoom suave. No marcas nada.",
						],
						[
							"Ajusta si quieres",
							"Las partes quietas van 2× más rápido. Arrastra, borra o deshaz con Ctrl+Z.",
						],
					],
					also: [
						"Fondos, marcos y sombra listos",
						"16:9, 9:16 o 1:1 en un clic",
						"Notas y flechas en la pantalla",
						"Corta cualquier parte con una tecla",
					],
					videoLabel:
						"En Clipey: se crean un zoom y una parte a 2× que se reproducen en la vista previa, y luego el formato vertical",
				},
				clip: {
					label: "Auto Clip",
					title: "Un video largo se convierte en clips listos para publicar.",
					steps: [
						[
							"Abre el video largo",
							"Directo, clase, pódcast o reunión. Clipey escribe todo lo que se dijo.",
						],
						[
							"La IA marca los mejores fragmentos",
							"Busca frases de impacto, preguntas que generan debate y consejos, y le da a cada fragmento una nota de 0 a 100 con el motivo.",
						],
						[
							"Tú solo apruebas",
							"Cada fragmento ya sale como clip vertical (9:16), con subtítulos y la cara en el centro. Mantén o rechaza y haz clic en “Aplicar clips aceptados”.",
						],
					],
					also: [
						"15–30 s, 30–60 s o 60–90 s",
						"La cara de quien habla siempre en el cuadro",
						"Dos personas divididas en pantalla",
						"Revisa los clips desde el móvil",
					],
					stage: {
						file: "Directo del martes.mp4",
						duration: "42 min",
						status: [
							"1 de 3 · Leyendo lo que se dijo",
							"2 de 3 · Eligiendo los mejores momentos",
							"3 de 3 · Clips listos para que los revises",
						],
						transcriptAria:
							"Parte de la transcripción con tres momentos destacados",
						lines: [
							["…pasé tres años editando todo a mano.", ""],
							["Y ahí fue cuando todo cambió.", "frase de impacto · 92"],
							["Mucha gente me pregunta qué programa uso.", ""],
							[
								"Un directo largo nadie lo ve entero. ¿De acuerdo?",
								"pregunta que genera debate · 87",
							],
							["Hoy grabo y lo demás sale solo.", ""],
							["En tres clics el corte está listo.", "consejo práctico · 84"],
						],
						clips: [
							["y ahí fue cuando", "todo cambió", ""],
							["nadie lo ve", "¿entero?", ""],
							["en ", "3 clics", "está listo"],
						],
						clipsAria:
							"Tres clips verticales con nota: dos mantenidos, uno rechazado",
						keep: "✓ Mantenido",
						reject: "Rechazado",
						apply: "Aplicar clips aceptados (2)",
					},
				},
				cap: {
					label: "Subtítulos",
					title: "Subtítulos correctos, en cualquier idioma.",
					steps: [
						[
							"Clipey escucha el video",
							"Y escribe todo lo que se dijo. La transcripción puede hacerse entera en tu computadora.",
						],
						[
							"Corrige con doble clic",
							"¿Una palabra mal? Haz doble clic y escríbela. Al borrar una palabra, ese trozo del video también se corta.",
						],
						[
							"Elige el estilo y el idioma",
							"Estilo, color y posición. Traduce a otro idioma con un clic, sin perder el tiempo de cada frase.",
						],
					],
					also: [
						"Palabra por palabra, estilo karaoke",
						"Traducción a 15 idiomas",
						"Importa los subtítulos que ya tienes",
						"Fuentes, tamaños y colores libres",
					],
					stage: {
						tagOriginal: "Voz original · inglés",
						tagTranslated: "Subtítulos traducidos · español",
						original: "To move a task forward, just drag its card.",
						translated: "Para avanzar una tarea, solo arrastra su tarjeta.",
						target: "Español",
						shotAlt: "La vista previa de Clipey reproduciendo un tutorial",
						paneAlt:
							"El panel Subtítulos de Clipey: estilo, idioma y traducción al español",
					},
				},
				voice: {
					label: "Voz y doblaje",
					title: "El mismo video, hablando otro idioma.",
					steps: [
						["Elige una voz", "Una voz lista o la tuya, clonada."],
						["Elige el idioma", "Portugués, inglés, español y 11 más."],
						[
							"Haz clic en “Generar doblaje”",
							"El video pasa a hablar el nuevo idioma, cada frase a su tiempo.",
						],
					],
					also: [
						"ElevenLabs, OpenAI, Gemini y Grok",
						"Baja el sonido original o sustitúyelo",
						"Narración a partir de un texto",
						"Límite de gasto por sesión",
					],
					stage: {
						tagOriginal: "EN · original",
						tagDub: "ES · tu voz",
						original: "“To move a task forward, just drag its card.”",
						dub: "“Para avanzar una tarea, solo arrastra su tarjeta.”",
						tracksAria:
							"Línea de tiempo: el sonido original se sustituye por el doblaje",
						lanes: ["Sonido original", "Doblaje"],
						states: [
							["sonando", "sustituido"],
							["generando…", "listo"],
						],
						meta: "Voz clonada de tu grabación · cada frase cae en el mismo tiempo que la original",
					},
				},
				cam: {
					label: "Cámara",
					title: "Tu cara, como debe ser.",
					steps: [
						[
							"Activa la webcam al grabar",
							"Se guarda aparte de la pantalla, para cambiarla después.",
						],
						[
							"Elige el diseño",
							"Ventanita en la esquina, apilado para videos verticales o lado a lado.",
						],
						[
							"Cuida el fondo",
							"Desenfócalo, cámbialo o recorta solo tu silueta.",
						],
					],
					also: [
						"Cámara a pantalla completa en las partes que elijas",
						"La cámara se encoge cuando el video hace zoom",
						"Forma redonda, cuadrada u original",
						"Espejar la imagen",
					],
					stage: {
						aria: "Tres diseños de cámara: ventanita en la esquina, apilado y lado a lado",
						layouts: [
							"Ventanita en la esquina",
							"Apilado para video vertical",
							"Pantalla y cara lado a lado",
						],
					},
				},
			},
			captionsLabel: "Subtítulos de Clipey traducidos a 15 idiomas",
			captionsCaption:
				"Subtítulos en 15 idiomas · una transcripción que editas palabra por palabra",
		},
		agents: {
			marker: "EDICIÓN AGÉNTICA · MCP",
			title: ["Pídelo en español.", "Tu agente edita en Clipey."],
			text: "Activa el servidor MCP en la configuración y conecta el asistente de IA que ya usas. Graba, corta, subtitula y publica con las herramientas del propio Clipey.",
			chatAria: "Ejemplo de conversación: el agente edita en Clipey",
			assistant: "Tu asistente de IA",
			connected: "Clipey conectado",
			ask: "Graba la demo del checkout, quita las pausas y dame 3 clips verticales para Reels.",
			reply: "Claro. Lo hago todo en Clipey:",
			tools: [
				["Grabando la ventana “Checkout”", "2:14"],
				["Quitando las pausas", "−0:31"],
				["Zoom en cada clic", "9 zooms"],
				["Buscando los mejores fragmentos", "3 clips"],
				["Exportando en 9:16", "3 MP4"],
				["Programando en Instagram", "hoy 18:00"],
			],
			done: "¡Listo! Los 3 clips salen hoy a las 18:00. ¿Quieres revisarlos antes en Clipey?",
			editorAlt: "El editor de Clipey recibiendo las ediciones del agente",
			caption:
				"A la derecha, el Clipey real: cada pedido aparece en la línea de tiempo mientras el agente trabaja.",
			railTitle: "FUNCIONA CON CUALQUIER AGENTE QUE HABLE MCP",
			note: "El agente entra con su propia cuenta; Clipey nunca ve tus claves. Por defecto solo lee tus proyectos: grabar, editar y exportar dependen de que tú lo permitas. Comando listo para Claude Code y Codex en la configuración.",
			pause: "Pausar la demostración del agente",
			play: "Reanudar la demostración del agente",
		},
		games: {
			marker: "JUEGOS, WEBCAM Y MÁS",
			title: "Tu mando aparece en el video.",
			text: "Graba la partida con el mando en pantalla, cada botón encendiéndose en el momento justo. O muestra tus atajos de teclado y dibuja encima mientras explicas.",
			list: [
				"Mando de PlayStation, Xbox, Switch o genérico, con sticks y la fuerza de los gatillos",
				"Los atajos de teclado aparecen en pantalla mientras escribes",
				"Dibuja en la pantalla mientras grabas",
				"Graba hasta en 4K y exporta a 60 fotogramas por segundo",
				"Cursor 3D con estela al arrastrar",
			],
			keys: "atajos en pantalla, en vivo",
			rec: "REC 4K · 60 fps",
			videoLabel:
				"Partidas de Session: Skate Sim y MTG grabadas con la superposición del mando",
			credit:
				"Juego: {session} (crea-ture Studios / Nacon) y {mtg} (Virtual MX Studios), tráileres oficiales.",
			pad: {
				title: "Partidas con mando",
				body: "El mando aparece en una esquina del video: cada botón se enciende al pulsarlo y los gatillos muestran la fuerza.",
				chips: [
					"El gatillo muestra la fuerza",
					"El botón pulsado se enciende",
					"El stick muestra la dirección",
				],
				pressed: "pulsado",
			},
			cam: {
				title: "Clase con webcam",
				body: "Tu cara queda en una esquina, redonda o cuadrada. Cuando el video hace zoom, la cámara se encoge para no tapar nada.",
				chips: [
					"Cámara en la esquina de la clase",
					"Zoom en el clic: la cámara se encoge",
				],
				alt: "Una clase grabada en Clipey",
			},
			draw: {
				title: "Tutorial con dibujos y atajos",
				body: "Dibuja flechas y círculos mientras grabas. Quien lo ve sigue el trazo y cada atajo que pulsaste.",
				label: "Haz clic aquí",
				alt: "Un tutorial grabado en Clipey",
			},
			pause: "Pausar las demostraciones",
			play: "Reanudar las demostraciones",
		},
		publish: {
			marker: "01:12 · PUBLICAR",
			title: "YouTube, Instagram, Facebook y TikTok.",
			text: "Exporta en MP4 o GIF y, cuando termine la exportación, haz clic en Publicar en cada red que quieras usar — o programa la hora. Las cuentas quedan guardadas solo en tu computadora.",
			note: "YouTube, Meta y TikTok todavía están revisando la app: al conectar una cuenta puede aparecer un aviso de app no verificada.",
			alt: "La ventana Exportar y publicar de Clipey",
		},
		phone: {
			marker: "EN EL MÓVIL",
			title: "El móvil se convierte en el control del estudio.",
			text: "Vincúlalo con el código QR y controla la grabación en la computadora, revisa los cortes automáticos y ajusta los subtítulos desde donde estés. En Android hay una app; en iPhone, el navegador.",
			rotate: "Ver en horizontal",
			portrait: "Clipey en el móvil, en vertical: la pantalla Inicio",
			landscape: "Clipey en el móvil, en horizontal: el editor",
		},
		local: {
			marker: "TU PC",
			title:
				"La transcripción puede ejecutarse por completo en tu computadora.",
			text: "Tus videos se quedan en tus archivos. Las funciones de IA en la nube usan tu propia clave o créditos, y tú eliges cuándo usarlas.",
			link: "Cómo tratamos tus datos (EN)",
			alt: "Ajustes de Clipey: transcripción en esta computadora",
		},
		download: {
			marker: "01:30 · FIN DE LA EDICIÓN",
			title: "Descarga",
			aria: "Descargar Clipey",
			buttons: [
				"Descargar para Windows",
				"Descargar para macOS",
				"Descargar para Linux",
			],
		},
		footer: { support: "Soporte" },
		video: { pause: "Pausar video", play: "Reproducir video" },
	},
};
