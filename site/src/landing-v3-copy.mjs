/**
 * Copy of the v3 landing, one object per site language. pt-BR is the owner-approved design text (Claude Design canvas,
 * Main.dc.html and Mobile.dc.html); en and es translate it without adding claims. Facts it relies on: interface in 15
 * languages, captions translated into 15 languages, Windows/macOS/Linux, installers unsigned in this version, YouTube
 * uploads private until Google's approval.
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
			title: ["Grave a tela.", "O Clipey", "edita."],
			sub: "Grave no Windows, macOS ou Linux, edite com cortes, zooms e legendas e publique no seu ritmo. Gratuito, com seus arquivos no seu computador.",
			cta: ["Baixar para Windows", "macOS e Linux"],
			ctaPhone: ["Baixar para o computador", "Usar no celular com o PC"],
			meta: "Versão {version} · interface em 15 idiomas · download gratuito · instaladores sem assinatura nesta versão",
			timelineAria: "Do gravar ao publicar",
			ticks: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"],
			lanes: [
				["record", "Gravar", "00:00"],
				["edit", "Editar", "Zoom 1,8×"],
				["publish", "Publicar", ""],
			],
			videoLabel:
				"O editor do Clipey em uso: fundos, proporção, moldura, sombra, zoom e velocidade na linha do tempo, painéis e reprodução",
			caption:
				"Gravado no Clipey {version} de verdade · cada clique muda a prévia e a linha do tempo",
		},
		compat: {
			aria: "Compatibilidade",
			groups: [
				["PUBLICA EM", ["YouTube", "TikTok", "Instagram", "Facebook"]],
				["RODA EM", ["Windows 10 e 11", "macOS", "Linux"]],
				["FALA", ["15 idiomas"]],
			],
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
			marker: "00:21 · EDITAR",
			title: "Cada clique virou um zoom. Você não marcou nenhum.",
			text: "Os zooms nascem dos cliques que você gravou. Ajuste, apague ou mude a intensidade direto na linha do tempo.",
			cards: [
				[
					"zoom",
					"Zoom 1,8×",
					"Zoom automático",
					"Cada clique vira uma aproximação suave, com foco onde o cursor estava.",
				],
				[
					"cut",
					"− 00:04,2",
					"Cortes de silêncio",
					"As pausas longas saem de uma vez. Você revisa cada corte antes de exportar.",
				],
				[
					"langs",
					"",
					"Legendas em 15 idiomas",
					"Transcreva na língua do vídeo, edite palavra por palavra e traduza as legendas para 15 idiomas.",
				],
			],
			langs: ["PT", "EN", "ES", "FR", "DE", "日本語", "+9"],
			captionsLabel: "Legendas do Clipey traduzidas para 15 idiomas",
			captionsCaption:
				"Legendas em 15 idiomas · transcrição editável palavra por palavra",
		},
		publish: {
			marker: "01:12 · PUBLICAR",
			title: "YouTube, TikTok, Instagram e Facebook.",
			text: "Exporte em MP4 ou GIF e envie para as suas redes agora ou na hora que você marcar. As contas ficam salvas só no seu computador.",
			note: "Por enquanto o YouTube recebe os vídeos como privados, até a aprovação do Google.",
			alt: "Janela Exportar e publicar do Clipey",
		},
		phone: {
			marker: "NO CELULAR",
			title: "O celular vira o controle do estúdio.",
			text: "Pareie pelo código QR e controle a gravação no computador, revise os cortes automáticos e ajuste legendas de onde estiver. No Android, há o app; no iPhone, o navegador.",
			rotate: "Ver na horizontal",
			portrait: "[captura real · retrato · Início]",
			landscape: "[captura real · paisagem · Editor]",
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
			title: ["Record your screen.", "Clipey", "edits."],
			sub: "Record on Windows, macOS or Linux, edit with cuts, zooms and captions, and publish at your own pace. Free, with your files on your computer.",
			cta: ["Download for Windows", "macOS and Linux"],
			ctaPhone: ["Download for your computer", "Use it on your phone with your PC"],
			meta: "Version {version} · interface in 15 languages · free download · installers unsigned in this version",
			timelineAria: "From recording to publishing",
			ticks: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"],
			lanes: [
				["record", "Record", "00:00"],
				["edit", "Edit", "Zoom 1.8×"],
				["publish", "Publish", ""],
			],
			videoLabel:
				"The Clipey editor in use: backgrounds, aspect ratio, frame, shadow, zoom and speed on the timeline, panels and playback",
			caption:
				"Recorded in the real Clipey {version} · every click changes the preview and the timeline",
		},
		compat: {
			aria: "Compatibility",
			groups: [
				["PUBLISHES TO", ["YouTube", "TikTok", "Instagram", "Facebook"]],
				["RUNS ON", ["Windows 10 and 11", "macOS", "Linux"]],
				["SPEAKS", ["15 languages"]],
			],
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
			marker: "00:21 · EDIT",
			title: "Every click became a zoom. You marked none of them.",
			text: "The zooms come from the clicks you recorded. Adjust them, delete them or change the intensity right on the timeline.",
			cards: [
				[
					"zoom",
					"Zoom 1.8×",
					"Automatic zoom",
					"Every click becomes a smooth zoom-in, focused where the cursor was.",
				],
				[
					"cut",
					"− 00:04.2",
					"Silence cuts",
					"Long pauses go in one pass. You review each cut before you export.",
				],
				[
					"langs",
					"",
					"Captions in 15 languages",
					"Transcribe in the video's language, edit word by word and translate the captions into 15 languages.",
				],
			],
			langs: ["PT", "EN", "ES", "FR", "DE", "日本語", "+9"],
			captionsLabel: "Clipey captions translated into 15 languages",
			captionsCaption:
				"Captions in 15 languages · a transcript you can edit word by word",
		},
		publish: {
			marker: "01:12 · PUBLISH",
			title: "YouTube, TikTok, Instagram and Facebook.",
			text: "Export as MP4 or GIF and send it to your accounts now or at the time you set. Your accounts are saved only on your computer.",
			note: "For now, YouTube receives the videos as private, until Google's approval.",
			alt: "The Clipey Export and publish window",
		},
		phone: {
			marker: "ON YOUR PHONE",
			title: "Your phone becomes the studio remote.",
			text: "Pair with the QR code and control the recording on your computer, review the automatic cuts and adjust captions from wherever you are. On Android there is the app; on iPhone, the browser.",
			rotate: "View in landscape",
			portrait: "[real capture · portrait · Home]",
			landscape: "[real capture · landscape · Editor]",
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
			title: ["Graba la pantalla.", "Clipey", "edita."],
			sub: "Graba en Windows, macOS o Linux, edita con cortes, zooms y subtítulos y publica a tu ritmo. Gratis, con tus archivos en tu computadora.",
			cta: ["Descargar para Windows", "macOS y Linux"],
			ctaPhone: ["Descargar para la computadora", "Usar en el móvil con la PC"],
			meta: "Versión {version} · interfaz en 15 idiomas · descarga gratuita · instaladores sin firmar en esta versión",
			timelineAria: "De grabar a publicar",
			ticks: ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30"],
			lanes: [
				["record", "Grabar", "00:00"],
				["edit", "Editar", "Zoom 1,8×"],
				["publish", "Publicar", ""],
			],
			videoLabel:
				"El editor de Clipey en uso: fondos, proporción, marco, sombra, zoom y velocidad en la línea de tiempo, paneles y reproducción",
			caption:
				"Grabado en Clipey {version} de verdad · cada clic cambia la vista previa y la línea de tiempo",
		},
		compat: {
			aria: "Compatibilidad",
			groups: [
				["PUBLICA EN", ["YouTube", "TikTok", "Instagram", "Facebook"]],
				["FUNCIONA EN", ["Windows 10 y 11", "macOS", "Linux"]],
				["HABLA", ["15 idiomas"]],
			],
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
				caption: "La barra real de Clipey {version} · las etiquetas son las de la app",
			},
		},
		edit: {
			marker: "00:21 · EDITAR",
			title: "Cada clic se volvió un zoom. No marcaste ninguno.",
			text: "Los zooms nacen de los clics que grabaste. Ajústalos, bórralos o cambia la intensidad directamente en la línea de tiempo.",
			cards: [
				[
					"zoom",
					"Zoom 1,8×",
					"Zoom automático",
					"Cada clic se convierte en un acercamiento suave, con foco donde estaba el cursor.",
				],
				[
					"cut",
					"− 00:04,2",
					"Cortes de silencio",
					"Las pausas largas salen de una vez. Revisas cada corte antes de exportar.",
				],
				[
					"langs",
					"",
					"Subtítulos en 15 idiomas",
					"Transcribe en el idioma del video, edita palabra por palabra y traduce los subtítulos a 15 idiomas.",
				],
			],
			langs: ["PT", "EN", "ES", "FR", "DE", "日本語", "+9"],
			captionsLabel: "Subtítulos de Clipey traducidos a 15 idiomas",
			captionsCaption:
				"Subtítulos en 15 idiomas · una transcripción que editas palabra por palabra",
		},
		publish: {
			marker: "01:12 · PUBLICAR",
			title: "YouTube, TikTok, Instagram y Facebook.",
			text: "Exporta en MP4 o GIF y envíalo a tus redes ahora o a la hora que marques. Las cuentas quedan guardadas solo en tu computadora.",
			note: "Por ahora, YouTube recibe los videos como privados, hasta la aprobación de Google.",
			alt: "La ventana Exportar y publicar de Clipey",
		},
		phone: {
			marker: "EN EL MÓVIL",
			title: "El móvil se convierte en el control del estudio.",
			text: "Vincúlalo con el código QR y controla la grabación en la computadora, revisa los cortes automáticos y ajusta los subtítulos desde donde estés. En Android hay una app; en iPhone, el navegador.",
			rotate: "Ver en horizontal",
			portrait: "[captura real · vertical · Inicio]",
			landscape: "[captura real · horizontal · Editor]",
		},
		local: {
			marker: "TU PC",
			title: "La transcripción puede ejecutarse por completo en tu computadora.",
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
