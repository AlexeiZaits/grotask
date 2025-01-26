import {Modal} from "./modal"
const burgerIcon = document.querySelector('.header__burger');
const closeIcon = document.querySelector('.header__close');

export function handleToggleMenu(){
    const menuButton = document.querySelector('.header__button');
    
    menuButton.addEventListener('click', handleOpenMenu);
    
}

function handleOpenMenu(){
    if (menu.isOpen) {
        menu.close()
    } else {
        menu.open()
    }
}

function handleToggle(){
    if (menu.isOpen) {
        burgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        burgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

const menu = new Modal({
    content: `<section class="menu">
        <h3 class="H3">Меню</h3>
        <hr class="menu__divider">
        <nav class="menu__nav">
            <a href="#team" class="tab primary close__modal">
                <span class="T3 menu__text">Первый экран</span>
            </a>
            <a href="#features" class="tab primary close__modal">
                <span class="T3 menu__text">Слайдер</span>
            </a>
            <a href="#answers" class="tab primary close__modal">
                <span class="T3 menu__text">Интересные ответы</span>
            </a>
            <a href="#challenge" class="tab primary close__modal">
                <span class="T3 menu__text">Форма обратной связи</span>
            </a>
        </nav>
    </section>`,
    className: "menu",
    whereAdd: ".header__wrapper",
    outsideContains: "header__main",
    handleToggle: handleToggle,
    
})