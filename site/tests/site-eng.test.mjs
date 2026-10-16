import { createHash } from "node:crypto";
import {
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import {
	APP_VERSION,
	blogBase,
	CATEGORIES,
	categoryUrl,
	LANDING_PATH,
	LANGUAGES,
	OWNER,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
} from "../src/blog/config.mjs";
import {
	getCompletePosts,
	parsePostFile,
	renderMarkdown,
} from "../src/blog/content.mjs";
import { UI } from "../src/blog/i18n.mjs";
import { THEME_SCRIPT_HASH } from "../src/blog/shell.mjs";
import { usedCategories } from "../src/blog/template.mjs";
import { STORY } from "../src/landing-copy.mjs";
import {
	fileForUrl,
	LEGAL_OUTPUT_FILES,
	renderSite,
} from "../src/render-site.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legalSourceDir = path.join(root, "legal-source");

const assets = {
	landing: {
		css: ["/assets/landing.css", "/assets/chrome.css"],
		font: "/assets/Geist-Variable.woff2",
		script: "/assets/landing.js",
	},
	blog: {
		css: ["/assets/blog.css", "/assets/chrome.css"],
		font: "/assets/Geist-Variable.woff2",
		script: "/assets/blog.js",
	},
};

const posts = getCompletePosts();
const files = renderSite(posts, assets);
const htmlFiles = [...files].filter(([name]) => name.endsWith(".html"));

describe("1. Legal pages: copied verbatim, text pinned, no third-party origin (S1, S2, S13)", () => {
	const legalPages = LEGAL_OUTPUT_FILES.filter((name) => name.endsWith(".html"));

	/** What a reader sees: the title, then the body with every tag removed (entities and whitespace kept). */
	const visibleText = (html) =>
		`${html.match(/<title>([\s\S]*?)<\/title>/)[1]}\n${html.match(/<body>([\s\S]*)<\/body>/)[1].replace(/<[^>]*>/g, "")}`;

	// SHA-256 of visibleText() for each legal page. Any change to the wording of a policy changes its hash: update
	// it only together with the "Última atualização" / "Last updated" date in the page.
	const VISIBLE_TEXT_SHA256 = {
		"privacidade/index.html": "db9f3dbfe1669ab5df3b2ba4bf966f25c2aa480c2d0930fd6eec5101af803aaf",
		"termos/index.html": "6b0a390bfd8bdda6ac31e0f2f3dd1c5ff8464ac21fb0ebd08fbf8a9dee301924",
		"exclusao-de-dados/index.html": "42c376e25276226f60f1469e610e4634b709238e59a08e8904e03cd3ccdabda5",
		"en/privacy/index.html": "6e3c0011692c2932ebd243f221cb01a605c64ec9ddf5e0bf676f2e89d4824c87",
		"en/terms/index.html": "50777b07012b0992f37f537cbc76c541c9171db6d116f5e705368f0bf4338ddf",
		"en/data-deletion/index.html": "7b415e143f8dbb5d9cd6636bceeb81892a9e3257ab589bbc2e2e97643241672f",
		"404.html": "6f07a90177a8c92701c798de2af2466cfd8cd9a1c485e2e0fe0f10c4ed28925f",
	};

	for (const fileName of LEGAL_OUTPUT_FILES) {
		it(`copies the legal source verbatim: ${fileName}`, () => {
			const source = readFileSync(path.join(legalSourceDir, fileName));
			expect(Buffer.from(files.get(fileName)).equals(source)).toBe(true);
		});
	}

	it("keeps the visible text of every legal page unchanged", () => {
		expect(Object.keys(VISIBLE_TEXT_SHA256).sort()).toEqual([...legalPages].sort());
		for (const fileName of legalPages) {
			const hash = createHash("sha256").update(visibleText(files.get(fileName))).digest("hex");
			expect(hash, fileName).toBe(VISIBLE_TEXT_SHA256[fileName]);
		}
	});

	it("contains no HTML comments in any built legal page", () => {
		for (const fileName of legalPages) {
			expect(files.get(fileName), fileName).not.toContain("<!--");
		}
	});

	it("loads nothing from another origin: no remote font, stylesheet, script or image", () => {
		for (const fileName of legalPages) {
			const html = files.get(fileName);
			const resources = [...html.matchAll(/<(?:link|script|img|iframe|source|video|audio|object|embed)\b[^>]*>/g)];
			expect(resources.length, fileName).toBeGreaterThan(0);
			for (const [tag] of resources) {
				for (const [, url] of tag.matchAll(/\b(?:src|srcset|href)="([^"]*)"/g))
					expect(url, `${fileName}: ${tag}`).toMatch(/^\/(?!\/)/);
			}
			expect(html, fileName).not.toMatch(/<style[\s>]|\sstyle=|@import|fonts\.(?:googleapis|gstatic)\.com/);
		}
		expect(files.get("legal.css")).not.toMatch(/https?:|\/\/|@import/);
		// The CSP allows the stylesheet and the font only from the site itself, and names no other origin.
		const csp = files.get("_headers").match(/Content-Security-Policy: (.+)/)[1];
		expect(csp).toContain("style-src 'self';");
		expect(csp).toContain("font-src 'self';");
		expect(csp).not.toMatch(/https?:|\*|fonts\./);
	});

	it("styles every legal page from the shared same-origin stylesheet with the self-hosted Geist", () => {
		for (const fileName of legalPages)
			expect(files.get(fileName), fileName).toContain('<link rel="stylesheet" href="/legal.css">');
		const css = files.get("legal.css");
		expect(css).toContain('src:url("/assets/Geist-Variable.woff2") format("woff2")');
		expect(css).toContain("font-display:swap");
		expect(css).toContain('font:16px/1.65 Geist,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif');
	});

	it("gives every legal page its own description in the page language", () => {
		const descriptions = legalPages.map((fileName) => {
			const html = files.get(fileName);
			const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
			expect(description, fileName).toBeDefined();
			expect(description.length, fileName).toBeLessThanOrEqual(170);
			expect(description, fileName).not.toMatch(/grave, edite e publique|record, edit and publish/);
			const lang = html.match(/<html lang="([^"]+)">/)[1];
			expect(lang, fileName).toBe(fileName.startsWith("en/") ? "en" : "pt-BR");
			return description;
		});
		expect(new Set(descriptions).size).toBe(legalPages.length);
	});
});

