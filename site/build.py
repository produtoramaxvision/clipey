"""Legal texts of clipey.com.br.

The privacy policy, terms of use and data-deletion instructions live in this one
reviewable file. Running it prints them as JSON (language, path, title, body);
vite.config.js renders them in the site shell. Run: python3 site/build.py
"""

from __future__ import annotations

import html
import json

UPDATED = {"pt": "29 de setembro de 2026", "en": "September 29, 2026"}
CONTACT = "clipeyoficial@gmail.com"
RELEASES = "https://github.com/produtoramaxvision/clipey/releases/latest"
REPO = "https://github.com/produtoramaxvision/clipey"

def legal(lang: str, title: str, sections: list[tuple[str, str]]) -> str:
    label = "Última atualização" if lang == "pt" else "Last updated"
    parts = [f"<h1>{html.escape(title)}</h1>", f'<p class="meta">{label}: {UPDATED[lang]}</p>']
    for heading, content in sections:
        if heading:
            parts.append(f"<h2>{html.escape(heading)}</h2>")
        parts.append(content)
    return "\n".join(parts)


# --------------------------------------------------------------------------- pt

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
    ("pt-BR", "/privacidade/", "Política de privacidade", legal("pt", "Política de privacidade", PRIVACY_PT)),
    ("pt-BR", "/termos/", "Termos de uso", legal("pt", "Termos de uso", TERMS_PT)),
    ("pt-BR", "/exclusao-de-dados/", "Exclusão de dados", legal("pt", "Exclusão de dados", DELETION_PT)),
    ("en", "/en/privacy/", "Privacy policy", legal("en", "Privacy policy", PRIVACY_EN)),
    ("en", "/en/terms/", "Terms of service", legal("en", "Terms of service", TERMS_EN)),
    ("en", "/en/data-deletion/", "Data deletion", legal("en", "Data deletion instructions", DELETION_EN)),
]


def main() -> None:
    print(json.dumps([{"lang": lang, "path": path, "title": title, "body": body} for lang, path, title, body in PAGES], ensure_ascii=False))


if __name__ == "__main__":
    main()
