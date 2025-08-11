document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.crumbs_h');
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 50) {
            header.classList.add('show');
        } else {
            header.classList.remove('show');
        }
    });
});