describe("1b. Legal pages: controller, DPO, contacts and platform-required clauses", () => {
	const POLICY_PAGES = {
		"privacidade/index.html": { lang: "pt-BR", kind: "privacy" },
		"termos/index.html": { lang: "pt-BR", kind: "terms" },
		"exclusao-de-dados/index.html": { lang: "pt-BR", kind: "deletion" },
		"en/privacy/index.html": { lang: "en", kind: "privacy" },
		"en/terms/index.html": { lang: "en", kind: "terms" },
		"en/data-deletion/index.html": { lang: "en", kind: "deletion" },
	};
	const PRIVACY_EMAIL = { "pt-BR": "privacidade@clipey.com.br", en: "privacy@clipey.com.br" };
	const REVOKE_URL = "https://security.google.com/settings/security/permissions";

	/** The page body as a reader sees it: tags removed, entities and runs of whitespace collapsed. */
	const bodyText = (html) =>
		html
			.match(/<body>([\s\S]*)<\/body>/)[1]
			.replace(/<[^>]*>/g, "")
			.replace(/&amp;/g, "&")
			.replace(/\s+/g, " ");

	it("covers exactly the six policy pages", () => {
		expect(Object.keys(POLICY_PAGES).sort()).toEqual(
			LEGAL_OUTPUT_FILES.filter((name) => name.endsWith("/index.html")).sort(),
		);
	});

	for (const [fileName, { lang, kind }] of Object.entries(POLICY_PAGES)) {
		it(`identifies the controller, the DPO and the contact address: ${fileName}`, () => {
			const html = files.get(fileName);
			const text = bodyText(html);
			expect(text).toContain("Produtora MaxVision");
			expect(text).toContain("CNPJ 38.386.434/0001-44");
			expect(text).toContain(lang === "en" ? "São Paulo, Brazil" : "São Paulo, Brasil");
			expect(text).not.toContain("Diadema");
			expect(text).toMatch(
				lang === "en"
					? /Data Protection Officer \(DPO[^)]*\)[,:] Max Müller, (?:at )?maxmuller@clipey\.com\.br/
					: /[Ee]ncarregado pelo tratamento de dados pessoais \(DPO\)[,:] Max Müller, (?:em )?maxmuller@clipey\.com\.br/,
			);
			expect(html).toContain('<a href="mailto:maxmuller@clipey.com.br">');
			expect(html).toContain('<a href="mailto:contato@clipey.com.br">contato@clipey.com.br</a></div></footer>');
			expect(text).toContain(
				lang === "en"
					? "Site content: all rights reserved. App licensed under the MIT License."
					: "Conteúdo do site: todos os direitos reservados. Aplicativo sob a Licença MIT.",
			);
			if (kind !== "terms") expect(html).toContain(`<a href="mailto:${PRIVACY_EMAIL[lang]}">`);
			expect(html).not.toContain("gmail.com");
			expect(html).not.toContain("<!--");
			expect(html).not.toMatch(/\[[A-Z][A-Z ]+\]/);
			expect(html).not.toMatch(/\[confirmar\]/i);
		});

		it(`contains no HTML comments or reviewer notes: ${fileName}`, () => {
			const html = files.get(fileName);
			expect(html).not.toContain("<!--");
			expect(html).not.toMatch(/\[confirmar\]/i);
		});

		it(`states its effective and last-updated date: ${fileName}`, () => {
			const text = bodyText(files.get(fileName));
			expect(text).toContain(
				lang === "en"
					? "Effective October 16, 2026 · Last updated: October 16, 2026"
					: "Em vigor desde 16 de outubro de 2026 · Última atualização: 16 de outubro de 2026",
			);
		});
	}

	for (const fileName of ["privacidade/index.html", "en/privacy/index.html"]) {
		it(`carries the Google Limited Use statement, the required links and the revocation URL: ${fileName}`, () => {
			const html = files.get(fileName);
			const text = bodyText(html);
			expect(text).toContain(
				fileName.startsWith("en/")
					? "Clipey’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements."
					: "O uso e a transferência, pelo Clipey, para qualquer outro aplicativo, de informações recebidas das APIs do Google seguem a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado.",
			);
			for (const url of [
				"https://developers.google.com/terms/api-services-user-data-policy",
				"https://www.youtube.com/t/terms",
				"https://policies.google.com/privacy",
				REVOKE_URL,
				"https://www.tiktok.com/legal/tik-tok-developer-terms-of-service?lang=en",
			])
				expect(html, url).toContain(`<a href="${url}">`);
			expect(text).toContain(REVOKE_URL);
			expect(text).toContain("api.clipey.com.br");
			expect(text).toContain("localStorage");
			expect(text).toMatch(/ANPD/);
			expect(text).not.toMatch(/até 30 dias|up to 30 days|não armazena tokens|does not store tokens/);
		});
	}

	for (const fileName of ["termos/index.html", "en/terms/index.html"]) {
		it(`binds YouTube API users to the YouTube Terms and names the venue: ${fileName}`, () => {
			const html = files.get(fileName);
			const text = bodyText(html);
			const en = fileName.startsWith("en/");
			expect(text).toContain(
				en
					? "By using the Clipey features that access YouTube API Services, you agree to be bound by the YouTube Terms of Service."
					: "Ao usar as funções do Clipey que acessam os Serviços de API do YouTube, você concorda em estar vinculado aos Termos de Serviço do YouTube.",
			);
			expect(html).toContain('<a href="https://www.youtube.com/t/terms">');
			expect(text).toContain(en ? "Comarca) of São Paulo" : "foro da Comarca de São Paulo/SP");
			expect(text).toContain(en ? "Article 101, item I, of the Brazilian Consumer Protection Code" : "art. 101, inciso I, do Código de Defesa do Consumidor");
			expect(html).toContain('<a href="mailto:legal@clipey.com.br">');
			expect(html).toContain('<a href="mailto:security@clipey.com.br">');
			expect(html).toContain('<a href="https://github.com/produtoramaxvision/clipey/security/advisories/new">');
		});
	}

	for (const fileName of ["exclusao-de-dados/index.html", "en/data-deletion/index.html"]) {
		it(`gives Meta deletion instructions, the Google revocation URL and every OS: ${fileName}`, () => {
			const html = files.get(fileName);
			const text = bodyText(html);
			expect(text).toMatch(/Instruções de exclusão de dados para usuários da Meta|Data deletion instructions for Meta users/);
			expect(html).toContain(`<a href="${REVOKE_URL}">`);
			expect(html).toContain('<a href="https://www.facebook.com/settings?tab=business_tools">');
			for (const os of ["Windows", "macOS", "Linux"]) expect(text).toContain(os);
			expect(text).not.toMatch(/somente no seu computador|only on your computer/);
		});
	}

	// The statements the legal review made mandatory, in both languages with the same substance.
	const REVIEWED_STATEMENTS = {
		"privacidade/index.html": [
			"aplicativo gratuito para Windows, macOS e Linux",
			"https://www.googleapis.com/auth/youtube.upload",
			"https://www.googleapis.com/auth/youtube.readonly",
			"Ao desconectar a conta no Clipey, o aplicativo também solicita a revogação do token ao Google",
			"pages_show_list, pages_read_engagement, pages_manage_posts, instagram_basic, instagram_content_publish e business_management",
			"user.info.basic",
			"video.upload e video.publish",
			"o vídeo não é hospedado em nenhum endereço do Clipey",
			"Ele não grava códigos, tokens nem dados de conta em banco de dados ou em outro armazenamento próprio.",
			"Vídeos e publicações não passam por esse serviço",
			"Os modelos de reconhecimento de fala são baixados uma vez do Hugging Face (huggingface.co)",
			"componente de terceiros",
			"A importação por link usa um componente de terceiros e baixa a mídia diretamente do site de origem para o seu computador.",
			"Você é responsável por importar apenas conteúdo que possui ou que tem autorização para usar, respeitando os direitos autorais e os termos do site de origem.",
			"A Produtora MaxVision não hospeda, armazena nem distribui o conteúdo importado.",
			"nenhum dado vai para servidores do Clipey",
			"própria chave de API (BYOK)",
			"não há créditos na versão 1.15",
			"(LGPD, art. 7º, IX; GDPR, art. 6º, 1, f)",
			"aditivo de tratamento de dados da Cloudflare (LGPD, art. 33, II)",
			"O exercício dos direitos é gratuito.",
			"Você também pode recorrer a órgãos de defesa do consumidor.",
			"Titulares sujeitos ao GDPR também têm direito ao apagamento (art. 17)",
			"mudanças relevantes serão avisadas no aplicativo com 30 dias de antecedência",
			"Aplicativo complementar para celular e tablet",
			"Tailscale",
			"token exclusivo por dispositivo",
			"não são enviados a servidores do Clipey ou da Produtora MaxVision",
			"Android (distribuído por nós em formato APK)",
			"aplicativo web (PWA)",
			"Funções locais, aplicativo complementar móvel e tarefas de IA",
			"Cloudflare Workers Logs",
			"Os parâmetros da URL (query string) são ocultados antes do registro, de modo que códigos de autorização OAuth não ficam armazenados.",
			"até 7 dias",
		],
		"en/privacy/index.html": [
			"free desktop app for Windows, macOS and Linux",
			"https://www.googleapis.com/auth/youtube.upload",
			"https://www.googleapis.com/auth/youtube.readonly",
			"On disconnect, the app also asks Google to revoke the token",
			"pages_show_list, pages_read_engagement, pages_manage_posts, instagram_basic, instagram_content_publish and business_management",
			"user.info.basic",
			"video.upload and video.publish",
			"the video is not hosted at any Clipey address",
			"It does not write codes, tokens or account data to any database or other storage of its own.",
			"Videos and posts do not pass through this service",
			"The speech recognition models are downloaded once from Hugging Face (huggingface.co)",
			"third-party component",
			"Link import uses a third-party component and downloads media directly from the source site to your computer.",
			"You are responsible for importing only content you own or are authorized to use, respecting copyright and the terms of the source site.",
			"Produtora MaxVision does not host, store or distribute imported content.",
			"no data goes to Clipey servers",
			"own API key (BYOK)",
			"there are no credits in 1.15",
			"(LGPD Art. 7 IX; GDPR Art. 6(1)(f))",
			"Cloudflare's data processing addendum (LGPD Art. 33 II)",
			"Exercising these rights is free.",
			"You may also turn to consumer protection bodies.",
			"Data subjects covered by the GDPR also have the right to erasure (Art. 17)",
			"material changes will be announced in the app 30 days in advance",
			"Mobile and tablet companion",
			"Tailscale",
			"per-device token",
			"not sent to Clipey or Produtora MaxVision servers",
			"Android app (an APK distributed by us)",
			"web app (PWA)",
			"Local features, mobile companion and AI tasks",
			"Cloudflare Workers Logs",
			"URL query parameters (query string) are redacted before logging, so OAuth authorization codes are not stored.",
			"up to 7 days",
		],
		"termos/index.html": [
			"aplicativo gratuito para Windows, macOS e Linux",
			"O Clipey não vende créditos, assinaturas nem outros itens pagos.",
			"O uso é permitido a maiores de 18 anos ou a menores representados ou assistidos pelos responsáveis.",
			"A importação por link usa um componente de terceiros e baixa a mídia diretamente do site de origem para o seu computador.",
			"Você é responsável por importar apenas conteúdo que possui ou que tem autorização para usar, respeitando os direitos autorais e os termos do site de origem.",
			"A Produtora MaxVision não hospeda, armazena nem distribui o conteúdo importado.",
			"própria chave de API (BYOK)",
			"não há créditos na versão 1.15",
			"O aplicativo e o aplicativo complementar móvel são licenciados gratuitamente sob a Licença MIT",
			"Na versão 1.15, os instaladores para macOS e Linux não têm assinatura digital do desenvolvedor",
			"Para usuários consumidores, nada nos itens 7 e 8 limita a responsabilidade por vícios e defeitos nem a reparação integral prevista no CDC (arts. 6º, VI, 12, 14 e 24).",
			"Mudanças relevantes serão avisadas no aplicativo com 30 dias de antecedência. Se discordar, você pode parar de usar o Clipey.",
			"normas obrigatórias de proteção ao consumidor do país onde você reside",
			"conectar um aplicativo complementar no celular ou tablet",
		],
		"en/terms/index.html": [
			"free desktop app for Windows, macOS and Linux",
			"Clipey does not sell credits, subscriptions or any other paid items.",
			"Use is for persons aged 18+, or minors represented or assisted by a guardian.",
			"Link import uses a third-party component and downloads media directly from the source site to your computer.",
			"You are responsible for importing only content you own or are authorized to use, respecting copyright and the terms of the source site.",
			"Produtora MaxVision does not host, store or distribute imported content.",
			"own API key (BYOK)",
			"there are no credits in 1.15",
			"The app and the mobile companion are licensed free of charge under the MIT License",
			"In version 1.15, the macOS and Linux installers are not code-signed",
			"For consumer users, nothing in sections 7 and 8 limits liability for defects or full compensation under the CDC (Arts. 6 VI, 12, 14, 24).",
			"Material changes will be announced in the app 30 days in advance. If you disagree, you may stop using Clipey.",
			"mandatory consumer protection laws of your country of residence",
			"mobile or tablet companion app",
		],
		"exclusao-de-dados/index.html": [
			"macOS: ~/Library/Application Support",
			"Linux: ~/.config",
			"Responderemos em até 15 dias com uma confirmação de que os dados foram excluídos.",
			"O aplicativo pede a revogação do acesso à plataforma e apaga o token da conta do seu computador.",
			"No celular ou tablet (aplicativo complementar)",
			"desparear o aparelho",
			"revogue o token do aparelho",
			"limpe os dados e o cache do aplicativo",
		],
		"en/data-deletion/index.html": [
			"macOS: ~/Library/Application Support",
			"Linux: ~/.config",
			"We will reply within 15 days confirming deletion.",
			"The app asks the platform to revoke access and deletes the account’s token from your computer.",
			"On your phone or tablet (mobile companion)",
			"unpair a mobile device",
			"revoke the token for that device",
			"clear the app data and cache",
		],
	};

	for (const [fileName, statements] of Object.entries(REVIEWED_STATEMENTS)) {
		it(`carries the statements required by the legal review: ${fileName}`, () => {
			const html = files.get(fileName);
			const text = bodyText(html);
			for (const statement of statements) expect(text, statement).toContain(statement);
			expect(text).not.toMatch(/yt-dlp|OpenScreen/i);
			expect(text).not.toMatch(/em breve|coming soon|\((?:quando disponível|when available)\)/i);
			expect(text).not.toMatch(/código de autorização de uso único do redirecionamento|one-time authorization code of the OAuth redirect/);
			expect(text).not.toMatch(/significa aceitação|means acceptance|nas notas de versão|in the release notes/);
			expect(text).not.toContain("router.produtoramaxvision.com.br");
			expect(text).not.toContain("n8n.meuagente.api.br");
			expect(text).not.toMatch(/não é permitid[ao] para conteúdo|not permitted for content/i);
			expect(text).not.toMatch(/servidor(?:es)? intermediário|intermediate server/i);
		});
	}

	it("enforces round 3 owner decisions: user responsibility on link import and absence of internal AI servers", () => {
		const ptImport =
			"A importação por link usa um componente de terceiros e baixa a mídia diretamente do site de origem para o seu computador. Você é responsável por importar apenas conteúdo que possui ou que tem autorização para usar, respeitando os direitos autorais e os termos do site de origem. A Produtora MaxVision não hospeda, armazena nem distribui o conteúdo importado.";
		const enImport =
			"Link import uses a third-party component and downloads media directly from the source site to your computer. You are responsible for importing only content you own or are authorized to use, respecting copyright and the terms of the source site. Produtora MaxVision does not host, store or distribute imported content.";

		for (const file of ["privacidade/index.html", "termos/index.html"]) {
			const text = bodyText(files.get(file));
			expect(text).toContain(ptImport);
			expect(text).not.toContain("router.produtoramaxvision.com.br");
			expect(text).not.toContain("n8n.meuagente.api.br");
			expect(text).not.toMatch(/não é permitid[ao]/i);
			expect(text).not.toMatch(/servidor(?:es)? intermediário/i);
		}

		for (const file of ["en/privacy/index.html", "en/terms/index.html"]) {
			const text = bodyText(files.get(file));
			expect(text).toContain(enImport);
			expect(text).not.toContain("router.produtoramaxvision.com.br");
			expect(text).not.toContain("n8n.meuagente.api.br");
			expect(text).not.toMatch(/not permitted/i);
			expect(text).not.toMatch(/intermediate server/i);
		}

		expect(bodyText(files.get("privacidade/index.html"))).toContain(
			"nenhum dado vai para servidores do Clipey",
		);
		expect(bodyText(files.get("en/privacy/index.html"))).toContain(
			"no data goes to Clipey servers",
		);
	});

	it("updates the 404 page and blog footers with location, MIT license, and consistent links", () => {
		const html404 = files.get("404.html");
		const text404 = bodyText(html404);
		expect(text404).toContain("Produtora MaxVision");
		expect(text404).toContain("CNPJ 38.386.434/0001-44");
		expect(text404).toContain("São Paulo, Brasil");
		expect(text404).not.toContain("Diadema");
		expect(text404).toContain("Conteúdo do site: todos os direitos reservados. Aplicativo sob a Licença MIT.");
		expect(html404).toContain('<a href="mailto:contato@clipey.com.br">contato@clipey.com.br</a></div></footer>');

		for (const lang of LANGUAGES) {
			const blogHtml = files.get(fileForUrl(blogBase(lang)));
			const blogText = bodyText(blogHtml);
			expect(blogText).toContain("Produtora MaxVision");
			expect(blogText).toContain("CNPJ 38.386.434/0001-44");
			expect(blogText).toContain(lang === "en" ? "São Paulo, Brazil" : "São Paulo, Brasil");
			expect(blogText).not.toContain("Diadema");
			expect(blogText).toContain(
				lang === "en"
					? "Site content: all rights reserved. App licensed under the MIT License."
					: lang === "es"
						? "Contenido del sitio: todos los derechos reservados. Aplicación bajo la Licencia MIT."
						: "Conteúdo do site: todos os direitos reservados. Aplicativo sob a Licença MIT.",
			);
		}
	});

	it("keeps the repository policy files consistent with the published pages", () => {
		const repoFile = (name) => readFileSync(path.join(root, "..", name), "utf8");
		expect(repoFile("PRIVACY.md")).not.toContain("build.py");
		const security = repoFile("SECURITY.md");
		expect(security).not.toMatch(/somente no seu computador|não envia essas chaves/);
		expect(security).toContain("api.clipey.com.br");
		expect(repoFile("SUPPORT.md")).toContain("Revise o diagnóstico antes de anexar: ele pode conter dados pessoais.");
	});

	for (const fileName of ["privacidade/index.html", "en/privacy/index.html"]) {
		it(`links the TikTok and Meta privacy policies: ${fileName}`, () => {
			const html = files.get(fileName);
			expect(html).toContain('<a href="https://www.tiktok.com/legal/privacy-policy">');
			expect(html).toContain('<a href="https://www.facebook.com/privacy/policy">');
		});
	}

	it("uses the clipey.com.br contact everywhere on the site", () => {
		for (const [name, content] of files)
			if (typeof content === "string") expect(content, name).not.toContain("clipeyoficial");
		expect(files.get("index.html")).toContain('href="mailto:contato@clipey.com.br"');
	});
});

