// ---- Плавна поява хедера ----
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.crumbs_h');
  if (!header) return;
  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 100) header.classList.add('show');
    else header.classList.remove('show');
  });
});

// ---- Меню вибору мови (відкриття/закриття) ----
document.addEventListener('DOMContentLoaded', () => {
  const lang = document.querySelector('.language');
  if (!lang) return;

  const current = lang.querySelector('.current');
  const list = lang.querySelector('.lang-list');

  current.addEventListener('click', () => {
    lang.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!lang.contains(e.target)) lang.classList.remove('open');
  });
});

// ---- Переклад через JSON ----
document.addEventListener("DOMContentLoaded", function () {
  const TRANSLATIONS_URL = window.TRANSLATIONS_URL || "/static/translations.json";
  const FALLBACK_LANG = "en";
  const stored = localStorage.getItem("lang");
  const currentLang = stored === "uk" || stored === "en" ? stored : FALLBACK_LANG;

  function applyLanguageLabel(langCode) {
    const cur = document.querySelector(".language .current");
    if (!cur) return;
    cur.textContent = (langCode === "uk" ? "UA" : "EN");
  }

  function loadTranslations(lang) {
    fetch(TRANSLATIONS_URL)
      .then(res => res.json())
      .then(data => {
        const dict = data[lang] || data[FALLBACK_LANG] || {};
        // текст
        document.querySelectorAll("[data-key]").forEach(el => {
          const key = el.getAttribute("data-key");
          if (dict[key]) el.textContent = dict[key];
        });
        // alt
        document.querySelectorAll("[data-key-alt]").forEach(el => {
          const key = el.getAttribute("data-key-alt");
          if (dict[key]) el.setAttribute("alt", dict[key]);
        });
        // title
        document.querySelectorAll("[data-key-title]").forEach(el => {
          const key = el.getAttribute("data-key-title");
          if (dict[key]) el.setAttribute("title", dict[key]);
        });

        localStorage.setItem("lang", lang);
        applyLanguageLabel(lang);
      })
      .catch(() => {
        // На випадок помилки – просто виставити лейбл
        applyLanguageLabel(lang);
      });
  }

  // Клік по пункту мови → завантажити переклад
  document.querySelectorAll(".lang-list li").forEach(li => {
    li.addEventListener("click", () => {
      const lang = li.dataset.lang; // uk / en
      loadTranslations(lang);
      document.querySelector(".language")?.classList.remove("open");
    });
  });

  // Початкове завантаження
  loadTranslations(currentLang);
});
