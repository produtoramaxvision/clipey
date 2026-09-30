"""Build the static clipey.com.br site into ./dist.

Pages are plain HTML generated from the content below so the legal texts stay
in one reviewable file. Run: python site/build.py
"""

from __future__ import annotations

import html
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
UPDATED = {"pt": "29 de setembro de 2026", "en": "September 29, 2026"}
CONTACT = "clipeyoficial@gmail.com"
RELEASES = "https://github.com/produtoramaxvision/clipey/releases/latest"
REPO = "https://github.com/produtoramaxvision/clipey"

NAV = {
    "pt": [("/", "Início"), ("/privacidade/", "Privacidade"), ("/termos/", "Termos"),
           ("/exclusao-de-dados/", "Exclusão de dados"), ("/en/", "English")],
    "en": [("/en/", "Home"), ("/en/privacy/", "Privacy"), ("/en/terms/", "Terms"),
           ("/en/data-deletion/", "Data deletion"), ("/", "Português")],
}

CSS = """
:root{--ground:#0c0d0b;--s1:#141612;--s2:#1b1d18;--s3:#252821;--border:#2c2f27;
--text:#eceee6;--muted:#9aa091;--lime:#a2d305;--lime-text:#b5e33a;color-scheme:dark}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--ground);color:var(--text);
font:16px/1.65 Geist,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--lime-text);text-underline-offset:3px}
a:hover{color:#d4f27a}
header{border-bottom:1px solid var(--border);background:var(--ground)}
.bar{max-width:880px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;
gap:16px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text);
font-weight:600;font-size:17px;margin-right:auto}
.brand img{width:30px;height:30px;display:block}
nav{display:flex;gap:4px 14px;flex-wrap:wrap}
nav a{color:var(--muted);text-decoration:none;font-size:14px;white-space:nowrap}
nav a:hover,nav a[aria-current]{color:var(--text)}
main{max-width:880px;margin:0 auto;padding:40px 16px 64px}
h1{font-size:clamp(28px,5vw,40px);line-height:1.15;margin:0 0 8px;letter-spacing:-0.01em}
h2{font-size:20px;margin:36px 0 8px}
.meta{color:var(--muted);font-size:14px;margin:0 0 28px}
li{margin:4px 0}
.hero{display:flex;flex-direction:column;align-items:flex-start;gap:18px;padding:32px 0 8px}
.hero img{width:96px;height:96px}
.lead{font-size:19px;color:var(--muted);max-width:620px;margin:0}
.btn{display:inline-flex;align-items:center;height:46px;padding:0 22px;border-radius:12px;
background:var(--lime);color:#0c0d0b;font-weight:700;text-decoration:none;white-space:nowrap}
.btn:hover{background:#b5e33a;color:#0c0d0b}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:40px}
.card{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px}
.card h3{margin:0 0 6px;font-size:16px}
.card p{margin:0;color:var(--muted);font-size:15px}
.note{background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:14px 16px}
footer{border-top:1px solid var(--border);color:var(--muted);font-size:14px}
footer .bar{justify-content:space-between}
"""


def page(lang: str, path: str, title: str, body: str) -> str:
    nav = "".join(
        f'<a href="{href}"{" aria-current=page" if href == path else ""}>{html.escape(label)}</a>'
        for href, label in NAV[lang]
    )
    home = "/" if lang == "pt" else "/en/"
    rights = "Todos os direitos reservados." if lang == "pt" else "All rights reserved."
    doc_title = "Clipey" if title == "Clipey" else f"{title} · Clipey"
    return f"""<!doctype html>
<html lang="{'pt-BR' if lang == 'pt' else 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0c0d0b">
<title>{html.escape(doc_title)}</title>
<meta name="description" content="{'Clipey: grave, edite e publique vídeos de tela.' if lang == 'pt' else 'Clipey: record, edit and publish screen videos.'}">
<link rel="icon" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<header><div class="bar"><a class="brand" href="{home}"><img src="/clipey-256.png" alt="" width="30" height="30">Clipey</a><nav>{nav}</nav></div></header>
<main>
{body}
</main>
<footer><div class="bar"><span>© 2026 Produtora MaxVision. {rights}</span><a href="mailto:{CONTACT}">{CONTACT}</a></div></footer>
</body>
</html>
"""


