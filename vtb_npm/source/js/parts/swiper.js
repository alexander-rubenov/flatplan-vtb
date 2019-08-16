(() => {
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
})();