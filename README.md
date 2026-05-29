<div align="center">

<!-- HEADER BANNER -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=230&section=header&text=GPS%20Navegação&fontSize=60&fontColor=ffffff&animation=twinkling&fontAlignY=35&desc=Sistema%20Avançado%20de%20Localização%20e%20Navegação&descAlignY=55&descSize=18&descColor=bfdbfe" />

<br/>

<!-- BADGES -->
<div>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<br/>

Explore e descubra o mundo com o **GPS Navegação**, um aplicativo moderno, imersivo e ultra-responsivo que rastreia sua localização em tempo real, calcula a precisão do sinal em um compasso dinâmico de alta fidelidade e permite descobrir pontos de interesse (POIs) ao seu redor em um mapa escuro elegante. 📍

</div>

<br/>

<!-- BLUE-GREEN ANIMATED DIVIDER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=25&section=footer" width="100%">

<!-- SOBRE O PROJETO / COMO FUNCIONA -->
<div align="center">

### &nbsp; 🎬 Como funciona

</div>

O aplicativo utiliza a **API de Geolocalização** nativa do navegador combinada com um **Compasso Interativo via HTML5 Canvas** e animações fluidas para exibir suas coordenadas geográficas de forma altamente visual e moderna.

| Funcionalidade | O que faz / Como funciona |
| :--- | :--- |
| 🎯 **Precisão em Tempo Real** | Captura latitude, longitude, altitude, velocidade e margem de erro instantaneamente. |
| 🗺️ **Mapa Dark Imersivo** | Interface com Leaflet (CartoDB Dark Matter) otimizada para navegação noturna fluida. |
| 🧭 **Bússola Dinâmica** | Compasso renderizado em Canvas 2D com interpolação e suavização de rotação por frame. |
| 📍 **Pontos de Interesse** | Simulação e filtros em tempo real de Postos, Restaurantes, Hospitais, Farmácias e Mercados. |
| 📱 **Design Glassmorphism** | Layout responsivo em vidro fosco com efeitos de borda iluminada por hover de alta fidelidade. |

<br/>

<!-- BLUE-GREEN ANIMATED DIVIDER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=25&section=footer" width="100%">

<!-- COMO RODAR -->
<div align="center">

### &nbsp; 🚀 Como rodar

</div>

#### 1. Prepare o projeto
* **Se você baixou o ZIP (não via gitclone):**
  Extraia o arquivo `GPS-PDM-main.zip` e abra o terminal diretamente na pasta do projeto extraído.
* **Se você clonou via Git:**
  ```bash
  git clone https://github.com/notcostaip/GPS-PDM.git
  cd GPS-PDM
  ```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

#### 4. Abra no navegador
Abra [http://localhost:3000](http://localhost:3000) no seu navegador e **autorize a permissão de geolocalização** para ver o mapa e a bússola carregarem com suas coordenadas exatas!

<br/>

<!-- BLUE-GREEN ANIMATED DIVIDER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=25&section=footer" width="100%">

<!-- PAINÉIS E CATEGORIAS -->
<div align="center">

### &nbsp; 🎮 Painéis & Categorias

</div>

<br/>

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h4 align="center">🟢 Indicadores de Sinal</h4>
      <table width="100%">
        <thead>
          <tr>
            <th>Status</th>
            <th>Significado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🟢 <strong>Ativo</strong></td>
            <td>GPS conectado com precisão ideal.</td>
          </tr>
          <tr>
            <td>🟡 <strong>Buscando</strong></td>
            <td>Aguardando sinal ou permissão do navegador.</td>
          </tr>
          <tr>
            <td>🔴 <strong>Erro</strong></td>
            <td>Acesso negado ou sinal indisponível.</td>
          </tr>
        </tbody>
      </table>
    </td>
    <td width="50%" valign="top">
      <h4 align="center">📍 Filtros de Descoberta</h4>
      <table width="100%">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>⛽ <strong>Postos</strong></td>
            <td>Simula postos de gasolina ao redor.</td>
          </tr>
          <tr>
            <td>🍔 <strong>Restaurantes</strong></td>
            <td>Simula opções de gastronomia próximas.</td>
          </tr>
          <tr>
            <td>🏥 <strong>Hospitais</strong></td>
            <td>Simula hospitais e clínicas médicas.</td>
          </tr>
          <tr>
            <td>💊 <strong>Farmácias</strong></td>
            <td>Simula farmácias abertas no mapa.</td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</table>

<br/>

<!-- BLUE-GREEN ANIMATED DIVIDER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=25&section=footer" width="100%">

<!-- TECNOLOGIAS -->
<div align="center">

### &nbsp; 🛠️ Tecnologias

<br/>

<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,threejs,tailwind&theme=dark" alt="Tecnologias" />
</a>

<br/><br/>

</div>

* **Next.js 16 (App Router)** — Framework React robusto e otimizado.
* **React 19** — Renderização de componentes declarativos reativos.
* **TypeScript** — Código robusto, escalável e tipado estaticamente.
* **Leaflet & React Leaflet** — Biblioteca open-source leve para mapas interativos.
* **Three.js & React Three Fiber** — Gráficos 3D interativos e acelerados por hardware.
* **Framer Motion (Motion)** — Animações e transições de interface ultra fluidas.
* **HTML5 Canvas API** — Renderização de bússola dinâmica com suavização vetorial.

<br/>

<!-- BLUE-GREEN ANIMATED DIVIDER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=25&section=footer" width="100%">

<!-- ESTRUTURA DO PROJETO -->
<div align="center">

### &nbsp; 📁 Estrutura do Projeto

</div>

```bash
GPS-PDM/
├── src/
│   ├── app/
│   │   ├── globals.css      ← Estilos globais e variáveis de design
│   │   ├── layout.tsx       ← Configurações estruturais e fontes
│   │   └── page.tsx         ← Ponto de entrada do app (Splash vs Dashboard)
│   ├── components/
│   │   ├── CompassHeading.tsx ← Bússola interativa via HTML5 Canvas
│   │   ├── CoordinateDisplay.tsx ← Exibição e cópia de coordenadas
│   │   ├── Dashboard.tsx    ← Painel principal de controle e POIs
│   │   ├── GlassCard.tsx    ← Cartão com blur e bordas iluminadas
│   │   ├── LeafletMap.tsx   ← Integração do mapa Leaflet com temas
│   │   ├── MapWrapper.tsx   ← Carregador dinâmico de mapa client-side
│   │   ├── MetricsBar.tsx   ← Métricas adicionais de GPS
│   │   ├── SimpleSplash.tsx ← Tela de abertura com micro-animação
│   │   └── StatusIndicator.tsx ← Indicador reativo de sinal do GPS
│   └── hooks/
│       └── useGeolocation.ts ← Hook de gerenciamento da Geolocalização
├── public/                  ← Ícones e marcadores estáticos
├── tsconfig.json            ← Configurações de TypeScript
├── package.json             ← Dependências e scripts do projeto
└── README.md                ← Este arquivo
```

<br/>

<!-- BLUE-GREEN ANIMATED DIVIDER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=25&section=footer" width="100%">

<!-- FOOTER AND CREDITS -->
<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:2563eb,100:30D158&height=120&section=footer" />

<br/>

**Created by [Costa](https://github.com/notcostaip)**

</div>
