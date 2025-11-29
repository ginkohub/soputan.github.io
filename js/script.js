let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    const updateThemeButton = () => {
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Aktifkan Mode Terang');
        } else {
            themeIcon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Aktifkan Mode Gelap');
        }
    };

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }
    updateThemeButton();

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = '';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
        updateThemeButton();
    });

    if (galleryContainer) {
        fetch('gallery.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.classList.add('gallery-item');

                    galleryItem.innerHTML = `
                        <div class="gallery-item-image-container">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="gallery-item-overlay">
                                <h3>${item.title}</h3>
                            </div>
                        </div>
                        <p>${item.description}</p>
                    `;
                    galleryContainer.appendChild(galleryItem);
                });
            })
            .catch(error => console.error('Gagal memuat data galeri:', error));
    }
});
