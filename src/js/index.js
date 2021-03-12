import * as $ from 'jquery'
import '../styles/styles.scss'


// ============= BURGER ================
let menu = $('.burger-menu');
let burgerButton = $('.burger-menu__button');
let list = $('.burger-menu__list');

burgerButton.on('click', () => toggleMenu());

list.on('click', () => toggleMenu());

function toggleMenu() {
    menu.toggleClass('burger-active');

    if (menu.hasClass('burger-active')) {
        $('body').css('overflow', 'hidden');
    } else {
        $('body').css('overflow', 'visible');
    }
}
