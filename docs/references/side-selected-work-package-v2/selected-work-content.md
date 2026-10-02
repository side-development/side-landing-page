# SIDE — Selected Work v2

## Princípio central

Evitar qualquer efeito sintético que invente uma interface, produto, radar, tracking visual ou comportamento que não exista nos projetos reais.

A seção deve ser construída com:
- gravações reais das duas landing pages;
- tipografia Side;
- máscaras simples;
- transformações de escala/posição;
- cortes e wipes editoriais;
- cursor Side.

Nada de criar “features visuais” que não existam na Route ou na OWL.

---

## Cursor Side

O cursor customizado nasce durante o campo roxo final da Hero, quando a troca é visualmente imperceptível.

Cor:
`#3919BD` / `rgb(57, 25, 189)`

Desktop:
- 8–10 px;
- movimento suave;
- sem trail;
- sobre links: crescimento discreto;
- sobre mídia de projeto: `ver projeto` / `view project`.

Touch/mobile:
- sem cursor customizado.

Reduced motion:
- sem atraso/inércia.

---

# Estrutura

```text
Hero final
↓
Selected Work
↓
Route Security
↓
transição editorial baseada apenas em vídeo
↓
OWL
↓
Ver todos os trabalhos →
```

A Home é trailer. `/trabalhos` guarda exploração; cases guardam profundidade.

---

# Projeto 01 — Route Security

Fonte pública:
https://routesecurity.com.br/

## PT-BR

**Route Security**  
Website · Experiência digital  
2026

**Uma presença digital criada para traduzir engenharia, tecnologia e operação de segurança em uma experiência clara e marcante.**

CTA: **Ver projeto**

## EN

**Route Security**  
Website · Digital Experience  
2026

**A digital presence built to turn security engineering, technology and operations into a clear, memorable experience.**

CTA: **View project**

## Reel recomendado

Usar somente a página real.

Duração final: 5–7 s.

Shot list:
1. Hero / primeiro impacto.
2. Scroll rápido por uma seção intermediária.
3. “Rigor técnico”.
4. Sequência real da câmera: fechada → girada → explodida.
5. Hold curto.

Não inventar overlays de segurança, visão computacional, HUDs ou gráficos externos.

---

# Projeto 02 — OWL

Fonte pública:
https://owlloc.com/

## PT-BR

**OWL**  
Website · Produto digital  
2026

**Uma experiência digital para tornar visível um sistema de localização em tempo real com precisão centimétrica.**

CTA: **Ver projeto**

## EN

**OWL**  
Website · Digital Product  
2026

**A digital experience that makes a real-time, centimeter-precision location system visible.**

CTA: **View project**

## Reel recomendado

Usar somente a página real.

Duração final: 6–8 s.

Shot list:
1. Hero: frases reais.
2. Dashboard real.
3. Mapa/monitoramento real, se aparecer naturalmente na gravação.
4. Geolimits/violações reais.
5. Hardware real como fechamento opcional.

Não inventar radar, ping, alvo, pulse, tracking point, HUD ou interface adicional.

---

# Transição Route → OWL

## Direção aprovada: media handoff / motion-matched editorial transition

Não usar glitch.
Não usar radar.
Não fazer “lente da câmera vira mapa”.
Não tentar simular continuidade semântica que não existe.

A transição deve manipular apenas os dois vídeos reais.

### Versão principal

1. Route está em mídia grande/quase fullscreen.
2. No final do reel, Route desacelera e segura por ~300–500 ms.
3. O container da Route começa a reduzir levemente de escala e deslocar para cima.
4. Ao mesmo tempo, o vídeo OWL entra por baixo ou por trás, em um segundo plano.
5. Por ~400–700 ms os dois frames coexistem.
6. O frame Route sai do viewport.
7. O OWL ocupa progressivamente o espaço principal.
8. Metadata/título de OWL aparecem somente quando a mídia já está estabilizada.

Visualmente:

```text
[ ROUTE — grande ]
        ↓
[ ROUTE — menor / subindo ]
[ OWL   — entrando por baixo ]
        ↓
[ OWL — grande ]
```

### Por que essa solução

- usa somente mídia real;
- é fácil de calibrar;
- não cria “feature” falsa;
- funciona com qualquer frame capturado;
- não depende de match-cut perfeito;
- reduz risco de resultado artificial;
- mantém sensação de peça editorial premium.

### Variante opcional

Se os dois clips tiverem um trecho de scroll vertical com velocidade parecida, usar um **motion-matched cut**:

- Route acelera verticalmente;
- corte no pico de movimento;
- OWL entra já com movimento na mesma direção;
- pequeno blur de movimento pode ser aplicado ao container durante 150–250 ms.

Essa variante só deve ser usada se os clips realmente encaixarem. Não forçar.

---

# Selected Work — composição

## Cabeçalho

PT-BR:
**TRABALHOS SELECIONADOS**
`02 projetos`

EN:
**SELECTED WORK**
`02 projects`

Sem parágrafo introdutório longo.

## Projetos

Cada projeto:
- 1 reel;
- nome;
- categoria;
- ano;
- teaser curto;
- CTA contextual.

Sem:
- stack;
- processo;
- depoimento;
- galeria;
- métricas completas;
- descrição longa;
- case dentro da Home.

---

# Downloads / assets necessários

Adicionar ao repositório apenas os assets finais:

```text
public/work/route/
  route-reel.mp4
  route-poster.webp

public/work/owl/
  owl-reel.mp4
  owl-poster.webp
```

Opcional, fora do bundle público:

```text
docs/references/work/source-clips/
  route-source.mp4
  owl-source.mp4
```

## Requisitos de vídeo

- MP4 H.264;
- sem áudio;
- 1440×900 ou 1440×810 como master recomendado;
- 30 fps;
- `yuv420p`;
- `faststart`;
- duração 5–8 s;
- qualidade visual alta, mas sem arquivo enorme;
- poster correspondente;
- sem texto Side queimado no vídeo.

## FFmpeg sugerido

```bash
ffmpeg -i input.mp4 \
  -an \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  output.mp4
```

Depois, se necessário, aumentar CRF para 20–22 para reduzir bundle.

---

# Referências

Usar por função, não copiar identidades:

- Pixel Broke NÃO é referência desta seção.
- Hero glitch NÃO deve ser reutilizado.

Referências anteriores úteis:
- Awwwards — portfolios com projetos fullscreen / scroll
- Awwwards — cursor minimalista
- composições editoriais com mídia dominante

A implementação deve priorizar os vídeos reais da Route e OWL como a principal referência visual.

---

# Regras da futura issue

- não redesenhar Hero;
- cursor Side começa após/na conclusão da intro;
- Selected Work tem somente Route e OWL;
- não usar cards SaaS;
- não reutilizar glitch;
- Route → OWL = handoff editorial entre dois vídeos reais;
- nenhum radar/HUD/tracking fictício;
- nenhum WebGL obrigatório;
- GSAP + CSS são suficientes;
- mobile recebe layout próprio;
- reduced motion simplifica parallax/transições;
- CTA final leva a `/trabalhos`;
- issue visual permanece aberta até aprovação humana.
