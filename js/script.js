// --- Sticky Header Logic ---
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah
        header.classList.add('header-hidden');
    } else {
        // Scroll ke atas
        header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// --- Dynamic Gallery Logic & Theme Switching ---
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Theme switcher logic
    const updateThemeButton = () => {
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '🌙'; // Moon icon for dark mode
            themeToggle.setAttribute('aria-label', 'Aktifkan Mode Terang');
        } else {
            themeIcon.textContent = '☀️'; // Sun icon for light mode
            themeToggle.setAttribute('aria-label', 'Aktifkan Mode Gelap');
        }
    };

    // Apply saved theme on page load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }
    updateThemeButton(); // Initial update of button icon and aria-label

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = '';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
        updateThemeButton(); // Update icon and aria-label after toggle
    });

    // Dynamic gallery logic
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