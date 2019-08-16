(() => {
  const scrollingLinks = document.querySelectorAll('*[data-scroll-link]');

  const scrollToElement = (evt) => {
    const target = evt.target;
    const scrollTo = document.getElementById(target.dataset.scrollLink);

    if (scrollTo) {
      scrollTo.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  if(Boolean(scrollingLinks)) {
    scrollingLinks.forEach(link => link.addEventListener('click', scrollToElement));
  }
})();