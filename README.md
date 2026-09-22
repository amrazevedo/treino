# Treino de força — PWA

App de treino com temporizador, animações dos exercícios, sinais sonoros e voz em português.
Ficheiros estáticos, sem build e sem dependências: basta servi-los por HTTPS.

Publicado em: https://amrazevedo.github.io/treino/

## Ficheiros

| Ficheiro | Para que serve |
| --- | --- |
| `index.html` | A app inteira: HTML, CSS e JavaScript num só ficheiro |
| `sw.js` | Service worker — funcionamento offline e atualização automática |
| `manifest.webmanifest` | Nome, ícones e modo de ecrã inteiro |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Ícones da app |
| `apple-touch-icon.png` | Ícone usado pelo iOS no ecrã principal |

Todos têm de ficar na raiz do repositório, lado a lado. O `sw.js` fora da raiz deixa de controlar a página e perde-se o offline.

## Publicar no GitHub Pages

1. Repositório público, ficheiros na raiz.
2. Settings › Pages › Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. Ao fim de um minuto a app fica em `https://<utilizador>.github.io/<repositorio>/`.

## Instalar no iPhone

Abrir o endereço no Safari → Partilhar → **Adicionar ao ecrã principal**.
Fica com ícone próprio, em ecrã inteiro e a funcionar offline depois da primeira abertura com rede.

## Atualizar

1. No repositório: *Add file* › *Upload files*, arrastar os ficheiros novos, *Commit changes*.
2. Mudar a versão no `sw.js` (`const V = "treino-v7"`) sempre que os ficheiros mudarem.

A app procura versões novas ao arrancar, sempre que volta ao primeiro plano e de hora a hora,
e recarrega sozinha quando encontra uma — nunca a meio de um treino.
O número de versão aparece no fim da lista de treinos, para confirmar qual está a correr.

## Como funciona

- **Treinos**: definidos no array `WORKOUTS`, dentro do `index.html`. Cada treino tem um `id` único e blocos de exercícios em superset.
- **Exercícios**: no objeto `EX`. Cada um tem nome, dicas de execução e duas poses (`A` e `B`) que a app interpola para animar a figura.
- **Definições**: modo tempo ou repetições por exercício e por volta, pausa, transição entre blocos, preparação, som e voz. Ficam no `localStorage` do próprio telemóvel, separadas por treino. Nada é enviado para servidor nenhum.
- **Ecrã ligado**: usa a Wake Lock API, com um vídeo mudo em loop como reserva. A Wake Lock só existe em HTTPS.

## Limitações

- Com o ecrã bloqueado o iOS suspende a página. O cronómetro acerta-se ao voltar, mas perdem-se os sinais sonoros desse intervalo.
- Com o Modo de baixo consumo ligado, o iOS ignora a Wake Lock e apaga o ecrã à mesma.
- Os tipos de letra vêm do Google Fonts e só ficam em cache depois da primeira utilização. Sem eles, a app usa as alternativas do sistema.