def legal(lang: str, title: str, sections: list[tuple[str, str]]) -> str:
    label = "Última atualização" if lang == "pt" else "Last updated"
    parts = [f"<h1>{html.escape(title)}</h1>", f'<p class="meta">{label}: {UPDATED[lang]}</p>']
    for heading, content in sections:
        if heading:
            parts.append(f"<h2>{html.escape(heading)}</h2>")
        parts.append(content)
    return "\n".join(parts)


# --------------------------------------------------------------------------- pt

HOME_PT = f"""<section class="hero">
<img src="/clipey-256.png" alt="Logotipo do Clipey" width="96" height="96">
<h1>Grave, edite e publique vídeos de tela.</h1>
<p class="lead">Clipey é um aplicativo gratuito para Windows que grava sua tela, edita com zoom automático, legendas e cortes, e publica direto no YouTube, Instagram, Facebook e TikTok.</p>
<a class="btn" href="{RELEASES}">Baixar para Windows</a>
</section>
<div class="grid">
<div class="card"><h3>Seus arquivos ficam com você</h3><p>Gravações, projetos e configurações ficam no seu computador.</p></div>
<div class="card"><h3>Publicação sob seu controle</h3><p>Nada é publicado sem você escolher o vídeo, a conta e clicar em publicar.</p></div>
<div class="card"><h3>Sem telemetria</h3><p>O Clipey não coleta dados de uso e não vende informações.</p></div>
</div>
<p style="margin-top:40px"><a href="{REPO}">Documentação e notas de versão</a></p>"""

