import '../scss/app.scss';

// SLIDER
// const sections = gsap.utils.toArray('.sticky-slides .slide');
// let maxWidth = 0;

// const getMaxWidth = () => {
//   maxWidth = 0;
//   sections.forEach((section) => {
//     maxWidth += section.offsetWidth * 1.172;
//   });
// };
// getMaxWidth();
// ScrollTrigger.addEventListener('refreshInit', getMaxWidth);

// gsap.to(sections, {
//   x: () => `-${maxWidth - window.innerWidth}`,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '#slideshow-wrap',
//     pin: true,
//     scrub: true,
//     end: () => `+=${maxWidth}`,
//     invalidateOnRefresh: true,
//   },
// });

// sections.forEach((sct, i) => {
//   ScrollTrigger.create({
//     trigger: sct,
//     start: () =>
//       'top top-=' +
//       (sct.offsetLeft - window.innerWidth / 2) *
//         (maxWidth / (maxWidth - window.innerWidth)),
//     end: () =>
//       '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
//     toggleClass: { targets: sct, className: 'active' },
//   });
// });

smoothScroll('#content');

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

// Scroll Out Animations
var lOContent = gsap.utils.toArray('.leftOutContent');

lOContent.forEach((elem, i) => {
  const container = elem.closest('.pSection');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'center bottom',
      end: 'bottom top',
      scrub: true,
      markers: true,
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

// this is the helper function that sets it all up. Pass in the content <div> and then the wrapping viewport <div> (can be the elements or selector text). It also sets the default "scroller" to the content so you don't have to do that on all your ScrollTriggers.
function smoothScroll(content, viewport, smoothness) {
  content = gsap.utils.toArray(content)[0];
  smoothness = smoothness || 1;

  gsap.set(viewport || content.parentNode, {
    overflow: 'hidden',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  gsap.set(content, { overflow: 'visible', width: '100%' });

  let getProp = gsap.getProperty(content),
    setProp = gsap.quickSetter(content, 'y', 'px'),
    setScroll = ScrollTrigger.getScrollFunc(window),
    removeScroll = () => (content.style.overflow = 'visible'),
    killScrub = (trigger) => {
      let scrub = trigger.getTween
        ? trigger.getTween()
        : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
      scrub && scrub.kill();
      trigger.animation.progress(trigger.progress);
    },
    height,
    isProxyScrolling;

  function onResize() {
    height = content.clientHeight;
    content.style.overflow = 'visible';
    document.body.style.height = height + 'px';
  }
  onResize();
  ScrollTrigger.addEventListener('refreshInit', onResize);
  ScrollTrigger.addEventListener('refresh', () => {
    removeScroll();
    requestAnimationFrame(removeScroll);
  });
  ScrollTrigger.defaults({ scroller: content });
  ScrollTrigger.prototype.update = (p) => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

  ScrollTrigger.scrollerProxy(content, {
    scrollTop(value) {
      if (arguments.length) {
        isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
        setProp(-value);
        setScroll(value);
        return;
      }
      return -getProp('y');
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  return ScrollTrigger.create({
    animation: gsap.fromTo(
      content,
      { y: 0 },
      {
        y: () => document.documentElement.clientHeight - height,
        ease: 'none',
        onUpdate: ScrollTrigger.update,
      }
    ),
    scroller: window,
    invalidateOnRefresh: true,
    start: 0,
    end: () => height - document.documentElement.clientHeight,
    scrub: smoothness,
    onUpdate: (self) => {
      if (isProxyScrolling) {
        killScrub(self);
        isProxyScrolling = false;
      }
    },
    onRefresh: killScrub, // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
  });
}
