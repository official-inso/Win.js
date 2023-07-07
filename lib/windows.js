/**
 * Object for working with pop-up windows
 * @namespace Win
 * @version 1.0
 * @author Roman Zhuzhgov
 * @license MIT
 */
let Win = {

  /**
   * Object with configuration settings
   * @namespace Win.cfg
   */
  cfg: {

    /**
     * !Will the back button appear when opening a new window
     */
    back: true,

    /**
     * !Will the forward button appear when the previous window is opened
     */
    forward: true,

    /**
     * !Opening a window to full screen when scrolling
     */
    fullSize: false,

    /**
     * !accent color
     */
    color: '7de31e',

    /**
     * !Object for working with swipes
     * @namespace Win.cfg.swipe
     */
    swipe: {

      /**
       * Swipe close
       */
      close: true,

      /**
       * Swipe back actions
       */
      back: true // ! Не работает
    },

    /**
     * Whether to output errors to the console
     */
    debug: false,

    /**
     * Path to style file
     */
    style: '',


    /**
     * Path to the file with additional scripts
     */
    script: '',

    /**
     * Path to windows folder
     */
    path: './windows',

    /**
     * Selector where popups will be placed
     */
    selectorWin: 'body',

    /**
     * !Event object
     * @namespace Win.cfg.events
     */
    events: {

       /**
       * Window open event
       * @namespace Win.cfg.events.winOpen
       */
      winOpen: {

        /**
         * Event name
         */
        name: 'winOpen'

      },

      /**
       * Window close event
       * @namespace Win.cfg.events.winClose
       */
      winClose: {

        /**
         * Event name
         */
        name: 'winClose'

      },

      /**
       * All windows close event
       * @namespace Win.cfg.events.winCloseAll
       */
      winCloseAll: {

        /**
         * Event name
         */
        name: 'winCloseAll'

      },

      /**
       * back action event
       * @namespace Win.cfg.events.winBack
       */
      winBack: {

        /**
         * Event name
         */
        name: 'winBack'

      },

      /**
       * forward action event
       * @namespace Win.cfg.events.forward
       */
      forward: {

        /**
         * Event name
         */
        name: 'winForward'

      },


      /**
       * Window opening event on large format
       * @namespace Win.cfg.events.winFullSize
       */
      winFullSize: {

        /**
         * Event name
         */
        name: 'winFullSize'

      },

      /**
       * Window open event on small format
       * @namespace Win.cfg.events.winMinSize
       */
      winMinSize: {

        /**
         * Event name
         */
        name: 'winMinSize'

      },

      /**
       * Event adding a new record to the history
       * @namespace Win.cfg.events.winHistoryNew
       */
      winHistoryNew: {

        /**
         * Event name
         */
        name: 'winHistoryNew'

      },
      
    },
  },

  /**
   * Initialization method
   * @param {Object} [params] - Initialization Options
   * @param {string} [params.style] - Path to style file
   * @param {string} [params.script] - Path to the file with additional scripts
   * @param {string} [params.degub=false] - Whether to output errors to the console
   * @param {string} [params.path=Win.cfg.path] - Path to windows folder
   * @param {Object} [params.swipe] - Object for working with swipes
   * @param {Boolean} [params.swipe.back=true] - Swipe back actions
   * @param {Boolean} [params.swipe.close=true] - Swipe close
   * @param {Boolean} [params.fullSize=false] - Opening a window to full screen when scrolling
   * @param {Boolean} [params.back=true] - Will the back button appear when opening a new window
   * @param {Boolean} [params.forward=true] - Will the forward button appear when the previous window is opened
   * @param {Array} [params.load] - This is an array of autoload windows
   * @param {Array} [params.selectorWin] - This specifies the selector where popups will be placed.
   * @param {Array} [params.loadDelay=0] - Here you can specify the delay for automatic loading of windows.
   * @param {Array} [params.loadOutput=true] - It specifies whether the contents of the window will be automatically displayed in the DOM of the page (Works only when autoloading windows is enabled)
   * @returns {Promise}
   */
  init: async (params) => {

    let css = '/* window (start) */\n html {\n \t--win-color: #303036;\n \t--win-bg: #fff;\n \t--win-bg-main: #%MAINCOLOR%;\n \t--win-bg-main-opacity: #%MAINCOLOR%75;\n  \t--win-bg-main-hover: #%MAINCOLOR%29;\n \t--win-shadow-color: rgba(104, 104, 104, 0.1);\n \t--win-shadow: 0 0 13px 0 var(--win-shadow-color);\n \t--win-trans-esm: 0.1s all cubic-bezier(0.7, 0, 0.3, 1);\n \t--win-trans-sm: 0.15s all cubic-bezier(0.7, 0, 0.3, 1);\n \t--win-trans-md: 0.25s all cubic-bezier(0.7, 0, 0.3, 1);\n \t--win-trans-lg: 0.5s all cubic-bezier(0.7, 0, 0.3, 1);\n \t--win-trans-elg: 0.8s all cubic-bezier(0.7, 0, 0.3, 1);\n \t--win-radius-esm: 1px;\n \t--win-radius-sm: 2px;\n \t--win-radius-md: 5px;\n \t--win-radius-lg: 8px;\n \t--win-radius-elg: 12px;\n }\n .windows {\n \tposition: fixed;\n \theight: 100vh;\n \twidth: 100vw;\n \tz-index: 999999999;\n \topacity: 0;\n \ttop: 0;\n \tleft: 0;\n \tpointer-events: none;\n \ttransition: var(--win-trans-md);\n \tcontain: content;\n }\n .windows[active] {\n \topacity: 1;\n \tpointer-events: auto;\n }\n .windows-shadow {\n \theight: 100%;\n \twidth: 100%;\n \tposition: fixed;\n \tbackground-color: #000000;\n \topacity: 0.65;\n \tz-index: 5;\n }\n .windows-window {\n \tposition: absolute;\n \tpadding: 20px;\n \tborder-radius: var(--win-radius-lg);\n \tmax-width: 750px;\n \tmax-height: 85vh;\n \tmin-height: 50px;\n \tmin-width: 250px;\n \ttransform: translate(-50%, 100px);\n \tz-index: 10;\n \tpadding-bottom: 0px;\n \tleft: 50vw;\n \ttop: 50vh;\n \tmargin: auto;\n \tbackground-color: var(--win-bg);\n \topacity: 0;\n \tpointer-events: none;\n \ttransition: var(--win-trans-lg);\n \toverflow: hidden;\n }\n .windows-window[active] {\n \topacity: 1;\n \tpointer-events: auto;\n \ttransform: translate(-50%, -50%);\n \tz-index: 999;\n }\n .windows-window[active]~.windows-shadow {\n \tz-index: 11;\n }\n .windows-window[big] {\n \twidth: calc(100vw - 80px);\n \tpadding: 20px 30px;\n \tmax-width: 500px;\n }\n .windows-back[back] {\n \tdisplay: inline-block;\n \theight: 27px;\n \twidth: 27px;\n \ttext-align: center;\n \tpadding-top: 1px;\n \tborder-radius: var(--win-radius-md);\n \tmargin-right: 6px;\n \tcursor: pointer;\n \ttransition: var(--win-trans-md);\n }\n .windows-back[back]:hover {\n \tbackground-color: var(--win-bg-main-hover);\n }\n .windows-window-close {\n \tposition: absolute;\n \theight: 25px;\n \twidth: 25px;\n \tright: 15px;\n \ttop: 15px;\n \ttext-align: center;\n \tline-height: 25px;\n \tborder-radius: 500px;\n \tcursor: pointer;\n \tcolor: var(--win-color);\n \tfont-size: 20px;\n \tfont-weight: 700;\n \ttransition: var(--win-trans-sm);\n \topacity: 0;\n \tz-index: 99;\n \tpointer-events: none;\n }\n .windows-window-close:before {\n \tcontent: "";\n \tbackground-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNjEyLjA0MyA2MTIuMDQzIj4NCgk8cGF0aCBzdHlsZT0nZmlsbDogIzExMTsnIGQ9Ik0zOTcuNTAzLDMwNi4wMTFsMTk1LjU3Ny0xOTUuNTc3YzI1LjI3LTI1LjI2OSwyNS4yNy02Ni4yMTMsMC05MS40ODJjLTI1LjI2OS0yNS4yNjktNjYuMjEzLTI1LjI2OS05MS40ODEsMCBMMzA2LjAyMiwyMTQuNTUxTDExMC40NDUsMTguOTc0Yy0yNS4yNjktMjUuMjY5LTY2LjIxMy0yNS4yNjktOTEuNDgyLDBzLTI1LjI2OSw2Ni4yMTMsMCw5MS40ODJMMjE0LjU0LDMwNi4wMzNMMTguOTYzLDUwMS42MSBjLTI1LjI2OSwyNS4yNjktMjUuMjY5LDY2LjIxMywwLDkxLjQ4MWMyNS4yNjksMjUuMjcsNjYuMjEzLDI1LjI3LDkxLjQ4MiwwbDE5NS41NzctMTk1LjU3NmwxOTUuNTc3LDE5NS41NzYgYzI1LjI2OSwyNS4yNyw2Ni4yMTMsMjUuMjcsOTEuNDgxLDBjMjUuMjctMjUuMjY5LDI1LjI3LTY2LjIxMywwLTkxLjQ4MUwzOTcuNTAzLDMwNi4wMTF6Ii8+DQo8L3N2Zz4NCg==");\n \theight: 25px;\n \twidth: 25px;\n \tbackground-position: center;\n \tbackground-repeat: no-repeat;\n \tbackground-size: 13px;\n \tposition: absolute;\n \tleft: 0;\n }\n .windows-window[active] .windows-window-close[active] {\n \topacity: 0.65;\n \tpointer-events: auto;\n }\n .windows-window[active] .windows-window-close[active]:hover {\n \topacity: 1;\n }\n .windows-window-close-mobile_full {\n \tposition: absolute;\n \theight: 30px;\n \twidth: 30px;\n \tright: 10px;\n \ttop: 10px;\n \tcursor: pointer;\n \tborder-radius: var(--win-radius-md);\n \tpointer-events: none;\n \topacity: 0;\n \tz-index: 99;\n \ttransition: var(--win-trans-lg);\n }\n .windows-window[full] .windows-window-close-mobile_full {\n \tpointer-events: auto;\n \topacity: 1;\n }\n .windows-window[full] .windows-window-close-mobile_full:before {\n \ttransform: rotate(-45deg);\n }\n .windows-window[full] .windows-window-close-mobile_full:after {\n \ttransform: rotate(45deg);\n }\n .windows-window-close-mobile_full:before {\n \tcontent: "";\n \theight: 60%;\n \twidth: 2px;\n \tbackground-color: var(--win-color);\n \tposition: absolute;\n \tleft: 0;\n \tright: 0;\n \ttop: 0;\n \tbottom: 0;\n \tmargin: auto;\n \ttransform: rotate(90deg);\n \tborder-radius: var(--win-radius-elg);\n \ttransition: var(--win-trans-lg);\n }\n .windows-window-close-mobile_full:after {\n \tcontent: "";\n \theight: 60%;\n \twidth: 2px;\n \tbackground-color: var(--win-color);\n \tposition: absolute;\n \tleft: 0;\n \tright: 0;\n \ttop: 0;\n \tbottom: 0;\n \tmargin: auto;\n \ttransform: rotate(90deg);\n \tborder-radius: var(--win-radius-elg);\n \ttransition: var(--win-trans-lg);\n }\n .windows-window-title {\n \tposition: relative;\n \tfont-weight: 700;\n \tfont-size: 22px;\n \twidth: calc(100% - 35px);\n \tz-index: 1;\n }\n .windows-window-content {\n \tposition: relative;\n \twidth: 100%;\n \tfont-weight: 300;\n \toverflow: auto;\n \tmargin-top: 10px;\n \tscroll-behavior: smooth;\n \tborder-radius: 0px;\n \tcontain: content;\n }\n .windows-window *[text]:empty {\n \tdisplay: none;\n }\n .windows-window-content::-webkit-scrollbar {\n \tdisplay: none;\n }\n .windows-window-content::-moz-scrollbar {\n \tdisplay: none;\n }\n .windows-window-content::-ms-scrollbar {\n \tdisplay: none;\n }\n .windows-window-content::-o-scrollbar {\n \tdisplay: none;\n }\n .windows-window-content-div {\n \tmax-height: calc(85vh - 60px);\n}\n .windows-window-content-div content {\n \tpadding-bottom: 20px;\n \t display: block; \n \t}\n @media only screen and (max-width: 500px) and (min-width: 10px) {\n \thtml {\n \t  --win-radius-esm: 6px;\n \t  --win-radius-sm: 7px;\n \t  --win-radius-md: 9px;\n \t  --win-radius-lg: 16px;\n \t  --win-radius-elg: 22px;\n \t}\n \t.windows-window {\n \t  position: fixed;\n \t  max-width: initial;\n \t  max-height: initial;\n \t  min-height: initial;\n \t  min-width: initial;\n \t  width: calc(100vw - 60px);\n \t  transform: translate(-50%, 100%);\n \t  opacity: 0;\n \t  top: initial;\n \t  bottom: 0px;\n \t  will-change: transform, opacity, border-radius, height, width;\n \t}\n \t.windows-window-close {\n \t  height: 15px;\n \t  background-color: transparent;\n \t  width: 100%;\n \t  left: 0;\n \t  right: 0;\n \t  top: 0;\n \t  border-radius: 0px;\n \t}\n \t.windows-window-close:before {\n \t  content: "";\n \t  height: 5px;\n \t  width: 40px;\n \t  background-color: #7575755c;\n \t  position: absolute;\n \t  top: 0;\n \t  bottom: 0;\n \t  left: 0;\n \t  right: 0;\n \t  margin: auto;\n \t  border-radius: var(--win-radius-elg);\n \t  background-image: none;\n \t}\n \t.windows-window-close:hover {\n \t  opacity: 0.75;\n \t  background-color: #80808042;\n \t}\n \t.windows-window-close:active:before {\n \t  background-color: var(--win-bg-main);\n \t}\n \t.windows-window[big] {\n \t  width: calc(100vw - 80px);\n \t  padding: 20px 30px;\n \t  max-width: 500px;\n \t}\n \t.windows-window[active] {\n \t  transform: translate(-50%, -10px);\n \t   opacity: 1;\n \t  transform-origin: center bottom;\n \t}\n \t.windows-window[full] {\n \t  height: calc(100vh - 40px);\n \t  transform: translate(-50%, 0px);\n \t  width: calc(100vw - 39px);\n \t  /* calc(100vw - 59px) */\n \t  border-radius: 0px;\n \t}\n \t.windows-window[big] .windows-window-content {\n \t  height: 100%;\n \t}\n \t.windows-window .windows-window-content {\n \t  height: 95%;\n \t}\n \t.windows-window-title {\n \t  max-width: 100% !important;\n \t}\n }\n /* window (end) */\n';

    // Проверяем наличие параметров
    if(params != undefined){

      // Проверяем наличие параметра style
      if(params.style != undefined){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = params.style;
        document.head.appendChild(link);

        Win.cfg.style = params.style;
      }

      // Проверяем наличие параметра debug
      if(params.debug != undefined){
        if(params.debug === false || params.debug === true){
          Win.cfg.debug = params.debug;
        }        
      }

      // Проверяем наличие параметра back
      if(params.back != undefined){
        if(params.back === false || params.back === true){
          Win.cfg.back = params.back;
        }        
      }

      // Проверяем наличие параметра forward
      if(params.forward != undefined){
        if(params.forward === false || params.forward === true){
          Win.cfg.forward = params.forward;
        }        
      }

      // Проверяем наличие параметра fullSize
      if(params.fullSize != undefined){
        if(params.fullSize === false || params.fullSize === true){
          Win.cfg.fullSize = params.fullSize;
        }        
      }

      // Проверяем наличие параметра script
      if(params.script != undefined){
        const script = document.createElement('script');
        script.src = params.script;
        document.body.appendChild(script);

        Win.cfg.script = params.script;
      }

      // Проверяем наличие параметра path
      if(params.path != undefined){

        if(typeof params.path == 'string'){
          Win.cfg.path = params.path;
        }

      }

      // Проверяем наличие параметра color
      if(params.color != undefined){

        if(typeof params.color == 'string'){
          Win.cfg.color = params.color;
        }

      }

      // Проверяем наличие параметра selectorWin
      if(params.selectorWin != undefined){

        if(typeof params.selectorWin == 'string'){
          Win.cfg.selectorWin = params.selectorWin;
        }

      }

      // Проверяем наличие параметра swipe
      if(params.swipe != undefined){

        // Этот параметр является объектом
        if(typeof params.swipe == 'object'){

          // Проверяем наличие параметра swipe.back
          if(params.swipe.back != undefined){

          }

          // Проверяем наличие параметра swipe.close
          if(params.swipe.close != undefined){

          }

        }

      }

    }

    // Добавляем CSS свойства
    let head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');


    css = css.replace(/%MAINCOLOR%/g, Win.cfg.color);
    style.type = 'text/css';
    style.setAttribute('data-type-object', 'lib')

    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    // Тут проверяем существования блока для вставки будущих окон
    const windowsElem = document.getElementsByClassName('windows');
    if(windowsElem.length < 1){
      let winHtml = document.createElement('div');
      winHtml.className = "windows";
      winHtml.innerHTML = '<div class="windows-shadow"></div>';
      if(Win.cfg.selectorWin == 'body'){
        document.getElementsByTagName('body')[0].prepend(winHtml)
      } else {
        document.querySelector(Win.cfg.selectorWin).prepend(winHtml)
      }
      
    }

    // Тут вешаем клик на тень, для закрытия окна
    const shadow = document.getElementsByClassName('windows-shadow');
    Array.prototype.forEach.call(shadow, elem => {
      elem.addEventListener("click", function(e) {
        Win.close();
      });
    });

    // Тут вешаем клик на крестик или полоску, для закрытия окна
    document.addEventListener("click", function(e) {
      if(e.target.classList.contains('windows-window-close')){
        let id = e.target.parentElement.getAttribute('id');
        Win.close(id)
      }
      if(e.target.classList.contains('windows-window-close-mobile_full')){
        let id = e.target.parentElement.getAttribute('id');
        Win.close(id)
      }
    });

    // Тут вешаем клик на на кнопку назад
    document.addEventListener("click", function(e) {
      if(e.target.hasAttribute('back') && e.target.parentElement.classList.contains('windows-window-title')){
        Win.close({
          type: 'back'
        })
      }
    });

    // Тут вешаем клик на на кнопку вперед
    document.addEventListener("click", function(e) {
      if(e.target.hasAttribute('forward') && e.target.parentElement.classList.contains('windows-window-title')){
        Win.close({
          type: 'forward'
        })
      }
    });

    window.addEventListener('resize', function(){
      document.querySelectorAll('.windows-window').forEach(el => {
        el.style.width = '';
        el.style.height = '';
        el.style.borderRadius = '';
        el.style.transform = '';
      })

      if(document.documentElement.clientWidth > 500){
        document.querySelectorAll('.windows-window-content-div').forEach(el => {
          el.style.paddingTop = '';
        });
      } else {
        document.querySelectorAll('.windows-window-content').forEach(el => {
          if(el.scrollTop > 50){
            el.querySelector('.windows-window-content-div').style.paddingTop = '50px';
          } else {
            el.querySelector('.windows-window-content-div').style.paddingTop = '';
          }
        });
      }
    })



    // Проверяем наличие параметра path
    if(params.load != undefined){

      if(typeof params.load == 'object'){

        if(typeof params.loadDelay != 'number') params.loadDelay = 0;

        if(typeof params.loadOutput != 'boolean') params.loadOutput = true;

        new Promise((resolve, reject) => {setTimeout(async () => {
          for (const key in params.load) {
            if (Object.hasOwnProperty.call(params.load, key)) {
              let res = await Win.service.load(key, params.load[key]);
              if(res != undefined){
                if(params.loadOutput){
                  await Win.service.output(res, key, params.load[key]);
                } else {
                  Win.service.await.add({
                    res: res,
                    name: key,
                    params: params.load[key]
                  });
                }
                
              }
            }
          }
        }, params.loadDelay); resolve(Win.service.await)});
      }

    }

    document.body.addEventListener('touchstart', function(e) {
      var target = e.target.closest('*[swipe-window]');
      if (target) {
        Win.service.events.swipe.start(target, e)
      }
    });

    document.body.addEventListener('touchmove', function(e) {
      var target = e.target.closest('*[swipe-window]');
      if (target) {
        Win.service.events.swipe.move(target, e)
      }
    });

    document.body.addEventListener('touchend', function(e) {
      var target = e.target.closest('*[swipe-window]');
      if (target) {
        Win.service.events.swipe.end(target, e)
      }
    });

    Object.defineProperty(window, '__LINE__', {
      get: function () {
        return Win.service.getLine(2);
      }
    });

  },
  /**
   * Window opening method
   * @param {string} name - Window name
   * @param {object} [params] - Extra options
   * @param {string} [params.path] - The path where the window file is stored
   * @param {string} [params.title] - Window Title
   * @param {Boolean} [params.back=Win.cfg.back] - The presence of a back button on the window, inherits the value from the configuration settings
   * @param {Boolean} [params.update=false] - Whether to download updates for this window from the server
   * @param {Boolean} [params.fullSize=Win.cfg.fullSize] - Whether to open the window when scrolling to full screen
   * @param {Boolean} [history=true] - Whether this window will be saved in the window opening history
   * @returns {Promise}
   */
  open: async (name, params, history = true) => {

    let fullSize = Win.cfg.fullSize;
    let backBtnWin = Win.cfg.back;

    if(params != undefined){
      if(params.update == undefined) params.update = false;
      if(params.update){
        if(document.getElementById(name) != undefined){
          document.getElementById(name).remove()
        }
      }

      if(params.fullSize != undefined) {
        if(typeof params.fullSize == 'boolean') fullSize = params.fullSize;
      }
    }
    

    let response;

    if(name != undefined){

      let win_has = document.getElementById(name) != null;


      let find = false;

      if(params != undefined){
        if(params.update != undefined){
          if(params.update == false){
            find = Win.service.await.find(name);
          }
        } else {
          find = Win.service.await.find(name);
        }
      } else {
        find = Win.service.await.find(name);
      }

      if(find != false){
        response = find;
      } else {
        response = await Win.service.load(name, params);
      }
      
      if(params != undefined){
        if(params.back != undefined){
          if (typeof params.back == 'boolean') backBtnWin = params.back;
        }
      }
      
      if(response != undefined || win_has){

        let flag = false;

        if(!win_has) {
          
          let gth = {
            name: name,
            res: response.res,
            params: params,
            bck: backBtnWin,
          };

          if(response['params'] != undefined){            
            gth.params = response.params;
          }



          if(response.type == 'basic') gth.res = response;

          let yt = await Win.service.output(gth.res, gth.name, gth.params);
          if(yt){
            flag = true;
          }
        } else {
          flag = true;
        }

        if(flag){

          let activeWin = Win.live('name');
          let containerWin = document.getElementsByClassName('windows')[0];
          let timeoutTime = 10;
         
          if(Win.live('name') != name){
            if(history){
              Win.service.log('Записываем в историю окно.', undefined, undefined, __LINE__);

              Win.service.history.add({
                'name' : name,
                'params': params
              }, history);
            }
          }
          
          
          
          

          if(activeWin){
            if(activeWin == name) {
              timeoutTime = parseFloat(window.getComputedStyle(containerWin.querySelector('#' + activeWin)).transitionDuration) * 1000 - 100;
              if(timeoutTime < 10){
                timeoutTime = 10;
              }
            }

            Win.service.log('Закрываем текущее окно с именем: ' + activeWin, undefined, undefined, __LINE__);

            Array.prototype.forEach.call(containerWin.querySelectorAll('.windows-window'), elem => {
              elem.removeAttribute('active');
            });
          }

          let newActiveWin = containerWin.querySelector('.windows-window#' + name);

          return new Promise((resolve, reject) => {setTimeout(() => {
            containerWin.setAttribute('active', '');
            newActiveWin.setAttribute('active', '');

            try {
              if(params.title){
                newActiveWin.querySelector('*[title]').innerText = params.title;
              }
            } catch (error) {}

            Win.service.log('Открытие окна.', undefined, undefined, __LINE__);

            document.dispatchEvent(new CustomEvent(Win.cfg.events.winOpen.name, {
              detail: {
                name: name,
                container: newActiveWin.querySelector('.windows-window-content-div content')
              }
            }));

            containerWin.querySelectorAll('*').forEach(el => {
              data_tabindex = el.getAttribute('data-tabindex');
              tabindex = el.getAttribute('tabindex');

              if(data_tabindex == undefined){
                el.removeAttribute('tabindex')
              } else {
                el.setAttribute('tabindex', data_tabindex)
                el.setAttribute('data-tabindex', data_tabindex)
              }
            })

            if(Win.service.history.active > 0){
              document.querySelectorAll('.windows-window#' + name + ' .windows-window-title button[back]').forEach(el => {
                el.setAttribute('visibility', 'visible')
                el.removeAttribute('disabled')
              })
            } else {
              document.querySelectorAll('.windows-window#' + name + ' .windows-window-title button[back]').forEach(el => {
                el.setAttribute('visibility', 'hidden')
                el.setAttribute('disabled', 'disabled')
              })
            }

            if(Win.service.history.active < Win.service.history.arr.length && Win.service.history.active + 1 != Win.service.history.arr.length && Win.service.history.arr.length != 1 && Win.service.history.active >= 0){
              document.querySelectorAll('.windows-window#' + name + ' .windows-window-title button[forward]').forEach(el => {
                el.setAttribute('visibility', 'visible')
                el.removeAttribute('disabled')
              })
            } else {
              document.querySelectorAll('.windows-window#' + name + ' .windows-window-title button[forward]').forEach(el => {
                el.setAttribute('visibility', 'hidden')
                el.setAttribute('disabled', 'disabled')
              })
            }

            const contentObj = document.querySelector('.windows-window#' + name + ' .windows-window-content[swipenone]');
            const contentScrollHeight = contentObj.scrollHeight;
            const contentHeight = contentObj.getClientRects()[0].height
            const windowObj = contentObj.parentElement;

            contentObj.scrollTop = 0;

            if(contentScrollHeight - 100 > contentHeight){
              if(windowObj.getAttribute('full') != undefined){
                windowObj.style.height = '';
              } else {
                windowObj.style.height = 'calc(85vh - 9px)';
              }
              
              if(windowObj.querySelector('.windows-window-title') != undefined){
                let lines = Win.service.getLines(windowObj.querySelector('.windows-window-title'));

                let heightOutside = windowObj.querySelector('.windows-window-title').getBoundingClientRect().height / lines * (lines - 1);
                if(heightOutside > 0){
                  contentObj.style.height = `calc(95% - ${heightOutside}px)`;
                } else if(lines == 0) {
                  contentObj.style.height = '100%';
                } else {
                  contentObj.style.height = '95%';
                }
              }
            }



            if(fullSize){
              contentObj.removeEventListener('scroll', Win.service.events.scroll);
              contentObj.addEventListener('scroll', Win.service.events.scroll)
            }



          }, timeoutTime); resolve({
            name: name,
            container: document.getElementById(name).querySelector('.windows-window-content-div content')
          });});

        }
        
      } else {
        Win.service.log('Ошибка! Возможно вы указали не верное ID окна или путь к нему.', 'error', undefined, __LINE__);
      }
    } else {
      Win.service.log('Ошибка! Не указано ID окна, которое будет открыто.', 'error', undefined, __LINE__);
    }
  },

  /**
   * Window close method
   * @param {string|object} [name] - Window name
   * @param {string} [name.type=close|closeAll|back] - Type of closing windows, windows or closing with the transition to the previous window
   * @param {number} [name.step=1] - Return step when closing the window to the previous
   * @param {string} [name.win] - Automatic opening of a window after closing the current one
   * @returns {Promise}
   * @description When closing a window, the history of opening windows is erased (History is not erased only with a forward or backward action)
   * @example - Close window by name
   *    Win.close('window_name');
   * @example - Close all windows
   *    Win.close(); 
   * @example - Closing the active window
   *    Win.close({
   *      type: 'close'
   *    }); 
   * @example - Closing the active window and opening a window from history N -1
   *    Win.close({
   *      type: 'back',
   *      step: 1
   *    }); 
   * @example - Close active window and open window from N+1 history
   *    Win.close({
   *      type: 'forward',
   *      step: 1
   *    }); 
   * @example - Close all windows
   *    Win.close({
   *      type: 'closeAll'
   *    });
   */
  close: (name) => {

    // Закрытие всех окон
    if(name == undefined){

      Win.service.log('Закрытие всех окн.', undefined, undefined, __LINE__);
      let status = false;

      if(document.getElementById(name) == undefined) status = false;

      return new Promise((resolve) => {

        let windows = document.getElementsByClassName('windows-window');
        document.getElementsByClassName('windows')[0].removeAttribute('active');

        for (const iterator of windows) {
          iterator.removeAttribute('active')
        }

        status = true;

        document.dispatchEvent(new CustomEvent(Win.cfg.events.winCloseAll.name, {
          detail: {
            name: undefined,
            container: undefined
          }
        }));

        Win.service.log('Закрытие всех окн. Завершилось со статусом ' + status, undefined, undefined, __LINE__);

        Win.service.history.arr = [];
        Win.service.history.active = -1;

        document.querySelectorAll('.windows-window .windows-window-content[swipenone]').forEach(el => {
          el.scrollTop = 0;
        });

        setTimeout(() => {
          document.querySelectorAll('.windows-window').forEach(el => {
            el.style.transform = '';
            el.style.height = '';
            el.style.width = '';
            el.style.borderRadius = '';
            el.removeAttribute('full')
          });
        }, 600)


        document.getElementsByClassName('windows')[0].querySelectorAll('*').forEach(el => {
          tabindex = el.getAttribute('tabindex');
          if(tabindex == undefined){
            el.setAttribute('tabindex', '-1')
          } else {
            el.setAttribute('data-tabindex', tabindex)
            el.setAttribute('tabindex', '-1')
          }
        })

        resolve({
          name: name,
          status: status
        });
      });

      

      

    }
    
    // Закрытие одного кона
    else {

      // Если закрываем по ID
      if(typeof name == 'string'){

        Win.service.log('Закрытие окна: ' + name, undefined, undefined, __LINE__);
        let status = false;

        if(document.getElementById(name) == undefined) status = false;

        return new Promise((resolve) => {

          document.getElementById(name).removeAttribute('active');
          document.getElementsByClassName('windows')[0].removeAttribute('active');

          status = true;

          document.dispatchEvent(new CustomEvent(Win.cfg.events.winClose.name, {
            detail: {
              name: name,
              container: document.getElementById(name).querySelector('.windows-window-content-div content')
            }
          }));

          Win.service.log('Закрытие окна: ' + name + '. Завершилось со статусом ' + status, undefined, undefined, __LINE__);

          Win.service.history.arr = [];
          Win.service.history.active = -1;

          document.querySelectorAll('.windows-window .windows-window-content[swipenone]').forEach(el => {
            el.scrollTop = 0;
          });

          setTimeout(() => {
            document.querySelectorAll('.windows-window').forEach(el => {
              el.style.transform = '';
              el.style.height = '';
              el.style.width = '';
              el.style.borderRadius = '';
              el.removeAttribute('full')
            });
          }, 600)

          document.getElementsByClassName('windows')[0].querySelectorAll('*').forEach(el => {
            tabindex = el.getAttribute('tabindex');
            if(tabindex == undefined){
              el.setAttribute('tabindex', '-1')
            } else {
              el.setAttribute('data-tabindex', tabindex)
              el.setAttribute('tabindex', '-1')
            }
          })
          resolve({
            name: name,
            status: status
          });
        });

        

      }

      // Если закрываем через object параметр
      else if(typeof name == 'object'){

        // Если нет действия с закрытием окна
        if(name['type'] == undefined) return false;

        // Если закрываем текущее окно
        if(name.type == 'close'){
          return Win.close(name.type);
        }

        // Если закрываем все окна
        if(name.type == 'closeAll'){
          return Win.close();
        }

        // Если нужно открыть открытое окно до этого
        if(name.type == 'forward'){

          let liveWin = Win.live('name')

          if(Win.service.history.arr.length == 0) {
            Win.service.log('Ошибка! Вернуться вперед нельзя, так как массив пустой', 'error', undefined, __LINE__);

            return new Promise((resolve) => {
              resolve({
                status: false
              });
            });
          }

          if(Win.service.history.arr.length == 1){
            Win.service.log('Ошибка! Вернуться вперед нельзя, так как было открыто всего 1 окно в текущем сеансе просмотра всплывающих окон', 'error', undefined, __LINE__);

            return new Promise((resolve) => {
              resolve({
                status: false
              });
            });
          }

          if(Win.service.history.arr.length == Win.service.history.active + 1){
            Win.service.log('Ошибка! Нельзя перейти вперед если небыло действий назад', 'error', undefined, __LINE__);

            return new Promise((resolve) => {
              resolve({
                status: false
              });
            });
          }
          
          Win.service.history.active++;

          let winElem = Win.service.history.arr[Win.service.history.active];

          Win.open(winElem.name, winElem.params, false).then(() => {
            return new Promise((resolve) => {

              document.dispatchEvent(new CustomEvent(Win.cfg.events.forward.name, {
                detail: {
                  old: {
                    name: liveWin,
                    container: document.getElementById(liveWin).querySelector('.windows-window-content-div content')
                  },
                  new: {
                    name: winElem.name,
                    container: document.getElementById(winElem.name).querySelector('.windows-window-content-div content')
                  }
                }
              }));

              resolve({
                status: true
              });
            });
          }).catch(e => {
            return new Promise((resolve) => {
              resolve({
                e: e,
                status: false
              });
            });
          });

          

          
          

        }

        // Если нужно открыть предыдущее окно
        if(name.type == 'back'){
          
          if(Win.service.history.arr.length <= 1) {
            Win.service.log('Ошибка! Вернуться назад нельзя, так как массив пустой', 'error');

            return new Promise(() => {
              return {
                status: false
              };
            });

          }

          Win.service.history.active = Win.service.history.active - 1;

          if(Win.service.history.active <= 0) {
            Win.service.history.active = 0
          }

          if(Win.service.history.active >= 0){
            let old = Win.live('name')
            if(old != Win.service.history.arr[Win.service.history.active].name){
              Win.open(Win.service.history.arr[Win.service.history.active].name, Win.service.history.arr[Win.service.history.active].params, false).then(e => {
              
                document.dispatchEvent(new CustomEvent(Win.cfg.events.winBack.name, {
                  detail: {
                    old: {
                      name: old,
                      container: document.getElementById(old).querySelector('.windows-window-content-div content')
                    },
                    new: {
                      name: Win.service.history.arr[Win.service.history.active].name,
                      container: document.getElementById(Win.service.history.arr[Win.service.history.active].name).querySelector('.windows-window-content-div content')
                    }
                  }
                }));

                return new Promise(() => {
                  return {
                    data: e,
                    status: true
                  };
                });
              }).catch(e => {
                return new Promise(() => {
                  return {
                    e: e,
                    status: false
                  };
                });
              });

              
            }
          }

          

        }

      }
      
      // Если указан не верный формат
      else {
        Win.service.log('Ошибка! Вы указали не верный формат объекта закрытия окна.', 'error', undefined, __LINE__);
      }

      

    }
    

 
    

  },

  /**
   * Active window view method
   * @param {string} [type=object] Return Value Variation
   * @param {Boolean} [param=false] Window initialization settings
   * @description If the window is closed or missing, it will return false
   * @example - Returns the DOM structure of the opened window
   *    Win.live(); 
   * @example - Returns the DOM structure of the opened window and what settings it was initialized with
   *    Win.live('object', true); 
   * @example - Returns the ID of the open window
   *    Win.live('name'); 
   * @example - Returns the ID of the open window and what settings it was initialized with
   *    Win.live('name', true); 
   */
  live: (type = 'object', param = false) => {
    if(type.match(/^object$/ui)){
      if(document.querySelector('.windows[active] > div.windows-window[active]') == null){
        return false;
      } else {
        if(param === true){
          return {
            elem: document.querySelector('.windows[active] > div.windows-window[active]'),
            settings: Win.service.history.arr[Win.service.history.active]
          }
        } else {
          return document.querySelector('.windows[active] > div.windows-window[active]');
        }
      }
    } else if(type.match(/^name$/ui)){
      if(document.querySelector('.windows[active] > div.windows-window[active]') == null){
        return false;
      } else {
        if(param === true){
          return {
            elem: document.querySelector('.windows[active] > div.windows-window[active]').getAttribute('id'),
            settings: Win.service.history.arr[Win.service.history.active]
          }
        } else {
          return document.querySelector('.windows[active] > div.windows-window[active]').getAttribute('id');
        }
        
      }
    } else {
      Win.service.log('Ошибка! Указан неправильный аргумент метода.', 'error', undefined, __LINE__);
      return false;
    }
  },

  /**
   * Method for checking whether a specific window is open or closed
   * @param {string|object} [name] Window ID or DOM structure of the window
   * @description If the window does not exist, it will return an object with undefined values
   * @example - Will return an object {id: 'ID_win', status: false|true}
   *    Win.status('ID_win'); 
   * @example - Will return an object {id: 'ID_win', status: false|true}
   *    Win.status(Win.live('object')); 
   * @returns {Object}
   */
  status: (name) => {
    if(typeof name == 'object'){
      if(name.classList.contains('windows-window')){
        let idWin = name.getAttribute('id');
        let active = name.getAttribute('active') != undefined;

        return {
          id: idWin,
          status: active
        };
      } else {
        return {
          id: undefined,
          status: false
        };
      }
    } else if(typeof name == 'string'){
      let elemBlock = document.getElementById(name);
      if(elemBlock != null){
        let idWin = elemBlock.getAttribute('id');
        let active = elemBlock.getAttribute('active') != undefined;

        return {
          id: idWin,
          status: active
        };
      } else {
        return {
          id: undefined,
          status: false
        };
      }
    } else {
      return {
        id: undefined,
        status: false
      };
    }
  },
  
  /**
   * Service functions
   */
  service: {
    
    history: {

      active: -1,
      arr: [],

      add: (name, history = true) => {
              
        if(Win.service.history.arr.length > 0){
          if(Win.service.history.arr[Win.service.history.arr.length - 1].name != name.name){
            if(history){
              Win.service.history.arr.push(name);
              ++Win.service.history.active;
              document.dispatchEvent(new CustomEvent(Win.cfg.events.winHistoryNew.name, {
                detail: {
                  params: name,
                  container: document.getElementById(name.name).querySelector('.windows-window-content-div content'),
                  active: Win.service.history.active,
                  history: Win.service.history.arr
                }
              }));
            }
          }
        } else {
          if(history){
            Win.service.history.arr.push(name);
            ++Win.service.history.active;
            document.dispatchEvent(new CustomEvent(Win.cfg.events.winHistoryNew.name, {
              detail: {
                params: name,
                container: document.getElementById(name.name).querySelector('.windows-window-content-div content'),
                active: Win.service.history.active,
                history: Win.service.history.arr
              }
            }));
          }
        }

        
        

        return Win.service.history.arr;
      },

      del: () => {

        let a = Win.service.history.arr.pop();

        document.dispatchEvent(new CustomEvent(Win.cfg.events.winHistorydel.name, {
          detail: {
            params: a,
            active: Win.service.history.active
          }
        }));
        
        return a;
      }

    },

    log: (a, type = 'log', b, line) => {

      if(Win.cfg.debug){
        if(type.match(/^(log)$/ui)){
          if(b == undefined){
            console.log(a, 'LOG_LINE: ' + line)
          } else {
            console.log(a, b, 'LOG_LINE: ' + line)
          }
        }
        if(type.match(/^(error)$/ui)){
          if(b == undefined){
            console.error(a, 'ERROR_LINE: ' + line)
          } else {
            console.error(a, b, 'ERROR_LINE: ' + line)
          }
        }
        if(type.match(/^(warn)$/ui)){
          if(b == undefined){
            console.warn(a, 'WARN_LINE: ' + line)
          } else {
            console.warn(a, b, 'WARN_LINE: ' + line)
          }
        }
        if(type.match(/^(table)$/ui)){
          if(b == undefined){
            console.table(a)
          } else {
            console.table(a, b)
          }
        }
      }
      

    },

    load: async (name, params) => {

      let response;

      let win_has = document.getElementById(name) != null;
      let update = false;

      if(params != undefined) {
        if(params['update'] != undefined) update = params['update']== true;
      }

      if(!win_has){
        Win.service.log('Окно на странице не найдено, сейчас оно будет загружено.', 'log', undefined, __LINE__);
        if(params == undefined){
          if(typeof name == 'string'){
            Win.service.log('Идет загрузка окна.', undefined, undefined, __LINE__);
            response = await fetch(Win.cfg.path + '/' + name + '.html').then((a) => {
              Win.service.log('Загрузка окна закончена.', undefined, undefined, __LINE__);
              return a;
            }).catch(error => {
              if(error.status == 404){
                Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', error, __LINE__);
              } else {
                Win.service.log('Ошибка! При загрузке окна произошла ошибка, более детальная информация: ', 'error', error, __LINE__);
              }
              
            });
          } else {
            Win.service.log('Ошибка! Путь к файлу не является строкой', 'error', undefined, __LINE__);
          }
        } else if(typeof params == 'object') {
          if(params.path != undefined){
            if(typeof params.path == 'string'){
              Win.service.log('Идет загрузка окна.', undefined, undefined, __LINE__);
              response = await fetch(params.path).then((a) => {
                Win.service.log('Загрузка окна закончена.', undefined, undefined, __LINE__);
                return a;
              }).catch(error => {
                if(error.status == 404){
                  Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', error, __LINE__);
                } else {
                  Win.service.log('Ошибка! При загрузке окна произошла ошибка, более детальная информация: ', 'error', error, __LINE__);
                }
              });
            } else {
              Win.service.log('Ошибка! Путь к файлу не является строкой.', 'error', undefined, __LINE__);
            }
          } else {
            if(typeof name == 'string'){
              Win.service.log('Идет загрузка окна.', undefined, undefined, __LINE__);
              response = await fetch(Win.cfg.path + '/' + name + '.html').then((a) => {
                Win.service.log('Загрузка окна закончена.', undefined, undefined, __LINE__);
                return a;
              }).catch(error => {
                if(error.status == 404){
                  Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', error, __LINE__);
                } else {
                  Win.service.log('Ошибка! При загрузке окна произошла ошибка, более детальная информация: ', 'error', error, __LINE__);
                }
              });
            } else {
              Win.service.log('Ошибка! Путь к файлу не является строкой', 'error', undefined, __LINE__);
            }
          }
        } else {
          Win.service.log('Ошибка! Аргумент с параметрами указан не верно.', 'error', undefined, __LINE__);
        }
      } else if(update) {
        Win.service.log('Окно найдено на странице и сейчас оно будет обновлено.', undefined, undefined, __LINE__);
        if(params == undefined){
          if(typeof name == 'string'){
            Win.service.log('Идет загрузка окна.', undefined, undefined, __LINE__);
            response = await fetch(Win.cfg.path + '/' + name + '.html').then((a) => {
              Win.service.log('Загрузка окна закончена.', undefined, undefined, __LINE__);
              return a;
            }).catch(error => {
              if(error.status == 404){
                Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', error, __LINE__);
              } else {
                Win.service.log('Ошибка! При загрузке окна произошла ошибка, более детальная информация: ', 'error', error, __LINE__);
              }
              
            });
          } else {
            Win.service.log('Ошибка! Путь к файлу не является строкой', 'error', undefined, __LINE__);
          }
        } else if(typeof params == 'object') {
          if(params.path != undefined){
            if(typeof params.path == 'string'){
              Win.service.log('Идет загрузка окна.', undefined, undefined, __LINE__);
              response = await fetch(params.path).then((a) => {
                Win.service.log('Загрузка окна закончена.', undefined, undefined, __LINE__);
                return a;
              }).catch(error => {
                if(error.status == 404){
                  Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', error, __LINE__);
                } else {
                  Win.service.log('Ошибка! При загрузке окна произошла ошибка, более детальная информация: ', 'error', error, __LINE__);
                }
              });
            } else {
              Win.service.log('Ошибка! Путь к файлу не является строкой.', 'error', undefined, __LINE__);
            }
          } else {
            if(typeof name == 'string'){
              Win.service.log('Идет загрузка окна.', undefined, undefined, __LINE__);
              response = await fetch(Win.cfg.path + '/' + name + '.html').then((a) => {
                Win.service.log('Загрузка окна закончена.', undefined, undefined, __LINE__);
                return a;
              }).catch(error => {
                if(error.status == 404){
                  Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', error, __LINE__);
                } else {
                  Win.service.log('Ошибка! При загрузке окна произошла ошибка, более детальная информация: ', 'error', error, __LINE__);
                }
              });
            } else {
              Win.service.log('Ошибка! Путь к файлу не является строкой', 'error', undefined, __LINE__);
            }
          }
        } else {
          Win.service.log('Ошибка! Аргумент с параметрами указан не верно.', 'error', undefined, __LINE__);
        }
      } else {
        Win.service.log('Окно на странице найдено.', undefined, undefined, __LINE__);
      }

      return response;

    },

    output: async (response, name, params) => {

      if(document.getElementById(name) == null){
        if(typeof response == 'object'){
          if(response.ok){
            let element = document.querySelector(".windows");

            let winHtml = '';
            winHtml += `<div class='windows-window' swipe-window id='${name}'>\n`;
            winHtml += `  <div class='windows-window-close' active></div>\n`;
            winHtml += `  <div class='windows-window-close-mobile_full'></div>\n`;

            if(typeof params == 'object'){

              if(params.back == undefined) params.back = Win.cfg.back;

              if(params.title == undefined){
                if(Win.cfg.back && params.back){
                  winHtml += `  <div class='windows-window-title'>\n`;
                  winHtml += `    <button back>Назад</button>\n`;
                  if(Win.cfg.forward){
                    winHtml += `    <button forward>Вперед</button>\n`;
                  }
                  winHtml += `    <span title>${name}</span>\n`;
                  winHtml += `  </div>\n`;
                } else {
                  winHtml += `  <div class='windows-window-title' title>${name}</div>\n`;
                }
                
              } else {
                if(Win.cfg.back && params.back){
                  winHtml += `  <div class='windows-window-title'>\n`;
                  winHtml += `    <button back>Назад</button>\n`;
                  if(Win.cfg.forward){
                    winHtml += `    <button forward>Вперед</button>\n`;
                  }
                  winHtml += `    <span title>${params.title}</span>\n`;
                  winHtml += `  </div>\n`;
                } else {
                  winHtml += `  <div class='windows-window-title' title>${params.title}</div>\n`;
                }
                
              }
            } else {
              if(Win.cfg.back){
                winHtml += `  <div class='windows-window-title'>\n`;
                winHtml += `    <button back>Назад</button>\n`;
                if(Win.cfg.forward){
                  winHtml += `    <button forward>Вперед</button>\n`;
                }
                winHtml += `    <span title>${name}</span>\n`;
                winHtml += `  </div>\n`;
              } else {
                winHtml += `  <div class='windows-window-title' title>${name}</div>\n`;
              }
              
            }

            if(typeof params == 'object'){
              if(params.title == ''){
                winHtml += `  <div class='windows-window-content' style='margin-top: 0px;' swipenone>\n`;
              } else {
                winHtml += `  <div class='windows-window-content' swipenone>\n`;
              }
            } else {
              winHtml += `  <div class='windows-window-content' swipenone>\n`;
            }

            winHtml += `    <div class='windows-window-content-div'><content>`;
            winHtml += await response.text();
            winHtml += `</content></div>\n`;
            winHtml += `  </div>\n`;
            winHtml += `</div>\n`;
            element.insertAdjacentHTML('afterbegin', winHtml);

            // if(Win.service.history.active > 0){
            //   document.getElementById(name).querySelector('.windows-window-title span[back]').style.display = ''
            // } else {
            //   document.getElementById(name).querySelector('.windows-window-title span[back]').style.display = 'none'
            // }

            return true;
          } else {
            if(response.status == 404){
              Win.service.log('Ошибка! Данное окно не было найдено по указанному пути.', 'error', response, __LINE__);
            } else {
              Win.service.log('Ошибка! Ответ от сервера не является положительным, более детальная информация: ', 'error', response, __LINE__);
            }
            return false;
          }
        } else {
          Win.service.log('Ошибка! Ответ от сервера не является объектом, более детальная информация: ', 'error', response, __LINE__);
          return false;
        }
      } else {
        Win.service.log('Ошибка! При попытке добавить окно полученное с севрера, было обнаружно уже существование данного окна: ' + name, 'error', undefined, __LINE__);
        return false;
      }
      
    },

    await: {

      arr: [],

      add: (elem) => {
        Win.service.await.arr.push(elem);
      },

      find: (name) => {
        let out = false;
        for (const key in Win.service.await.arr) {
          if (Object.hasOwnProperty.call(Win.service.await.arr, key)) {
            const elem = Win.service.await.arr[key];
            if(elem.name == name){
              out = Win.service.await.arr[key];
              Win.service.await.arr.splice(key, 1);
            }
          }
        }

        return out;
      }

    },

    getLine: function (offset) {
      try {
        var stack = new Error().stack.split('\n'),
            line = stack[(offset || 1) + 1].split(':');
        return parseInt(line[line.length - 2], 10);
      } catch (error) {
        return undefined;
      }
    },

    getLines: function(block){
      let blockComp = window.getComputedStyle(block);
      let lineHeight = (blockComp.getPropertyValue('line-height').match(/normal/ui)) ? Math.round(parseFloat(blockComp.getPropertyValue('font-size')) * 1.227273) : (blockComp.getPropertyValue('line-height').match(/em/ui)) ? parseFloat(blockComp.getPropertyValue('line-height')) * parseFloat(blockComp.getPropertyValue('font-size')) : (blockComp.getPropertyValue('line-height').match(/%/ui)) ? parseFloat(blockComp.getPropertyValue('font-size')) * (parseFloat(blockComp.getPropertyValue('line-height')) / 100) : (blockComp.getPropertyValue('line-height').match(/px/ui)) ? parseFloat(blockComp.getPropertyValue('line-height')) : parseFloat(blockComp.getPropertyValue('line-height')) * parseFloat(blockComp.getPropertyValue('font-size'));

      return parseInt(block.offsetHeight / lineHeight);
    },

    events: {
    
      scrollVar: {
        paddingTop: 0,
        setTimeout: undefined,
        eventAction: false,
      },
      
      scroll: function(e){

        const contentObj = e.srcElement
        const windowTop = contentObj.parentElement.getClientRects()[0].top;
        const windowObj = contentObj.parentElement;
        const contentObjDiv = contentObj.querySelector('.windows-window-content-div');
        const contentScrollHeight = contentObj.scrollHeight;
        const contentHeight = contentObj.getClientRects()[0].height
        const contentTop = contentObj.getClientRects()[0].top
        const contentScrollTop = contentObj.scrollTop;
        const radiusPx = parseFloat(getComputedStyle(document.body).getPropertyValue('--win-radius-lg'));

        if(document.documentElement.clientWidth <= 500){
          windowObj.style.transition = '0s all';

          if(contentScrollTop <= 50){

            let sumScroll = 100 / 50 * contentScrollTop;

            p = {
              bottom: 10 + ((0 - 10) * (sumScroll / 100)),
              height: (document.documentElement.clientHeight * 0.85) + (((window.innerHeight * 1) - (document.documentElement.clientHeight * 0.85)) * (sumScroll / 100)) + (document.documentElement.clientHeight - (windowObj.getBoundingClientRect().height + windowObj.getBoundingClientRect().top)),
              widthBig: 80 + ((59 - 80) * (sumScroll / 100)),
              width: 60 + ((parseFloat(getComputedStyle(windowObj).getPropertyValue('padding')) * 2 - 60) * (sumScroll / 100)),
              radius: radiusPx + ((0 - radiusPx) * (sumScroll / 100)),
              padding: sumScroll,
            };

          } else {
            
            p = {
              bottom: 0,
              height: (window.innerHeight * 1 + 1),
              widthBig: 59,
              width: parseFloat(getComputedStyle(windowObj).getPropertyValue('padding')) * 2,
              radius: 0,
              padding: 100,
            };
          }


          if(windowObj.querySelector('.windows-window-title') != undefined){
            let lines = Win.service.getLines(windowObj.querySelector('.windows-window-title'));
            
            let heightOutside = windowObj.querySelector('.windows-window-title').getBoundingClientRect().height / lines * (lines - 1);
            if(heightOutside > 0){
              contentObj.style.height = `calc(95% - ${heightOutside}px)`;
            } else if(lines == 0) {
              contentObj.style.height = '100%';
            } else {
              contentObj.style.height = '95%';
            }
          }

          if(contentScrollTop > 50){
            if(windowObj.getAttribute('full') == undefined){
              windowObj.setAttribute('full', '');
            }
            if(windowObj.getAttribute('big') == undefined){
              windowObj.style.width = 'calc(100vw - ' + p.width + 'px)';
            } else {
              windowObj.style.width = 'calc(100vw - ' + p.widthBig + 'px)';
            }
            windowObj.style.height = 'calc(100% - ' + parseFloat(getComputedStyle(windowObj).getPropertyValue('padding')) * 1 + 'px)';
            windowObj.style.borderRadius = p.radius + 'px';
            windowObj.style.transform = 'translate(-50%, ' + -p.bottom + 'px)';
            windowObj.querySelector('.windows-window-close').removeAttribute('active');
          } else {

            windowObj.querySelector('.windows-window-close').setAttribute('active','');
            if(windowObj.getAttribute('big') != undefined){
              if(contentScrollTop == 0){
                if(contentScrollHeight - 100 > contentHeight){
                  if(windowObj.getAttribute('full') != undefined){
                    windowObj.style.height = 'calc(85vh - 9px)';
                  } else {
                    windowObj.style.height = 'calc(85vh - 9px)';
                  }
                } else {
                  windowObj.style.height = 'calc(85vh - 9px)';
                }
                windowObj.style.width = '';
                windowObj.style.borderRadius = '';
              } else {
                windowObj.style.height = 'calc(' + p.height + 'px - ' + parseFloat(getComputedStyle(windowObj).getPropertyValue('padding')) * 1 + 'px)';
                windowObj.style.width = 'calc(100vw - ' + p.widthBig + 'px)';
                windowObj.style.borderRadius = p.radius + 'px';
              }
              
            } else {
              if(contentScrollTop == 0){
                if(contentScrollHeight - 100 > contentHeight){
                  if(windowObj.getAttribute('full') != undefined){
                    windowObj.style.height = 'calc(85vh - 9px)';
                  } else {
                    windowObj.style.height = 'calc(85vh - 9px)';
                  }
                } else {
                  windowObj.style.height = 'calc(85vh - 9px)';
                }
                windowObj.style.width = '';
                windowObj.style.borderRadius = '';
              } else {
                windowObj.style.height = 'calc(' + p.height + 'px - ' + parseFloat(getComputedStyle(windowObj).getPropertyValue('padding')) * 1 + 'px)';
                windowObj.style.width = 'calc(100vw - ' + p.width + 'px)';
                windowObj.style.borderRadius = p.radius + 'px';
              }
              
            }
            windowObj.style.transform = 'translate(-50%, ' + -p.bottom + 'px)';

            if(windowObj.getAttribute('full') != undefined){
              windowObj.removeAttribute('full');
            }

            if(windowObj.getAttribute('big') == undefined){
              windowObj.style.width = 'calc(100vw - ' + p.width + 'px)';
            } else {
              windowObj.style.width = 'calc(100vw - ' + p.widthBig + 'px)';
            }
          }

          

          contentObjDiv.style.paddingTop = (p.padding / 2) + 'px';

          clearTimeout(Win.service.events.scrollVar.setTimeout)
          Win.service.events.scrollVar.setTimeout = setTimeout(() => {
            windowObj.style.transition = ''
          }, 100)

          if(contentScrollTop <= 50){
            if(Win.service.events.scrollVar.eventAction){
              Win.service.events.scrollVar.eventAction = false;
              Win.service.log('Окно приняло стандартный размер', undefined, undefined, __LINE__);
              document.dispatchEvent(new CustomEvent(Win.cfg.events.winMinSize.name, {
                detail: {
                  name: e.srcElement.parentElement.getAttribute('id'),
                  container: e.srcElement.querySelector('.windows-window-content-div content')
                }
              }));
            }
          } else {
            if(!Win.service.events.scrollVar.eventAction){
              Win.service.events.scrollVar.eventAction = true;
              Win.service.log('Окно приняло полный размер рабочей области', undefined, undefined, __LINE__);
              document.dispatchEvent(new CustomEvent(Win.cfg.events.winFullSize.name, {
                detail: {
                  name: e.srcElement.parentElement.getAttribute('id'),
                  container: e.srcElement.querySelector('.windows-window-content-div content')
                }
              }));
            }
          }

        }


      },

      swipe: {
      
        var: {
          x_start: undefined,
          y_start: undefined,
          x_move: undefined,
          y_move: undefined,
          x_end: undefined,
          y_end: undefined,
          x_distance: 0,
          y_distance: undefined,
          speed: undefined,
          duration: undefined,
          last_duration: undefined,
          block: undefined,
          transition: undefined,
          y_percent: 0,
          x_percent: 0,
          time: 0,
          time_interval: undefined,
          diss: undefined,
          i: 0,
          status: false,
          status_right: true,
          f: true,
        },

        start: function(elem, e) {
          Win.service.events.swipe.var.transition = window.getComputedStyle(elem).getPropertyValue('transition');

          Win.service.events.swipe.var.time = 0;
          Win.service.events.swipe.var.diss = 0;

          Win.service.events.swipe.var.x_start = e.touches[0].clientX;
          Win.service.events.swipe.var.y_start = e.touches[0].clientY;
          Win.service.events.swipe.var.block = elem;
          Win.service.events.swipe.var.f = true;
          let path = e.composedPath ? e.composedPath() : e.path;
          path.forEach(function(ele, index) {
            if(ele.getAttribute != undefined) {
              if (ele.getAttribute('swipenone') !== null) {
                if (ele.scrollTop !== 0 || ele.scrollLeft !== 0) {
                  Win.service.events.swipe.var.f = false;
                }
              }
            }
            
          });
          if(!Win.service.events.swipe.var.f){
            Win.service.events.swipe.var.status = false;
          } else {
            if(Win.service.events.swipe.var.block.getAttribute('full') == undefined){
              Win.service.events.swipe.var.status = true;
            } else{
              Win.service.events.swipe.var.status = false;
            }
          }
          if (e.targetTouches.length != 1){
            Win.service.events.swipe.var.status = false;
          }
        },

        move: function (elem, e) {
          let path = e.composedPath ? e.composedPath() : e.path;
          path.forEach(function(ele, index) {
            if(ele.getAttribute != undefined) {
              if (ele.getAttribute('swipenone') !== null) {
                if (ele.scrollTop !== 0) {
                  Win.service.events.swipe.var.f = false;
                }
              }
            }
            
          });

          if(!Win.service.events.swipe.var.f){
            Win.service.events.swipe.var.status = false;
          } else {
            if(Win.service.events.swipe.var.block.getAttribute('full') != undefined){
              Win.service.events.swipe.var.status = false;
            }
          }

          if(Win.service.events.swipe.var.status){
            var duration;

            if(Win.service.events.swipe.var.y_start - e.touches[0].clientY > Win.service.events.swipe.var.y_distance){
              duration = 'top';
            } else if(Win.service.events.swipe.var.y_start - e.touches[0].clientY < Win.service.events.swipe.var.y_distance) {
              duration = 'bottom';
            } else if(Win.service.events.swipe.var.x_start - e.touches[0].clientX < Win.service.events.swipe.var.x_distance){
              duration = 'right';
            } else if(Win.service.events.swipe.var.x_start - e.touches[0].clientX > Win.service.events.swipe.var.x_distance){
              duration = 'left';
            } else {
              duration = Win.service.events.swipe.var.last_duration;
            }

            if(Win.service.events.swipe.var.last_duration != duration){
              Win.service.events.swipe.var.time = 0;
              Win.service.events.swipe.var.diss = 0;
            } else {
              Win.service.events.swipe.var.diss++;
            }
            Win.service.events.swipe.var.last_duration = duration;


            Win.service.events.swipe.var.x_move = e.touches[0].clientX;
            Win.service.events.swipe.var.y_move = e.touches[0].clientY;
            Win.service.events.swipe.var.x_distance = Win.service.events.swipe.var.x_start - Win.service.events.swipe.var.x_move;
            Win.service.events.swipe.var.y_distance = Win.service.events.swipe.var.y_start - Win.service.events.swipe.var.y_move;
            Win.service.events.swipe.var.xy_distance = Math.sqrt(Math.pow(Win.service.events.swipe.var.x_distance, 2) + Math.pow(Win.service.events.swipe.var.y_distance, 2));
            Win.service.events.swipe.var.time++;
            Win.service.events.swipe.var.block.style.transition = '0s all';


            e.stopImmediatePropagation();
            e.stopPropagation();

            if(Win.service.events.swipe.var.i < 3){
              if(Math.abs(Win.service.events.swipe.var.x_distance) > Math.abs(Win.service.events.swipe.var.y_distance)){
                if(Win.service.events.swipe.var.x_distance > 0){
                  // left
                  Win.service.events.swipe.var.duration = 'left';
                } else {
                  // right
                  Win.service.events.swipe.var.duration = 'right';
                }
              } else {
                if(Win.service.events.swipe.var.y_distance > 0){
                  // top
                  Win.service.events.swipe.var.duration = 'top';
                } else {
                  // bottom
                  Win.service.events.swipe.var.duration = 'bottom';
                }
              }
              Win.service.events.swipe.var.i++;
            }

            else {
              if(Win.service.events.swipe.var.duration == 'bottom'){
                
                if(Win.service.events.swipe.var.y_distance <= 0){
                  // Win.service.events.swipe.var.status = true;
                  if (document.documentElement.clientWidth <= 500) {
                    Win.service.events.swipe.var.block.style.transform = 'translate(-50%, ' + (-Win.service.events.swipe.var.y_distance - 10) + 'px)';
                  } else {
                    Win.service.events.swipe.var.block.style.transform = 'translate(-50%, calc(-50% - ' + (Win.service.events.swipe.var.y_distance) + 'px))';
                  }

                  elem.querySelector('.windows-window-content').style.overflow = 'hidden';
                  
                }

              }
              if(Win.service.events.swipe.var.duration == 'right'){
                var backElement = Win.live().querySelector('*[back]');

                let onclick = backElement.getAttribute('onclick');

                if(onclick == undefined){
                  Win.service.events.swipe.var.status_right = false;
                } else {
                  if(onclick.length == 0){
                    Win.service.events.swipe.var.status_right = false;
                  } else {
                    try {
                      Win.service.events.swipe.var.status_right = true;
                    } catch (error) {
                      
                    }
                  }
                }
                if(Win.service.events.swipe.var.status_right){
                  if(Win.service.events.swipe.var.x_distance <= 0){

                    if (document.documentElement.clientWidth <= 500) {
                      var xPercent = Math.abs(Win.service.events.swipe.var.x_distance * 100 / this.offsetWidth);
                      var xTranslate = Math.abs(Win.service.events.swipe.var.x_distance) * 0.35;
                      var yTranslate = Win.service.events.swipe.var.x_percent * 3;
                      var rotation = Win.service.events.swipe.var.x_percent * 0.5;

                      Win.service.events.swipe.var.block.style.transform = 'translate(calc(-50% + ' + xTranslate + 'px), calc(-10px + ' + yTranslate + 'px)) rotate(' + rotation + 'deg)';
                    } else {
                      var xTranslate = Math.abs(Win.service.events.swipe.var.x_distance);

                      Win.service.events.swipe.var.block.style.transform = 'translate(calc(-50% + ' + xTranslate + 'px), -50%)';
                    }
                  }
                }
                
              }
              if(Win.service.events.swipe.var.x_distance == 0 || Win.service.events.swipe.var.y_distance == 0){
                Win.service.events.swipe.var.time = 0;
              }

            }

            
          }
        },

        end: function (elem, e) {
          if(Win.service.events.swipe.var.status){
            var speed_lim = 0.96;
            Win.service.events.swipe.var.x_end = e.changedTouches[0].pageX;
            Win.service.events.swipe.var.y_end = e.changedTouches[0].pageY;
            Win.service.events.swipe.var.x_distance = Win.service.events.swipe.var.x_start - Win.service.events.swipe.var.x_end;
            Win.service.events.swipe.var.y_distance = Win.service.events.swipe.var.y_start - Win.service.events.swipe.var.y_end;
            Win.service.events.swipe.var.y_percent = Math.abs(Win.service.events.swipe.var.y_distance * 100 / elem.offsetHeight);
            Win.service.events.swipe.var.x_percent = Math.abs(Win.service.events.swipe.var.x_distance * 100 / elem.offsetWidth);
            Win.service.events.swipe.var.xy_distance = Math.sqrt(Math.pow(Win.service.events.swipe.var.x_distance, 2) + Math.pow(Win.service.events.swipe.var.y_distance, 2));
            Win.service.events.swipe.var.speed = Math.abs(Win.service.events.swipe.var.diss / Win.service.events.swipe.var.time);
            Win.service.events.swipe.var.i = 0;
            
            elem.querySelector('.windows-window-content').style.overflow = ''
            
            if(
                (Win.service.events.swipe.var.speed != Infinity)
                &&
                (
                  Win.service.events.swipe.var.y_percent > 40
                  ||
                  Math.abs(Win.service.events.swipe.var.y_distance) > 200
                  ||
                  Win.service.events.swipe.var.x_percent > 40
                )
              ){

              if (Win.service.events.swipe.var.speed < speed_lim) {
                Win.service.events.swipe.var.block.style.transition = (Win.service.events.swipe.var.speed / 3) + 's all';
              } else {
                Win.service.events.swipe.var.block.style.transition = Win.service.events.swipe.var.transition;
              }
              
              if(Win.service.events.swipe.var.duration == 'bottom'){
                if(Win.service.events.swipe.var.last_duration == 'bottom'){
                  Win.close();
                } else {

                  if (document.documentElement.clientWidth <= 500) {
                    Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -10px)';
                  } else {
                    Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -50%)';
                  }

                  Win.service.events.swipe.var.block.style.transition = (Win.service.events.swipe.var.speed / 3) + 's all';

                  setTimeout(function() {
                    Win.service.events.swipe.var.block.style.transition = Win.service.events.swipe.var.transition;
                  }, 100);

                }

              } else if(Win.service.events.swipe.var.duration == 'right') {
                let st = false;
                if(Win.service.events.swipe.var.status_right){
                  if(Win.service.events.swipe.var.last_duration == 'right' || Win.service.events.swipe.var.last_duration == 'bottom'){
                    var backElement = Win.live().querySelector('*[back]');
                    let onclick = backElement.getAttribute('onclick');

                    if(onclick != undefined){
                      if(onclick.length > 0){
                        // onclick = onclick.match(/(?<=['"`]).+(?=['"`])/);
                        // if(onclick){
                          // onclick = onclick[0];
                          // onclick = onclick.indexOf('#') < 0 ? '#' + onclick : onclick;
                          // Win.close(id);
                          // Win.open(onclick);
                        // } else {
                          st = true;
                        // }
                      } else {
                        st = true;
                      }
                    } else {
                      st = true;
                    }
                  } else {
                    st = true;
                  }
                } else {
                  st = true;
                }

                if(st){
                  if (document.documentElement.clientWidth <= 500) {
                    Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -10px)';
                  } else {
                    Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -50%)';
                  }

                  Win.service.events.swipe.var.block.style.transition = (Win.service.events.swipe.var.speed / 3) + 's all';

                  setTimeout(function() {
                    Win.service.events.swipe.var.block.style.transition = Win.service.events.swipe.var.transition;
                  }, 100);

                }
              } else {
                Win.service.events.swipe.var.block.style.transition = Win.service.events.swipe.var.transition;

                if (document.documentElement.clientWidth <= 500) {
                  Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -10px)';
                } else {
                  Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -50%)';
                }


              }


              
            } else {
              Win.service.events.swipe.var.block.style.transition = Win.service.events.swipe.var.transition;

              if (document.documentElement.clientWidth <= 500) {
                if (Win.service.events.swipe.var.block.getAttribute('full') !== null) {
                  Win.service.events.swipe.var.block.style.transform = 'translate(-50%, 0px)';
                } else {
                  Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -10px)';
                }
              } else {
                Win.service.events.swipe.var.block.style.transform = 'translate(-50%, -50%)';
              }
            }
            Win.service.events.swipe.var.duration = undefined;
          }
        }
      
      }

    }

  }
}



