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





let swiper = document.querySelector('.other-services__swiper');
let swiperList = document.querySelector('.other-services__list');
let swiperListWidth = parseInt(getComputedStyle(swiperList).width);


window.onload = () => {
    let heightOfSwiper  = getComputedStyle(swiper).height;
    swiper.style.height = `${parseInt(heightOfSwiper) + 40}px`;
}


swiperList.style.marginLeft = '0px';

function swipe(event) {

    let
        initialCursorPosition = event.pageX,
        summSwipeDistance = 0,
        wayToWhichSwipeIsMade,
        swipeListMarginLeft,
        isFastSwipe = false;

    swiper.addEventListener('mousemove', swipeMouseMoveOn);

    function swipeMouseMoveOn(event) {
        let
            newCursorPosition = event.pageX,
            swipeDistance = Math.abs(initialCursorPosition - newCursorPosition);

        swipeListMarginLeft = parseInt(swiperList.style.marginLeft);
        wayToWhichSwipeIsMade = (newCursorPosition < initialCursorPosition) ? 'left' : 'right';
        
        switch(wayToWhichSwipeIsMade) {
            case 'left':

                if (-swipeListMarginLeft >= swiperListWidth) return;
                swiperList.style.marginLeft = `${swipeListMarginLeft - swipeDistance}px`;
                break;

            case 'right':
                
                if (swipeListMarginLeft >= 0 ) return;
                swiperList.style.marginLeft = `${swipeListMarginLeft + swipeDistance}px`;
        }

        summSwipeDistance += swipeDistance;
        initialCursorPosition = newCursorPosition;
    }


    function swipeMouseMoveOff() {
        swiper.removeEventListener('mousemove', swipeMouseMoveOn);

        isFastSwipe = (summSwipeDistance >= 100) ? true : false;
        if (!isFastSwipe) return;

        switch(wayToWhichSwipeIsMade) {
            case 'left':

                if (-swipeListMarginLeft >= swiperListWidth) return;
                swiperList.style.transition = 'all 0.25s';
                swiperList.style.marginLeft = `${swipeListMarginLeft - (summSwipeDistance / 2.5)}px`;
                break;

            case 'right':
                
                if (swipeListMarginLeft >= 0 ) return;
                swiperList.style.transition = 'all 0.25s';
                swiperList.style.marginLeft = `${swipeListMarginLeft + (summSwipeDistance / 2.5)}px`;
        }

        setTimeout(() => {
            swiperList.style.transition = 'all 0s';
        }, 250);
    }

    swiper.addEventListener('mouseup', swipeMouseMoveOff);
}

swiper.addEventListener('mousedown', swipe);
