# Computer Vision: imagens e conteúdo

Validação em15/10/2026. As mudanças foram aprovadas visualmente pelo usuário junto à página Serviços, com autorização de envio em15/10. A atualização integra o PR de Serviços, sem merge automático.

## Prévia funcional

- Português: http://localhost:3017/trabalhos?case=computer-vision
- Inglês: http://localhost:3017/en/work?case=computer-vision

O case agora se chama **Computer Vision** e apresenta detecção de objetos em três contextos: veículo e região da placa, produtos em linha de produção e detecção multiclasse em espaços urbanos. Resumo, desafio, solução, destaques, impacto, escopo, categorias, textos alternativos e legendas foram revistos em PT/EN.

As imagens fornecidas foram tratadas como **exemplos ilustrativos de aplicação**, sem afirmar que sejam capturas de um sistema proprietário. A indicação aparece nas três legendas e no aviso de confidencialidade dos dados do case. O aviso existente de confidencialidade foi preservado. Não foram acrescentados clientes, métricas, resultados quantitativos ou garantias de privacidade, desempenho, robustez ou conformidade.

## Imagens

| Fonte local fornecida | Asset público | Dimensões | Bytes | Verificação |
| --- | --- | --- | --- | --- |
| `Downloads/1-me6o4fgdrr8hue_mbateaq-1.png` | `/work/computer-vision/gallery/01-veiculo-placa.webp` | 800 × 541 | 334.730 | HTTP 200, WebP, pixels decodificados idênticos à fonte |
| `Downloads/5f792ff0a47466e1de554a0c_ag_sort-p-800.jpeg` | `/work/computer-vision/gallery/02-objetos-producao.webp` | 800 × 640 | 432.492 | HTTP 200, WebP, pixels decodificados idênticos à fonte |
| `Downloads/WhatsApp Image 2026-10-15 at 17.49.07.jpeg` | `/work/computer-vision/gallery/03-deteccao-urbana.webp` | 1600 × 900 | 997.946 | HTTP 200, WebP, pixels decodificados idênticos à fonte |

Conversão com `sharp` já disponível em `node_modules`, usando WebP sem perdas. Sem recorte, recomposição, ampliação ou alteração de caixas e rótulos. A entrega continua passando pela otimização responsiva de `next/image`.

Foi adicionado um `fit` opcional à mídia. As três imagens deste case usam `contain` na galeria e no overlay, preservando o enquadramento completo dentro das molduras existentes. O pequeno zoom de hover do overlay é desativado apenas para `contain`, para manter rótulos próximos das bordas visíveis. Os demais projetos continuam com `cover`.

## Verificação

- Guias locais lidos antes da edição: `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` e referência `01-app/03-api-reference/02-components/image.md` (especialmente `fill`, `style` e `objectFit`).
- `npx eslint src/features/work-page/projects.ts src/features/work-page/ProjectGallery.tsx src/features/work-page/CaseOverlay.tsx --max-warnings=0`: passou, código de saída 0.
- Comparação dos objetos exportados contra `HEAD`: os três outros projetos são idênticos; o último case possui exatamente três imagens válidas, sem os quatro slots anteriores.
- Requisições HTTP às três imagens: status 200 e `content-type: image/webp`.
- Playwright com Microsoft Edge: português em 1440 × 1000 e inglês em 390 × 844, ambos com movimento reduzido.
- Galeria: navegação pelas três imagens distintas em ambos os cenários, com `complete: true`, dimensões naturais maiores que zero e `object-fit: contain`.
- Overlay: as três imagens carregam em ambos os cenários; hover mantém `transform: none` e `object-fit: contain`.
- Sem erros de página no navegador e sem overflow horizontal nos dois cenários.
- Inspeção visual de screenshots confirmou veículo e placa inteiros, caixas nas frutas e detecções urbanas sem cortes causados pelo enquadramento.

Evidências temporárias da inspeção: `C:/Users/vitol/AppData/Local/Temp/side-cv-validation.json`, `side-cv-pt-BR-gallery.png`, `side-cv-pt-BR-overlay.png`, `side-cv-en-gallery.png` e `side-cv-en-overlay.png`, no mesmo diretório temporário. Build, typecheck e lint globais ficam para a validação integrada do agente principal, evitando execução concorrente.

O componente atual de overlay não renderiza a propriedade `confidentialityNotice`; a propriedade foi mantida nos dados e a natureza ilustrativa das imagens também está expressa nas legendas visíveis do overlay.
