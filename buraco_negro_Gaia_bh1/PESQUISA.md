# Pesquisa — Gaia BH1 (o buraco negro estelar mais próximo da Terra)

*Pesquisa guardada em 18/11/2026 · Fontes verificadas: Wikipedia (ficha técnica), arXiv:2209.06833, MNRAS 518(1):1057, ESA/Gaia IoW 04-11-2022*

## 1. Ficha técnica do sistema

| Parâmetro | Valor |
|---|---|
| Designação | Gaia BH1 (fonte Gaia DR3 4373465352415301632) |
| Tipo | Buraco negro estelar **dormente** (não interagente, sem acreção detectável) |
| Massa do BH | **9,27 ± 0,10 M☉** (Nagarajan et al. 2024, ESPRESSO); 9,62 M☉ na descoberta (El-Badry et al. 2022) |
| Raio de Schwarzschild | ≈ 27 km (2,95 km × 9,27) |
| Distância | **478 ± 5 pc ≈ 1 559 ± 10 anos-luz** (a ~3× a distância do próximo candidato anterior) |
| Constelação | Ophiuchus (Serpentário) |
| Coordenadas (J2000) | RA 17h 28m 41,10s · Dec −00° 34′ 51,52″ · mag. G = 13,77 |
| Estrela companheira | Anã G tipo solar: **0,93 ± 0,05 M☉**, 0,99 R☉, 1,06 L☉, Teff 5 850 ± 50 K, [Fe/H] = −0,2 |
| Período orbital | **185,387 ± 0,003 dias** |
| Semieixo maior (órbita relativa) | 1,40 ± 0,01 UA |
| Excentricidade | 0,43230 ± 0,00002 |
| Inclinação / Ω / ω | 126,8° ± 0,2° / 97,0° ± 0,7° / 16,509° ± 0,003° |
| Época do periélio | JD 2457387,9 (≈ 31/12/2015) |
| Órbita da estrela (baricentro) | a = 1,272 UA (calculado) |
| Órbita do BH (wobble) | a = 0,1276 UA ≈ 19,1 milhões km (calculado) |
| Periélio / apafélio (separação) | 0,795 UA / 2,005 UA (calculados) |
| Velocidade da estrela | 116 km/s no periélio, 46 km/s no apafélio (calculados, vis-viva) |
| Descoberta | **2022** — El-Badry, Rix et al., MNRAS 518(1):1057–1085 (publ. 02/11/2022) |
| Método | Astrometria da Gaia (DR3) + espectroscopia de velocidade radial (Keck/HIRES, -...) |
| Detecção independente | Chakrabarti et al. AJ 166(1):6 (2023); Tanikawa et al. ApJ 946:79 |
| Recorde | BH conhecido mais próximo da Terra (2022–presente; sucedeu A0620-00) |

**Valores derivados calculados em `scripts/compute_gaia.py`** (massa total 10,20 M☉).

## 2. Como foi descoberto (e por que é especial)

- A Gaia mede a posição das estrelas com precisão de microarcseconds. A estrela tipo solar mostrava um **wobble astrométrico** de uma órbita de 185,6 dias — mas não há segunda estrela visível de massa suficiente.
- O semieixo angular no céu é **>10× maior** que o de qualquer outro binário com BH conhecido — por isso a solução astrométrica é inequívoca (diferente dos "impostores" LB-1 e HR 6819).
- Espectroscopia de velocidade radial confirmou a órbita; a massa de 9–10 M☉ está acima de qualquer estrela compacta possível (anã branca ≤1,4 M☉, estrela de nêutrons ≤2,3 M☉) → **só um buraco negro explica**.
- Nenhuma transferência de massa: o sistema é **não interagente** — por isso nunca apareceu em buscas por raios-X.

## 3. Estado "dormente" — implicação visual fundamental

Gaia BH1 **não possui disco de acreção brilhante**. As artes da imprensa com discos dourados luminosos são licença artística. A única "foto" real possível é o campo estelar onde ele mal se distingue. Toda visualização do objeto é necessariamente reconstrução científica.

## 4. Análise das imagens de referência (pasta `referencias/`)

