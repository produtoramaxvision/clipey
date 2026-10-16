# Segurança

Encontrou uma vulnerabilidade? Não abra issue pública. Escreva para **security@clipey.com.br** (ou use o [relato privado de vulnerabilidade](https://github.com/produtoramaxvision/clipey/security/advisories/new)) com o assunto "Segurança Clipey", descrevendo o problema e como reproduzir.

Credenciais (chaves de API, tokens de contas conectadas) ficam somente no seu computador, cifradas pelo sistema operacional (Electron safeStorage / DPAPI no Windows). O Clipey não envia essas chaves aos servidores da Produtora MaxVision.