PRIVACY_PT = [
    ("Quem somos", f"""<p>O Clipey é um aplicativo de desktop para gravar, editar e publicar vídeos, mantido pela Produtora MaxVision. Esta política explica quais dados o Clipey usa, para quê, e como você controla esses dados. Contato: <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>"""),
    ("O que fica no seu computador", """<p>Gravações, projetos, transcrições feitas no próprio computador e configurações ficam na sua máquina (no Windows, em <code>%APPDATA%\\Clipey</code>). Chaves de API e tokens de contas conectadas são cifrados pelo sistema operacional e guardados somente no seu computador. A Produtora MaxVision não tem acesso a esses arquivos.</p>"""),
    ("Contas conectadas", """<p>Você pode conectar contas do YouTube (Google), Facebook, Instagram e TikTok para publicar vídeos. Ao conectar, o Clipey pede somente o necessário:</p>
<ul>
<li><strong>Identificação básica da conta</strong>: nome, foto de perfil e identificador, para mostrar qual conta está conectada.</li>
<li><strong>Destinos de publicação</strong>: as Páginas do Facebook e contas profissionais do Instagram que você administra, para você escolher onde publicar.</li>
<li><strong>Envio de vídeos</strong>: permissão para enviar o vídeo, o título, a descrição e a configuração de privacidade que você escolher.</li>
</ul>
<p>O Clipey não lê mensagens, não acessa seguidores ou contatos, não publica nada sem uma ação sua e não usa esses dados para publicidade nem para treinar modelos de IA.</p>"""),
    ("Como funciona a autorização", """<p>O login acontece no site oficial de cada plataforma, no seu navegador. A plataforma devolve um código de autorização ao Clipey no seu computador. Para Facebook, Instagram e TikTok, esse código passa pelo serviço de autorização do Clipey (<code>api.clipey.com.br</code>) somente para ser trocado por um token de acesso, porque essas plataformas exigem uma credencial do aplicativo que não pode ficar no instalador. O serviço repassa o token ao seu computador e não armazena tokens, códigos, vídeos nem dados da conta. Registros técnicos de acesso (data, hora e endereço IP) podem ser mantidos pelo provedor de infraestrutura (Cloudflare) por até 30 dias para segurança.</p>"""),
    ("Dados do Google e do YouTube", """<p>O uso e a transferência, pelo Clipey, de informações recebidas das APIs do Google seguem a <a href="https://developers.google.com/terms/api-services-user-data-policy">Política de Dados do Usuário dos Serviços de API do Google</a>, incluindo os requisitos de Uso Limitado. O Clipey usa os Serviços de API do YouTube; ao conectar sua conta, você também concorda com os <a href="https://www.youtube.com/t/terms">Termos de Serviço do YouTube</a>, e seus dados são tratados também pela <a href="https://policies.google.com/privacy">Política de Privacidade do Google</a>. Você pode revogar o acesso do Clipey a qualquer momento em <a href="https://myaccount.google.com/connections">Conexões da sua Conta do Google</a>.</p>"""),
    ("Quando outros dados saem do seu computador", """<ul>
<li><strong>Serviços de IA que você configurar</strong> (chat, voz, dublagem): o Clipey envia o conteúdo necessário para a tarefa diretamente ao provedor escolhido, com a sua chave. O tratamento segue a política desse provedor.</li>
<li><strong>Transcrição em servidor</strong>: somente se você escolher esse modo; o áudio é enviado ao servidor configurado e não é mantido após a transcrição.</li>
<li><strong>Verificação de atualizações</strong>: o Clipey consulta a página pública de versões no GitHub.</li>
</ul>"""),
    ("O que não fazemos", """<p>Não coletamos telemetria de uso, não vendemos dados, não compartilhamos dados com anunciantes e não criamos perfis de usuários.</p>"""),
    ("Retenção e exclusão", """<p>Como seus dados ficam no seu computador, você controla a retenção. Desconectar uma conta no Clipey apaga o token dela do seu computador. Veja todas as opções em <a href="/exclusao-de-dados/">Exclusão de dados</a>.</p>"""),
    ("Seus direitos", f"""<p>Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir confirmação de tratamento, acesso, correção, exclusão e informações sobre compartilhamento. Envie o pedido para <a href="mailto:{CONTACT}">{CONTACT}</a>; respondemos em até 15 dias.</p>"""),
    ("Crianças", """<p>O Clipey não é destinado a menores de 13 anos, e as contas conectadas precisam cumprir a idade mínima de cada plataforma.</p>"""),
    ("Alterações", """<p>Se esta política mudar, a data acima será atualizada e mudanças relevantes serão informadas nas notas de versão do aplicativo.</p>"""),
]

TERMS_PT = [
    ("Aceitação", """<p>Ao instalar ou usar o Clipey, você concorda com estes termos. Se não concordar, não use o aplicativo.</p>"""),
    ("O serviço", """<p>O Clipey é um aplicativo gratuito para gravar a tela, editar vídeos e publicá-los em plataformas de terceiros. Ele é distribuído pela Produtora MaxVision sob as licenças que acompanham o instalador.</p>"""),
    ("Seu conteúdo e suas contas", """<p>Você é o único responsável pelo conteúdo que grava, edita e publica, e por ter os direitos necessários sobre ele (imagens, músicas, marcas e pessoas). Ao publicar pelo Clipey, você deve cumprir as regras de cada plataforma, incluindo os <a href="https://www.youtube.com/t/terms">Termos de Serviço do YouTube</a>, os <a href="https://www.facebook.com/terms">Termos da Meta</a>, os <a href="https://help.instagram.com/581066165581870">Termos de Uso do Instagram</a> e os <a href="https://www.tiktok.com/legal/terms-of-service">Termos de Serviço do TikTok</a>.</p>"""),
    ("Uso aceitável", """<p>Não use o Clipey para publicar conteúdo ilegal, enganoso, que viole direitos de terceiros ou para enviar publicações automatizadas em massa (spam). Não tente contornar limites ou controles das plataformas.</p>"""),
    ("Serviços de terceiros", """<p>Recursos de IA, transcrição e publicação dependem de serviços de terceiros, que podem mudar, limitar ou encerrar o acesso sem aviso. A disponibilidade desses serviços não é garantida pela Produtora MaxVision.</p>"""),
    ("Sem garantias", """<p>O Clipey é fornecido "no estado em que se encontra", sem garantias de qualquer tipo. Mantenha cópias dos seus arquivos importantes.</p>"""),
    ("Limitação de responsabilidade", """<p>Na extensão permitida pela lei, a Produtora MaxVision não responde por perda de dados, lucros cessantes ou danos indiretos decorrentes do uso do Clipey. Nada nestes termos limita direitos garantidos pelo Código de Defesa do Consumidor.</p>"""),
    ("Lei aplicável", """<p>Estes termos seguem a legislação brasileira.</p>"""),
    ("Contato", f"""<p><a href="mailto:{CONTACT}">{CONTACT}</a>. Veja também a <a href="/privacidade/">Política de privacidade</a>.</p>"""),
]