describe("2. robots.txt and sitemap.xml", () => {
	it("robots.txt allows all and specifies Sitemap", () => {
		const robots = readFileSync(path.join(root, "public/robots.txt"), "utf8");
		expect(robots).toContain("User-agent: *");
		expect(robots).toContain("Allow: /");
		expect(robots).toContain("Sitemap: https://clipey.com.br/sitemap.xml");
	});

	it("sitemap contains landings, blog indexes, categories, articles, legal pages and x-default", () => {
		const sitemap = files.get("sitemap.xml");
		expect(sitemap).toContain(
			'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
		);
		expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');

		for (const lang of LANGUAGES) {
			expect(sitemap).toContain(`<loc>${SITE_URL}${LANDING_PATH[lang]}</loc>`);
			expect(sitemap).toContain(`<loc>${SITE_URL}${blogBase(lang)}</loc>`);
		}

		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const url = `${SITE_URL}${post.content[lang].url}`;
				expect(sitemap).toContain(`<loc>${url}</loc>`);
			}
		}

		expect(sitemap).toContain(`<loc>${SITE_URL}/privacidade/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/en/privacy/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/termos/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/en/terms/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/exclusao-de-dados/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/en/data-deletion/</loc>`);

		expect(sitemap).toContain('hreflang="x-default"');
		expect(sitemap).toContain(`href="${SITE_URL}/"`);
		expect(sitemap).not.toMatch(/\{\{[A-Z_]+\}\}/);
	});
});

