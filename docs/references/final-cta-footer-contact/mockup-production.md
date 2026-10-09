# Mockup Side — procedência e composição

## Fontes

- ZIP fornecido pelo usuário: `C:/Users/vitol/Downloads/m8557-laptop-tablet-phone-mockup-template_NmFjNmMzY2YxOTRjZjgwMDMzNjBjNjJm.zip`.
- PSD interno: `M8557-laptop-tablet-phone-mockup-template/laptop-tablet-phone-mockup-template.psd`, 6000×4171px, 146.796.460 bytes. Documento com camadas de corpo, laptop, tablet, celular, efeitos e sombras. O PSD original não foi alterado nem incluído no bundle da aplicação.
- Referência de composição do CTA: [white-cta-reference.png](white-cta-reference.png), captura 2026-10-07 191325.
- Marca das telas: SVGs oficiais `public/brand/side-logo-black.svg` e `side-logo-white.svg`. Wordmark oficial fornecida também como referência de identidade para a composição.

## Telas ilustrativas

As três interfaces foram desenhadas em HTML/CSS e capturadas no navegador com DPR 2. [Fonte de produção](screens/render-screens.cjs.txt), [laptop](screens/laptop-screen.png), [tablet](screens/tablet-screen.png), [celular](screens/phone-screen.png).

- Laptop: workspace claro, navegação lateral, indicadores de projeto, progresso e próximos passos.
- Tablet: organização de um projeto em tema escuro, card roxo e etapas de trabalho.
- Celular: acompanhamento do projeto, progresso e próxima entrega.

As interfaces e números são simulações solicitadas pelo usuário, não cases ou resultados reais da Side. O alt da imagem descreve explicitamente telas simuladas. A rota EN usa a variação localizada `side-devices-en.webp`; PT mantém o asset aprovado.

## Composição

Ferramenta: **image_gen integrada**, seguindo a skill imagegen. O preview original do PSD foi decodificado para referência; a ferramenta compôs as três capturas nas telas do mockup, preservando a disposição frontal e a sobreposição dos dispositivos. Portanto, o resultado é uma composição assistida por imagem a partir do template, não um PSD com smart objects substituídos nativamente. Nenhuma biblioteca de imagem foi adicionada às dependências do site.

Arquivo de saída da ferramenta: `C:/Users/vitol/.codex/generated_images/01a117c5-e04b-75b1-af9d-8d3a8dfc2ca8/exec-5616aa4f-2de4-4765-9a06-f87c13d3caf0.png`.

Asset final local: [`public/media/final-cta/side-devices.webp`](../../../public/media/final-cta/side-devices.webp), 1774×887px, 91.300 bytes, WebP qualidade 92. Next Image oferece tamanhos responsivos e lazy loading; largura e altura explícitas reservam espaço no layout.

## Prompt final enviado à ferramenta

> Use case: compositing. Create a production-quality website asset by editing IMAGE 1, the exact laptop + tablet + phone mockup supplied by the user. Preserve the three device bodies, order, proportions, frontal camera angle, silver laptop, black thin bezels, reflections, occlusion, tablet overlapping laptop on the right and phone overlapping tablet farther right. Replace ONLY their screen contents with the provided app screenshots: IMAGE 2 goes on laptop, IMAGE 3 dark project app goes on tablet, IMAGE 4 goes on phone. Fit each screen edge-to-edge precisely with native aspect ratio and preserve realistic notch/dynamic island and glass. Keep the original official S. logo present in all three app screenshots exactly. IMAGE 5 is supporting official Side wordmark reference, do not invent or approximate the mark. The layouts and Portuguese text in the screen screenshots are deliberate; preserve them as closely as possible, avoid adding or rewriting text. Remove the original template placeholder screens and all original 13:00 or YOUR DESIGN HERE texts. Set surrounding backdrop to pure seamless white #ffffff with only subtle contact shadows directly underneath the devices. Crop excess blank canvas tightly to the group of devices, leave only 3% breathing room on all sides, no device clipped. Output wide landscape about 2:1, high resolution 3000px wide if available, crisp clean premium product mockup. No headlines, labels or decorations outside devices. No additional devices, no orbit icons, no scene, no watermark. Make it look like carefully placed smart objects in the exact supplied Photoshop mockup.
# Revisão: transparência para o card colorido

Em 08/10, a versão `public/media/final-cta/side-devices-transparent.webp` substituiu o fundo branco por alpha real, via imagegen. A versão branca original foi preservada. O pedido de edição foi remover apenas o fundo exterior, mantendo composição, dispositivos, telas e logos; sombras de contato semitransparentes. O WebP final tem 1774×887 pixels, quatro canais e 147740 bytes. O componente usa blend normal para evitar tingir as telas com a cor reativa do card.

## Variação EN final

`public/media/final-cta/side-devices-en.webp`: edição pelo imagegen integrado, depois de inspecionar o original transparente. Saída preservada em `C:/Users/vitol/.codex/generated_images/01a117c5-e04b-75b1-af9d-8d3a8dfc2ca8/exec-29c913a2-5bab-4731-a9df-e9386a784c96.png`; codificação WebP qualidade92 com alpha. Apenas a rota EN seleciona essa variação.

Prompt: editar o mockup transparente aprovado para localizar somente os textos das três telas em inglês natural. Preservar corpos dos dispositivos, sobreposição, ângulo, cores, gráficos, números, layout, logos S oficiais, sombras e transparência. Traduções principais: “Tudo no seu ritmo.” → “Everything at your pace.”; “Boas ideias. Próximos passos.” → “Good ideas. Next steps.”; “Seu próximo passo está aqui.” → “Your next step is here.”; “O próximo começa aqui.” → “What’s next starts here.”. Localizar também navegação, indicadores, entregas, estágios, datas e assinatura. Não acrescentar elementos fora das telas. Inspeção visual confirmou textos ingleses e composição preservada.
