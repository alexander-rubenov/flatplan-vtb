(() => {

    const startEvent = touchDevice() ? 'touchstart': 'mousedown';
    const endEvent = touchDevice() ? 'touchend': 'mouseup';
    const moveEvent = touchDevice() ? 'touchmove': 'mousemove';

    console.log(startEvent);

    function touchDevice() {
        const deviceWidth = document.documentElement.clientWidth;
        return (deviceWidth < 1024) ? true : false;
    }

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
        console.log('зашел в Swipe');

        swiper.addEventListener('mouseleave', switchOffSwiper);
        console.log('прошел дальше');
        function switchOffSwiper() {
            swiper.removeEventListener(`${moveEvent}`, swipeMouseMoveOn);
        }

        
        swiper.addEventListener(`${endEvent}`, swipeMouseMoveOff); // <--- попробуй сюда вставить last cursor pos

        let
            firstCursorPosition = touchDevice() ? event.touches[0].pageX : event.pageX,
            initialCursorPosition = touchDevice() ? event.touches[0].pageX : event.pageX,
            summSwipeDistance = 0,
            wayToWhichSwipeIsMade,
            swipeListMarginLeft,
            isFastSwipe = false;


        let lastCursorPosition;

        swiper.addEventListener(`${moveEvent}`, swipeMouseMoveOn);
        console.log('дальше');
        function swipeMouseMoveOn(event) {
            console.log('зашел в moveOn');

            let
                newCursorPosition = touchDevice() ? event.touches[0].pageX : event.pageX,
                // test = event.touches[0].pageX,
                swipeDistance = Math.abs(initialCursorPosition - newCursorPosition);

            // console.log(newCursorPosition);
            // console.log(test);

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
            lastCursorPosition = touchDevice() ? event.touches[0].pageX : event.pageX;
        }

        function swipeMouseMoveOff(event) {
            swiper.removeEventListener(`${moveEvent}`, swipeMouseMoveOn);
            
            let swipeSpeed = touchDevice() ? 1.2 : 1.5;

            isFastSwipe = (summSwipeDistance >= 100) ? true : false;

            if (touchDevice()) {
                swipeSpeed = (summSwipeDistance >= 200) ? 0.3 : swipeSpeed;
            }

            if (!isFastSwipe) return;

            summSwipeDistance = (summSwipeDistance > (swiperListWidth - swiperWidth)) ? (swiperListWidth - swiperWidth) : summSwipeDistance;

            // let swipeSpeed = touchDevice() ? 0.75 : 1.5;
            let additionalSwipeDistance = (summSwipeDistance / swipeSpeed); // <---- change swipe speed, for example: (summSwipeDistance / 2.5)


            // let lastCursorPosition = touchDevice() ? event.touches[0].pageX : event.pageX;
            wayToWhichSwipeIsMade = (lastCursorPosition < firstCursorPosition) ? 'left' : 'right';

            swipeListMarginLeft = parseInt(swiperList.style.marginLeft);

            switch(wayToWhichSwipeIsMade) {
                case 'left':

                    if (-swipeListMarginLeft >= (swiperListWidth - swiperWidth)) return;
                    
                    additionalSwipeDistance = (additionalSwipeDistance > ((swiperListWidth - swiperWidth) + swipeListMarginLeft)) ? ((swiperListWidth - swiperWidth) + swipeListMarginLeft) : additionalSwipeDistance;

                    swiperList.style.transition = touchDevice() ? 'all 0.15s' : 'all 0.35s';
                    swiperList.style.marginLeft = `${swipeListMarginLeft - additionalSwipeDistance}px`;
                    break;

                case 'right':
                    
                    if (swipeListMarginLeft >= 0 ) return;

                    additionalSwipeDistance = (additionalSwipeDistance > -swipeListMarginLeft) ? -swipeListMarginLeft : additionalSwipeDistance;

                    swiperList.style.transition = touchDevice() ? 'all 0.15s' : 'all 0.35s';
                    swiperList.style.marginLeft = `${swipeListMarginLeft + additionalSwipeDistance}px`;
            }

            setTimeout(() => {
                swiperList.style.transition = 'all 0s';
            }, 250);
            
            swiper.removeEventListener(`${endEvent}`, swipeMouseMoveOff);
        }
    }

    

    swiper.addEventListener(`${startEvent}`, swipe);
})();