### 4.1 `ref_noirlab.jpg` — NOIRLab (arte/imagem oficial da descoberta)
EXIF: "A wide-field view of the closest black hole to Earth", Photoshop 24.0, 01/11/2022 — liberada junto com o paper (02/11/2022).
**Análise visual:** campo amplo e denso de estrelas em Ophiuchus, fundo quase preto; milhares de pontos com cores variadas (branco-azulado, branco, laranja, vermelho) e brilhos variados; uma estrela branco-azulada proeminente no centro-superior e outra branca no quadrante inferior-esquerdo; **nenhum objeto "de buraco negro" é visível** — o ponto da imagem é exatamente a invisibilidade do BH: só a fraca estrela companheira (mag 13,77) orbita algo que não se vê. *Implicação de design: a cena realista deve ter céu profundo rico em estrelas coloridas e o BH praticamente imperceptível sem os rótulos.*

### 4.2 `ref_esa_mapa.jpg` — ESA/Gaia (mapa celeste oficial)
**Análise visual:** o famoso mapa do plano galáctico da Gaia (faixa lateral da Via Láctea vista de fora, bojo dourado central, faixas escuras de poeira, fundo acinzentado) com dois pinos de localização: "BLACK HOLE 1" (vermelho, região superior-esquerda — Gaia BH1 em Ophiuchus) e "BLACK HOLE 2" (azul, direita — Gaia BH2 em Centaurus). Marca d'água da ESA. *Implicação de design: incluir uma faixa da Via Láctea sutil ao fundo contextualiza onde o sistema está.*

### 4.3 `ref_livescience.png` — Live Science (arte genérica da cobertura)
**Análise visual:** dois BHs estelares fotorealistas com discos de acreção dourado-creme, halos suaves e fundo azul-marinho estrelado; disco espiral amplo à esquerda, disco compacto e mais brilhante à direita. Estilo CGI difuso, sem marca d'água. *Implicação de design: serve de referência estética para o disco "artístico", mas deve ser renderizado TÊNUE no app, com aviso de que Gaia BH1 está dormente.*

## 5. Decisões de design da recriação Three.js (dados → cena)

| Elemento real | Implementação |
|---|---|
| BH 9,27 M☉ invisível | Esfera preta (horizonte) + anel de fótons + halo de lente gravitacional sutis |
| Dormente (sem acreção) | Disco de acreção **opcional, tênue e âmbar-escuro**, rotulado "artístico" |
| Órbita Kepleriana real (P=185,387 d, e=0,4323) | Equação de Kepler resolvida por Newton–Raphson a cada frame; elipses reais ao redor do baricentro (estrela 1,272 UA / BH 0,128 UA) |
| Wobble astrométrico (o que a Gaia mediu) | O BH orbita o baricentro visivelmente em escala pequena |
| Inclinação 126,8°, Ω=97°, ω=16,5° | Elementos orbitais aplicados como rotações de grupos aninhados |
| Céu da NOIRLab | ~7 000 estrelas procedurais coloridas + faixa da Via Láctea + cintilação |
| Estrela G 5 850 K | Esfera branco-amarelada + corona + luz pontual |
| Época do periélio JD 2457387,9 | Relógio da simulação parte de 31/12/2015 e mostra a data simulada |
| Escala irrealista (R☉ ≪ UA) | Avisos explícitos "tamanhos fora de escala" |

## 6. Fontes (abertas e verificadas nesta sessão)

- https://en.wikipedia.org/wiki/Gaia_BH1 — ficha técnica completa (infobox, Nagarajan et al. 2024)
- https://arxiv.org/abs/2209.06833 — El-Badry et al. 2022, "A Sun-like star orbiting a black hole" (MNRAS 518(1):1057)
- https://academic.oup.com/mnras/article/518/1/1057/6794289 — versão MNRAS
- https://www.cosmos.esa.int/ (ESA "Image of the Week", 04/11/2022) — mapa com os pinos dos BHs
- Imagens re-hospedadas: `referencias/ref_noirlab.jpg`, `referencias/ref_esa_mapa.jpg`, `referencias/ref_livescience.png`