describe("3. Head tags on every page", () => {
	it("includes robots, canonical, hreflang alternates, og:*, twitter:*, theme-color, and icons", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;

			expect(html).toContain('name="robots"');
			expect(html).toContain('rel="canonical"');
			expect(html).toContain('hreflang="x-default"');
			expect(html).toContain('property="og:type"');
			expect(html).toContain('property="og:title"');
			expect(html).toContain('property="og:description"');
			expect(html).toContain('property="og:image"');
			expect(html).toContain(
				'name="twitter:card" content="summary_large_image"',
			);
			expect(html).toContain(
				'name="theme-color" media="(prefers-color-scheme: light)" content="#eaeef3"',
			);
			expect(html).toContain(
				'name="theme-color" media="(prefers-color-scheme: dark)" content="#0c0d0b"',
			);
			expect(html).toContain('rel="icon"');
			expect(html).toContain('rel="apple-touch-icon"');
			expect(html).toContain('rel="preload"');
		}
	});
});

describe("4. JSON-LD structure and validation", () => {
	it("has exactly one JSON-LD block per page with valid @graph", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;

			const matches = [
				...html.matchAll(
					/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
				),
			];
			expect(matches.length, `${name} must have exactly 1 JSON-LD script`).toBe(
				1,
			);

			const data = JSON.parse(matches[0][1]);
			expect(data["@context"]).toBe("https://schema.org");
			expect(Array.isArray(data["@graph"])).toBe(true);

			const types = data["@graph"].map((item) => item["@type"]);
			expect(types).toContain("Organization");
			expect(types).toContain("WebSite");

			const org = data["@graph"].find(
				(item) => item["@type"] === "Organization",
			);
			expect(org.name).toBe(OWNER);
			expect(org.logo?.url).toBe(`${SITE_URL}/clipey-256.png`);

			const rawString = JSON.stringify(data);
			expect(rawString).not.toMatch(/\{\{[A-Z_]+\}\}/);
			expect(rawString).not.toContain("undefined");
			expect(rawString).not.toContain("null");
		}
	});

	it("landings have SoftwareApplication with offers and FAQPage", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			const jsonText = html.match(
				/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
			)[1];
			const data = JSON.parse(jsonText);
			const app = data["@graph"].find(
				(item) => item["@type"] === "SoftwareApplication",
			);
			expect(app).toBeDefined();
			expect(app.name).toBe(SITE_NAME);
			expect(app.operatingSystem).toBe("Windows, macOS, Linux");
			expect(app.applicationCategory).toBe("MultimediaApplication");
			expect(app.softwareVersion).toBe(APP_VERSION);
			expect(app.offers).toEqual({
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD",
				url: RELEASES_URL,
			});

			const faq = data["@graph"].find((item) => item["@type"] === "FAQPage");
			expect(faq).toBeDefined();
			expect(faq.mainEntity.length).toBeGreaterThan(0);
			expect(faq.mainEntity[0]["@type"]).toBe("Question");
			expect(faq.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
		}
	});

	it("blog indexes have CollectionPage", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(blogBase(lang)));
			const jsonText = html.match(
				/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
			)[1];
			const data = JSON.parse(jsonText);
			const collection = data["@graph"].find(
				(item) => item["@type"] === "CollectionPage",
			);
			expect(collection).toBeDefined();
			expect(collection.mainEntity["@type"]).toBe("ItemList");
			expect(collection.mainEntity.itemListElement.length).toBe(18);
		}
	});

	it("articles have BlogPosting and BreadcrumbList with speakable", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const html = files.get(fileForUrl(post.content[lang].url));
				const jsonText = html.match(
					/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
				)[1];
				const data = JSON.parse(jsonText);

				const postItem = data["@graph"].find(
					(item) => item["@type"] === "BlogPosting",
				);
				expect(postItem).toBeDefined();
				expect(postItem.headline).toBe(post.content[lang].title);
				expect(postItem.datePublished).toBe(post.date);
				expect(postItem.dateModified).toBe(post.updated);
				expect(postItem.inLanguage).toBe(lang);
				expect(postItem.speakable).toEqual({
					"@type": "SpeakableSpecification",
					cssSelector: [".article-title", ".prose > p:first-of-type"],
				});

				const breadcrumbs = data["@graph"].find(
					(item) => item["@type"] === "BreadcrumbList",
				);
				expect(breadcrumbs).toBeDefined();
				expect(breadcrumbs.itemListElement.at(-1)).toMatchObject({
					name: post.content[lang].title,
					item: `${SITE_URL}${post.content[lang].url}`,
				});
			}
		}
	});
});

