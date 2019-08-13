'use strict';

let
    clientHeight = document.documentElement.clientHeight,
    clientWidth = document.documentElement.clientWidth,
    pageHeader = document.querySelector('.page-header');

if (clientWidth <= 536) {
    pageHeader.style.height = clientHeight;
}



let imageGallery = document.querySelector('.consultation-with-designer__gallery');
let mainScreenImage = document.querySelector('.consultation-with-designer__main-section');


function changeMainScreenImage(event) {
    let target= event.target;

    if (!target.classList.contains('consultation-with-designer__image')) return;

    let
        srcMainScreenImage = getComputedStyle(mainScreenImage).backgroundImage.slice(getComputedStyle(mainScreenImage).backgroundImage.indexOf('img/consultation-with-designer-'), -2),
        srcImg = target.src.slice(target.src.indexOf('img/consultation-with-designer-'));
    
    mainScreenImage.style.backgroundImage = `url('${srcImg}')`;
    target.src = srcMainScreenImage;
}

imageGallery.addEventListener('click', changeMainScreenImage);