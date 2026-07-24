// ==== Contact configuration — edit these values to update all links ====
const CONTACT = {
  whatsapp: "https://wa.me/12981323087?text=Ol%C3%A1%20Mariana%2C%20quero%20agendar%20uma%20consulta",
  instagram: "https://instagram.com/anutrimarigomes",
  email: "mailto:marigomes_nutri@outlook.com",
  city: "São José dos Campos · SP — Atendimento online para todo o Brasil",
};

// ==== Testimonials data ====
const TESTIMONIALS = [
  { name: "Camila R.", role: "Emagrecimento — 14kg", text: "A Mari mudou minha relação com a comida. Não sinto mais culpa, e os quilos foram embora naturalmente." },
  { name: "Rafael M.", role: "Hipertrofia", text: "Ganhei 6kg de massa magra em 5 meses. O plano é prático e realmente cabe na minha rotina de treinos." },
  { name: "Juliana T.", role: "Pós-bariátrica", text: "Me sinto segura em cada fase. A Mariana explica tudo com paciência e ajusta o que precisa." },
  { name: "Bruno L.", role: "Usuário de GLP-1", text: "Fazer o tratamento com acompanhamento nutricional foi divisor de águas. Muito mais qualidade de vida." },
  { name: "Fernanda A.", role: "Reeducação alimentar", text: "Aprendi a comer de verdade. Sem restrição sofrida, sem drama — só escolhas melhores todo dia." },
];

// ==== Wire up contact links ====
function applyContactLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((el) => { el.href = CONTACT.whatsapp; });
  document.querySelectorAll("[data-instagram]").forEach((el) => { el.href = CONTACT.instagram; });
  document.querySelectorAll("[data-email]").forEach((el) => { el.href = CONTACT.email; });
  document.querySelectorAll("[data-phone]").forEach((el) => { el.textContent = CONTACT.phone; });
  document.querySelectorAll("[data-city]").forEach((el) => { el.textContent = CONTACT.city; });
}

// ==== Header scroll state ====
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  const fabTop = document.getElementById("fab-top");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    fabTop.classList.toggle("visible", window.scrollY > 500);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  fabTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ==== Anchor navigation with offset for fixed header ====
function initAnchorNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    link.addEventListener("click", (event) => {
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const header = document.getElementById("site-header");
      const offset = (header ? header.offsetHeight : 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      history.replaceState(null, "", href);

      const menu = document.getElementById("nav-mobile");
      if (menu && menu.hidden === false) {
        menu.hidden = true;
        const btn = document.getElementById("menu-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
        const icon = document.getElementById("menu-icon");
        if (icon) icon.setAttribute("data-lucide", "menu");
      }
    });
  });
}

// ==== Mobile menu ====
function initMobileMenu() {
  const btn = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-mobile");
  const icon = document.getElementById("menu-icon");
  let open = false;
  const set = (v) => {
    open = v;
    menu.hidden = !v;
    btn.setAttribute("aria-expanded", v ? "true" : "false");
    icon.className = v ? "lucide lucide-x" : "lucide lucide-menu";
  };
  btn.addEventListener("click", () => set(!open));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
}

// ==== Reveal on scroll ====
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

// ==== Animated counters ====
function initCounters() {
  const nodes = document.querySelectorAll("[data-counter]");
  if (!nodes.length) return;
  const format = (n) => n.toLocaleString("pt-BR");
  const animate = (el) => {
    const to = parseInt(el.dataset.counter, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(to * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(animate);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  nodes.forEach((n) => io.observe(n));
}

// ==== Testimonials carousel ====
function initTestimonials() {
  const track = document.getElementById("testimonials-track");
  const dots = document.getElementById("testimonials-dots");
  if (!track) return;

  // Render slides — duplicated so the desktop 3-per-view can slide forward smoothly
  const renderSlide = (t) => `
    <figure class="testimonial">
      <i class="lucide lucide-quote"></i>
      <blockquote>&ldquo;${t.text}&rdquo;</blockquote>
      <div class="testimonial-meta">
        <div class="testimonial-avatar" aria-hidden="true">${t.name.charAt(0)}</div>
        <figcaption>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </figcaption>
        <div class="testimonial-stars" aria-hidden="true">
          ${"<i class='lucide lucide-star'></i>".repeat(5)}
        </div>
      </div>
    </figure>`;

  const all = [...TESTIMONIALS, ...TESTIMONIALS];
  track.innerHTML = all.map((t) => `<div class="carousel-slide">${renderSlide(t)}</div>`).join("");
  if (window.lucide) window.lucide.createIcons();

  // Dots
  TESTIMONIALS.forEach((_, idx) => {
    const b = document.createElement("button");
    b.className = "carousel-dot" + (idx === 0 ? " active" : "");
    b.setAttribute("aria-label", `Depoimento ${idx + 1}`);
    b.addEventListener("click", () => go(idx));
    dots.appendChild(b);
  });

  let index = 0;
  const perView = () => (window.innerWidth >= 768 ? 3 : 1);
  const update = () => {
    const shift = (index * 100) / perView();
    track.style.transform = `translateX(-${shift}%)`;
    dots.querySelectorAll(".carousel-dot").forEach((d, i) => d.classList.toggle("active", i === index));
  };
  const go = (i) => { index = ((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length; update(); };
  window.addEventListener("resize", update);

  setInterval(() => go(index + 1), 4500);
  update();
}

// ==== FAQ accordion ====
function initFaq() {
  const items = document.querySelectorAll("#faq-list .faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      items.forEach((other) => {
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });
}

// ==== Year in footer ====
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ==== Boot ====
document.addEventListener("DOMContentLoaded", () => {
  applyContactLinks();
  initHeaderScroll();
  initAnchorNavigation();
  initMobileMenu();
  initReveal();
  initCounters();
  initTestimonials();
  initFaq();
  initYear();
  if (window.lucide) window.lucide.createIcons();
});
