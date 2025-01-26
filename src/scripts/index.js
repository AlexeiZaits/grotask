import {handleMaskForm, handleSandForm} from "./form"
import { handleToggleMenu } from './menu';


const colorElement = document.querySelector(".team__img-3")

const initialProject = () => {
    handleEventsListener('.accordion__button', handleToggleAccordion)
    handleEventListener(".switch__color", handleToggleColor)
    handleToggleMenu();
    handleScrollSlider();
    handleMaskForm();
    handleSandForm();
}


function handleToggleAccordion (element) {
    const currentElement = element.closest(".accordion");
    currentElement.classList.toggle('hidden');
}

function handleToggleColor () {
    colorElement.classList.toggle("reverse")
}

function handleEventListener(className, callback){
    const element = document.querySelector(className)
    element.addEventListener("click", () => callback(element))
}

function handleEventsListener(className, callback){
    const elements = document.querySelectorAll(className)
    
    elements.forEach(element => {
        element.addEventListener("click", () => callback(element))
    })
}

function handleScrollSlider () {
    const slider = document.querySelector('.features__slider');
    const nextButton = document.querySelector('.features__buttons-arrow1');
    const prevButton = document.querySelector('.features__buttons-arrow2');
    let isDown = false; // Флаг, зажата ли мышь
    let startX; // Начальная позиция мыши
    let scrollLeft; // Текущее положение скролла

    slider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft; // Начальная позиция мыши относительно элемента
        scrollLeft = slider.scrollLeft; // Текущее значение прокрутки
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; 
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft; // Текущая позиция мыши
        const walk = (x - startX) * 1.5; // Разница движения (ускорение — умножаем на 1.5)
        slider.scrollLeft = scrollLeft - walk; // Обновляем позицию прокрутки
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        isDown = false;
        slider.classList.remove('active');
    });

    nextButton.addEventListener('click', () => {
        slider.scrollBy({ left: 400, behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
        slider.scrollBy({ left: -400, behavior: 'smooth' });
    });
}

initialProject()
