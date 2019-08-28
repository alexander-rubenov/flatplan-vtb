(() => {

  function lazyloadOnLoadPage() {
    const lazyPictures = [].slice.call(document.querySelectorAll("picture.lazy"));

    lazyPictures.forEach((entry) => {
      let lazyPicture = entry;
      let lazyWebpImage = lazyPicture.querySelector('[type="image/webp"]');
      let lazyImage = lazyPicture.querySelector('img');

      lazyWebpImage.srcset = lazyWebpImage.dataset.src;
      lazyImage.src = lazyImage.dataset.src;

      lazyPicture.setAttribute('data-picture', 'opacity-1');
      lazyPicture.classList.remove("lazy");
    });
  }

  document.addEventListener('DOMContentLoaded', lazyloadOnLoadPage);

})();
