document.addEventListener("DOMContentLoaded", function () {
    // Знаходимо поле username за name
    const input = document.querySelector('input[name="username"]');
    if (!input) return; // Якщо такого поля немає — виходимо

    // Додаємо контейнер для підказок після інпуту
    const suggestionsList = document.createElement("ul");
    suggestionsList.id = "suggestions";
    suggestionsList.className = "suggestions-list";

    // Обгортаємо input у позиційний контейнер
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    wrapper.appendChild(suggestionsList);

    // ТЕСТОВИЙ масив (можна замінити на дані з сервера)
    const suggestions = ["admin", "uygugih", "hyg", "sDsdsvdzxcv", "1oofoo1"];

    input.addEventListener("input", function () {
        const value = this.value.toLowerCase();
        suggestionsList.innerHTML = "";

        if (!value) return;

        const filtered = suggestions.filter(item =>
            item.toLowerCase().includes(value)
        );

        filtered.forEach(item => {
            const li = document.createElement("li");
            const regex = new RegExp(`(${value})`, "i");
            li.innerHTML = item.replace(regex, `<span class="highlight">$1</span>`);
            li.addEventListener("click", function () {
                input.value = item;
                suggestionsList.innerHTML = "";
            });
            suggestionsList.appendChild(li);
        });
    });

    document.addEventListener("click", function (e) {
        if (e.target !== input) {
            suggestionsList.innerHTML = "";
        }
    });
});
