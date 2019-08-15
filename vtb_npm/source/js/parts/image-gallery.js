(() => {
    let
        imageGallery = document.querySelector('.consultation-with-designer__gallery'),
        mainScreenImage = document.querySelector('.consultation-with-designer__main-image');


    function changeMainScreenImage(event) {
        let target= event.target;

        if (!target.classList.contains('consultation-with-designer__image')) return;

        let
            srcMainScreenImage = mainScreenImage.src.slice(target.src.indexOf('vtb_static/img/consultation-with-designer-')),
            srcImg = target.src.slice(target.src.indexOf('vtb_static/img/consultation-with-designer-'));
        
        mainScreenImage.src = srcImg;
        target.src = srcMainScreenImage;
    }

    imageGallery.addEventListener('click', changeMainScreenImage);
})();