describe("4b. Platform statements name Windows, macOS and Linux", () => {
	const OS_LIST = {
		"pt-BR": "Windows, macOS e Linux",
		en: "Windows, macOS and Linux",
		es: "Windows, macOS y Linux",
	};
	const WINDOWS_ONLY = /Windows 10 (?:e|and|y) 11|(?:para|for) Windows(?!,)\b/;

	it("states all three systems in the blog and landing copy of every language", () => {
		for (const lang of LANGUAGES) {
			const strings = [
				UI[lang].footerNote,
				UI[lang].blog.closeSub,
				UI[lang].landing.description,
				STORY[lang].hero.sub,
				STORY[lang].hero.definition,
				STORY[lang].faq.find(([q]) => /sistemas|systems/i.test(q))[1],
			];
			for (const text of strings) expect(text, `${lang}: ${text}`).toContain(OS_LIST[lang]);
			expect(STORY[lang].hero.platform).toContain(OS_LIST[lang]);
			expect(STORY[lang].export.platform).toContain(OS_LIST[lang]);
		}
	});

	it("keeps no Windows-only download label or Windows 10 and 11 claim in the customer copy", () => {
		for (const lang of LANGUAGES) {
			const copy = [
				UI[lang].footerNote,
				UI[lang].blog.closeSub,
				UI[lang].blog.closeDownload,
				UI[lang].landing.description,
				STORY[lang].hero.sub,
				STORY[lang].hero.definition,
				STORY[lang].hero.download,
				STORY[lang].hero.platform,
				STORY[lang].export.download,
				STORY[lang].export.platform,
				...STORY[lang].faq.map(([, answer]) => answer),
			];
			for (const text of copy) expect(text, `${lang}: ${text}`).not.toMatch(WINDOWS_ONLY);
		}
	});

	it("scopes the Windows build requirement to Windows", () => {
		expect(STORY["pt-BR"].export.requirements).toMatch(/^No Windows,/);
		expect(STORY.en.export.requirements).toMatch(/^On Windows,/);
		expect(STORY.es.export.requirements).toMatch(/^En Windows,/);
	});

	it("tells llms.txt readers the app runs on all three systems", () => {
		const llms = files.get("llms.txt");
		expect(llms).toContain("aplicativo desktop para Windows, macOS e Linux");
		expect(llms).toContain("Clipey funciona no Windows, macOS e Linux.");
		expect(llms).not.toMatch(/Windows 10 e Windows 11/);
	});
});

