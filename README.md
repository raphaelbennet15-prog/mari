# Mariana Gomes — Landing Page Estática

Versão em **HTML + CSS + JavaScript puro** da landing page (sem React, Tailwind ou frameworks). Basta abrir `index.html` em qualquer navegador — ou publicar em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Hostinger, etc.).

## Estrutura

```
mariana-gomes-landpage/
├── index.html      # Marcação da página
├── styles.css      # Estilos (variáveis de tema, layout, responsividade)
├── script.js       # Interações (menu, scroll, contadores, carrossel, FAQ)
├── assets/
│   ├── mariana-hero.jpg
│   └── mariana-about.jpg
└── README.md
```

## Como personalizar

### 1. Links de contato (WhatsApp, Instagram, e-mail, telefone, cidade)

Abra `script.js` e edite o objeto `CONTACT` no topo do arquivo:

```js
const CONTACT = {
  whatsapp: "https://wa.me/55XXXXXXXXXXX?text=...",
  instagram: "https://instagram.com/seu-usuario",
  email: "mailto:seu@email.com",
  phone: "+55 (00) 00000-0000",
  city: "Sua cidade · UF",
};
```

Todos os botões e links do site são atualizados automaticamente.

### 2. Textos

Edite diretamente em `index.html` — cada seção está comentada (Hero, Sobre, Especialidades, etc.).

### 3. Depoimentos

Edite o array `TESTIMONIALS` em `script.js`.

### 4. Cores e tipografia

Edite as variáveis CSS no topo de `styles.css` (bloco `:root`).

### 5. Imagens

Substitua os arquivos em `assets/` mantendo os mesmos nomes, ou altere os `src` no `index.html`.

## Recursos externos

- **Google Fonts** — Fraunces + Inter (via `<link>` no `<head>`)
- **Lucide Icons** — ícones vetoriais via `<i class="lucide lucide-...">` (CDN jsdelivr)

Ambos são carregados de CDN pública e não requerem instalação.

## Publicação

- **Local**: abra `index.html` diretamente no navegador.
- **Netlify / Vercel**: arraste a pasta na dashboard.
- **GitHub Pages**: envie a pasta para um repositório e ative Pages.
- **Hospedagem tradicional (cPanel, FTP)**: envie os arquivos para `public_html/`.

Nenhum build necessário. ✨
