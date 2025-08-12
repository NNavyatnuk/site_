// плавне появлення хедеру
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.crumbs_h');
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 100) {
            header.classList.add('show');
        }
        else  {
            header.classList.remove('show');
        }
    });
});

// Зміна мови
document.addEventListener('DOMContentLoaded', () => {
  const lang = document.querySelector('.language');
  if (!lang) return;

  const current = lang.querySelector('.current');
  const list = lang.querySelector('.lang-list');

  // Клік по поточній мові відкриває/закриває (корисно для мобайлу)
  current.addEventListener('click', (e) => {
    lang.classList.toggle('open');
  });

  // Обробка кліку по пункту мови
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const newLang = li.dataset.lang || li.textContent.trim().toLowerCase();
    // показуємо вибране в блоці
    current.textContent = li.textContent.trim().toUpperCase();
    lang.classList.remove('open');
  });

  // Закрити при кліку поза меню
  document.addEventListener('click', (e) => {
    if (!lang.contains(e.target)) lang.classList.remove('open');
  });
});



















