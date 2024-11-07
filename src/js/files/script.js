// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
import Lenis from 'lenis';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable.js";
import  LocomotiveScroll  from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger, LocomotiveScroll, Draggable);

//========== Lenis-scroll ==============================================================================================================================================
// const lenis = new Lenis({
//     duration: 1.1,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Функция easing для более естественного движения
//     direction: "vertical", // Направление скролла: вертикальное
//     gestureDirection: "vertical", // Направление жестов: вертикальное
//     smooth: true, // Включаем плавный скролл
//     mouseMultiplier: 1, // Уровень чувствительности для мыши
//     smoothTouch: false, // Отключаем плавный скролл для сенсорных экранов
//     touchMultiplier: 2, // Уровень чувствительности для сенсорных экранов
//     infinite: false, // Отключаем бесконечный скролл
//   });
  
  
  
  // Обработчик скролла
//   lenis.on('scroll', () => {
//     // 1. Обновляем ScrollTrigger
//     ScrollTrigger.update();
  
//   });
 
  // Инициализация
  //handleScrollElements();
  
  
  
  // Обновляем ScrollTrigger при изменении размера окна
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
  
//   function raf(time) {
//     const startTime = performance.now();
//     lenis.raf(time); // Запускаем анимацию прокрутки
//     const endTime = performance.now();
//     const elapsedTime = endTime - startTime;
  
//     if (elapsedTime < 16) {
//       requestAnimationFrame(raf);
//     } else {
//       setTimeout(() => {
//         requestAnimationFrame(raf);
//       }, elapsedTime - 16);
//     }
//   }
  
//   requestAnimationFrame(raf); // Инициируем анимацию
  ScrollTrigger.refresh(); // Обновляем ScrollTrigger после инициализации
  
  
function initSmoothScroll(container) {

    scroll = new LocomotiveScroll({
      el: container.querySelector('[data-scroll-container]'),
      smooth: true,
    });

    window.onresize = scroll.update();

    scroll.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.defaults({
      scroller: document.querySelector('[data-scroll-container]'),
    });

    /**
     * Remove Old Locomotive Scrollbar
     */

   // const scrollbar = selectAll('.c-scrollbar');

    // if(scrollbar.length > 1) {
    //   scrollbar[0].remove();
    // }

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener('refresh', () => scroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  } 

  // Запуск функции после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const container = document.body; // Вы можете указать конкретный контейнер, если нужно
  //  initSmoothScroll(container);
    initCheckTouchDevice();
    initHamburgerNav();
    initWindowInnerheight();
    initScrolltriggerNav();
});

/**
* Window Inner Height Check
*/
function initWindowInnerheight() {
    
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    $(document).ready(function(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      $('.btn-hamburger').click(function(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    });
  
}


/**
* Scrolltrigger Scroll Check
*/
function initScrolltriggerNav() {
    
    ScrollTrigger.create({
      start: 'top -30%',
      onUpdate: self => {
        $(".menu").addClass('scrolled');
      },
      onLeaveBack: () => {
        $(".menu").removeClass('scrolled');
      },
    });
  
  }
/**
* Check touch device
*/
function initCheckTouchDevice() {
    
    function isTouchScreendevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;      
    };
    
    if(isTouchScreendevice()){
      $('main').addClass('touch');
      $('main').removeClass('no-touch');
    } else {
      $('main').removeClass('touch');
      $('main').addClass('no-touch');
    }
    $(window).resize(function() {
      if(isTouchScreendevice()){
         $('main').addClass('touch');
         $('main').removeClass('no-touch');
      } else {
         $('main').removeClass('touch');
         $('main').addClass('no-touch');
      }
    });
  
  }
  
  /**
  * Hamburger Nav Open/Close
  */
  function initHamburgerNav() {
      
    // Open/close navigation when clicked .btn-hamburger
  
    $(document).ready(function(){
      $(".menu").click(function(){
        if ($(".menu__body, .menu").hasClass('active')) {
            $(".menu__body, .menu").removeClass('active');
            $("body").removeClass('nav-active');
          //  lenis.start();
        } else {
            $(".menu__body, .menu").addClass('active');
            $("body").addClass('nav-active');
          //  lenis.stop();
        }
      });
      $('.fixed-nav-back').click(function(){
        $(".menu__body, .menu").removeClass('active');
        $("body").removeClass('nav-active');
      //  lenis.start();
      });
    });
    $(document).keydown(function(e){
      if(e.keyCode == 27) {
        if ($('body').hasClass('nav-active')) {
            $(".menu__body, .menu").removeClass('active');
            $("body").removeClass('nav-active');
          //  lenis.start();
        } 
      }
    });
  
  }