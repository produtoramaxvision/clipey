/**
 * Landing page copy. Every product sentence here is mapped to its source in the claims evidence file kept with the release notes;
 * wording that depends on the 1.15 lane specs stays as soft as those specs.
 */

/**
 * The v2 landing, "the site is a Clipey recording": a title bar, a hero told as a timeline, one section per chapter
 * and the export at the end. A language listed here renders the v2 page; the others keep the LANDING page below.
 */
export const STORY = {
	"pt-BR": {
		bar: {
			host: "clipey.com.br",
			recording: "Gravando",
			chaptersAria: "Capítulos",
			chapters: [
				["gravar", "Gravar"],
				["editar", "Editar"],
				["publicar", "Publicar"],
			],
			blog: "Blog",
			export: "Exportar o Clipey",
		},
		hero: {
			lines: [
				["clip", "00:00:00", "Clipe", "Grave a tela."],
				["zoom", "00:02:14", "Zoom 1,8×", "O Clipey edita."],
				["speed", "00:07:02", "Exportar", "Você publica."],
			],
			sub: "Gravador e editor de tela para Windows. Cortes de silêncio, zoom em cada clique, legendas e publicação no YouTube, TikTok, Instagram e Facebook, no mesmo app.",
			download: "Baixar para Windows",
			platform: "Windows 10 e 11 · 64 bits",
			noAccount: "sem conta para gravar e editar",
			imageAlt:
				"Editor do Clipey com a linha do tempo, regiões de zoom e o painel de composição",
			caption: "Interface real do Clipey 1.15",
			zoomTag: "Zoom 1,8× · auto no clique",
			drawNote: "desenhado ao vivo, Ctrl + Shift + D",
		},
		/** The scroll story of the hero: [timecode, title, text]. With reduced motion it is a list of stills. */
		frames: [
			[
				"00:00",
				"A gravação crua",
				"O editor real, parado. O playhead está no começo da linha do tempo.",
			],
			[
				"00:02",
				"O clique",
				"A onda verde aparece onde o cursor clicou, com a cor do botão esquerdo.",
			],
			[
				"00:04",
				"O zoom automático",
				"A imagem aproxima 1,8× na região do clique.",
			],
			[
				"00:06",
				"O silêncio some",
				"O trecho sem fala fica marcado na linha do tempo e sai do corte.",
			],
			[
				"00:08",
				"A legenda acende",
				"A legenda da transcrição aparece com a palavra-chave em destaque.",
			],
			[
				"00:10",
				"Vira vertical",
				"O quadro vai para 9:16, pronto para Shorts, Reels e TikTok.",
			],
		],
		storyAria: "O que o Clipey faz com uma gravação, quadro a quadro",
		cutTag: "Silêncio 1,8 s · cortado",
		captionText: ["clique em", "Exportar"],
		timeline: {
			ticks: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"],
			chapters: [
				["clip", "Gravar"],
				["zoom", "Cliques e zoom"],
				["annotation", "Overlays"],
				["speed", "Vertical"],
				["clip", "Publicar"],
			],
		},
		record: {
			tc: "00:00:30 · Gravar",
			title: ["Uma barra.", "Nenhum projeto para criar antes."],
			text: "Escolha a tela ou a janela, ligue câmera e microfone e grave. O Clipey registra o cursor, cada botão do mouse, a rolagem e as teclas, para a edição usar depois.",
			imageAlt: "Barra de gravação do Clipey com tempo, pausa e parar",
			caption:
				"Barra de gravação real, como aparece sobre a sua área de trabalho",
		},
		clicks: {
			tc: "00:01:00 · Cliques e zoom",
			title: "Cada clique virou um zoom. Você não marcou nenhum.",
			text: "As pílulas azuis são zooms criados a partir dos seus cliques. Arraste, apague ou mude o nível de cada um na linha do tempo.",
			imageAlt:
				"Linha do tempo do Clipey com regiões de zoom em azul e uma região de velocidade",
			caption:
				"Linha do tempo real · zoom, velocidade, anotação, corte e áudio em faixas separadas",
		},
		overlays: {
			tc: "00:01:30 · Overlays",
			title: "Clique nesta área.",
			text: "Seu cursor já está com os efeitos do Clipey: um estilo para cada botão do mouse. Aperte teclas e elas aparecem como no vídeo.",
			stageLabel:
				"Área de demonstração: clique com qualquer botão do mouse ou aperte teclas",
			imageAlt:
				"Painel Efeitos do mouse do Clipey: efeito de clique, cor por botão, halo e holofote",
			caption: "Painel real · Efeitos do mouse",
		},
		vertical: {
			tc: "00:02:00 · Vertical",
			title: ["16:9 entra.", "9:16 sai."],
			text: "O Auto Clip sugere trechos curtos com uma nota para você escolher, e o reenquadramento segue o rosto no vertical. O preset mostra resolução, taxa de bits e tamanho estimado antes de exportar.",
			captionText: ["legenda no", "lugar certo"],
			wideAlt: "Quadro 16:9 do editor com a área vertical marcada",
			tallAlt: "O mesmo quadro recortado em 9:16 com legenda",
			exportAlt: "Diálogo Exportar com presets, tamanho estimado e publicação",
			scheduleAlt: "Diálogo Exportar com preset do TikTok e aba Agendar",
		},
		publish: {
			tc: "00:02:30 · Publicar",
			title: "YouTube, TikTok, Instagram e Facebook.",
			titleMuted: "Agora ou na hora que você marcar.",
			notes: [
				[
					"Kit de publicação",
					"Título, descrição e hashtags sugeridos para cada rede, dentro dos limites de caracteres de cada uma.",
				],
				[
					"Agendamento",
					"A fila roda no seu PC com o Clipey aberto ou na bandeja. Se o horário passar com o PC desligado, a publicação fica marcada como perdida e não sai sozinha.",
				],
				[
					"Contas",
					"Conecte cada rede uma vez pelo navegador. O Clipey mostra quais contas estão conectadas.",
				],
			],
		},
		local: {
			tc: "00:03:00 · Seu PC",
			title: "A transcrição pode rodar inteira no seu computador.",
			text: "Sem telemetria de uso. Serviços na nuvem são opcionais e usam a sua própria chave; a voz na nuvem mostra o custo estimado antes de gerar.",
			imageAlt: "Configurações de transcrição e mídia do Clipey",
			caption: "Configurações reais · Transcrição e mídia",
			privacyLink: "Como funciona a privacidade",
			deletionLink: "Exclusão de dados",
		},
		faqTc: "00:03:15 · Perguntas",
		faqTitle: "Perguntas frequentes",
		export: {
			tc: "00:03:30 · Fim da gravação",
			title: "Exportar.",
			download: "Baixar o Clipey para Windows",
			platform: "Windows 10 e 11 · 64 bits",
			version: "Versão",
			pricing:
				"O download é gratuito. Recursos na nuvem usam a sua própria chave de API ou créditos.",
			requirements:
				"A captura de tela exige Windows 10 versão 2004 (build 19041) ou posterior.",
		},
		footer: {
			blog: "Blog",
			contact: "Contato",
			releases: "Versões para baixar",
		},
		faq: [
			[
				"O Clipey é gratuito?",
				"O download é gratuito. Recursos na nuvem, como voz e modelos de IA, usam a sua própria chave de API ou créditos.",
			],
			[
				"Em quais sistemas funciona?",
				"O Clipey 1.15 é para Windows 10 e 11, 64 bits. Recursos de captura usam APIs do Windows.",
			],
			[
				"Preciso criar uma conta?",
				"Não é necessário criar uma conta Clipey para gravar e editar localmente. Contas das plataformas são necessárias para publicar nelas.",
			],
			[
				"Meus vídeos são enviados para a nuvem?",
				"Gravações e projetos permanecem no seu computador. Publicar ou usar um provedor externo envia o conteúdo escolhido ao destino correspondente.",
			],
			[
				"A transcrição funciona offline?",
				"A transcrição local usa modelos baixados no computador. A primeira configuração pode exigir baixar os arquivos do modelo.",
			],
			[
				"O agendamento publica com o aplicativo fechado?",
				"Não. O Clipey ou o ícone da bandeja precisa estar em execução no horário agendado.",
			],
		],
	},
};

