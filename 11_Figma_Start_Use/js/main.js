/* появление background у heder в момент скролинга экрана */
(function() {
    const header = document.querySelector(".header");
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add("header_active")
        } else {
            header.classList.remove("header_active")
        }
    };
}());

/* появление burger heder при нажатии на кнопку бургера */
(function() {
    const burgerItem = document.querySelector(".burger"); // метод который ищет 1-й селектор с указанным классом
    const menu = document.querySelector(".header__nav");
    const menuCloseItem = document.querySelector(".header__nav-close");
    const menuLinks = document.querySelectorAll(".header__link");
    burgerItem.addEventListener("click", () => { // вешаем обработчик события это возможно только с помощью метода addEventListener
        menu.classList.add("header__nav_active"); // класс для добавления передается без точки
    });
    menuCloseItem.addEventListener("click", () => {
        menu.classList.remove("header__nav_active"); // удаляем класс
    });
    if (window.innerWidth < 771) { // закрываем окно header mobile version по нажатию на любую ссылку меню при условии что экран у нас < 771px
        for (let i = 0; i < menuLinks.length; i += 1) {
            menuLinks[i].addEventListener("click", () => {
                menu.classList.remove("header__nav_active");
            });
        }
    }
})();

// Scroll to anchors - плавный скрол по странице при клике на меню
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight; // высота главного меню до проскроленного блока
        // если макет подразумевает стационарный header, 
        // то из JS файла удаляется const headerElHeight = document.querySelector('.header').clientHeight; 
        // а также удаеляется headerElHeight из всего кода 
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight; // также удаеляется headerElHeight из всего кода, если макет подразумевает стационарный header
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) { // функция обработчик скрола - то как анимируется скрол
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){ // функция анимации
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () { // подвешивание обработчика события на ссылки, для того чтобы по клику срабатывал скролинг
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}()); 