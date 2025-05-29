document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Сообщаем Telegram, что WebApp готово
    tg.expand(); // Раскрываем WebApp на максимальную высоту

    // Пример данных о товарах
    // В реальном приложении эти данные должны приходить с сервера
    const productsData = [
        {
            id: 1,
            category: "Принтеры",
            name: "Лазерный принтер HP LaserJet Pro M404dn",
            description: "Надежный монохромный принтер для малого и среднего офиса. Автоматическая двусторонняя печать.",
            price: "15 500 ₽",
            imageUrl: "WhatsApp_Image_2025-05-29_at_16.09.30__1_-removebg-preview.png"
        },
        {
            id: 2,
            category: "Принтеры",
            name: "МФУ Canon PIXMA G3420",
            description: "Цветное струйное МФУ с СНПЧ, Wi-Fi. Печать, сканирование, копирование.",
            price: "12 800 ₽",
            imageUrl: "https://via.placeholder.com/400x300/5856D6/FFFFFF?text=Принтер+2"
        },
        {
            id: 3,
            category: "Системные блоки",
            name: "Игровой ПК Alpha Gamer X",
            description: "Мощный игровой компьютер на базе Intel Core i7 и RTX 3060. SSD 1TB.",
            price: "95 000 ₽",
            imageUrl: "https://via.placeholder.com/400x300/34C759/FFFFFF?text=ПК+1"
        },
        {
            id: 4,
            category: "Системные блоки",
            name: "Офисный ПК Office Lite",
            description: "Компактный и тихий системный блок для офисных задач. Intel Core i3, SSD 256GB.",
            price: "28 000 ₽",
            imageUrl: "https://via.placeholder.com/400x300/FF9500/FFFFFF?text=ПК+2"
        },
        {
            id: 5,
            category: "Моноблоки",
            name: "Моноблок Apple iMac 27\"",
            description: "Стильный и производительный моноблок с дисплеем Retina 5K. Идеален для творчества.",
            price: "180 000 ₽",
            imageUrl: "https://via.placeholder.com/400x300/AF52DE/FFFFFF?text=Моноблок+1"
        },
        {
            id: 6,
            category: "Моноблоки",
            name: "Моноблок Lenovo IdeaCentre AIO 3",
            description: "Доступный моноблок для дома и учебы. Экран 23.8 дюйма Full HD.",
            price: "45 000 ₽",
            imageUrl: "https://via.placeholder.com/400x300/FF3B30/FFFFFF?text=Моноблок+2"
        },
        {
            id: 7,
            category: "Ноутбуки",
            name: "Ультрабук ZenBook Pro",
            description: "Тонкий и легкий ноутбук с высокой производительностью и OLED дисплеем.",
            price: "110 000 ₽",
            imageUrl: "https://via.placeholder.com/400x300/00C7BE/FFFFFF?text=Ноутбук+1"
        }
    ];

    const productsArea = document.getElementById('products-area');

    // Группируем товары по категориям
    const productsByCategory = productsData.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // Рендерим товары
    for (const category in productsByCategory) {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('product-section');

        const sectionTitle = document.createElement('h3');
        sectionTitle.classList.add('section-title');
        sectionTitle.textContent = category;
        sectionDiv.appendChild(sectionTitle);

        const productGridDiv = document.createElement('div');
        productGridDiv.classList.add('product-grid');

        productsByCategory[category].forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                </div>
                <h4 class="product-name">${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price}</p>
            `;
            productGridDiv.appendChild(card);
        });

        sectionDiv.appendChild(productGridDiv);
        productsArea.appendChild(sectionDiv);
    }

    // Логика для кнопки "Наверх"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 200; // Порог прокрутки для показа кнопки

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Пример взаимодействия с Telegram API (можно добавить больше)
    // Например, изменение цвета шапки в зависимости от темы Telegram
    if (tg.colorScheme === 'dark') {
        document.body.style.setProperty('--primary-color', '#0A84FF'); // iOS Dark Mode Blue
        document.body.style.setProperty('--text-color', '#ffffff');
        document.body.style.setProperty('--secondary-text-color', '#8e8e93'); // Такой же
        document.body.style.setProperty('--background-color', '#000000');
        document.body.style.setProperty('--card-background', '#1c1c1e');
        document.body.style.setProperty('--border-color', '#38383a');
    }
    // Вы можете установить цвет шапки Web App:
    // tg.setHeaderColor('#custom_color'); // например, tg.setHeaderColor(tg.themeParams.bg_color || '#ffffff');
});