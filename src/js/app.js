import '../scss/app.scss';

let bodyScrollBar = Scrollbar.init(document.body, {
  damping: 0.1,
  delegateTo: document,
});
ScrollTrigger.scrollerProxy('.scroller', {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  },
});
bodyScrollBar.addListener(ScrollTrigger.update);

// SLIDER
gsap.set('.panel', { zIndex: (i, target, targets) => targets.length - i });

var images = gsap.utils.toArray('.panel:not(.last)');

images.forEach((image, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#slideshow-wrap',
      scroller: '.scroller',
      start: () => 'top -' + window.innerHeight * (i + 0.5),
      end: () => '+=' + window.innerHeight,
      scrub: true,
      toggleActions: 'play none reverse none',
      invalidateOnRefresh: true,
    },
  });

  tl.to(image, { opacity: 1 }).to(image, { height: 0, opacity: 0 }, 0.66);
});

gsap.set('.panel-text', { zIndex: (i, target, targets) => targets.length - i });

var texts = gsap.utils.toArray('.panel-text');

texts.forEach((text, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#slideshow-wrap',
      scroller: '.scroller',
      start: () => 'top -' + window.innerHeight * i,
      end: () => '+=' + window.innerHeight,
      scrub: true,
      toggleActions: 'play none reverse none',
      invalidateOnRefresh: true,
    },
  });

  tl.to(text, { duration: 0.33, opacity: 1, y: '0%' }).to(
    text,
    { duration: 0.33, opacity: 0, y: '-25%' },
    0.66
  );
});

ScrollTrigger.create({
  trigger: '#slideshow-wrap',
  scroller: '.scroller',
  scrub: true,
  pin: true,
  start: () => 'top top',
  end: () => '+=' + (images.length + 1) * window.innerHeight,
  invalidateOnRefresh: true,
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

// Scroll In Animations
var uContent = gsap.utils.toArray('.upContent');

uContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scroller: '.scroller',
      start: 'top bottom',
      end: 'bottom center',
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
      scroller: '.scroller',
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
      scroller: '.scroller',
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

// Scroll Out Animations
var lOContent = gsap.utils.toArray('.leftOutContent');

lOContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scroller: '.scroller',
      start: 'center bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.to(elem, { xPercent: 0, opacity: 1, duration: 0.5 }).to(
    elem,
    { xPercent: -25, opacity: 0, duration: 0.5 },
    0.5
  );
});

var rOContent = gsap.utils.toArray('.rightOutContent');

rOContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scroller: '.scroller',
      start: 'center bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.to(elem, { yPercent: 0, opacity: 1, duration: 0.5 }).to(
    elem,
    { xPercent: 25, opacity: 0, duration: 0.5 },
    0.5
  );
});

var dOContent = gsap.utils.toArray('.downOutContent');

dOContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scroller: '.scroller',
      start: 'center bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.to(elem, { yPercent: 0, opacity: 1, duration: 0.5 }).to(
    elem,
    { yPercent: -300, opacity: 0, duration: 0.5 },
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
