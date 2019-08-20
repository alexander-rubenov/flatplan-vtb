(() => {
    document.addEventListener("DOMContentLoaded", function() {
    var mainBlocks = [].slice.call(document.querySelectorAll(".smooth-display-block"));
  
    if ("IntersectionObserver" in window) {
      let mainBlockObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let mainBlock = entry.target;

            mainBlock.setAttribute("data-smooth-display-block", "active");
            mainBlockObserver.unobserve(mainBlock);
          }
        });
      });
  
      mainBlocks.forEach(function(mainBlock) {
        mainBlockObserver.observe(mainBlock);
      });
    }
  });
  })();