describe("5. AEO/GEO: llms.txt and llms-full.txt", () => {
	it("generates /llms.txt adhering to llmstxt.org", () => {
		const llms = files.get("llms.txt");
		expect(llms.startsWith("# Clipey\n\n> ")).toBe(true);
		expect(llms).toContain("## Páginas Principais");
		expect(llms).toContain("## Blog e Tutoriais (Português)");
		expect(llms).toContain("## Blog and Tutorials (English)");
		expect(llms).toContain("## Blog y Tutoriales (Español)");
		expect(llms).toContain("## Informações Legais");
		expect(llms).toContain("## Documentação Completa");
		expect(llms).toContain("/llms-full.txt");
	});

	it("generates /llms-full.txt concatenating landing copy and all 18 pt-BR articles", () => {
		const full = files.get("llms-full.txt");
		expect(full).toContain("CLIPEY: ESTÚDIO DE VÍDEO PARA WINDOWS");
		expect(full).toContain("PERGUNTAS FREQUENTES (FAQ):");
		for (let i = 1; i <= 18; i++) {
			expect(full).toContain(`ARTIGO ${i}: `);
		}
		expect(full).not.toMatch(/\{\{[A-Z_]+\}\}/);
	});
});

describe("6. Feeds: RSS 2.0 and Atom 1.0", () => {
	it("serves both RSS 2.0 and Atom feeds per language", () => {
		for (const lang of LANGUAGES) {
			const base = fileForUrl(blogBase(lang)).replace("index.html", "");
			const rss = files.get(`${base}feed.xml`);
			expect(rss).toContain('<rss version="2.0"');
			expect(rss).toContain("<channel>");
			expect(rss).toContain("<title>");
			expect(rss).toContain(`<language>${lang}</language>`);

			const atom = files.get(`${base}atom.xml`);
			expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
			expect(atom).toContain("<entry>");
			expect(atom).toContain("<id>");
			expect(atom).toContain("<updated>");

			// Legacy rss.xml for backward compat
			expect(files.get(`${base}rss.xml`)).toContain("<rss");
		}
	});
});

describe("7. Security headers in _headers", () => {
	it("includes all required security headers and cache policies", () => {
		const headers = files.get("_headers");
		expect(headers).toContain("Content-Security-Policy:");
		expect(headers).toContain(`'${THEME_SCRIPT_HASH}'`);
		expect(headers).toContain("X-Content-Type-Options: nosniff");
		expect(headers).toContain(
			"Referrer-Policy: strict-origin-when-cross-origin",
		);
		expect(headers).toContain(
			"Permissions-Policy: camera=(), microphone=(), geolocation=()",
		);
		expect(headers).toContain("Cross-Origin-Opener-Policy: same-origin");
		expect(headers).toContain("X-Frame-Options: DENY");

		// Cache policies
		expect(headers).toContain(
			"/assets/*\n  Cache-Control: public, max-age=31536000, immutable",
		);
		expect(headers).toContain("/announcements.json\n  Cache-Control: no-store");
	});
});

describe("8. Performance budget", () => {
	it("verifies landing page JS and CSS gzip sizes within budget", () => {
		const landingCss = readFileSync(path.join(root, "src/landing.css"), "utf8");
		const baseCss = readFileSync(path.join(root, "src/base.css"), "utf8");
		const tokensCss = readFileSync(path.join(root, "src/tokens.css"), "utf8");
		const framesCss = readFileSync(path.join(root, "src/frames.css"), "utf8");
		const fontsCss = readFileSync(path.join(root, "src/fonts.css"), "utf8");

		const totalCssRaw = landingCss + baseCss + tokensCss + framesCss + fontsCss;
		const cssGzip = gzipSync(Buffer.from(totalCssRaw)).length;

		expect(cssGzip).toBeLessThanOrEqual(30 * 1024);

		const landingJs = readFileSync(
			path.join(root, "src/entry-landing.js"),
			"utf8",
		);
		const chromeJs = readFileSync(path.join(root, "src/chrome.js"), "utf8");
		const jsGzip = gzipSync(Buffer.from(landingJs + chromeJs)).length;

		expect(jsGzip).toBeLessThanOrEqual(35 * 1024);
	});

	it("verifies font is preloaded, woff2 only, and has font-display: swap", () => {
		const fontsCss = readFileSync(path.join(root, "src/fonts.css"), "utf8");
		expect(fontsCss).toContain('format("woff2")');
		expect(fontsCss).not.toContain("woff;");
		expect(fontsCss).not.toContain("ttf");
		expect(fontsCss).toContain("font-display: swap;");

		const landingHtml = files.get("index.html");
		expect(landingHtml).toContain(
			'rel="preload" href="/assets/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin',
		);
	});
});

describe("9. SEO: robots and canonical on every generated page (S4)", () => {
	it("emits both robots and canonical independently", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;
			expect(html, name).toContain('<meta name="robots" content="index,follow,max-image-preview:large">');
			expect(html, name).toContain('rel="canonical"');
		}
	});
});

describe("10. SEO: sitemap lastmod only for posts (S5)", () => {
	it("omits lastmod for landing, blog index, category, and legal entries", () => {
		const sitemap = files.get("sitemap.xml");
		for (const lang of LANGUAGES) {
			const landingLoc = `<loc>${SITE_URL}${LANDING_PATH[lang]}</loc>`;
			const landingEntry = sitemap.slice(
				sitemap.indexOf(landingLoc) - 20,
				sitemap.indexOf("</url>", sitemap.indexOf(landingLoc)) + 6,
			);
			expect(landingEntry, `landing ${lang}`).not.toContain("<lastmod>");

			const blogLoc = `<loc>${SITE_URL}${blogBase(lang)}</loc>`;
			const blogEntry = sitemap.slice(
				sitemap.indexOf(blogLoc) - 20,
				sitemap.indexOf("</url>", sitemap.indexOf(blogLoc)) + 6,
			);
			expect(blogEntry, `blog index ${lang}`).not.toContain("<lastmod>");
		}
	});

	it("includes lastmod for post entries using post.updated", () => {
		const sitemap = files.get("sitemap.xml");
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const loc = `<loc>${SITE_URL}${post.content[lang].url}</loc>`;
				const entry = sitemap.slice(
					sitemap.indexOf(loc) - 20,
					sitemap.indexOf("</url>", sitemap.indexOf(loc)) + 6,
				);
				expect(entry, post.content[lang].url).toContain(
					`<lastmod>${post.updated}</lastmod>`,
				);
			}
		}
	});
});

