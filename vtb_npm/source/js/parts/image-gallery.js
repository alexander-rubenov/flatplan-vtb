(() => {
    let
        imageGallery = document.querySelector('.consultation-with-designer__gallery'),
        mainScreenImage = document.querySelector('.consultation-with-designer__main-image');


    function changeMainScreenImage(event) {
        let target= event.target;
        if (!target.classList.contains('consultation-with-designer__image')) return;

        let
            srcMainScreenImage = mainScreenImage.src.slice(target.src.indexOf('vtb_static/img/consultation-with-designer-')),
            srcWebpMainScreenImage = mainScreenImage.previousElementSibling.srcset,
            srcImg = target.src.slice(target.src.indexOf('vtb_static/img/consultation-with-designer-')),
            srcWebpImg = target.previousElementSibling.srcset;

        mainScreenImage.src = srcImg;
        mainScreenImage.previousElementSibling.srcset = srcWebpImg;
        target.src = srcMainScreenImage;
        target.previousElementSibling.srcset = srcWebpMainScreenImage;
    }

    imageGallery.addEventListener('click', changeMainScreenImage);
})();
