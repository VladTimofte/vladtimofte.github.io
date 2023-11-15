(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 650,
    loop: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
  
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 350,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


const terminalFull = document.getElementById('terminal-custom-icon');
const terminalEmpty = document.getElementById('terminal-empty-icon');

function initDisplayTerminalIcon() {
  if (terminalFull && terminalEmpty) {
setInterval(function(){
  terminalFull.style.display = 'none';
  terminalEmpty.style.display = 'inline-block';
  setTimeout(function() {
    terminalFull.style.display = 'inline-block';
    terminalEmpty.style.display = 'none';
  }, 500);
}, 1000);
  }
}

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

initDisplayTerminalIcon()
loadLocalLanguageOnFirstVisit()

})()

function initLanguage(language) {
  localStorage.setItem('languageSelectedVT', language);
  const treeElementsDomThatNeedsToBeTrasnalted = []

  fetch(`translations/${language}.json`)
      .then((response) => response.json())
      .then((translations) => {
          Object.keys(translations).forEach((key) => {
              treeElementsDomThatNeedsToBeTrasnalted.push({
                key,
                element: document.getElementsByClassName(key)
              })
          });

          for (let i = 0; i < treeElementsDomThatNeedsToBeTrasnalted.length; i++) {
            if (treeElementsDomThatNeedsToBeTrasnalted[i].element.length) {
              if(treeElementsDomThatNeedsToBeTrasnalted[i].element.length > 1) {
                for (let j = 0; j < treeElementsDomThatNeedsToBeTrasnalted[i].element.length; j++){
                  treeElementsDomThatNeedsToBeTrasnalted[i].element[j].textContent = translations[treeElementsDomThatNeedsToBeTrasnalted[i].key]
                }
              } else if (treeElementsDomThatNeedsToBeTrasnalted[i].element.length === 1){
                treeElementsDomThatNeedsToBeTrasnalted[i].element[0].textContent = translations[treeElementsDomThatNeedsToBeTrasnalted[i].key]
              }
            }
          }

      });
}

function loadLocalLanguageOnFirstVisit(){
  const userLanguage = navigator.language.substring(0, 2) || navigator.userLanguage.substing(0, 2) || 'en'
  if (!localStorage.getItem('isNotFirstVisit') && ['en', 'ro', 'gr'].includes(userLanguage)) {
    initLanguage(userLanguage)
    localStorage.setItem('languageSelectedVT', userLanguage);
    localStorage.setItem('isNotFirstVisit', true);
  } else if (localStorage.getItem('languageSelectedVT')) {
    initLanguage(localStorage.getItem('languageSelectedVT'))
  }
}

function updateURL(anchor) {
  window.location.hash = anchor;
}

function displayHiddenTxt(contentString, showMoreString){
  const language = localStorage.getItem('languageSelectedVT') || 'en';
  const hiddenContent = document.querySelectorAll('.'+contentString);
  const showMore = document.querySelectorAll('.'+showMoreString);
  let showMoreTXT;
  let showLessTXT;
  fetch(`translations/${language}.json`)
  .then((response) => response.json())
  .then((translations) => {
    showMoreTXT = translations['showMore'];
    showLessTXT = translations['showLess'];
    for (let i = 0; i < hiddenContent.length; i++) {
      if (hiddenContent[i]?.style?.display === 'none' || hiddenContent[i]?.style?.display === '') {
        hiddenContent[i].style.display = 'block';
        showMore[i].textContent = showLessTXT;
      } else {
        hiddenContent[i].style.display = 'none';
        showMore[i].textContent = showMoreTXT;
      }
    }
  });
}

function copyToClipboard(txt) {
  const language = localStorage.getItem('languageSelectedVT') || 'en';
  let msg = ''
  if (language === 'en') {
    msg = 'Bank account has succesfully copied to clipboard'
  }
  if (language === 'ro') {
    msg = 'Contul bancar (IBAN) a fost copiat cu succes.'
  }
  if (language === 'gr') {
    msg = 'Ο τραπεζικός λογαριασμός αντιγράφηκε με επιτυχία'
  }
  alert(msg)
}

window.onload = loadLocalLanguageOnFirstVisit()