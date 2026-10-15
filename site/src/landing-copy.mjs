/**
 * Landing page copy. Every product sentence here is mapped to its source in the claims evidence file kept with the release notes;
 * wording that depends on the 1.15 lane specs stays as soft as those specs.
 */
export const LANDING = {
	"pt-BR": {
		eyebrow: "Vídeo de tela, sem atrito",
		hero: "Do primeiro clique ao vídeo pronto.",
		sub: "Grave sua tela, refine a edição e publique no seu ritmo. Um estúdio de vídeo para Windows, com seus arquivos no seu computador.",
		download: "Baixar para Windows",
		news: "Ver novidades da 1.15",
		note: ["Windows 10 e 11", "Download gratuito", "Sem telemetria de uso"],
		frameLabel: "Prévia do editor do Clipey",
		frameCaption:
			"Editor do Clipey 1.15: tela gravada, timeline e legendas no mesmo projeto.",
		framePending: "A captura do editor entra aqui.",
		sections: {
			features: {
				tc: "00:12",
				kicker: "Recursos",
				title: "Uma gravação. Um vídeo pronto.",
				sub: "Capture com clareza, ajuste os detalhes e exporte sem sair do seu fluxo.",
			},
			ai: {
				tc: "00:34",
				kicker: "IA com você",
				title: "IA que ajuda, sem tomar o controle.",
				sub: "Sugestões editáveis para chegar ao corte que você quer.",
			},
			publish: {
				tc: "00:56",
				kicker: "Publicar",
				title: "Da edição à publicação, com você no comando.",
				sub: "Organize os detalhes e escolha quando e onde publicar.",
			},
			privacy: {
				tc: "01:18",
				kicker: "Privacidade",
				title: "Seu trabalho continua seu.",
				sub: "Projetos, gravações e transcrições locais ficam no computador. O Clipey não coleta telemetria de uso. Recursos que usam provedores externos enviam a eles apenas o conteúdo necessário, com a sua configuração.",
				link: "Como funciona a privacidade",
				link2: "Exclusão de dados",
			},
			requirements: {
				tc: "01:40",
				kicker: "Requisitos",
				title: "Feito para Windows.",
				sub: "Windows 10 ou 11. A captura de tela exige Windows 10, versão 2004 (build 19041) ou posterior. A gravação e a edição de vídeo se beneficiam de uma GPU compatível; o desempenho varia conforme o projeto e o hardware.",
			},
			blog: {
				tc: "02:02",
				kicker: "Blog",
				title: "Guias para tirar o máximo do 1.15.",
				sub: "Tutoriais curtos, com os nomes reais dos controles.",
				link: "Ver todos os artigos",
			},
			faq: { tc: "02:24", kicker: "Perguntas", title: "Perguntas frequentes" },
			download: {
				tc: "02:46",
				kicker: "Clipey 1.15",
				title: "Seu próximo vídeo começa aqui.",
			},
		},
		features: [
			[
				"Grave",
				"Capture a tela e o cursor no Windows. Preserve os movimentos para editar depois.",
			],
			[
				"Edite",
				"Ajuste cortes, zooms e legendas em uma linha do tempo visual.",
			],
			[
				"Legende",
				"Gere transcrições no dispositivo e revise as legendas antes de exportar.",
			],
			[
				"Exporte",
				"Prepare o vídeo e confira o arquivo final antes de compartilhar.",
			],
		],
		ai: [
			[
				"Edição assistida",
				"Sugestões de cortes, zooms e trechos sem fala para revisar.",
			],
			[
				"Clipes curtos",
				"O Auto Clip encontra trechos de 15 a 90 segundos e mostra a nota de cada um para você escolher.",
			],
			[
				"Voz com custo à vista",
				"Veja a estimativa de custo antes de gerar voz na nuvem e defina um limite por sessão.",
			],
			[
				"Agentes MCP",
				"Conecte ferramentas compatíveis e peça ações no editor com sua autorização.",
			],
		],
		publish: [
			[
				"Agendamento",
				"Programe publicações no YouTube, TikTok e Instagram. O Clipey precisa estar aberto ou na bandeja do sistema no horário.",
			],
			[
				"Kit de publicação",
				"Gere título, descrição e hashtags para cada plataforma a partir da transcrição, respeitando os limites de cada uma.",
			],
			[
				"Presets de exportação",
				"Escolha presets para TikTok, YouTube Shorts, Instagram Reels e YouTube, com estimativa de tamanho antes de exportar.",
			],
			[
				"Verificação",
				"Depois de exportar um MP4, o Clipey confere duração, vídeo, áudio e erros de decodificação e avisa se algo estiver fora do esperado.",
			],
		],
		faq: [
			[
				"O Clipey é gratuito?",
				"Sim. O aplicativo é gratuito para baixar. Alguns recursos podem depender de serviços externos que você configura.",
			],
			[
				"Em quais sistemas funciona?",
				"O Clipey 1.15 é para Windows 10 e 11. Recursos de captura usam APIs do Windows.",
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
				"Posso revisar as sugestões de IA?",
				"Sim. As sugestões de edição são editáveis antes da exportação.",
			],
			[
				"O agendamento publica com o aplicativo fechado?",
				"Não. O Clipey ou o ícone da bandeja precisa estar em execução no horário agendado.",
			],
			[
				"Onde encontro os requisitos?",
				"A captura requer Windows 10 build 19041 ou superior. O desempenho depende também da GPU e da resolução do projeto.",
			],
		],
	},
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
			["Assisted editing", "Review suggested cuts, zooms and quiet sections."],
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
			["Edición asistida", "Revisa cortes, zooms y pausas sugeridos."],
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
