'use strict';

let
    clientHeight = document.documentElement.clientHeight,
    clientWidth = document.documentElement.clientWidth,
    pageHeader = document.querySelector('.page-header');

// if (clientWidth <= 536) {
//     pageHeader.style.height = clientHeight;
// }


let
    imageGallery = document.querySelector('.consultation-with-designer__gallery'),
    mainScreenImage = document.querySelector('.consultation-with-designer__main-section');


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



let
    swiper = document.querySelector('.other-services__swiper'),
    swiperList = document.querySelector('.other-services__list'),
    swiperWidth = parseInt(getComputedStyle(swiper).width),
    swiperListWidth = parseInt(getComputedStyle(swiperList).width);


window.onload = () => {
    let heightOfSwiper = getComputedStyle(swiper).height;
    swiper.style.height = `${parseInt(heightOfSwiper) + 40}px`;
}


swiperList.style.marginLeft = '0px';


function swipe(event) {

    swiper.addEventListener('mouseleave', switchOffSwiper);

    function switchOffSwiper() {
        swiper.removeEventListener('mousemove', swipeMouseMoveOn);
    }

    swiper.addEventListener('mouseup', swipeMouseMoveOff);

    let
        firstCursorPosition = event.pageX,
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

        if (newCursorPosition < initialCursorPosition) wayToWhichSwipeIsMade = 'left';
        else if (newCursorPosition > initialCursorPosition) wayToWhichSwipeIsMade = 'right';
        else if (newCursorPosition = initialCursorPosition) wayToWhichSwipeIsMade = wayToWhichSwipeIsMade;
        
        switch(wayToWhichSwipeIsMade) {
            case 'left':

                if (-swipeListMarginLeft >= (swiperListWidth - swiperWidth)) return;
                swiperList.style.marginLeft = `${swipeListMarginLeft - swipeDistance}px`;
                break;

            case 'right':
                
                if (swipeListMarginLeft >= 0 ) return;
                swiperList.style.marginLeft = `${swipeListMarginLeft + swipeDistance}px`;
        }

        summSwipeDistance += swipeDistance;
        initialCursorPosition = newCursorPosition;
    }

    function swipeMouseMoveOff(event) {
        swiper.removeEventListener('mousemove', swipeMouseMoveOn);

        isFastSwipe = (summSwipeDistance >= 100) ? true : false;
        if (!isFastSwipe) return;

        summSwipeDistance = (summSwipeDistance > (swiperListWidth - swiperWidth)) ? (swiperListWidth - swiperWidth) : summSwipeDistance;
        
        let additionalSwipeDistance = (summSwipeDistance / 1.5); // <---- change swipe speed, for example: (summSwipeDistance / 2.5)


        let lastCursorPosition = event.pageX;
        wayToWhichSwipeIsMade = (lastCursorPosition < firstCursorPosition) ? 'left' : 'right';

        swipeListMarginLeft = parseInt(swiperList.style.marginLeft);

        switch(wayToWhichSwipeIsMade) {
            case 'left':

                if (-swipeListMarginLeft >= (swiperListWidth - swiperWidth)) return;
                
                additionalSwipeDistance = (additionalSwipeDistance > ((swiperListWidth - swiperWidth) + swipeListMarginLeft)) ? ((swiperListWidth - swiperWidth) + swipeListMarginLeft) : additionalSwipeDistance;

                swiperList.style.transition = 'all 0.35s';
                swiperList.style.marginLeft = `${swipeListMarginLeft - additionalSwipeDistance}px`;
                break;

            case 'right':
                
                if (swipeListMarginLeft >= 0 ) return;

                additionalSwipeDistance = (additionalSwipeDistance > -swipeListMarginLeft) ? -swipeListMarginLeft : additionalSwipeDistance;

                swiperList.style.transition = 'all 0.35s';
                swiperList.style.marginLeft = `${swipeListMarginLeft + additionalSwipeDistance}px`;
        }

        setTimeout(() => {
            swiperList.style.transition = 'all 0s';
        }, 250);
        
        swiper.removeEventListener('mouseup', swipeMouseMoveOff);
    }
}


swiper.addEventListener('mousedown', swipe);