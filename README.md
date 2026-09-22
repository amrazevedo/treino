# Treino de força — PWA

Ficheiros estáticos. Servir por **HTTPS** (o iOS só instala service workers em HTTPS; `localhost` também serve para testar).

## Home Assistant
1. Copiar a pasta para `/config/www/treino/` (cria `www` se não existir).
2. Reiniciar o Home Assistant (só na primeira vez).
3. Abrir `https://<o-teu-host>/local/treino/index.html` no Safari.

## nginx / Caddy no N100
Apontar um site estático para esta pasta. Exemplo com Caddy:

```
treino.casa.local {
  root * /srv/treino
  file_server
}
```

## Instalar no iPhone
Safari → abrir o URL → botão Partilhar → **Adicionar ao ecrã principal**.
Abre em ecrã inteiro, com ícone próprio e a funcionar offline.

## Atualizar
Substituir os ficheiros e mudar a versão em `sw.js` (`const V = "treino-v2"`),
senão o browser continua a servir a versão em cache. Depois fechar e reabrir a app.

## Notas
- Primeira abertura tem de ser com rede, para o service worker guardar tudo em cache.
- Os tipos de letra vêm do Google Fonts e ficam em cache na primeira utilização; offline sem eles, o sistema usa as alternativas definidas no CSS.
- O cronómetro corre com o ecrã ligado (wake lock). Com o ecrã bloqueado o iOS suspende a página.
- As definições ficam guardadas no `localStorage` do próprio iPhone.
