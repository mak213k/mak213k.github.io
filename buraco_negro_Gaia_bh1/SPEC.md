# SPEC — Gaia BH1: Simulação 3D Interativa em Three.js

> **Versão:** 1.0 · **Data:** 18/11/2026 · **Estado:** entregue e validado
> **Produto final:** `index.html` autossuficiente (~620 KB) — Three.js embutido, sem CDN, sem npm, sem backend, sem banco de dados
> **Papel do executor:** especialista em frontend com ativos 3D (Three.js e bibliotecas JavaScript)

---

## Índice

1. [Visão geral](#1-visão-geral)
2. [Requisitos e restrições](#2-requisitos-e-restrições)
3. [Dados de referência — Gaia BH1](#3-dados-de-referência--gaia-bh1)
4. [Contexto científico e método de descoberta](#4-contexto-científico-e-método-de-descoberta)
5. [Valores derivados (calculados por código)](#5-valores-derivados-calculados-por-código)
6. [Referências visuais e decisões de design](#6-referências-visuais-e-decisões-de-design)
7. [Arquitetura técnica](#7-arquitetura-técnica)
8. [Especificação da cena](#8-especificação-da-cena)
9. [Constantes de configuração](#9-constantes-de-configuração)
10. [Processo de criação passo a passo](#10-processo-de-criação-passo-a-passo)
11. [Testes e critérios de aceite](#11-testes-e-critérios-de-aceite)
12. [Publicação no Git (GitHub Pages)](#12-publicação-no-git-github-pages)
13. [Estrutura de arquivos](#13-estrutura-de-arquivos)
14. [Extensões futuras](#14-extensões-futuras)
15. [Fontes](#15-fontes)

---

## 1. Visão geral

Recriação tridimensional interativa do sistema **Gaia BH1** — o buraco negro estelar mais próximo da Terra conhecido (478 pc ≈ 1 560 anos-luz, constelação de Ophiuchus) — usando **Three.js**, com dois compromissos que definem o projeto:

1. **Honestidade científica:** toda a mecânica orbital usa os elementos publicados (período, excentricidade, semieixos, inclinação, época do periélio). A interface distingue explicitamente o que é medição real do que é licença artística.
2. **Portabilidade radical:** um único arquivo HTML que roda com duplo clique em qualquer navegador (desktop e celular), funciona no protocolo `file://`, pode ser commitado em qualquer repositório Git e publicado em host estático (GitHub Pages) sem nenhum serviço externo.

O trabalho se divide em quatro frentes, todas concluídas:

| Frente | Entregável | Localização |
|---|---|---|
| Pesquisa | Dados consolidados + fontes com DOI/arXiv | Seções 3–4 desta spec e `PESQUISA.md` |
| Análise de imagens | 3 referências analisadas com implicações de design | Seção 6 e `referencias/` |
| Recriação 3D | `index.html` autossuficiente (~620 KB) | Raiz do projeto |
| Validação | Testes headless + relatório docx/pdf | Seção 11 e `relatorio-gaia-bh1.docx` |

---

## 2. Requisitos e restrições

Requisitos explícitos do pedido original e como cada um foi atendido:

| # | Requisito | Solução adotada |
|---|---|---|
| R1 | Atuar como especialista em frontend 3D (Three.js e libs JS) | Cena em Three.js r128 com shaders GLSL próprios, controles orbitais customizados |
| R2 | Pesquisar informações sobre o Gaia BH1 | Busca na web + ficha técnica da Wikipedia (consolidada em `PESQUISA.md`) |
| R3 | Guardar as respostas | `PESQUISA.md` + esta spec + relatório docx |
| R4 | Analisar fotos do buraco negro | 3 imagens baixadas, analisadas visualmente (seção 6) |
| R5 | Recriar em Three.js | Cena completa com mecânica kepleriana real |
| R6 | Não precisar instalar nada | Biblioteca embutida no HTML; sem build para o usuário final |
| R7 | Rodar direto em qualquer navegador | Sem módulos ES (compatível com `file://`); testado em Chromium headless |
| R8 | Rodar apenas no Git (hospedagem estática) | Arquivo único; instruções de GitHub Pages na seção 12 |
| R9 | Sem banco de dados e sem backend | Zero chamadas de rede; todo processamento local no navegador |

**Restrições derivadas** (decisões técnicas): nenhum CDN em runtime; nenhum `import`/`fetch` de recursos; `devicePixelRatio` limitado a 2 (performance); fallback para navegadores sem WebGL.

---

## 3. Dados de referência — Gaia BH1

Fonte da verdade: ficha técnica da [Wikipedia](https://en.wikipedia.org/wiki/Gaia_BH1) (infobox revisada por Nagarajan et al. 2024), complementada pela página oficial da descoberta (NOIRLab noirlab2227). **Todos os valores desta tabela foram usados no código ou no texto da interface.**

### 3.1 Identificação e posição

| Parâmetro | Valor |
|---|---|
| Nome | Gaia BH1 |
| Fonte Gaia DR3 | 4373465352415301632 (corresponde à estrela) |
| Constelação | Ophiuchus (Serpentário) |
| Época / equinócio | J2000 · ICRS |
| Ascensão reta | 17ʰ 28ᵐ 41,09661ˢ |
| Declinação | −00° 34′ 51,5234″ |
| Magnitude aparente G | 13,77 |
| Paralaxe | 2,09 ± 0,02 mas |
| Movimento próprio | −7,70 ± 0,020 mas/yr (RA) · −25,85 ± 0,027 mas/yr (Dec) |
| Velocidade radial | 23,03 ± 2,63 km/s |

### 3.2 Buraco negro

| Parâmetro | Valor | Uso no projeto |
|---|---|---|
| Massa (revisada) | **9,27 ± 0,10 M☉** (Nagarajan et al. 2024, ESPRESSO) | Razão de massas da órbita (`K_STAR`, `K_BH`) |
| Massa (descoberta) | 9,62 M☉ (El-Badry et al. 2022) | Painel de dados e modal |
| Raio de Schwarzschild | ≈ 27–28 km | Aviso "fora de escala" na UI |
| Estado de atividade | **Dormente / quiescente** — sem acreção, sem raios-X | Disco de acreção opcional, tênue, rotulado "artístico" |

### 3.3 Estrela companheira

| Parâmetro | Valor |
|---|---|
| Tipo espectral | G (sequência principal), tipo solar |
| Massa | 0,93 ± 0,05 M☉ |
| Raio | 0,99 ± 0,05 R☉ |
| Luminosidade bolométrica | 1,06 ± 0,04 L☉ |
| Temperatura efetiva | 5 850 ± 50 K |
| Metalicidade | [Fe/H] = −0,2 ± 0,05 dex |
| Gravidade superficial | log g = 4,55 ± 0,16 (cgs) |
| Rotação projetada | v·sin i < 3,5 km/s |

### 3.4 Órbita

| Parâmetro | Valor | Uso no projeto |
|---|---|---|
| Período | **185,387 ± 0,003 dias** | `PERIOD` (mecânica da cena) |
| Semieixo maior (órbita relativa) | **1,40 ± 0,01 UA** | `A_REL` |
| Excentricidade | **0,43230 ± 0,00002** | `ECC` |
| Inclinação | 126,8° ± 0,2° | `INCL` |
| Longitude do nó ascendente Ω | 97,0° ± 0,7° | `OMEGA_NODE` |
| Argumento do periélio ω | 16,509° ± 0,003° | `OMEGA_PERI` |
| Época do periélio | JD 2457387,9 ± 0,7 | `START_JD_EPOCH` (31/12/2015) |

---

## 4. Contexto científico e método de descoberta

Conteúdo usado nos textos da interface (modal "?", painel de dados) e no relatório:

- **Anúncio:** novembro de 2022, por Kareem El-Badry, Hans-Walter Rix et al., *"A Sun-like star orbiting a black hole"*, MNRAS 518(1):1057–1085 (DOI 10.1093/mnras/stac3140, arXiv:2209.06833). A NOIRLab divulgou simultaneamente (nota noirlab2227), com espectros do telescópio Gemini North (Havaí) confirmando a velocidade radial.
- **Recorde:** buraco negro conhecido mais próximo da Terra de 2022 até hoje; segundo a NOIRLab, cerca de **3× mais próximo** que o detentor anterior (A0620-00). Estimam-se ~100 milhões de buracos negros estelares na Via Láctea, mas apenas uma fração ínfima foi confirmada — quase todos "ativos" (brilham em raios-X ao devorar matéria do companheiro); o Gaia BH1 é o protótipo dos **dormentes**, invisíveis para as buscas tradicionais.
- **Método:** a Gaia (ESA) mediu com precisão de microarcsegundos o **wobble astrométrico** da estrela — uma oscilação de 185,6 dias sem companheiro visível que a explique. A órbita tem **mais de 10× o tamanho angular** de qualquer outro binário com BH conhecido, o que torna a solução inequívoca. Espectroscopia de velocidade radial confirmou; a massa mínima (~9,3 M☉) excede qualquer estrela compacta possível (nada entre anãs brancas e estrelas de nêutrons passa de ~2,3 M☉), e diferentemente dos "impostores" LB-1 e HR 6819, o resultado não depende de hipóteses sobre inclinação nem transferência de massa.
- **Confirmações independentes:** Chakrabarti et al. (AJ 166(1):6, 2023 — espectroscopia de dupla linha) e Tanikawa et al. (ApJ 946:79). Nagarajan et al. (PASP 136:014202, 2024, ESPRESSO) refinou a massa para 9,27 M☉ e **não encontrou evidência de binário interno oculto**.
- **Por que está "apagado":** buraco negro só brilha devorando matéria; a distância mínima (0,795 UA ≈ 171 raios solares) mantém a estrela longe do lóbulo de Roche. Sem disco real, sem raios-X. A única "foto" possível é um campo estelar onde ele não aparece — a impressão artística oficial da NOIRLab é exatamente isso.

---

## 5. Valores derivados (calculados por código)

**Script:** `scripts/compute_gaia.py` (Python puro, sem dependências). Rodar `python3 scripts/compute_gaia.py`. Saída verificada (18/11/2026):

| Grandeza derivada | Valor | Fórmula |
|---|---|---|
| Massa total do sistema | 10,20 M☉ | M_BH + M_star |
| Órbita da estrela no baricentro | **1,272 UA** | a × M_BH/M_tot |
| Órbita do BH (wobble) | **0,1276 UA ≈ 1,9 × 10⁷ km** | a × M_star/M_tot |
| Periélio da separação | 0,795 UA | a·(1−e) |
| Apofélio da separação | 2,005 UA | a·(1+e) |
| Velocidade da estrela no periélio | ≈ 116,1 km/s | vis-viva × razão de massas |
| Velocidade da estrela no apofélio | ≈ 46,0 km/s | vis-viva × razão de massas |
| Raio de Schwarzschild (9,27 M☉) | 27,4 km | R_s = 2GM/c² |
| Raio de Schwarzschild (9,62 M☉) | 28,4 km | idem |
| Distância | 478 pc = 1 559 anos-luz | 1 pc = 3,26156 al |
| Periélio em raios solares | ≈ 170,9 R☉ | confirma ausência de transferência de massa |
| Razão horizonte / órbita da estrela | 1,44 × 10⁻⁷ | justifica "tamanhos fora de escala ~10⁷×" |

**Constantes físicas usadas no script:** AU = 149 597 870,7 km; M☉ = 1,98847 × 10³⁰ kg; G = 6,67430 × 10⁻¹¹ SI; c = 299 792,458 km/s.

**Regra de ouro do projeto:** nenhum número entra na UI/documento sem passar pelo script — cálculos nunca são feitos de cabeça.

---

## 6. Referências visuais e decisões de design

### 6.1 As três imagens analisadas (em `referencias/`)

| Arquivo | Origem | Análise visual | Decisão de design |
|---|---|---|---|
| `ref_noirlab.jpg` | NOIRLab, 2022 — imagem oficial da descoberta. EXIF: *"A wide-field view of the closest black hole to Earth"*, Photoshop 24.0, 01/11/2022 | Campo denso de estrelas com cores variadas (branco-azulado, branco, laranja, vermelho) sobre fundo quase preto; **nenhum objeto "buraco negro" visível** — o ponto é a invisibilidade | Céu profundo rico e colorido (~7 400 estrelas procedurais); BH imperceptível sem rótulos |
| `ref_esa_mapa.jpg` | ESA/Gaia, "Image of the Week" 04/11/2022 — mapa oficial | Plano galáctico da Gaia (bojo dourado, poeira escura) com pinos "BLACK HOLE 1" (vermelho, Ophiuchus) e "BLACK HOLE 2" (azul, Centaurus) | Faixa da Via Láctea sutil ao fundo (banda de estrelas + nebulosas suaves) |
| `ref_livescience.png` | Live Science, 2022 — arte de imprensa | Dois BHs fotorealistas com discos dourados brilhantes e halos suaves — estética consagrada por Interstellar/EHT, mas fisicamente enganosa para um sistema dormente | Disco de acreção existe como recurso didático: **tênue, opcional e rotulado "artístico"** |

### 6.2 Mapeamento dado real → elemento da cena

| Dado real | Implementação |
|---|---|
| BH 9,27 M☉, invisível | Esfera preta (horizonte) + anel de fótons + halo de lente gravitacional (sutis) |
| Sistema dormente | Disco shader tênue (intensidade ×0,55), desligável |
| P = 185,387 d · e = 0,4323 · a = 1,40 UA | Equação de Kepler por Newton–Raphson a cada frame |
| Razão de massas 9,27 : 0,93 | Órbitas separadas no baricentro: 1,272 UA vs 0,128 UA |
| i = 126,8° · Ω = 97° · ω = 16,5° | Grupos aninhados com rotações equivalentes |
| Wobble astrométrico (o que a Gaia mediu) | Elipse laranja do BH em torno do baricentro |
| Céu de Ophiuchus (Figura NOIRLab) | Estrelas procedurais com distribuição de cor por HSL e cintilação |
| Mapa galáctico (Figura ESA) | Banda galáctica + 7 sprites de nebulosa |
| Estrela G de 5 850 K | Esfera branco-amarelada + corona com pulsação (±2,5%) |
| Época do periélio JD 2457387,9 | Relógio da simulação inicia em 31/12/2015 e exibe data simulada |
| Escala irrealista (horizonte ~27 km) | Avisos explícitos: painel de dados, modal e rodapé |

### 6.3 O que é real × o que é artístico (texto exibido ao usuário)

- **Reais:** período, excentricidade, semieixos, inclinação/nó/periélio, razão de massas, época do periélio, massas, temperatura, distância.
- **Artísticos:** tamanho do horizonte e da estrela (fora de escala ~10⁷×), anel de fótons, halo de lente, disco de acreção tênue (o estado real é dormente).

### 6.4 Linguagem visual da UI

| Token | Valor | Uso |
|---|---|---|
| Fundo da cena | `#02040a` | Cor de limpeza do canvas |
| `--ciano` | `#7fd4ff` | Títulos, órbita da estrela (`0x7fd4ff`), acentos |
| `--ambar` | `#ffcf8a` | Destaques (data simulada) |
| `--painel` | `rgba(9,13,24,.78)` | Glassmorphism: `backdrop-filter: blur(8px)` |
| `--borda` | `rgba(127,212,255,.22)` | Bordas de painéis/botões |
| `--texto` / `--texto2` | `#dbe6f5` / `#8fa3bf` | Hierarquia tipográfica |
| Órbita do BH | `#ffa06b` (op. 0,9) | Destaca o wobble — o dado astrométrico central |
| Tipografia | `system-ui` stack | Zero webfonts (portabilidade) |

---

## 7. Arquitetura técnica

### 7.1 Decisões de arquitetura

| Decisão | Justificativa |
|---|---|
| **Arquivo único** (`index.html`) com Three.js embutido | R6/R7/R9: funciona em `file://`, GitHub Pages e qualquer host estático; ~620 KB |
| **Three.js r128 (build UMD minificado)** | Última geração com build não-módulo estável e amplamente testada (`three@0.128.0/build/three.min.js`, 603 KB); r150+ removeu o build global |
| **Sem módulos ES** | `file://` + módulos = bloqueio CORS no Chrome/Edge; UMD expõe `THREE` global |
| **Controles orbitais próprios** (~60 linhas) | `OrbitControls` é arquivo separado no repositório do Three.js — embutir manualmente violaria a simplicidade; a implementação custom dá inércia (damping), pinça de zoom e limites de câmera |
| **Texturas 100% procedurais** (Canvas 2D + shaders) | Zero assets externos; gradiente radial para corona/halo/nebulosas |
| **Rótulos via `Vector3.project()` + divs HTML** | Evita depender de `CSS2DRenderer` (arquivo extra); nota: labels são overlay, não ocultos por depth |
| **Pixel ratio limitado a 2** | Equilíbrio nitidez × performance em telas retina |
| **Shader do disco em coordenadas polares locais** | Rotação diferencial realista (borda interna mais rápida) sem CPU |

### 7.2 Pipeline de build

```
scripts/template_index.html   ← HTML + CSS + código da cena, com marcador <script>/*__THREE_JS__*/</script>
scripts/vendor/three.min.js   ← three@0.128.0 baixado de cdn.jsdelivr.net (603 KB)
scripts/build_index.py        ← injeção: substitui o marcador pelo código do Three.js
        ↓
download/gaia-bh1/index.html  ← arquivo final (~620 KB), autossuficiente
```

`build_index.py` (regra de segurança): se o `three.min.js` contiver a sequência `</script`, aborta (quebraria o inline). Regeneração: `python3 scripts/build_index.py`.

### 7.3 Ferramentas usadas no processo (não fazem parte do produto)

| Ferramenta | Papel |
|---|---|
| `z-ai` CLI (`web_search`, `image-search`) | Pesquisa de dados e localização das imagens |
| `agent-browser` (Chromium headless) | Testes: abrir `file://`, ler `errors`/`console`, screenshots, `eval` |
| Node 24 + `docx` + `image-size` | Geração do relatório docx (`scripts/docx-report/`) |
| LibreOffice headless + `pdftoppm` | Verificação visual do relatório (PDF → JPEG por página) |

---

## 8. Especificação da cena

### 8.1 Sistema de coordenadas e escala

- **Órbitas:** 1 unidade de cena = 1/22 UA (`SCALE = 22`) → órbita da estrela raio médio ≈ 28 u, wobble do BH ≈ 2,8 u, separação no periélio ≈ 17,5 u, no apofélio ≈ 44,1 u.
- **Corpos:** tamanhos artísticos (`R_BH = 1,55 u`, `R_STAR = 1,05 u`) — o horizonte real (~27 km) seria ~10⁷× menor que a órbita e invisível.
- **Câmera:** perspectiva FOV 55°, near 0,1 / far 6000; campo estelar entre 900 e 1 400 u; plano orbital é o XZ (Y = cima).

### 8.2 Campo estelar (2 camadas + nebulosas)

| Propriedade | Camada geral | Camada "faixa galáctica" |
|---|---|---|
| Nº de pontos | 4 200 | 3 200 |
| Distribuição | Direções isotrópicas | Concentrada em plano com normal (0,42; 1; 0,30), desvio gaussiano 0,22 |
| Tamanho | 0,8 + pow(rand,3)·3,4 | 0,6–2,1 |
| Cor | HSL por faixa: 30% azul (h.58), 32% branco, 18% âmbar (h.12), 14% laranja (h.07), 6% vermelho (h.02) | 55% interpoladas para `#fff3dd` (bojo quente) |
| Cintilação | 0,74 + 0,26·sin(t·1,6 + fase) | idem |

Shader dos pontos: `gl_PointSize = aSize · uPR · (150 / −mv.z)`; alpha circular `smoothstep(1.0, 0.12, r)`; blending aditivo, `depthWrite: false`. Nebulosas: 7 sprites (256 px, gradiente radial) ao longo da banda, escala 380–680 u, aditivas — evocam o mapa ESA.

### 8.3 Hierarquia orbital (elementos reais → rotações)

```
gNode (rotation.y = Ω = 97°)
└─ gIncl (rotation.x = i = 126,8°)
   └─ gPeri (rotation.y = ω = 16,509°)
      ├─ linhaOrbita(a·K_STAR·SCALE, 0x7fd4ff, 0.75)   ← elipse da estrela (LineLoop, 240 pontos)
      ├─ linhaOrbita(a·K_BH·SCALE,  0xffa06b, 0.9)     ← elipse do BH (wobble)
      ├─ grupoEstrela (esfera + corona)
      └─ grupoBH (horizonte + anel de fótons + halo + disco)
```

Baricentro na origem: sprite ciano (2,2 u) com rótulo "ponto que a Gaia vê oscilar".

### 8.4 Buraco negro

| Componente | Especificação |
|---|---|
| Horizonte | `SphereGeometry(R_BH, 48, 32)` + `MeshBasicMaterial(0x000000)` — silhueta pura |
| Anel de fótons | `RingGeometry(R_BH·1,02, R_BH·1,30, 72)`; shader radial: `a = pow(1−rn, 2.6) + 0.18·pow(rn,3)`, cor mix de branco-quente para azul-claro, aditivo; **billboard**: `quaternion.copy(camera.quaternion)` por frame |
| Halo de lente | Sprite com gradiente azul-claro (`rgba(150,185,255,…)`), escala 8,5·R_BH, opacidade 0,5, aditivo |
| Disco de acreção | `RingGeometry(3,7, 13,2, 128, 1)` em grupo inclinado (72° em X, 14° em Z); shader: raio normalizado `rn`; rotação diferencial `w = 5,5/pow(rn·6+1,6, 1,5)`; streaks `sin(a2·9 + rn·9 − 1,2)` e `sin(a2·19 − rn·17 + s1·1,8)`; intensidade `smoothstep` nas duas bordas × (0,42 + 0,58·s) × 0,55 + borda interna quente (+0,22); paleta `mix(âmbar-escuro → laranja-quente)`; aditivo, DoubleSide |

### 8.5 Estrela companheira

Esfera `SphereGeometry(R_STAR, 48, 32)` cor `#ffe9c4` (emissiva por natureza) + corona sprite (gradiente quente `rgba(255,236,200,…)`), escala 7,5·R_STAR com pulsação `1 + 0,025·sin(2,1t)`. Sem luzes na cena (todos os materiais são Basic/Shader — coroa e discos já dão o "glow").

### 8.6 Mecânica kepleriana (o núcleo do projeto)

```
M = 2π · simDays / 185,387                    (anomalia média)
E: resolve E − e·sinE = M por Newton–Raphson, 10 iterações
x = a·(cosE − e);  z = a·√(1−e²)·sinE          (plano orbital, eixo x → periélio)
posEstrela = ( x·K_STAR·SCALE, 0,  z·K_STAR·SCALE)
posBH      = (−x·K_BH·SCALE,  0, −z·K_BH·SCALE)   ← BH em contrafase: o wobble
```

Propriedade importante: a forma paramétrica `a(cosE − e)` já descreve uma elipse kepleriana **com foco na origem** — portanto as posições escalonadas pelas razões de massa são, cada uma, a órbita kepleriana correta daquele corpo em torno do baricentro. Periélio (E=0) coloca os corpos em contrafase máxima ao longo do eixo do periélio, como na realidade.

### 8.7 Relógio da simulação

`START_JD_EPOCH = Date.UTC(2015, 11, 31)` (periélio ≈ JD 2457387,9). A data exibida = época + `simDays`; o HUD mostra também `T+N d`. Verificação de coerência executada: T+135 d → **14/05/2016** ✓.

### 8.8 Controles de câmera (implementação própria)

- Estado: `theta, phi, radius` + alvos `tTheta, tPhi, tRadius`; interpolação exponencial `+= (t − atual)·0,085` por frame (inércia).
- Ponteiro: 1 ponteiro = órbita (`Δ·0,0052 rad/px`); 2 ponteiros = pinça (`tRadius *= d0/d`); roda: `tRadius *= 1,0016^ΔY`. Limites: phi ∈ [0,08, π−0,08]; raio ∈ [7, 340]. `touch-action: none` no canvas; `setPointerCapture` por ponteiro.
- Predefinições: **Visão geral** (θ 0,55 · φ 1,12 · r 62) · **Perto do BH** (θ 2,30 · φ 1,38 · r 11) · **De cima** (θ 0,90 · φ 0,22 · r 72).
- Abertura cinematográfica: raio inicial 105 → alvo 62 (a inércia cria o zoom de entrada).

### 8.9 HUD, rótulos e modal

- **Painel de dados** (topo-direita): 14 linhas com os valores reais (seção 3) + nota de fora de escala; colapsável; **inicia oculto em viewports < 640 px**.
- **Barra de controles** (inferior central): Pausar/Retomar; slider de velocidade 5–300 dias/s (padrão 45 ≈ 1 órbita a cada ~4,1 s); toggles Rótulos / Órbitas / Disco (artístico) / Lente; 3 presets de câmera. `flex-wrap` para telas estreitas.
- **Rótulos 3D:** divs absolutas posicionadas por `project()`; ocultas se atrás da câmera (`z>1`); offsets verticais para evitar colisão (BH +4,6; estrela +3,6; baricentro −3,4). Em telas < 640 px, o subtítulo dos rótulos é ocultado por CSS.
- **Modal "?"**: dossier em 4 blocos (descoberta, por que está apagado, real × artístico, como executar) + aviso de fontes. Fecha por botão, clique no fundo.
- **Rodapé:** crédito educacional + "Three.js r128 embutido — sem CDN, sem instalação, sem backend, sem banco" + fontes.
- **Fallback:** se `WebGLRenderer` lançar exceção, exibe mensagem pedindo navegador com WebGL.
- **Acessibilidade:** `aria-label` no slider, `aria-modal` no diálogo, `title` nos botões.

---

## 9. Constantes de configuração

Todos os "knobs" do projeto (arquivo `scripts/template_index.html`):

| Constante | Valor | Função |
|---|---|---|
| `SCALE` | 22 | Unidades de cena por UA (órbitas) |
| `A_REL` | 1,40 | Semieixo maior da órbita relativa (UA) |
| `ECC` | 0,4323 | Excentricidade |
| `PERIOD` | 185,387 | Período orbital (dias) |
| `K_STAR` | 9,27/10,20 | Fração da órbita relativa → estrela (a = 1,272 UA) |
| `K_BH` | 0,93/10,20 | Fração → buraco negro (a = 0,128 UA) |
| `R_BH` | 1,55 | Raio visual do horizonte (artístico) |
| `R_STAR` | 1,05 | Raio visual da estrela (artístico) |
| `INCL` | 126,8° | Inclinação orbital |
| `OMEGA_NODE` | 97,0° | Longitude do nó ascendente |
| `OMEGA_PERI` | 16,509° | Argumento do periélio |
| `START_JD_EPOCH` | 31/12/2015 (UTC) | Época do periélio JD 2457387,9 |
| Velocidade padrão | 45 dias/s (5–300) | Slider |
| Damping de câmera | 0,085 | Inércia da interpolação |
| Limites de zoom | raio ∈ [7, 340] | Clamp |
| Pixel ratio | min(dpr, 2) | Performance |

---

## 10. Processo de criação passo a passo

Sequência executada (reprodutível de ponta a ponta):

1. **Pesquisa de dados** — `z-ai web_search` (2 consultas: parâmetros físicos; descoberta/natureza dormente) + leitura da ficha técnica da Wikipedia. Resultado: tabela da seção 3.
2. **Cálculo dos derivados** — escrever e rodar `scripts/compute_gaia.py`; colher a tabela da seção 5. *Regra: nenhum número entra na UI sem output de script.*
3. **Busca e análise de imagens** — `z-ai image-search` (6 resultados); baixar as 3 mais relevantes; abrir cada uma e analisar (seção 6.1); guardar em `referencias/` com proveniência documentada.
4. **Template da cena** — escrever `scripts/template_index.html`: CSS responsivo → HUD → shader do starfield → hierarquia orbital → BH (horizonte/anel/halo/disco) → estrela → solver de Kepler → rótulos → controles → laço de animação.
5. **Build** — baixar `three@0.128.0/build/three.min.js` para `scripts/vendor/`; `build_index.py` injeta a biblioteca no marcador e grava `download/gaia-bh1/index.html` (620 KB).
6. **Teste headless iterativo** — `agent-browser open file://…` → `errors` / `console` (vazio ✓) → screenshot → correções → rebuild → re-teste. Correções aplicadas na iteração v1→v2:
   - **Estrela fora do quadro:** raio de câmera padrão 48 → 62 (a elipse de 44 u de apofélio não cabia);
   - **Rótulos sobrepostos:** offsets verticais assimétricos (BH +4,6 / baricentro −3,4);
   - **Disco com "bandas de vinil":** o termo `rn·23` do shader criava ~23 anéis concêntricos por aliasing → streaks mais suaves (`rn·9` e `rn·17` acoplados) + borda interna quente;
   - **Órbitas fracas:** opacidades 0,55/0,75 → 0,75/0,9 (o wobble laranja é o dado central e precisa ser legível).
7. **Testes de interação** — presets de câmera, pausa, velocidade, modal, toggles; capturas (`capturas/visao_geral.png`, `perto_do_bh.png`); teste de viewport 375×812 (mobile) e confirmação de zero chamadas de rede.
8. **Documentação** — `PESQUISA.md`, `README.md` (com instruções de publicação) e relatório formal docx/pdf (capa, sumário com campo TOC, 5 figuras, 4 tabelas, referências com DOI).
9. **Validação final** — postcheck do docx (0 erros), renderização PDF e inspeção página a página; verificação de ausência de dependências externas no `index.html`.

---

## 11. Testes e critérios de aceite

### 11.1 Resultados executados

| Teste | Procedimento | Resultado |
|---|---|---|
| Carregamento `file://` | `agent-browser open` sem servidor | Renderiza; **console e erros vazios** |
| Coerência do relógio | `eval` da data simulada | 31/12/2015 + 135 d = 14/05/2016 ✓ |
| Órbita kepleriana | Observar varição de velocidade com e = 0,4323 | Aceleração no periélio visível; elipses corretas |
| Interações | Clique em presets, pausa, slider, toggles, modal | Todos respondem; estados visuais corretos |
| Mobile 375×812 | Screenshot em viewport emulado | Controles empilham; painel de dados inicia oculto; rodapé oculto |
| Zero dependências | Grep por `src=`/`href`/`fetch` externos | Nenhum recurso carregado (apenas namespace interno da lib) |
| Relatório docx | `postcheck.py` + inspeção visual PDF | 0 erros; 12 páginas; TOC íntegro |

### 11.2 Critérios de aceite para regeneração

- [ ] `index.html` abre por duplo clique e renderiza sem erro de console
- [ ] Data simulada é sempre coerente com `T+` dias (base 31/12/2015)
- [ ] Periélio/apofélio visíveis com aceleração perceptível da estrela
- [ ] BH orbita o baricentro em elipse pequena (wobble) em contrafase com a estrela
- [ ] Toggles desligam rótulos, órbitas, disco e lente sem recarregar
- [ ] Nenhuma requisição de rede em runtime
- [ ] Layout utilizável de 360 px até 1920 px
- [ ] Aviso de fora de escala presente na UI

---

## 12. Publicação no Git (GitHub Pages)

```bash
git add index.html README.md PESQUISA.md SPEC.md capturas referencias
git commit -m "Simulação 3D do Gaia BH1 (Three.js, arquivo único)"
git push origin main
```

No repositório: **Settings → Pages → Branch `main` / pasta `(root)` → Save**. A simulação fica em `https://<usuario>.github.io/<repo>/`. Funciona igualmente em GitLab Pages, Netlify, Vercel e Cloudflare Pages — é um arquivo estático; não há servidor, variáveis de ambiente nem segredos.

---

## 13. Estrutura de arquivos

```
gaia-bh1/
├── index.html       ← PRODUTO: simulação completa (Three.js embutido, ~620 KB)
├── README.md        ← como executar/publicar + o que é real × artístico
├── PESQUISA.md      ← pesquisa consolidada + análise das imagens + fontes
├── SPEC.md          ← este documento (especificação completa e reprodutível)
├── capturas/        ← visao_geral.png · perto_do_bh.png · mobile_375px.png
└── referencias/     ← ref_noirlab.jpg · ref_esa_mapa.jpg · ref_livescience.png

scripts/ (fora do repositório público; ferramentas de geração)
├── compute_gaia.py          ← cálculos derivados auditáveis
├── template_index.html      ← código-fonte da cena (com marcador de injeção)
├── build_index.py           ← gera o index.html final
├── vendor/three.min.js      ← three@0.128.0 (fonte da injeção)
└── docx-report/             ← gerador do relatório docx (generate.js + pós-processadores)
```

---

## 14. Extensões futuras

1. **Modo fotométrico realista:** remover anel de fótons/halo/disco (cena ≈ foto NOIRLab: só a estrela oscilando) — reforça a mensagem científica.
2. **Comparativo Gaia BH2 / BH3:** BH2 em Centaurus (7,1 M☉, ~3800 al) e BH3 em Aquila (33 M☉, ~1926 al, descoberto em 2024) na mesma escala.
3. **Trajetória aparente no céu:** desenhar o caminho astrométrico da estrela no céu (a assinatura que a Gaia mediu).
4. **Navegação por teclado** (setas/WASD) e `prefers-reduced-motion` para pausar cintilação.
5. **Internacionalização** (pt/en) via objeto de strings.

---

## 15. Fontes

| # | Referência | Identificador |
|---|---|---|
| 1 | El-Badry, K.; Rix, H.-W.; Quataert, E. et al. *A Sun-like star orbiting a black hole*. MNRAS 518(1):1057–1085 (2022) | DOI 10.1093/mnras/stac3140 · arXiv:2209.06833 |
| 2 | Nagarajan, P. et al. *ESPRESSO Observations of Gaia BH1: High-precision Orbital Constraints and no Evidence for an Inner Binary*. PASP 136(1):014202 (2024) | DOI 10.1088/1538-3873/ad1ba7 · arXiv:2312.05313 |
| 3 | Chakrabarti, S.; Simon, J. D. et al. *A Noninteracting Galactic Black Hole Candidate in a Binary System with a Main-sequence Star*. AJ 166(1):6 (2023) | DOI 10.3847/1538-3881/accf21 · arXiv:2210.05003 |
| 4 | Wikipedia — *Gaia BH1* (infobox revisada por Nagarajan et al. 2024; acessada em 18/11/2026) | https://en.wikipedia.org/wiki/Gaia_BH1 |
| 5 | NOIRLab — nota de imprensa oficial da descoberta (noirlab2227, 2022; espectros Gemini North) | https://noirlab.edu/public/news/noirlab2227 |
| 6 | ESA/Gaia — "Image of the Week" 04/11/2022 (mapa com a localização dos BHs) | cosmos.esa.int |
| 7 | Tanikawa, A. et al. — candidatura independente | ApJ 946:79 |

**Arquivos de imagem:** `referencias/` (re-hospedados nesta sessão; proveniência e EXIF documentados na seção 6.1).

*Simulação educacional — não é representação fotográfica. O Gaia BH1 nunca foi diretamente fotografado.*
