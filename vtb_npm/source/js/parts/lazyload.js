(() => {

  // const lazyPictures = [].slice.call(document.querySelectorAll("picture.lazy"));

  // function lazyloadOnIntersection() {
  //   if ("IntersectionObserver" in window) {
  //     let lazyPictureObserver = new IntersectionObserver(function(entries, observer) {
  //       entries.forEach(function(entry) {
  //         if (entry.isIntersecting) {
  //           let lazyPicture = entry.target;
  //           let lazyWebpImage = lazyPicture.querySelector('[type="image/webp"]');
  //           let lazyImage = lazyPicture.querySelector('img');
  //
  //           lazyWebpImage.srcset = lazyWebpImage.dataset.src;
  //           lazyImage.src = lazyImage.dataset.src;
  //
  //           lazyPicture.setAttribute('data-picture', 'opacity-1');
  //           lazyPicture.classList.remove("lazy");
  //           lazyPictureObserver.unobserve(lazyPicture);
  //         }
  //       });
  //     });
  //
  //     lazyPictures.forEach(function(lazyPicture) {
  //       lazyPictureObserver.observe(lazyPicture);
  //     });
  //   }
  // }
  //
  // document.addEventListener("DOMContentLoaded", lazyloadOnIntersection);


  // function lazyloadOnLoadPage() {
  //   let lazyPictureObserver = new IntersectionObserver((entries, observer) => {
  //     entries.forEach(function(entry) {
  //       let lazyPicture = entry.target;
  //       let lazyWebpImage = lazyPicture.querySelector('[type="image/webp"]');
  //       let lazyImage = lazyPicture.querySelector('img');
  //
  //       lazyWebpImage.srcset = lazyWebpImage.dataset.src;
  //       lazyImage.src = lazyImage.dataset.src;
  //
  //       lazyPicture.setAttribute('data-picture', 'opacity-1');
  //       lazyPicture.classList.remove("lazy");
  //       lazyPictureObserver.unobserve(lazyPicture);
  //     });
  //   });
  //
  //   lazyPictures.forEach(function(lazyPicture) {
  //     lazyPictureObserver.observe(lazyPicture);
  //   });
  // }

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