DELETION_PT = [
    ("", """<p class="note">O Clipey guarda seus dados somente no seu computador. A Produtora MaxVision não mantém cópia das suas gravações, projetos ou tokens de acesso.</p>"""),
    ("1. Desconectar contas no Clipey", """<p>Abra o Clipey, vá em <strong>Configurações → Contas conectadas</strong> e clique em <strong>Desconectar</strong> em cada conta. O token é apagado do seu computador na hora.</p>"""),
    ("2. Revogar o acesso nas plataformas", """<ul>
<li><strong>Google / YouTube</strong>: <a href="https://myaccount.google.com/connections">Conexões da Conta do Google</a> → Clipey → Excluir todas as conexões.</li>
<li><strong>Facebook e Instagram</strong>: Facebook → Configurações e privacidade → Configurações → <a href="https://www.facebook.com/settings?tab=business_tools">Integrações comerciais</a> → Clipey → Remover.</li>
<li><strong>TikTok</strong>: TikTok → Configurações e privacidade → Segurança e permissões → Apps e serviços → Clipey → Remover acesso.</li>
</ul>"""),
    ("3. Apagar os arquivos locais", """<p>Desinstale o Clipey em <strong>Configurações do Windows → Aplicativos</strong> e apague a pasta <code>%APPDATA%\\Clipey</code>. Suas gravações salvas em outras pastas não são apagadas automaticamente.</p>"""),
    ("4. Pedido por e-mail", f"""<p>Se preferir, envie um pedido de exclusão para <a href="mailto:{CONTACT}">{CONTACT}</a> com o assunto "Exclusão de dados". Respondemos em até 15 dias confirmando que não há dados seus armazenados em nossos serviços.</p>"""),
]

# --------------------------------------------------------------------------- en

HOME_EN = f"""<section class="hero">
<img src="/clipey-256.png" alt="Clipey logo" width="96" height="96">
<h1>Record, edit and publish screen videos.</h1>
<p class="lead">Clipey is a free Windows app that records your screen, edits with automatic zoom, captions and cuts, and publishes straight to YouTube, Instagram, Facebook and TikTok.</p>
<a class="btn" href="{RELEASES}">Download for Windows</a>
</section>
<div class="grid">
<div class="card"><h3>Your files stay with you</h3><p>Recordings, projects and settings stay on your computer.</p></div>
<div class="card"><h3>You control publishing</h3><p>Nothing is published until you choose the video, the account and click publish.</p></div>
<div class="card"><h3>No telemetry</h3><p>Clipey does not collect usage data and does not sell information.</p></div>
</div>
<p style="margin-top:40px"><a href="{REPO}">Documentation and release notes</a></p>"""

