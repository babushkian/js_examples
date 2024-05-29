"use strict";
let btnModal = document.querySelector('.popup_button');
let modalWind = document.querySelector('.modal');
let modalClose= document.querySelector('.window_button');
btnModal.addEventListener('click', ()=>{
    modalWind.style.visibility = 'visible'
});
modalClose.addEventListener('click', ()=>{
    modalWind.style.visibility = 'hidden'
});