export const LANDING = {
	en: {
		eyebrow: "Screen video, without the friction",
		hero: "From the first click to a finished video.",
		sub: "Record your screen, refine the edit and publish on your terms. A Windows video studio that keeps your files on your computer.",
		download: "Download for Windows",
		news: "See what’s new in 1.15",
		note: ["Windows 10 and 11", "Free to download", "No usage telemetry"],
		frameLabel: "Clipey editor preview",
		frameCaption:
			"Clipey 1.15 editor: recorded screen, timeline and captions in one project.",
		framePending: "The editor capture goes here.",
		sections: {
			features: {
				tc: "00:12",
				kicker: "Features",
				title: "One recording. A finished video.",
				sub: "Capture clearly, refine the details and export without breaking your flow.",
			},
			ai: {
				tc: "00:34",
				kicker: "AI with you",
				title: "AI that helps without taking over.",
				sub: "Editable suggestions to help you reach the cut you want.",
			},
			publish: {
				tc: "00:56",
				kicker: "Publish",
				title: "From edit to publish, on your terms.",
				sub: "Prepare the details and choose when and where to publish.",
			},
			privacy: {
				tc: "01:18",
				kicker: "Privacy",
				title: "Your work stays yours.",
				sub: "Projects, recordings and local transcriptions stay on your computer. Clipey does not collect usage telemetry. Features that use external providers send them only the content needed, under your configuration.",
				link: "How privacy works",
				link2: "Data deletion",
			},
			requirements: {
				tc: "01:40",
				kicker: "Requirements",
				title: "Built for Windows.",
				sub: "Windows 10 or 11. Screen capture requires Windows 10 version 2004 (build 19041) or later. Video recording and editing benefit from a compatible GPU; performance varies by project and hardware.",
			},
			blog: {
				tc: "02:02",
				kicker: "Blog",
				title: "Guides to get the most out of 1.15.",
				sub: "Short tutorials that use the real control names.",
				link: "See all articles",
			},
			faq: {
				tc: "02:24",
				kicker: "Questions",
				title: "Frequently asked questions",
			},
			download: {
				tc: "02:46",
				kicker: "Clipey 1.15",
				title: "Your next video starts here.",
			},
		},
		features: [
			[
				"Record",
				"Capture your screen and cursor on Windows. Keep cursor movement available for editing.",
			],
			["Edit", "Adjust cuts, zooms and captions on a visual timeline."],
			[
				"Caption",
				"Transcribe on your device and review captions before export.",
			],
			["Export", "Prepare your video and check the final file before sharing."],
		],
		ai: [
			[
				"Assisted editing",
				"Ask the agent for cuts, zooms and removal of pauses, then review the result on the timeline.",
			],
			[
				"Short clips",
				"Auto Clip finds 15 to 90 second moments and shows a score for each so you can choose.",
			],
			[
				"Voice with the cost in view",
				"See an estimated cost before generating cloud voice and set a per-session limit.",
			],
			[
				"MCP agents",
				"Connect compatible tools and request editor actions with your approval.",
			],
		],
		publish: [
			[
				"Scheduling",
				"Schedule posts to YouTube, TikTok and Instagram. Clipey must be running or in the system tray at the scheduled time.",
			],
			[
				"Publishing kit",
				"Generate a title, description and hashtags for each platform from your transcript, within each platform’s limits.",
			],
			[
				"Export presets",
				"Pick presets for TikTok, YouTube Shorts, Instagram Reels and YouTube, with a size estimate before you export.",
			],
			[
				"Verification",
				"After an MP4 export, Clipey checks duration, video, audio and decode errors and warns you if something is off.",
			],
		],
		faq: [
			[
				"Is Clipey free?",
				"Yes. The app is free to download. Some features may rely on external services you configure.",
			],
			[
				"Which systems does it support?",
				"Clipey 1.15 is for Windows 10 and 11. Capture features use Windows APIs.",
			],
			[
				"Do I need an account?",
				"You do not need a Clipey account to record and edit locally. Platform accounts are needed to publish there.",
			],
			[
				"Are my videos uploaded to the cloud?",
				"Recordings and projects stay on your computer. Publishing or using an external provider sends the content you choose to that destination.",
			],
			[
				"Does transcription work offline?",
				"Local transcription uses models downloaded to your computer. Initial setup may require downloading model files.",
			],
			[
				"Can I review AI suggestions?",
				"Yes. Editing suggestions can be changed before export.",
			],
			[
				"Will scheduled posts publish when the app is closed?",
				"No. Clipey or its tray icon must be running at the scheduled time.",
			],
			[
				"Where can I find system requirements?",
				"Capture requires Windows 10 build 19041 or later. Performance also depends on your GPU and project resolution.",
			],
		],
	},
	es: {
		eyebrow: "Video de pantalla, sin fricción",
		hero: "Del primer clic al video terminado.",
		sub: "Graba tu pantalla, ajusta la edición y publica a tu manera. Un estudio de video para Windows que mantiene tus archivos en tu computadora.",
		download: "Descargar para Windows",
		news: "Ver novedades de la 1.15",
		note: ["Windows 10 y 11", "Descarga gratuita", "Sin telemetría de uso"],
		frameLabel: "Vista previa del editor de Clipey",
		frameCaption:
			"Editor de Clipey 1.15: pantalla grabada, línea de tiempo y subtítulos en un mismo proyecto.",
		framePending: "Aquí va la captura del editor.",
		sections: {
			features: {
				tc: "00:12",
				kicker: "Funciones",
				title: "Una grabación. Un video listo.",
				sub: "Captura con claridad, ajusta los detalles y exporta sin salir de tu flujo.",
			},
			ai: {
				tc: "00:34",
				kicker: "IA contigo",
				title: "IA que ayuda sin tomar el control.",
				sub: "Sugerencias editables para llegar al corte que buscas.",
			},
			publish: {
				tc: "00:56",
				kicker: "Publicar",
				title: "De la edición a la publicación, a tu manera.",
				sub: "Prepara los detalles y elige cuándo y dónde publicar.",
			},
			privacy: {
				tc: "01:18",
				kicker: "Privacidad",
				title: "Tu trabajo sigue siendo tuyo.",
				sub: "Los proyectos, las grabaciones y las transcripciones locales permanecen en tu computadora. Clipey no recopila telemetría de uso. Las funciones que usan proveedores externos solo les envían el contenido necesario, según tu configuración.",
				link: "Cómo funciona la privacidad",
				link2: "Eliminación de datos (EN)",
			},
			requirements: {
				tc: "01:40",
				kicker: "Requisitos",
				title: "Diseñado para Windows.",
				sub: "Windows 10 u 11. La captura de pantalla requiere Windows 10 versión 2004 (compilación 19041) o posterior. La grabación y edición de video se benefician de una GPU compatible; el rendimiento depende del proyecto y del equipo.",
			},
			blog: {
				tc: "02:02",
				kicker: "Blog",
				title: "Guías para sacar partido a la 1.15.",
				sub: "Tutoriales breves con los nombres reales de los controles.",
				link: "Ver todos los artículos",
			},
			faq: { tc: "02:24", kicker: "Preguntas", title: "Preguntas frecuentes" },
			download: {
				tc: "02:46",
				kicker: "Clipey 1.15",
				title: "Tu próximo video empieza aquí.",
			},
		},
		features: [
			[
				"Graba",
				"Captura la pantalla y el cursor en Windows. Conserva los movimientos para editarlos después.",
			],
			[
				"Edita",
				"Ajusta cortes, zooms y subtítulos en una línea de tiempo visual.",
			],
			[
				"Subtitula",
				"Transcribe en tu dispositivo y revisa los subtítulos antes de exportar.",
			],
			[
				"Exporta",
				"Prepara el video y comprueba el archivo final antes de compartirlo.",
			],
		],
		ai: [
			[
				"Edición asistida",
				"Pide al agente cortes, zooms y la eliminación de pausas, y revisa el resultado en la línea de tiempo.",
			],
			[
				"Clips cortos",
				"Auto Clip encuentra momentos de 15 a 90 segundos y muestra una puntuación para que elijas.",
			],
			[
				"Voz con el costo a la vista",
				"Consulta el costo estimado antes de generar voz en la nube y fija un límite por sesión.",
			],
			[
				"Agentes MCP",
				"Conecta herramientas compatibles y solicita acciones en el editor con tu autorización.",
			],
		],
		publish: [
			[
				"Programación",
				"Programa publicaciones en YouTube, TikTok e Instagram. Clipey debe estar abierto o en la bandeja del sistema a la hora programada.",
			],
			[
				"Kit de publicación",
				"Genera título, descripción y hashtags para cada plataforma a partir de la transcripción, dentro de los límites de cada una.",
			],
			[
				"Ajustes de exportación",
				"Elige ajustes para TikTok, YouTube Shorts, Instagram Reels y YouTube, con una estimación de tamaño antes de exportar.",
			],
			[
				"Verificación",
				"Tras exportar un MP4, Clipey revisa la duración, el video, el audio y los errores de decodificación, y avisa si algo no cuadra.",
			],
		],
		faq: [
			[
				"¿Clipey es gratis?",
				"Sí. La aplicación se descarga gratis. Algunas funciones pueden depender de servicios externos que configures.",
			],
			[
				"¿Qué sistemas admite?",
				"Clipey 1.15 es para Windows 10 y 11. Las funciones de captura usan las API de Windows.",
			],
			[
				"¿Necesito una cuenta?",
				"No necesitas una cuenta de Clipey para grabar y editar localmente. Sí necesitas cuentas de las plataformas para publicar.",
			],
			[
				"¿Mis videos se suben a la nube?",
				"Las grabaciones y los proyectos permanecen en tu computadora. Al publicar o usar un proveedor externo, el contenido elegido se envía al destino correspondiente.",
			],
			[
				"¿La transcripción funciona sin conexión?",
				"La transcripción local usa modelos descargados en tu computadora. La primera configuración puede requerir descargar esos archivos.",
			],
			[
				"¿Puedo revisar las sugerencias de IA?",
				"Sí. Puedes cambiar las sugerencias de edición antes de exportar.",
			],
			[
				"¿Se publicarán las publicaciones programadas con la aplicación cerrada?",
				"No. Clipey o su icono de la bandeja deben estar en ejecución a la hora programada.",
			],
			[
				"¿Dónde encuentro los requisitos?",
				"La captura requiere Windows 10 compilación 19041 o posterior. El rendimiento también depende de la GPU y la resolución del proyecto.",
			],
		],
	},
};