PRIVACY_EN = [
    ("Who we are", f"""<p>Clipey is a desktop app for recording, editing and publishing videos, maintained by Produtora MaxVision (Brazil). This policy explains which data Clipey uses, why, and how you control it. Contact: <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>"""),
    ("What stays on your computer", """<p>Recordings, projects, on-device transcriptions and settings stay on your machine (on Windows, in <code>%APPDATA%\\Clipey</code>). API keys and tokens for connected accounts are encrypted by the operating system and stored only on your computer. Produtora MaxVision has no access to these files.</p>"""),
    ("Connected accounts", """<p>You can connect YouTube (Google), Facebook, Instagram and TikTok accounts to publish videos. When you connect, Clipey requests only what it needs:</p>
<ul>
<li><strong>Basic account identity</strong>: name, profile picture and ID, to show which account is connected.</li>
<li><strong>Publishing destinations</strong>: the Facebook Pages and Instagram professional accounts you manage, so you can pick where to publish.</li>
<li><strong>Video upload</strong>: permission to upload the video, title, description and privacy setting you choose.</li>
</ul>
<p>Clipey does not read messages, does not access followers or contacts, never publishes without your action, and does not use this data for advertising or to train AI models.</p>"""),
    ("How authorization works", """<p>You sign in on each platform's official website, in your browser. The platform returns an authorization code to Clipey on your computer. For Facebook, Instagram and TikTok, that code passes through Clipey's authorization service (<code>api.clipey.com.br</code>) only to be exchanged for an access token, because these platforms require an app credential that cannot ship inside the installer. The service hands the token back to your computer and does not store tokens, codes, videos or account data. Technical access logs (date, time and IP address) may be kept by the infrastructure provider (Cloudflare) for up to 30 days for security.</p>"""),
    ("Google and YouTube data", """<p>Clipey's use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements. Clipey uses YouTube API Services; by connecting your account you also agree to the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>, and your data is also governed by the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>. You can revoke Clipey's access at any time in your <a href="https://myaccount.google.com/connections">Google Account connections</a>.</p>"""),
    ("When other data leaves your computer", """<ul>
<li><strong>AI services you configure</strong> (chat, voice, dubbing): Clipey sends the content needed for the task directly to the provider you chose, with your key. That provider's policy applies.</li>
<li><strong>Server transcription</strong>: only if you choose that mode; audio is sent to the configured server and is not kept after transcription.</li>
<li><strong>Update checks</strong>: Clipey queries the public releases page on GitHub.</li>
</ul>"""),
    ("What we don't do", """<p>We don't collect usage telemetry, don't sell data, don't share data with advertisers and don't build user profiles.</p>"""),
    ("Retention and deletion", """<p>Because your data stays on your computer, you control retention. Disconnecting an account in Clipey deletes its token from your computer. See every option under <a href="/en/data-deletion/">Data deletion</a>.</p>"""),
    ("Your rights", f"""<p>Under Brazil's General Data Protection Law (LGPD, Law 13.709/2018) and similar laws, you can request confirmation of processing, access, correction, deletion and information about sharing. Email <a href="mailto:{CONTACT}">{CONTACT}</a>; we reply within 15 days.</p>"""),
    ("Children", """<p>Clipey is not intended for children under 13, and connected accounts must meet each platform's minimum age.</p>"""),
    ("Changes", """<p>If this policy changes, the date above is updated and material changes are announced in the app's release notes.</p>"""),
]

TERMS_EN = [
    ("Acceptance", """<p>By installing or using Clipey you agree to these terms. If you don't agree, don't use the app.</p>"""),
    ("The service", """<p>Clipey is a free app to record the screen, edit videos and publish them to third-party platforms. It is distributed by Produtora MaxVision under the licenses included with the installer.</p>"""),
    ("Your content and accounts", """<p>You are solely responsible for the content you record, edit and publish, and for holding the rights it requires (images, music, trademarks and people). When publishing through Clipey you must follow each platform's rules, including the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>, the <a href="https://www.facebook.com/terms">Meta Terms</a>, the <a href="https://help.instagram.com/581066165581870">Instagram Terms of Use</a> and the <a href="https://www.tiktok.com/legal/terms-of-service">TikTok Terms of Service</a>.</p>"""),
    ("Acceptable use", """<p>Don't use Clipey to publish illegal or misleading content, content that infringes others' rights, or automated bulk posts (spam). Don't try to bypass platform limits or controls.</p>"""),
    ("Third-party services", """<p>AI, transcription and publishing features depend on third-party services that may change, limit or end access without notice. Produtora MaxVision does not guarantee their availability.</p>"""),
    ("No warranty", """<p>Clipey is provided "as is", without warranties of any kind. Keep backups of important files.</p>"""),
    ("Limitation of liability", """<p>To the extent permitted by law, Produtora MaxVision is not liable for data loss, lost profits or indirect damages arising from the use of Clipey. Nothing in these terms limits rights granted by consumer protection law.</p>"""),
    ("Governing law", """<p>These terms are governed by the laws of Brazil.</p>"""),
    ("Contact", f"""<p><a href="mailto:{CONTACT}">{CONTACT}</a>. See also the <a href="/en/privacy/">Privacy policy</a>.</p>"""),
]

