!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},l=t.parcelRequirea340;null==l&&((l=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var l={id:e,exports:{}};return r[e]=l,t.call(l.exports,l,l.exports),l.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequirea340=l);var a=l("8nrFW"),o=l("7kasF"),i=l("g9G2c"),c=l("4Nugj");l("7Y7fB");var s,u=function(){var e=document.querySelector("body"),t=document.querySelector(".gallery__list"),r=document.querySelector(".empty");return 0===t.children.length?(r.classList.remove("visually-hidden"),r.style.opacity=1,e.classList.add("overlay")):(r.classList.add("visually-hidden"),e.classList.remove("overlay"))},d=function(){var e=localStorage.getItem("activeGroup"),t="queued";e?t=e:localStorage.setItem("activeGroup",t);return t}(),f=1;s=d,e(a)(c.refs.buttonsContainer.children).map((function(e){e.dataset.lang===s&&e.classList.add("selected")})),c.refs.buttonsContainer.addEventListener("click",(function(t){var r=t.target.dataset.lang;if(r===d)return;d=r,f=1,localStorage.setItem("activeGroup",d),g=v(),f=1,y(),u(document.querySelector(".gallery__list")),e(a)(c.refs.buttonsContainer.children).map((function(e){return e.classList.toggle("selected")})),u(document.querySelector(".gallery__list"))})),c.refs.pagginationList.addEventListener("click",(function(e){var t=e.target.dataset.page;if(!t)return;f=Number(t),y(),(0,i.scrollToTop)()})),c.refs.backdrop.addEventListener("focusin",(function(){(g=v()).length%6==0&&(console.log("ntcn"),1!==f&&(f-=1));y(),u(document.querySelector(".gallery__list"))}));var g=v();function y(){c.refs.galleryList.innerHTML="",c.refs.pagginationList.innerHTML="";var e=g.filter((function(e,t){return t>=6*(f-1)&&t<6*f}));(0,i.renderLibraryList)(e,f,Math.ceil(g.length/6)),u(document.querySelector(".gallery__list"))}function v(){var e=localStorage.getItem("".concat(d));return e?JSON.parse(e):[]}(0,o.btnDayNight)(),y(),u(document.querySelector(".gallery__list")),document.querySelector(".wached").addEventListener("click",u)}();
//# sourceMappingURL=biblioteca.ae27750d.js.map