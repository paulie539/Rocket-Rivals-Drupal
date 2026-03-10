/* @license GPL-2.0-or-later https://git.drupalcode.org/project/once/-/raw/v1.0.1/LICENSE.md */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
window.Drupal={behaviors:{},locale:{}};(function(Drupal,drupalSettings,drupalTranslations,console,Proxy,Reflect){Drupal.throwError=function(error){setTimeout(()=>{throw error;},0);};Drupal.attachBehaviors=function(context,settings){context=context||document;settings=settings||drupalSettings;const behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach((i)=>{if(typeof behaviors[i].attach==='function')try{behaviors[i].attach(context,settings);}catch(e){Drupal.throwError(e);}});};Drupal.detachBehaviors=function(context,settings,trigger){context=context||document;settings=settings||drupalSettings;trigger=trigger||'unload';const behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach((i)=>{if(typeof behaviors[i].detach==='function')try{behaviors[i].detach(context,settings,trigger);}catch(e){Drupal.throwError(e);}});};Drupal.checkPlain=function(str){str=str.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');return str;};Drupal.formatString=function(str,args){const processedArgs={};Object.keys(args||{}).forEach((key)=>{switch(key.charAt(0)){case '@':processedArgs[key]=Drupal.checkPlain(args[key]);break;case '!':processedArgs[key]=args[key];break;default:processedArgs[key]=Drupal.theme('placeholder',args[key]);break;}});return Drupal.stringReplace(str,processedArgs,null);};Drupal.stringReplace=function(str,args,keys){if(str.length===0)return str;if(!Array.isArray(keys)){keys=Object.keys(args||{});keys.sort((a,b)=>a.length-b.length);}if(keys.length===0)return str;const key=keys.pop();const fragments=str.split(key);if(keys.length){for(let i=0;i<fragments.length;i++)fragments[i]=Drupal.stringReplace(fragments[i],args,keys.slice(0));}return fragments.join(args[key]);};Drupal.t=function(str,args,options){options=options||{};options.context=options.context||'';if(drupalTranslations?.strings?.[options.context]?.[str])str=drupalTranslations.strings[options.context][str];if(args)str=Drupal.formatString(str,args);return str;};Drupal.url=function(path){return drupalSettings.path.baseUrl+drupalSettings.path.pathPrefix+path;};Drupal.url.toAbsolute=function(url){const urlParsingNode=document.createElement('a');try{url=decodeURIComponent(url);}catch(e){}urlParsingNode.setAttribute('href',url);return urlParsingNode.href;};Drupal.url.isLocal=function(url){let absoluteUrl=Drupal.url.toAbsolute(url);let {protocol}=window.location;if(protocol==='http:'&&absoluteUrl.startsWith('https:'))protocol='https:';let baseUrl=`${protocol}//${window.location.host}${drupalSettings.path.baseUrl.slice(0,-1)}`;try{absoluteUrl=decodeURIComponent(absoluteUrl);}catch(e){}try{baseUrl=decodeURIComponent(baseUrl);}catch(e){}return absoluteUrl===baseUrl||absoluteUrl.startsWith(`${baseUrl}/`);};Drupal.formatPlural=function(count,singular,plural,args,options){args=args||{};args['@count']=count;const pluralDelimiter=drupalSettings.pluralDelimiter;const translations=Drupal.t(singular+pluralDelimiter+plural,args,options).split(pluralDelimiter);let index=0;if(drupalTranslations?.pluralFormula)index=count in drupalTranslations.pluralFormula?drupalTranslations.pluralFormula[count]:drupalTranslations.pluralFormula.default;else{if(args['@count']!==1)index=1;}return translations[index];};Drupal.encodePath=function(item){return window.encodeURIComponent(item).replace(/%2F/g,'/');};Drupal.deprecationError=({message})=>{if(drupalSettings.suppressDeprecationErrors===false&&console?.warn)console.warn(`[Deprecation] ${message}`);};Drupal.deprecatedProperty=({target,deprecatedProperty,message})=>{if(!Proxy||!Reflect)return target;return new Proxy(target,{get:(target,key,...rest)=>{if(key===deprecatedProperty)Drupal.deprecationError({message});return Reflect.get(target,key,...rest);}});};Drupal.theme=function(func,...args){if(typeof Drupal.theme?.[func]==='function')return Drupal.theme[func](...args);Drupal.throwError(new TypeError(`Drupal.theme.${func} must be function type.`));};Drupal.theme.placeholder=function(str){return `<em class="placeholder">${Drupal.checkPlain(str)}</em>`;};Drupal.elementIsVisible=function(elem){return !!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};Drupal.elementIsHidden=function(elem){return !Drupal.elementIsVisible(elem);};})(Drupal,window.drupalSettings,window.drupalTranslations,window.console,window.Proxy,window.Reflect);;
if(window.jQuery)jQuery.noConflict();document.documentElement.className+=' js';(function(Drupal,drupalSettings){const domReady=(callback)=>{const listener=()=>{callback();document.removeEventListener('DOMContentLoaded',listener);};if(document.readyState!=='loading')setTimeout(callback,0);else document.addEventListener('DOMContentLoaded',listener);};domReady(()=>{Drupal.attachBehaviors(document,drupalSettings);});})(Drupal,window.drupalSettings);;
Drupal.debounce=function(func,wait,immediate){let timeout;let result;return function(...args){const context=this;const later=function(){timeout=null;if(!immediate)result=func.apply(context,args);};const callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)result=func.apply(context,args);return result;};};;
(function(Drupal,debounce){let liveElement;const announcements=[];Drupal.behaviors.drupalAnnounce={attach(context){if(!liveElement){liveElement=document.createElement('div');liveElement.id='drupal-live-announce';liveElement.className='visually-hidden';liveElement.setAttribute('aria-live','polite');liveElement.setAttribute('aria-busy','false');document.body.appendChild(liveElement);}}};function announce(){const text=[];let priority='polite';let announcement;const il=announcements.length;for(let i=0;i<il;i++){announcement=announcements.pop();text.unshift(announcement.text);if(announcement.priority==='assertive')priority='assertive';}if(text.length){liveElement.innerHTML='';liveElement.setAttribute('aria-busy','true');liveElement.setAttribute('aria-live',priority);liveElement.innerHTML=text.join('\n');liveElement.setAttribute('aria-busy','false');}}Drupal.announce=function(text,priority){announcements.push({text,priority});return debounce(announce,200)();};})(Drupal,Drupal.debounce);;
((Drupal)=>{Drupal.Message=class{constructor(messageWrapper=null){if(!messageWrapper)this.messageWrapper=Drupal.Message.defaultWrapper();else this.messageWrapper=messageWrapper;}static defaultWrapper(){let wrapper=document.querySelector('[data-drupal-messages]')||document.querySelector('[data-drupal-messages-fallback]');if(!wrapper){wrapper=document.createElement('div');document.body.appendChild(wrapper);}if(wrapper.hasAttribute('data-drupal-messages-fallback')){wrapper.removeAttribute('data-drupal-messages-fallback');wrapper.classList.remove('hidden');}wrapper.setAttribute('data-drupal-messages','');return wrapper.innerHTML===''?Drupal.Message.messageInternalWrapper(wrapper):wrapper.firstElementChild;}static getMessageTypeLabels(){return {status:Drupal.t('Status message'),error:Drupal.t('Error message'),warning:Drupal.t('Warning message')};}add(message,options={}){if(!options.hasOwnProperty('type'))options.type='status';if(typeof message!=='string')throw new Error('Message must be a string.');Drupal.Message.announce(message,options);options.id=options.id?String(options.id):`${options.type}-${Math.random().toFixed(15).replace('0.','')}`;if(!Drupal.Message.getMessageTypeLabels().hasOwnProperty(options.type)){const {type}=options;throw new Error(`The message type, ${type}, is not present in Drupal.Message.getMessageTypeLabels().`);}this.messageWrapper.appendChild(Drupal.theme('message',{text:message},options));return options.id;}select(id){return this.messageWrapper.querySelector(`[data-drupal-message-id^="${id}"]`);}remove(id){return this.messageWrapper.removeChild(this.select(id));}clear(){this.messageWrapper.querySelectorAll('[data-drupal-message-id]').forEach((message)=>{this.messageWrapper.removeChild(message);});}static announce(message,options){if(!options.priority&&(options.type==='warning'||options.type==='error'))options.priority='assertive';if(options.announce!=='')Drupal.announce(options.announce||message,options.priority);}static messageInternalWrapper(messageWrapper){const innerWrapper=document.createElement('div');innerWrapper.setAttribute('class','messages__wrapper');messageWrapper.insertAdjacentElement('afterbegin',innerWrapper);return innerWrapper;}};Drupal.theme.message=({text},{type,id})=>{const messagesTypes=Drupal.Message.getMessageTypeLabels();const messageWrapper=document.createElement('div');messageWrapper.setAttribute('class',`messages messages--${type}`);messageWrapper.setAttribute('role',type==='error'||type==='warning'?'alert':'status');messageWrapper.setAttribute('data-drupal-message-id',id);messageWrapper.setAttribute('data-drupal-message-type',type);messageWrapper.setAttribute('aria-label',messagesTypes[type]);messageWrapper.innerHTML=`${text}`;return messageWrapper;};})(Drupal);;
((Drupal)=>{Drupal.theme.message=({text},{type,id})=>{const messagesTypes=Drupal.Message.getMessageTypeLabels();const messageWrapper=document.createElement('div');messageWrapper.setAttribute('class',`messages messages--${type} messages-list__item`);messageWrapper.setAttribute('role',type==='error'||type==='warning'?'alert':'status');messageWrapper.setAttribute('aria-labelledby',`${id}-title`);messageWrapper.setAttribute('data-drupal-message-id',id);messageWrapper.setAttribute('data-drupal-message-type',type);messageWrapper.innerHTML=`
    <div class="messages__header">
      <h2 id="${id}-title" class="messages__title">
        ${messagesTypes[type]}
      </h2>
    </div>
    <div class="messages__content">
      ${text}
    </div>
  `;return messageWrapper;};})(Drupal);;
((Drupal,once)=>{Drupal.theme.message=(_ref,_ref2)=>{let {text}=_ref,{type,id}=_ref2;const messagesTypes=Drupal.Message.getMessageTypeLabels(),messageWrapper=document.createElement("div");return messageWrapper.setAttribute("class",`messages-list__item messages messages--${type}`),messageWrapper.setAttribute("role","error"===type||"warning"===type?"alert":"status"),messageWrapper.setAttribute("data-drupal-message-id",id),messageWrapper.setAttribute("data-drupal-message-type",type),messageWrapper.setAttribute("aria-label",messagesTypes[type]),messageWrapper.innerHTML=`\n    <div class="messages__header">\n      <h2 id="${id}-title" class="messages__title">\n        ${messagesTypes[type]}\n      </h2>\n    </div>\n    <div class="messages__content">\n      ${text}\n    </div>\n    <button type="button" class="button button--dismiss js-message-button-hide" title="${Drupal.t("Hide")}">\n      <span class="icon-close"></span>\n      ${Drupal.t("Hide")}\n    </button>\n  `,Drupal.ginMessages.dismissMessages(messageWrapper),messageWrapper;},Drupal.behaviors.ginMessages={attach:(context)=>{Drupal.ginMessages.dismissMessages(context);}},Drupal.ginMessages={dismissMessages:function(){let context=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;once("gin-messages-dismiss",".js-message-button-hide",context).forEach(((dismissButton)=>{dismissButton.addEventListener("click",((e)=>{e.preventDefault();const message=dismissButton.parentNode;message.classList.contains("messages-list__item")&&(message.style.opacity=0,message.classList.add("visually-hidden"));}));}));}};})(Drupal,once);;
((Drupal,drupalSettings,once)=>{Drupal.behaviors.ginAccent={attach:function(context){once("ginAccent","body",context).forEach((()=>{Drupal.ginAccent.checkDarkmode(),Drupal.ginAccent.setAccentColor(),Drupal.ginAccent.setFocusColor();}));}},Drupal.ginAccent={setAccentColor:function(){let preset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,color=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;const accentColorPreset=null!=preset?preset:drupalSettings.gin.preset_accent_color;document.body.setAttribute("data-gin-accent",accentColorPreset),"custom"===accentColorPreset&&this.setCustomAccentColor(color);},setCustomAccentColor:function(){let color=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,element=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const accentColor=null!=color?color:drupalSettings.gin.accent_color;if(accentColor){this.clearAccentColor(element);const strippedAccentColor=accentColor.replace("#",""),darkAccentColor=this.mixColor("ffffff",strippedAccentColor,65).replace("#",""),style=document.createElement("style");style.className="gin-custom-colors",style.innerHTML=`\n          [data-gin-accent="custom"] {\n            --gin-color-primary-rgb: ${this.hexToRgb(accentColor)};\n            --gin-color-primary-hover: ${this.shadeColor(accentColor,-10)};\n            --gin-color-primary-active: ${this.shadeColor(accentColor,-15)};\n            --gin-bg-app-rgb: ${this.hexToRgb(this.mixColor("ffffff",strippedAccentColor,97))};\n            --gin-bg-header: ${this.mixColor("ffffff",strippedAccentColor,85)};\n            --gin-color-sticky-rgb: ${this.hexToRgb(this.mixColor("ffffff",strippedAccentColor,92))};\n          }\n          .gin--dark-mode[data-gin-accent="custom"],\n          .gin--dark-mode [data-gin-accent="custom"] {\n            --gin-color-primary-rgb: ${this.hexToRgb(darkAccentColor)};\n            --gin-color-primary-hover: ${this.mixColor("ffffff",strippedAccentColor,55)};\n            --gin-color-primary-active: ${this.mixColor("ffffff",strippedAccentColor,50)};\n            --gin-bg-header: ${this.mixColor("2A2A2D",darkAccentColor,88)};\n          }\n        `,element.append(style);}},clearAccentColor:function(){let element=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;if(element.querySelectorAll(".gin-custom-colors").length>0){const removeElement=element.querySelector(".gin-custom-colors");removeElement.parentNode.removeChild(removeElement);}},setFocusColor:function(){let preset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,color=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;const focusColorPreset=null!=preset?preset:drupalSettings.gin.preset_focus_color;document.body.setAttribute("data-gin-focus",focusColorPreset),"custom"===focusColorPreset&&this.setCustomFocusColor(color);},setCustomFocusColor:function(){let color=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,element=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const accentColor=null!=color?color:drupalSettings.gin.focus_color;if(accentColor){this.clearFocusColor(element);const strippedAccentColor=accentColor.replace("#",""),darkAccentColor=this.mixColor("ffffff",strippedAccentColor,65),style=document.createElement("style");style.className="gin-custom-focus",style.innerHTML=`\n          [data-gin-focus="custom"] {\n            --gin-color-focus: ${accentColor};\n          }\n          .gin--dark-mode[data-gin-focus="custom"],\n          .gin--dark-mode [data-gin-focus="custom"] {\n            --gin-color-focus: ${darkAccentColor};\n          }`,element.append(style);}},clearFocusColor:function(){let element=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;if(element.querySelectorAll(".gin-custom-focus").length>0){const removeElement=element.querySelector(".gin-custom-focus");removeElement.parentNode.removeChild(removeElement);}},checkDarkmode:()=>{const darkmodeClass=drupalSettings.gin.darkmode_class;window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",((e)=>{e.matches&&"auto"===window.ginDarkmode&&document.querySelector("html").classList.add(darkmodeClass);})),window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",((e)=>{e.matches&&"auto"===window.ginDarkmode&&document.querySelector("html").classList.remove(darkmodeClass);}));},hexToRgb:(hex)=>{hex=hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(m,r,g,b){return r+r+g+g+b+b;}));var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?`${parseInt(result[1],16)}, ${parseInt(result[2],16)}, ${parseInt(result[3],16)}`:null;},mixColor:(color_1,color_2,weight)=>{function h2d(h){return parseInt(h,16);}weight=void 0!==weight?weight:50;for(var color="#",i=0;i<=5;i+=2){for(var v1=h2d(color_1.substr(i,2)),v2=h2d(color_2.substr(i,2)),val=Math.floor(v2+weight/100*(v1-v2)).toString(16);val.length<2;)val="0"+val;color+=val;}return color;},shadeColor:(color,percent)=>{const num=parseInt(color.replace("#",""),16),amt=Math.round(2.55*percent),R=(num>>16)+amt,B=(num>>8&255)+amt,G=(255&num)+amt;return `#${(16777216+65536*(R<255?R<1?0:R:255)+256*(B<255?B<1?0:B:255)+(G<255?G<1?0:G:255)).toString(16).slice(1)}`;}};})(Drupal,drupalSettings,once);;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUICore = {}));
})(this, (function (exports) { 'use strict';

  function getAlignment(placement) {
    return placement.split('-')[1];
  }

  function getLengthFromAxis(axis) {
    return axis === 'y' ? 'height' : 'width';
  }

  function getSide(placement) {
    return placement.split('-')[0];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
  }

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    const commonAlign = reference[length] / 2 - floating[length] / 2;
    const side = getSide(placement);
    const isVertical = mainAxis === 'x';
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain positioning strategy.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
        continue;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }

  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }

  function getSideObjectFromPadding(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }

  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getSideObjectFromPadding(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      ...rects.floating,
      x,
      y
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  const min = Math.min;
  const max = Math.max;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow = options => ({
    name: 'arrow',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        platform,
        elements
      } = state;
      // Since `element` is required, we don't Partial<> the type.
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getSideObjectFromPadding(padding);
      const coords = {
        x,
        y
      };
      const axis = getMainAxisFromPlacement(placement);
      const length = getLengthFromAxis(axis);
      const arrowDimensions = await platform.getDimensions(element);
      const isYAxis = axis === 'y';
      const minProp = isYAxis ? 'top' : 'left';
      const maxProp = isYAxis ? 'bottom' : 'right';
      const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

      // DOM platform can return `window` as the `offsetParent`.
      if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;

      // If the padding is large enough that it causes the arrow to no longer be
      // centered, modify the padding so that it is centered.
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

      // Make sure the arrow doesn't overflow the floating element if the center
      // point is outside the floating element's bounds.
      const min$1 = minPadding;
      const max = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset = within(min$1, center, max);

      // If the reference is small enough that the arrow's padding causes it to
      // to point to nothing for an aligned placement, adjust the offset of the
      // floating element itself. This stops `shift()` from taking action, but can
      // be worked around by calling it again after the `arrow()` if desired.
      const shouldAddOffset = getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
      return {
        [axis]: coords[axis] - alignmentOffset,
        data: {
          [axis]: offset,
          centerOffset: center - offset + alignmentOffset
        }
      };
    }
  });

  const sides = ['top', 'right', 'bottom', 'left'];
  const allPlacements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);

  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }

  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return {
      main: mainAlignmentSide,
      cross: getOppositePlacement(mainAlignmentSide)
    };
  }

  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }

  function getPlacementList(alignment, autoAlignment, allowedPlacements) {
    const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
    return allowedPlacementsSortedByAlignment.filter(placement => {
      if (alignment) {
        return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
      }
      return true;
    });
  }
  /**
   * Optimizes the visibility of the floating element by choosing the placement
   * that has the most space available automatically, without needing to specify a
   * preferred placement. Alternative to `flip`.
   * @see https://floating-ui.com/docs/autoPlacement
   */
  const autoPlacement = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'autoPlacement',
      options,
      async fn(state) {
        var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
        const {
          rects,
          middlewareData,
          placement,
          platform,
          elements
        } = state;
        const {
          crossAxis = false,
          alignment,
          allowedPlacements = allPlacements,
          autoAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        const placements = alignment !== undefined || allowedPlacements === allPlacements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
        const currentPlacement = placements[currentIndex];
        if (currentPlacement == null) {
          return {};
        }
        const {
          main,
          cross
        } = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

        // Make `computeCoords` start from the right place.
        if (placement !== currentPlacement) {
          return {
            reset: {
              placement: placements[0]
            }
          };
        }
        const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main], overflow[cross]];
        const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
          placement: currentPlacement,
          overflows: currentOverflows
        }];
        const nextPlacement = placements[currentIndex + 1];

        // There are more placements to check.
        if (nextPlacement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        const placementsSortedByMostSpace = allOverflows.map(d => {
          const alignment = getAlignment(d.placement);
          return [d.placement, alignment && crossAxis ?
            // Check along the mainAxis and main crossAxis side.
            d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
            // Check only the mainAxis.
            d.overflows[0], d.overflows];
        }).sort((a, b) => a[1] - b[1]);
        const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
          // Aligned placements should not check their opposite crossAxis
          // side.
          getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
        const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
        if (resetPlacement !== placement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: resetPlacement
            }
          };
        }
        return {};
      }
    };
  };

  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }

  function getSideList(side, isStart, rtl) {
    const lr = ['left', 'right'];
    const rl = ['right', 'left'];
    const tb = ['top', 'bottom'];
    const bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        const side = getSide(placement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const {
            main,
            cross
          } = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[main], overflow[cross]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some(side => overflow[side] >= 0);
  }
  /**
   * Provides data to hide the floating element in applicable situations, such as
   * when it is not in the same clipping context as the reference element.
   * @see https://floating-ui.com/docs/hide
   */
  const hide = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'hide',
      options,
      async fn(state) {
        const {
          rects
        } = state;
        const {
          strategy = 'referenceHidden',
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default:
          {
            return {};
          }
        }
      }
    };
  };

  function getBoundingRect(rects) {
    const minX = min(...rects.map(rect => rect.left));
    const minY = min(...rects.map(rect => rect.top));
    const maxX = max(...rects.map(rect => rect.right));
    const maxY = max(...rects.map(rect => rect.bottom));
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  function getRectsByLine(rects) {
    const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
    const groups = [];
    let prevRect = null;
    for (let i = 0; i < sortedRects.length; i++) {
      const rect = sortedRects[i];
      if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
        groups.push([rect]);
      } else {
        groups[groups.length - 1].push(rect);
      }
      prevRect = rect;
    }
    return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
  }
  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'inline',
      options,
      async fn(state) {
        const {
          placement,
          elements,
          rects,
          platform,
          strategy
        } = state;
        // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
        // ClientRect's bounds, despite the event listener being triggered. A
        // padding of 2 seems to handle this issue.
        const {
          padding = 2,
          x,
          y
        } = evaluate(options, state);
        const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
        const clientRects = getRectsByLine(nativeClientRects);
        const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
        const paddingObject = getSideObjectFromPadding(padding);
        function getBoundingClientRect() {
          // There are two rects and they are disjoined.
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            // Find the first rect in which the point is fully inside.
            return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
          }

          // There are 2 or more connected rects.
          if (clientRects.length >= 2) {
            if (getMainAxisFromPlacement(placement) === 'x') {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getSide(placement) === 'top';
              const top = firstRect.top;
              const bottom = lastRect.bottom;
              const left = isTop ? firstRect.left : lastRect.left;
              const right = isTop ? firstRect.right : lastRect.right;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }
            const isLeftSide = getSide(placement) === 'left';
            const maxRight = max(...clientRects.map(rect => rect.right));
            const minLeft = min(...clientRects.map(rect => rect.left));
            const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          return fallback;
        }
        const resetRects = await platform.getElementRects({
          reference: {
            getBoundingClientRect
          },
          floating: elements.floating,
          strategy
        });
        if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
          return {
            reset: {
              rects: resetRects
            }
          };
        }
        return {};
      }
    };
  };

  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getMainAxisFromPlacement(placement) === 'x';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        const {
          x,
          y
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }
    };
  };

  function getCrossAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const mainAxis = getMainAxisFromPlacement(getSide(placement));
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = within(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = within(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };
  /**
   * Built-in `limiter` that will stop `shift()` at a certain point.
   */
  const limitShift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const mainAxis = getMainAxisFromPlacement(placement);
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset, state);
        const computedOffset = typeof rawOffset === 'number' ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
        if (checkMainAxis) {
          const len = mainAxis === 'y' ? 'height' : 'width';
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === 'y' ? 'width' : 'height';
          const isOriginSide = ['top', 'left'].includes(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };

  /**
   * Provides data that allows you to change the size of the floating element —
   * for instance, prevent it from overflowing the clipping boundary or match the
   * width of the reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'size',
      options,
      async fn(state) {
        const {
          placement,
          rects,
          platform,
          elements
        } = state;
        const {
          apply = () => {},
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const axis = getMainAxisFromPlacement(placement);
        const isXAxis = axis === 'x';
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === 'top' || side === 'bottom') {
          heightSide = side;
          widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
        } else {
          widthSide = side;
          heightSide = alignment === 'end' ? 'top' : 'bottom';
        }
        const overflowAvailableHeight = height - overflow[heightSide];
        const overflowAvailableWidth = width - overflow[widthSide];
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (isXAxis) {
          const maximumClippingWidth = width - overflow.left - overflow.right;
          availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
        } else {
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isXAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  exports.arrow = arrow;
  exports.autoPlacement = autoPlacement;
  exports.computePosition = computePosition;
  exports.detectOverflow = detectOverflow;
  exports.flip = flip;
  exports.hide = hide;
  exports.inline = inline;
  exports.limitShift = limitShift;
  exports.offset = offset;
  exports.rectToClientRect = rectToClientRect;
  exports.shift = shift;
  exports.size = size;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/core'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIDOM = {}, global.FloatingUICore));
})(this, (function (exports, core) { 'use strict';

  function getWindow(node) {
    var _node$ownerDocument;
    return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isNode(value) {
    return value instanceof getWindow(value).Node;
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }

  function isHTMLElement(value) {
    return value instanceof getWindow(value).HTMLElement;
  }
  function isElement(value) {
    return value instanceof getWindow(value).Element;
  }
  function isShadowRoot(node) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
    return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const safari = isSafari();
    const css = getComputedStyle$1(element);

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || !safari && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !safari && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function isSafari() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createEmptyCoords = v => ({
    x: v,
    y: v
  });

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createEmptyCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createEmptyCoords(0);
  function getVisualOffsets(element, isFixed, floatingOffsetParent) {
    var _win$visualViewport, _win$visualViewport2;
    if (isFixed === void 0) {
      isFixed = true;
    }
    if (!isSafari()) {
      return noOffsets;
    }
    const win = element ? getWindow(element) : window;
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== win) {
      return noOffsets;
    }
    return {
      x: ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0,
      y: ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0
    };
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createEmptyCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = getVisualOffsets(domElement, isFixedStrategy, offsetParent);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentIFrame = win.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== win) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentIFrame = getWindow(currentIFrame).frameElement;
      }
    }
    return core.rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  function getDocumentElement(node) {
    return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
  }

  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createEmptyCoords(1);
    const offsets = createEmptyCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot ||
      // DOM Element detected.
      node.parentNode ||
      // ShadowRoot detected.
      isShadowRoot(node) && node.host ||
      // Fallback.
      getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }

  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }

  function getOverflowAncestors(node, list) {
    var _node$ownerDocument;
    if (list === void 0) {
      list = [];
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isSafari();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createEmptyCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return core.rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    return getCssDimensions(element);
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const window = getWindow(element);
    if (!isHTMLElement(element)) {
      return window;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }
    return offsetParent || getContainingBlock(element) || window;
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createEmptyCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  const platform = {
    getClippingRect,
    convertOffsetParentRelativeRectToViewportRelativeRect,
    isElement,
    getDimensions,
    getOffsetParent,
    getDocumentElement,
    getScale,
    async getElementRects(_ref) {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      return {
        reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
        floating: {
          x: 0,
          y: 0,
          ...(await getDimensionsFn(floating))
        }
      };
    },
    getClientRects: element => Array.from(element.getClientRects()),
    isRTL: element => getComputedStyle$1(element).direction === 'rtl'
  };

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      clearTimeout(timeoutId);
      io && io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const {
        left,
        top,
        width,
        height
      } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      let isFirstUpdate = true;
      io = new IntersectionObserver(entries => {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (ratio === 0) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }, {
        rootMargin,
        threshold
      });
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = true,
      layoutShift = typeof IntersectionObserver === 'function',
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(update);
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo && cleanupIo();
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain CSS positioning
   * strategy.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return core.computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  Object.defineProperty(exports, 'arrow', {
    enumerable: true,
    get: function () { return core.arrow; }
  });
  Object.defineProperty(exports, 'autoPlacement', {
    enumerable: true,
    get: function () { return core.autoPlacement; }
  });
  Object.defineProperty(exports, 'detectOverflow', {
    enumerable: true,
    get: function () { return core.detectOverflow; }
  });
  Object.defineProperty(exports, 'flip', {
    enumerable: true,
    get: function () { return core.flip; }
  });
  Object.defineProperty(exports, 'hide', {
    enumerable: true,
    get: function () { return core.hide; }
  });
  Object.defineProperty(exports, 'inline', {
    enumerable: true,
    get: function () { return core.inline; }
  });
  Object.defineProperty(exports, 'limitShift', {
    enumerable: true,
    get: function () { return core.limitShift; }
  });
  Object.defineProperty(exports, 'offset', {
    enumerable: true,
    get: function () { return core.offset; }
  });
  Object.defineProperty(exports, 'shift', {
    enumerable: true,
    get: function () { return core.shift; }
  });
  Object.defineProperty(exports, 'size', {
    enumerable: true,
    get: function () { return core.size; }
  });
  exports.autoUpdate = autoUpdate;
  exports.computePosition = computePosition;
  exports.getOverflowAncestors = getOverflowAncestors;
  exports.platform = platform;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
;
((Drupal,once,_ref)=>{let {computePosition,offset,shift,flip}=_ref;Drupal.theme.ginTooltipWrapper=(dataset,title)=>`<div class="gin-tooltip ${dataset.drupalTooltipClass||""}">\n      ${dataset.drupalTooltip||title}\n    </div>`,Drupal.behaviors.ginTooltip={attach:(context)=>{Drupal.ginTooltip.init(context);}},Drupal.ginTooltip={init:function(context){once("ginTooltipInit","[data-gin-tooltip]",context).forEach(((trigger)=>{const title=trigger.title;title&&(trigger.title=""),trigger.insertAdjacentHTML("afterend",Drupal.theme.ginTooltipWrapper(trigger.dataset,title));const tooltip=trigger.nextElementSibling,updatePosition=()=>{this.computePosition(trigger,tooltip);};new ResizeObserver(updatePosition).observe(trigger),new MutationObserver(updatePosition).observe(trigger,{attributes:!0,childList:!0,subtree:!0}),trigger.addEventListener("mouseover",updatePosition),trigger.addEventListener("focus",updatePosition);}));},computePosition:function(trigger,tooltip){let placement=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom-end";computePosition(trigger,tooltip,{strategy:"absolute",placement:trigger.dataset.drupalTooltipPosition||placement,middleware:[flip({padding:16}),offset(6),shift({padding:16})]}).then(((_ref2)=>{let {x,y}=_ref2;Object.assign(tooltip.style,{"inset-inline-start":`${x}px`,"inset-block-start":`${y}px`});}));}};})(Drupal,once,FloatingUIDOM);;
(function($,Drupal,debounce){const cache={right:0,left:0,bottom:0,top:0};const cssVarPrefix='--drupal-displace-offset';const documentStyle=document.documentElement.style;const offsetKeys=Object.keys(cache);const offsetProps={};offsetKeys.forEach((edge)=>{offsetProps[edge]={enumerable:true,get(){return cache[edge];},set(value){if(value!==cache[edge])documentStyle.setProperty(`${cssVarPrefix}-${edge}`,`${value}px`);cache[edge]=value;}};});const offsets=Object.seal(Object.defineProperties({},offsetProps));function getRawOffset(el,edge){const $el=$(el);const documentElement=document.documentElement;let displacement=0;const horizontal=edge==='left'||edge==='right';let placement=$el.offset()[horizontal?'left':'top'];placement-=window[`scroll${horizontal?'X':'Y'}`]||document.documentElement[`scroll${horizontal?'Left':'Top'}`]||0;switch(edge){case 'top':displacement=placement+$el.outerHeight();break;case 'left':displacement=placement+$el.outerWidth();break;case 'bottom':displacement=documentElement.clientHeight-placement;break;case 'right':displacement=documentElement.clientWidth-placement;break;default:displacement=0;}return displacement;}function calculateOffset(edge){let edgeOffset=0;document.querySelectorAll(`[data-offset-${edge}]`).forEach((el)=>{if(el.style.display==='none')return;let displacement=parseInt(el.getAttribute(`data-offset-${edge}`),10);if(isNaN(displacement))displacement=getRawOffset(el,edge);edgeOffset=Math.max(edgeOffset,displacement);});return edgeOffset;}function displace(broadcast=true){const newOffsets={};offsetKeys.forEach((edge)=>{newOffsets[edge]=calculateOffset(edge);});offsetKeys.forEach((edge)=>{offsets[edge]=newOffsets[edge];});if(broadcast)$(document).trigger('drupalViewportOffsetChange',offsets);return offsets;}Drupal.behaviors.drupalDisplace={attach(){if(this.displaceProcessed)return;this.displaceProcessed=true;$(window).on('resize.drupalDisplace',debounce(displace,200));}};Drupal.displace=displace;Object.defineProperty(Drupal.displace,'offsets',{value:offsets,writable:false});Drupal.displace.calculateOffset=calculateOffset;})(jQuery,Drupal,Drupal.debounce);;
((Drupal)=>{Drupal.behaviors.ginSticky={attach:()=>{once("ginSticky",".region-sticky-watcher").forEach((()=>{const observer=new IntersectionObserver(((_ref)=>{let [e]=_ref;const regionSticky=document.querySelector(".region-sticky");regionSticky.classList.toggle("region-sticky--is-sticky",e.intersectionRatio<1),regionSticky.toggleAttribute("data-offset-top",e.intersectionRatio<1),Drupal.displace(!0);}),{threshold:[1]}),element=document.querySelector(".region-sticky-watcher");element&&observer.observe(element);}));}};})(Drupal);;