DELETION_EN = [
    ("", """<p class="note">Clipey stores your data only on your computer. Produtora MaxVision keeps no copy of your recordings, projects or access tokens.</p>"""),
    ("1. Disconnect accounts in Clipey", """<p>Open Clipey, go to <strong>Settings → Connected accounts</strong> and click <strong>Disconnect</strong> on each account. The token is deleted from your computer immediately.</p>"""),
    ("2. Revoke access on each platform", """<ul>
<li><strong>Google / YouTube</strong>: <a href="https://myaccount.google.com/connections">Google Account connections</a> → Clipey → Delete all connections.</li>
<li><strong>Facebook and Instagram</strong>: Facebook → Settings &amp; privacy → Settings → <a href="https://www.facebook.com/settings?tab=business_tools">Business integrations</a> → Clipey → Remove.</li>
<li><strong>TikTok</strong>: TikTok → Settings and privacy → Security and permissions → Apps and services → Clipey → Remove access.</li>
</ul>"""),
    ("3. Delete local files", """<p>Uninstall Clipey from <strong>Windows Settings → Apps</strong> and delete the <code>%APPDATA%\\Clipey</code> folder. Recordings saved in other folders are not deleted automatically.</p>"""),
    ("4. Request by email", f"""<p>You can also email a deletion request to <a href="mailto:{CONTACT}">{CONTACT}</a> with the subject "Data deletion". We reply within 15 days confirming that no data of yours is stored on our services.</p>"""),
]

PAGES = [
    ("pt", "/", "Clipey", HOME_PT),
    ("pt", "/privacidade/", "Política de privacidade", legal("pt", "Política de privacidade", PRIVACY_PT)),
    ("pt", "/termos/", "Termos de uso", legal("pt", "Termos de uso", TERMS_PT)),
    ("pt", "/exclusao-de-dados/", "Exclusão de dados", legal("pt", "Exclusão de dados", DELETION_PT)),
    ("en", "/en/", "Clipey", HOME_EN),
    ("en", "/en/privacy/", "Privacy policy", legal("en", "Privacy policy", PRIVACY_EN)),
    ("en", "/en/terms/", "Terms of service", legal("en", "Terms of service", TERMS_EN)),
    ("en", "/en/data-deletion/", "Data deletion", legal("en", "Data deletion instructions", DELETION_EN)),
]


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    for lang, path, title, body in PAGES:
        out = DIST / path.strip("/") / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(lang, path, title, body), encoding="utf-8")
    not_found = '<h1>Página não encontrada</h1><p class="meta">Page not found.</p><p><a href="/">Voltar ao início</a> · <a href="/en/">Home</a></p>'
    (DIST / "404.html").write_text(page("pt", "", "Página não encontrada", not_found), encoding="utf-8")
    for asset in ("clipey-256.png", "favicon.png"):
        shutil.copy2(ROOT / asset, DIST / asset)
    (DIST / "_headers").write_text(
        "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n"
        "  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n",
        encoding="utf-8",
    )
    print(f"built {len(PAGES)} pages into {DIST}")


if __name__ == "__main__":
    main()