describe("11. SEO: blog posts have real dates (S6)", () => {
	const articleFile = (post, lang) =>
		path.join(root, "content", "blog", lang, `${post.content[lang].slug}.md`);

	it("uses literal per-article dates, with updated never before date", () => {
		for (const post of posts) {
			expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.updated >= post.date, post.translationKey).toBe(true);
		}
	});

	it("each article's page history opens with its own publication date", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const raw = readFileSync(articleFile(post, lang), "utf8");
				const history = raw.match(
					/^## (?:Histórico desta página|Page history|Historial de esta página)\r?\n\r?\n- (\S+): /m,
				);
				expect(history, articleFile(post, lang)).not.toBeNull();
				expect(history[1], articleFile(post, lang)).toBe(post.date);
				expect(files.get(fileForUrl(post.content[lang].url))).toContain(
					`${post.date}: `,
				);
			}
		}
	});

	it("rejects an article that still carries a template token", () => {
		const dir = mkdtempSync(path.join(tmpdir(), "clipey-post-"));
		try {
			const valid = readFileSync(articleFile(posts[0], "en"), "utf8");
			const file = path.join(dir, "post.md");
			writeFileSync(file, valid.replace(/- \S+: published\./, "- {{RELEASE_DATE}}: published."));
			expect(() => parsePostFile(file, "en")).toThrow(/unreplaced template token/);
			writeFileSync(file, valid.replace(/^date: .*$/m, 'date: "{{RELEASE_DATE}}"'));
			expect(() => parsePostFile(file, "en")).toThrow(/invalid applicability, feature flag, or dates/);
			writeFileSync(file, valid);
			expect(parsePostFile(file, "en").date).toBe(posts[0].date);
		} finally {
			rmSync(dir, { recursive: true, force: true });
		}
	});

	it("no shared release date remains anywhere in the site sources or output", () => {
		// The legal pages are protected byte-for-byte and legitimately state their own effective date; Wrangler's
		// compatibility_date is a runtime flag, not an editorial date. Everything else must be clean.
		const FORBIDDEN = /2026-09-29|29 SET|29 de setembro|September 29|Sep 29|29 de septiembre|RELEASE_DATE|\{\{[A-Z_]+\}\}/;
		const skipDirs = new Set(["node_modules", "dist", "legal-source", ".git"]);
		const textFile = /\.(mjs|js|json|jsonc|md|css|html|txt|xml)$/;
		const self = fileURLToPath(import.meta.url);
		const walk = (dir) =>
			readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
				const full = path.join(dir, entry.name);
				if (entry.isDirectory()) return skipDirs.has(entry.name) ? [] : walk(full);
				return textFile.test(entry.name) && full !== self ? [full] : [];
			});
		const hits = [];
		for (const file of walk(root)) {
			const lines = readFileSync(file, "utf8").split(/\r?\n/);
			lines.forEach((line, index) => {
				if (!FORBIDDEN.test(line)) return;
				if (path.basename(file) === "wrangler.jsonc" && /"compatibility_date"/.test(line)) return;
				hits.push(`${path.relative(root, file)}:${index + 1}`);
			});
		}
		for (const [name, content] of files) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;
			if (FORBIDDEN.test(content)) hits.push(`output:${name}`);
		}
		expect(hits).toEqual([]);
	});
});

describe("11b. SEO: single canonical host (S7)", () => {
	it("every canonical URL uses the apex host, never www", () => {
		for (const [name, html] of htmlFiles) {
			const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
			if (canonical) expect(canonical[1], name).toMatch(/^https:\/\/clipey\.com\.br\//);
			expect(html, name).not.toContain("www.clipey.com.br");
		}
	});
});

describe("12. SEO: hero definition and BYOK FAQ (S8)", () => {
	it("renders a factual definition near the hero in each locale", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			expect(html, lang).toContain('class="story-def"');
			expect(html, lang).toContain(STORY[lang].hero.definition);
		}
	});

	it("styles the definition with design tokens", () => {
		const css = readFileSync(path.join(root, "src", "landing.css"), "utf8");
		const rule = css.match(/\.story-def\s*\{([^}]*)\}/);
		expect(rule, ".story-def rule").not.toBeNull();
		expect(rule[1]).toMatch(/color:\s*var\(--[a-z-]+\)/);
		expect(rule[1]).not.toMatch(/#[0-9a-f]{3,8}\b/i);
	});

	it("has a BYOK FAQ entry in each locale", () => {
		for (const lang of LANGUAGES) {
			const byokEntry = STORY[lang].faq.find(([q]) =>
				/nuvem|cloud|nube/i.test(q),
			);
			expect(byokEntry, `${lang} BYOK FAQ missing`).toBeDefined();
			expect(byokEntry[1]).toMatch(/chave|key|clave/i);
		}
	});

	it("includes the BYOK FAQ in the landing JSON-LD", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			const ld = JSON.parse(
				html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
			);
			const faq = ld["@graph"].find((node) => node["@type"] === "FAQPage");
			expect(faq.mainEntity.length).toBe(STORY[lang].faq.length);
		}
	});
});

