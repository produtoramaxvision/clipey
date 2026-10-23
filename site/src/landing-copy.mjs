/**
 * Landing page copy. Every product sentence here is mapped to its source in the claims evidence file kept with the release notes;
 * wording that depends on the 1.15 lane specs stays as soft as those specs.
 */

/**
 * The landing, "the site is a Clipey recording": a title bar, a hero told as a timeline, one section per chapter and
 * the export at the end, in every site language. The translations make the same claims as pt-BR, worded naturally.
 */
export const STORY = {
	"pt-BR": {
		bar: {
			host: "clipey.com.br",
			recording: "Gravando",
			chaptersAria: "Capítulos",
			chapters: [
				["record", "Gravar"],
				["clicks", "Editar"],
				["publish", "Publicar"],
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
			sub: "Gravador e editor de tela para Windows, macOS e Linux. Cortes de silêncio, zoom em cada clique, legendas e publicação no Instagram, Facebook e TikTok, no mesmo app. YouTube na próxima versão.",
			definition: "Clipey é um aplicativo de gravação e edição de vídeo de tela para Windows, macOS e Linux que reúne captura de cursor e cliques, edição com cortes e zooms automáticos e publicação em redes sociais.",
			download: "Baixar o Clipey",
			platform: "Windows, macOS e Linux · 64 bits",
			noAccount: "sem conta para gravar e editar",
			imageAlt:
				"Linha do tempo do Clipey com as regiões de zoom criadas a partir dos cliques, em azul",
			caption: "Linha do tempo real do Clipey 1.15",
			zoomTag: "Zoom 1,8× · auto no clique",
			drawNote: "desenhado ao vivo, Ctrl + Shift + D",
		},
		/** The scroll story of the hero: [timecode, title, text]. With reduced motion it is a list of stills. */
		frames: [
			[
				"00:00",
				"A gravação crua",
				"A linha do tempo real do Clipey, parada. Nada aconteceu ainda.",
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
				"Editor do Clipey com a linha do tempo, regiões de zoom e de velocidade e o painel de composição",
			caption:
				"Editor real · zoom, velocidade, anotação, corte e áudio em faixas separadas",
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
			title: "Instagram, Facebook e TikTok.",
			titleMuted: "Depois de exportar, publique em cada rede — ou agende.",
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
			download: "Baixar o Clipey",
			platform: "Windows, macOS e Linux · 64 bits",
			version: "Versão",
			pricing:
				"O download é gratuito. Recursos na nuvem usam a sua própria chave de API ou créditos.",
			requirements:
				"No Windows, a captura de tela exige Windows 10 versão 2004 (build 19041) ou posterior.",
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
				"Como funcionam os recursos na nuvem?",
				"A gravação e a edição local não precisam de conta nem de conexão. Para legendas e voz na nuvem, você configura a sua própria chave de API ou usa créditos; o custo estimado é exibido antes de gerar.",
			],
			[
				"Em quais sistemas funciona?",
				"O Clipey 1.15 funciona no Windows, macOS e Linux, 64 bits. No Windows, recursos de captura usam APIs do sistema.",
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
	en: {
		bar: {
			host: "clipey.com.br",
			recording: "Recording",
			chaptersAria: "Chapters",
			chapters: [
				["record", "Record"],
				["clicks", "Edit"],
				["publish", "Publish"],
			],
			blog: "Blog",
			export: "Export Clipey",
		},
		hero: {
			lines: [
				["clip", "00:00:00", "Clip", "Record your screen."],
				["zoom", "00:02:14", "Zoom 1.8×", "Clipey edits."],
				["speed", "00:07:02", "Export", "You publish."],
			],
			sub: "A screen recorder and editor for Windows, macOS and Linux. Silence cuts, a zoom on every click, captions and publishing to Instagram, Facebook and TikTok, all in one app. YouTube in the next version.",
			definition: "Clipey is a screen recording and editing app for Windows, macOS and Linux that combines cursor and click capture, automatic cuts and zooms, and publishing to social media.",
			download: "Download Clipey",
			platform: "Windows, macOS and Linux · 64-bit",
			noAccount: "no account needed to record and edit",
			imageAlt:
				"Clipey timeline with the zoom regions created from your clicks, in blue",
			caption: "Real Clipey 1.15 timeline",
			zoomTag: "Zoom 1.8× · auto on click",
			drawNote: "drawn live, Ctrl + Shift + D",
		},
		frames: [
			[
				"00:00",
				"The raw recording",
				"The real Clipey timeline, standing still. Nothing has happened yet.",
			],
			[
				"00:02",
				"The click",
				"A green ripple shows where the cursor clicked, in the left button's colour.",
			],
			[
				"00:04",
				"The automatic zoom",
				"The picture zooms 1.8× into the area of the click.",
			],
			[
				"00:06",
				"The silence goes",
				"The stretch with no speech is marked on the timeline and left out of the cut.",
			],
			[
				"00:08",
				"The caption lights up",
				"The transcript caption appears with its keyword highlighted.",
			],
			[
				"00:10",
				"It turns vertical",
				"The frame goes 9:16, ready for Shorts, Reels and TikTok.",
			],
		],
		storyAria: "What Clipey does to a recording, frame by frame",
		cutTag: "Silence 1.8 s · cut",
		captionText: ["click", "Export"],
		timeline: {
			ticks: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"],
			chapters: [
				["clip", "Record"],
				["zoom", "Clicks and zoom"],
				["annotation", "Overlays"],
				["speed", "Vertical"],
				["clip", "Publish"],
			],
		},
		record: {
			tc: "00:00:30 · Record",
			title: ["One bar.", "No project to set up first."],
			text: "Pick a screen or a window, turn on the camera and microphone, and record. Clipey keeps track of the cursor, every mouse button, scrolling and keystrokes, so the edit can use them later.",
			imageAlt: "Clipey recording bar with the timer, pause and stop",
			caption: "The real recording bar, as it sits over your desktop",
		},
		clicks: {
			tc: "00:01:00 · Clicks and zoom",
			title: "Every click became a zoom. You marked none of them.",
			text: "The blue pills are zooms made from your clicks. Drag them, delete them or change the level of each one on the timeline.",
			imageAlt:
				"Clipey editor with the timeline, zoom and speed regions and the composition panel",
			caption:
				"Real editor · zoom, speed, annotation, trim and audio on separate lanes",
		},
		overlays: {
			tc: "00:01:30 · Overlays",
			title: "Click in this area.",
			text: "Your cursor already has Clipey's effects on it: one style for each mouse button. Press some keys and they show up just as they would in the video.",
			stageLabel: "Demo area: click with any mouse button or press some keys",
			imageAlt:
				"Clipey's Mouse effects panel: click effect, colour per button, halo and spotlight",
			caption: "Real panel · Mouse effects",
		},
		vertical: {
			tc: "00:02:00 · Vertical",
			title: ["16:9 in.", "9:16 out."],
			text: "Auto Clip suggests short moments with a score so you can choose, and reframing follows the face in vertical. The preset shows the resolution, bitrate and estimated size before you export.",
			captionText: ["captions in the", "right place"],
			wideAlt: "A 16:9 editor frame with the vertical area marked",
			tallAlt: "The same frame cropped to 9:16 with a caption",
			exportAlt: "Export dialog with presets, estimated size and publishing",
			scheduleAlt: "Export dialog with the TikTok preset and the Schedule tab",
		},
		publish: {
			tc: "00:02:30 · Publish",
			title: "Instagram, Facebook and TikTok.",
			titleMuted: "After export, publish on each network — or schedule.",
			notes: [
				[
					"Publishing kit",
					"A suggested title, description and hashtags for each platform, within each one's character limits.",
				],
				[
					"Scheduling",
					"The queue runs on your PC while Clipey is open or in the tray. If the time passes while the PC is off, the post is marked as missed and does not go out on its own.",
				],
				[
					"Accounts",
					"Connect each platform once through your browser. Clipey shows which accounts are connected.",
				],
			],
		},
		local: {
			tc: "00:03:00 · Your PC",
			title: "Transcription can run entirely on your computer.",
			text: "No usage telemetry. Cloud services are optional and use your own key; cloud voice shows the estimated cost before it generates anything.",
			imageAlt: "Clipey transcription and media settings",
			caption: "Real settings · Transcription and media",
			privacyLink: "How privacy works",
			deletionLink: "Data deletion",
		},
		faqTc: "00:03:15 · Questions",
		faqTitle: "Frequently asked questions",
		export: {
			tc: "00:03:30 · End of recording",
			title: "Export.",
			download: "Download Clipey",
			platform: "Windows, macOS and Linux · 64-bit",
			version: "Version",
			pricing:
				"The download is free. Cloud features use your own API key or credits.",
			requirements:
				"On Windows, screen capture requires Windows 10 version 2004 (build 19041) or later.",
		},
		footer: {
			blog: "Blog",
			contact: "Contact",
			releases: "Downloadable releases",
		},
		faq: [
			[
				"Is Clipey free?",
				"The download is free. Cloud features, such as voice and AI models, use your own API key or credits.",
			],
			[
				"How do cloud features work?",
				"Local recording and editing need no account or internet connection. For cloud captions and voice, you set up your own API key or use credits; the estimated cost is shown before generating.",
			],
			[
				"Which systems does it run on?",
				"Clipey 1.15 runs on Windows, macOS and Linux, 64-bit. On Windows, capture features use system APIs.",
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
				"Local transcription uses models downloaded to your computer. The first setup may require downloading the model files.",
			],
			[
				"Will scheduled posts publish when the app is closed?",
				"No. Clipey or its tray icon must be running at the scheduled time.",
			],
		],
	},
	es: {
		bar: {
			host: "clipey.com.br",
			recording: "Grabando",
			chaptersAria: "Capítulos",
			chapters: [
				["record", "Grabar"],
				["clicks", "Editar"],
				["publish", "Publicar"],
			],
			blog: "Blog",
			export: "Exportar Clipey",
		},
		hero: {
			lines: [
				["clip", "00:00:00", "Clip", "Graba la pantalla."],
				["zoom", "00:02:14", "Zoom 1,8×", "Clipey edita."],
				["speed", "00:07:02", "Exportar", "Tú publicas."],
			],
			sub: "Grabador y editor de pantalla para Windows, macOS y Linux. Cortes de silencio, zoom en cada clic, subtítulos y publicación en Instagram, Facebook y TikTok, en la misma app. YouTube en la próxima versión.",
			definition: "Clipey es una aplicación de grabación y edición de video de pantalla para Windows, macOS y Linux que combina captura de cursor y clics, cortes y zooms automáticos y publicación en redes sociales.",
			download: "Descargar Clipey",
			platform: "Windows, macOS y Linux · 64 bits",
			noAccount: "sin cuenta para grabar y editar",
			imageAlt:
				"Línea de tiempo de Clipey con las regiones de zoom creadas a partir de los clics, en azul",
			caption: "Línea de tiempo real de Clipey 1.15",
			zoomTag: "Zoom 1,8× · auto al hacer clic",
			drawNote: "dibujado en vivo, Ctrl + Shift + D",
		},
		frames: [
			[
				"00:00",
				"La grabación en bruto",
				"La línea de tiempo real de Clipey, quieta. Todavía no pasó nada.",
			],
			[
				"00:02",
				"El clic",
				"La onda verde aparece donde el cursor hizo clic, con el color del botón izquierdo.",
			],
			[
				"00:04",
				"El zoom automático",
				"La imagen se acerca 1,8× a la zona del clic.",
			],
			[
				"00:06",
				"El silencio desaparece",
				"El tramo sin voz queda marcado en la línea de tiempo y sale del corte.",
			],
			[
				"00:08",
				"El subtítulo se enciende",
				"El subtítulo de la transcripción aparece con la palabra clave resaltada.",
			],
			[
				"00:10",
				"Pasa a vertical",
				"El cuadro pasa a 9:16, listo para Shorts, Reels y TikTok.",
			],
		],
		storyAria: "Lo que Clipey hace con una grabación, cuadro a cuadro",
		cutTag: "Silencio 1,8 s · cortado",
		captionText: ["haz clic en", "Exportar"],
		timeline: {
			ticks: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"],
			chapters: [
				["clip", "Grabar"],
				["zoom", "Clics y zoom"],
				["annotation", "Overlays"],
				["speed", "Vertical"],
				["clip", "Publicar"],
			],
		},
		record: {
			tc: "00:00:30 · Grabar",
			title: ["Una barra.", "Ningún proyecto que crear antes."],
			text: "Elige la pantalla o la ventana, activa la cámara y el micrófono, y graba. Clipey registra el cursor, cada botón del ratón, el desplazamiento y las teclas, para que la edición los use después.",
			imageAlt: "Barra de grabación de Clipey con tiempo, pausa y detener",
			caption:
				"La barra de grabación real, tal como aparece sobre tu escritorio",
		},
		clicks: {
			tc: "00:01:00 · Clics y zoom",
			title: "Cada clic se volvió un zoom. No marcaste ninguno.",
			text: "Las píldoras azules son zooms creados a partir de tus clics. Arrástralos, bórralos o cambia el nivel de cada uno en la línea de tiempo.",
			imageAlt:
				"Editor de Clipey con la línea de tiempo, regiones de zoom y de velocidad y el panel de composición",
			caption:
				"Editor real · zoom, velocidad, anotación, recorte y audio en pistas separadas",
		},
		overlays: {
			tc: "00:01:30 · Overlays",
			title: "Haz clic en esta zona.",
			text: "Tu cursor ya tiene los efectos de Clipey: un estilo para cada botón del ratón. Pulsa teclas y aparecen igual que en el video.",
			stageLabel:
				"Zona de demostración: haz clic con cualquier botón del ratón o pulsa teclas",
			imageAlt:
				"Panel Efectos del ratón de Clipey: efecto de clic, color por botón, halo y foco",
			caption: "Panel real · Efectos del ratón",
		},
		vertical: {
			tc: "00:02:00 · Vertical",
			title: ["Entra 16:9.", "Sale 9:16."],
			text: "Auto Clip sugiere momentos cortos con una puntuación para que elijas, y el reencuadre sigue el rostro en vertical. El ajuste muestra la resolución, la tasa de bits y el tamaño estimado antes de exportar.",
			captionText: ["subtítulo en el", "lugar justo"],
			wideAlt: "Cuadro 16:9 del editor con la zona vertical marcada",
			tallAlt: "El mismo cuadro recortado a 9:16 con subtítulo",
			exportAlt: "Diálogo Exportar con ajustes, tamaño estimado y publicación",
			scheduleAlt:
				"Diálogo Exportar con el ajuste de TikTok y la pestaña Programar",
		},
		publish: {
			tc: "00:02:30 · Publicar",
			title: "Instagram, Facebook y TikTok.",
			titleMuted: "Después de exportar, publica en cada red — o programa la hora.",
			notes: [
				[
					"Kit de publicación",
					"Título, descripción y hashtags sugeridos para cada red, dentro de los límites de caracteres de cada una.",
				],
				[
					"Programación",
					"La cola se ejecuta en tu PC con Clipey abierto o en la bandeja. Si la hora pasa con el PC apagado, la publicación queda marcada como perdida y no sale sola.",
				],
				[
					"Cuentas",
					"Conecta cada red una vez desde el navegador. Clipey muestra qué cuentas están conectadas.",
				],
			],
		},
		local: {
			tc: "00:03:00 · Tu PC",
			title:
				"La transcripción puede ejecutarse por completo en tu computadora.",
			text: "Sin telemetría de uso. Los servicios en la nube son opcionales y usan tu propia clave; la voz en la nube muestra el costo estimado antes de generar.",
			imageAlt: "Ajustes de transcripción y medios de Clipey",
			caption: "Ajustes reales · Transcripción y medios",
			privacyLink: "Cómo funciona la privacidad",
			deletionLink: "Eliminación de datos (EN)",
		},
		faqTc: "00:03:15 · Preguntas",
		faqTitle: "Preguntas frecuentes",
		export: {
			tc: "00:03:30 · Fin de la grabación",
			title: "Exportar.",
			download: "Descargar Clipey",
			platform: "Windows, macOS y Linux · 64 bits",
			version: "Versión",
			pricing:
				"La descarga es gratuita. Las funciones en la nube usan tu propia clave de API o créditos.",
			requirements:
				"En Windows, la captura de pantalla requiere Windows 10 versión 2004 (compilación 19041) o posterior.",
		},
		footer: {
			blog: "Blog",
			contact: "Contacto",
			releases: "Versiones para descargar",
		},
		faq: [
			[
				"¿Clipey es gratis?",
				"La descarga es gratuita. Las funciones en la nube, como la voz y los modelos de IA, usan tu propia clave de API o créditos.",
			],
			[
				"¿Cómo funcionan las funciones en la nube?",
				"La grabación y la edición local no necesitan cuenta ni conexión a internet. Para subtítulos y voz en la nube, configuras tu propia clave de API o usas créditos; el costo estimado se muestra antes de generar.",
			],
			[
				"¿En qué sistemas funciona?",
				"Clipey 1.15 funciona en Windows, macOS y Linux, 64 bits. En Windows, las funciones de captura usan las API del sistema.",
			],
			[
				"¿Necesito una cuenta?",
				"No necesitas una cuenta de Clipey para grabar y editar localmente. Sí necesitas cuentas de las plataformas para publicar en ellas.",
			],
			[
				"¿Mis videos se suben a la nube?",
				"Las grabaciones y los proyectos permanecen en tu computadora. Al publicar o usar un proveedor externo, el contenido elegido se envía al destino correspondiente.",
			],
			[
				"¿La transcripción funciona sin conexión?",
				"La transcripción local usa modelos descargados en tu computadora. La primera configuración puede requerir descargar los archivos del modelo.",
			],
			[
				"¿Se publican las publicaciones programadas con la aplicación cerrada?",
				"No. Clipey o su icono de la bandeja deben estar en ejecución a la hora programada.",
			],
		],
	},
};
