import '../scss/app.scss';

// SLIDER
const sections = gsap.utils.toArray('.sticky-slides .slide');
let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sections.forEach((section) => {
    maxWidth += section.offsetWidth * 1.172;
  });
};
getMaxWidth();
ScrollTrigger.addEventListener('refreshInit', getMaxWidth);

gsap.to(sections, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: 'none',
  scrollTrigger: {
    trigger: '#slideshow-wrap',
    pin: true,
    scrub: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true,
  },
});

sections.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () =>
      'top top-=' +
      (sct.offsetLeft - window.innerWidth / 2) *
        (maxWidth / (maxWidth - window.innerWidth)),
    end: () =>
      '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: { targets: sct, className: 'active' },
  });
});

// Content Animations
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains('gs_reveal_fromLeft')) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains('gs_reveal_fromRight')) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains('gs_reveal_fromUp')) {
    x = 0;
    y = -100;
  } else if (elem.classList.contains('gs_reveal_fromDown')) {
    x = 0;
    y = 100;
  }
  elem.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  elem.style.opacity = '0';
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: 'power.out',
      overwrite: 'auto',
    }
  );
}

// gsap.to('.upContent', {
//   yPercent: -200,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '.pSection',
//     start: 'bottom bottom', // the default values
//     end: 'center center',
//     scrub: true,
//   },
// });

// gsap.to('.leftContent', {
//   xPercent: 100,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '.pSection',
//     start: 'top bottom', // the default values
//     end: 'bottom 75%',
//     scrub: true,
//   },
// });

var uContent = gsap.utils.toArray('.upContent');

uContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'center center',
      scrub: true,
      invalidateOnRefresh: true,
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.to(elem, { yPercent: 100, opacity: 0, duration: 0.5 }).to(
    elem,
    { yPercent: 0, opacity: 1, duration: 0.5 },
    0.5
  );
});

var lContent = gsap.utils.toArray('.leftContent');

lContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'center center',
      scrub: true,
      invalidateOnRefresh: true,
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.to(elem, { xPercent: -25, opacity: 0, duration: 0.5 }).to(
    elem,
    { xPercent: 0, opacity: 1, duration: 0.5 },
    0.5
  );
});

var rContent = gsap.utils.toArray('.rightContent');

rContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'center center',
      scrub: true,
      invalidateOnRefresh: true,
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.to(elem, { xPercent: 25, opacity: 0, duration: 0.5 }).to(
    elem,
    { xPercent: 0, opacity: 1, duration: 0.5 },
    0.5
  );
});

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.gs_reveal').forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      }, // assure that the element is hidden when scrolled into view
    });
  });
});

// Button Animations
gsap.utils.toArray('.btn-arrow.arrow-down').forEach((downArrow) => {
  let hover = gsap.to(downArrow.lastElementChild.firstElementChild, {
    y: '0rem',
    duration: 0.7,
    paused: true,
    ease: 'power1.Out',
  });
  downArrow.addEventListener('mouseenter', () => hover.play());
  downArrow.addEventListener('mouseleave', () => hover.reverse());
});

gsap.utils.toArray('.btn-book').forEach((acrossArrow) => {
  let hover = gsap.to(acrossArrow.lastElementChild.firstElementChild, {
    y: '-10rem',
    x: '10rem',
    duration: 0.7,
    paused: true,
    ease: 'power1.Out',
  });
  acrossArrow.addEventListener('mouseenter', () => hover.play());
  acrossArrow.addEventListener('mouseleave', () => hover.reverse());
});
