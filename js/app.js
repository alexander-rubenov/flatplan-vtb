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

let peremennaya = false;

function swipe(event) {
    peremennaya = false;
    swiper.addEventListener('mouseup', swipeMouseMoveOff);

    if (peremennaya) return;

    let firstCursorPosition = event.pageX;

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

        if (newCursorPosition < initialCursorPosition) wayToWhichSwipeIsMade = 'left';
        else if (newCursorPosition > initialCursorPosition) wayToWhichSwipeIsMade = 'right';
        else if (newCursorPosition = initialCursorPosition) wayToWhichSwipeIsMade = wayToWhichSwipeIsMade;
        
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

    function swipeMouseMoveOff(event) {
        swiper.removeEventListener('mousemove', swipeMouseMoveOn);
        // peremennaya = true;

        isFastSwipe = (summSwipeDistance >= 100) ? true : false;
        if (!isFastSwipe) return;
        
        let additionalSwipeDistance = (summSwipeDistance / 2.5);


        let lastCursorPosition = event.pageX;
        wayToWhichSwipeIsMade = (lastCursorPosition < firstCursorPosition) ? 'left' : 'right';

        console.log(`lastCursorPosition ${lastCursorPosition}`);
        console.log(`firstCursorPosition ${firstCursorPosition}`);


        swipeListMarginLeft = parseInt(swiperList.style.marginLeft);

        switch(wayToWhichSwipeIsMade) {
            case 'left':

                if (-swipeListMarginLeft >= swiperListWidth) return;
                
                additionalSwipeDistance = (additionalSwipeDistance > (swiperListWidth + swipeListMarginLeft)) ? (swiperListWidth - -swipeListMarginLeft) : additionalSwipeDistance;

                swiperList.style.transition = 'all 0.25s';
                swiperList.style.marginLeft = `${swipeListMarginLeft - additionalSwipeDistance}px`;
                break;

            case 'right':
                
                if (swipeListMarginLeft >= 0 ) return;
                swiperList.style.transition = 'all 0.25s';
                swiperList.style.marginLeft = `${swipeListMarginLeft + additionalSwipeDistance}px`;
        }

        setTimeout(() => {
            swiperList.style.transition = 'all 0s';
        }, 250);
        
        swiper.removeEventListener('mouseup', swipeMouseMoveOff);

    }


}

swiper.addEventListener('mousedown', swipe);
