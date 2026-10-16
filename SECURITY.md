# Segurança

Encontrou uma vulnerabilidade? Não abra issue pública. Escreva para **security@clipey.com.br** (ou use o [relato privado de vulnerabilidade](https://github.com/produtoramaxvision/clipey/security/advisories/new)) com o assunto "Segurança Clipey", descrevendo o problema e como reproduzir.

Chaves de API e tokens de contas conectadas ficam armazenados no seu computador, cifrados pelo sistema operacional (Electron safeStorage / DPAPI no Windows). Nos fluxos Meta e TikTok, o código de autorização ou o token a renovar ou revogar passa pelo serviço api.clipey.com.br apenas para troca, renovação ou revogação, e não é armazenado por ele. Chaves de provedores de IA opcionais configuradas por você são enviadas diretamente ao provedor escolhido a cada uso, como descrito na [política de privacidade](https://clipey.com.br/privacidade/).