describe("13. SEO: breadcrumb schema equals the visible breadcrumb (S9)", () => {
	const decode = (text) =>
		text
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&amp;/g, "&");

	/** Reads the rendered <nav class="breadcrumb"> independently of the template: one crumb per link or current span. */
	function visibleCrumbs(html, pageUrl) {
		const nav = html.match(/<nav class="breadcrumb"[^>]*>([\s\S]*?)<\/nav>/);
		expect(nav, pageUrl).not.toBeNull();
		return [
			...nav[1].matchAll(
				/<a href="([^"]+)">([^<]*)<\/a>|<span aria-current="page">([^<]*)<\/span>/g,
			),
		].map((match, index) => ({
			position: index + 1,
			name: decode(match[2] ?? match[3]),
			item: `${SITE_URL}${match[1] ?? pageUrl}`,
		}));
	}

	function schemaCrumbs(html) {
		const ld = JSON.parse(
			html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
		);
		const list = ld["@graph"].filter((node) => node["@type"] === "BreadcrumbList");
		expect(list).toHaveLength(1);
		return list[0].itemListElement.map(({ position, name, item }) => ({
			position,
			name,
			item,
		}));
	}

	const pages = () => {
		const out = [];
		for (const lang of LANGUAGES) {
			out.push({ lang, kind: "index", url: blogBase(lang), depth: 2 });
			for (const key of usedCategories(posts))
				out.push({ lang, kind: "category", url: categoryUrl(lang, key), depth: 3, key });
			for (const post of posts)
				out.push({ lang, kind: "article", url: post.content[lang].url, depth: 4, post });
		}
		return out;
	};

	it("every item matches the visible nav in position, name and URL on index, category and article pages", () => {
		let checked = 0;
		for (const page of pages()) {
			const html = files.get(fileForUrl(page.url));
			const visible = visibleCrumbs(html, page.url);
			expect(schemaCrumbs(html), `${page.lang} ${page.url}`).toEqual(visible);
			expect(visible, page.url).toHaveLength(page.depth);
			checked += 1;
		}
		expect(checked).toBe(LANGUAGES.length * (1 + usedCategories(posts).length + posts.length));
	});

	it("uses the localized labels a reader sees, root to current page", () => {
		for (const page of pages()) {
			const names = visibleCrumbs(files.get(fileForUrl(page.url)), page.url).map(
				(crumb) => crumb.name,
			);
			expect(names[0]).toBe(SITE_NAME);
			expect(names[1]).toBe(UI[page.lang].nav.blog);
			if (page.kind === "category")
				expect(names[2]).toBe(CATEGORIES[page.key][page.lang].label);
			if (page.kind === "article") {
				expect(names[2]).toBe(CATEGORIES[page.post.categoryKey][page.lang].label);
				expect(names[3]).toBe(page.post.content[page.lang].title);
			}
		}
	});

	it("links the root crumb to the landing of the same language", () => {
		for (const page of pages()) {
			const [root] = visibleCrumbs(files.get(fileForUrl(page.url)), page.url);
			expect(root.item).toBe(`${SITE_URL}${LANDING_PATH[page.lang]}`);
		}
	});
});

describe("14. SEO: footer year from build date (S10)", () => {
	it("uses the current UTC year in the footer", () => {
		const year = new Date().getUTCFullYear();
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			expect(html).toContain(`© ${year}`);
		}
		const blogHtml = files.get(fileForUrl(blogBase("pt-BR")));
		expect(blogHtml).toContain(`© ${year}`);
	});
});

describe("15. SEO: Content-Type comes from the platform, not _headers (S12)", () => {
	// Workers Static Assets stores each file's Content-Type at upload from its extension (wrangler 4.145
	// getContentType: mime@4 lookup, "; charset=utf-8" appended to text/*). Measured on this build output:
	// .json -> application/json, .xml -> application/xml, .txt -> text/plain; charset=utf-8. That is correct under
	// nosniff, so _headers must not override it: a wildcard rule would also rewrite any future special-case file.
	const PLATFORM_TYPE = {
		json: "application/json",
		xml: "application/xml",
		txt: "text/plain; charset=utf-8",
		html: "text/html; charset=utf-8",
	};

	/** Applies the generated _headers to a path the way Workers does: every matching rule contributes its headers. */
	function headersFor(pathname) {
		const rules = [];
		let current;
		for (const line of files.get("_headers").split("\n")) {
			if (!line.trim() || line.startsWith("#")) continue;
			if (!/^\s/.test(line)) {
				current = { pattern: line.trim(), headers: {} };
				rules.push(current);
			} else if (current) {
				const [name, ...value] = line.trim().split(":");
				current.headers[name.trim().toLowerCase()] = value.join(":").trim();
			}
		}
		const matches = (pattern) =>
			new RegExp(
				`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`,
			).test(pathname);
		return Object.assign({}, ...rules.filter((r) => matches(r.pattern)).map((r) => r.headers));
	}

	// Served = rendered files plus the copied public/ directory (robots.txt, announcements.json, manifests).
	const publicFiles = (dir, prefix = "") =>
		readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
			entry.isDirectory()
				? publicFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`)
				: [`${prefix}${entry.name}`],
		);
	const servedFiles = () =>
		[...new Set([...files.keys(), ...publicFiles(path.join(root, "public"))])]
			.filter((name) => /\.(json|xml|txt)$/.test(name) && !name.startsWith("_"))
			.map((name) => `/${name}`)
			.sort();

	it("leaves every served json, xml and txt file to the platform's correct type under nosniff", () => {
		const served = servedFiles();
		expect(served).toEqual(
			expect.arrayContaining([
				"/sitemap.xml",
				"/robots.txt",
				"/llms.txt",
				"/announcements.json",
				"/blog/rss.xml",
				"/blog/search-index.json",
			]),
		);
		for (const pathname of served) {
			const headers = headersFor(pathname);
			expect(headers["x-content-type-options"], pathname).toBe("nosniff");
			expect(headers["content-type"], pathname).toBeUndefined();
			const ext = pathname.split(".").pop();
			expect(PLATFORM_TYPE[ext], pathname).toBeDefined();
		}
	});

	it("serves XML whose encoding is declared in-document, so application/xml needs no charset", () => {
		const xml = servedFiles().filter((p) => p.endsWith(".xml"));
		expect(xml.length).toBeGreaterThan(0);
		for (const pathname of xml) {
			const body =
				files.get(pathname.slice(1)) ?? readFileSync(path.join(root, "public", pathname), "utf8");
			expect(body, pathname).toMatch(
				/^<\?xml version="1\.0" encoding="(?:UTF|utf)-8"\?>/,
			);
		}
	});

	it("keeps the announcements cache rule intact and sets no Content-Type anywhere", () => {
		expect(headersFor("/announcements.json")["cache-control"]).toBe("no-store");
		expect(files.get("_headers")).not.toMatch(/^\s+Content-Type:/im);
	});
});

describe("16. SEO: empty image alt rejection (S11)", () => {
	it("rejects empty or whitespace-only alt text in the article renderer", () => {
		expect(() => renderMarkdown("![](/blog/img/x.webp)")).toThrow(
			/empty image alt text/,
		);
		expect(() => renderMarkdown("![   ](/blog/img/x.webp)")).toThrow(
			/empty image alt text/,
		);
		expect(() =>
			renderMarkdown("![Timeline with cuts](/blog/img/x.webp)"),
		).not.toThrow();
	});

	it("all authored blog images have non-empty alt text", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const html = files.get(fileForUrl(post.content[lang].url));
				const images = [...html.matchAll(/<img class="article-image"[^>]*alt="([^"]*)"[^>]*>/g)];
				for (const match of images) {
					expect(match[1].trim(), `empty alt in ${post.content[lang].url}`).not.toBe("");
				}
			}
		}
	});
});
