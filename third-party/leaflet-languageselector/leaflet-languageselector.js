"use strict";
/**
 * Adds a language selector to Leaflet based maps.
 * License: CC0 (Creative Commons Zero), see http://creativecommons.org/publicdomain/zero/1.0/
 * Project page: https://github.com/buche/leaflet-languageselector
 **/
L.LanguageSelector = L.Control.extend({

  includes: L.Evented.prototype,

  options: {
    languages: new Array(),
    callback: null,
    title: null,
    position: 'topright',
    hideSelected: false,
    vertical: true,
    initialLanguage: null,
    buttonClassName: 'leaflet-control-languageselector-button',
    button: true
  },

  initialize: function(options) {
    this._buttons = new Array();
    L.Util.setOptions(this, options);
    this._container = L.DomUtil.create('div',
      'leaflet-control-layers leaflet-languageselector-control');
    L.DomEvent.disableClickPropagation(this._container);
    this._createLanguageSelector(this._container);
  },

  onAdd: function(map) {
    this._map = map;
    if (this.options.button) {

      console.log(this._container);

      L.DomUtil.addClass(this._container, this.options.buttonClassName);
	  L.DomEvent.on(this._container, 'mouseup', this._fireClick, this);
      /* L.DomEvent.on(this._container, 'mouseover', this._fireMouseOver, this);
      L.DomEvent.on(this._container, 'mouseout', this._fireMouseOut, this);  */
	  
	  
	  
	  L.DomEvent.addListener(this._map, 'click', function (e) {
            let buttonDiv = document.getElementsByClassName('leaflet-languageselector-control')[0];

			console.log(buttonDiv);
			console.log("x");
						L.DomUtil.addClass(buttonDiv, 'leaflet-control-languageselector-button');   /*            TODO this._container ->er Container   */
            });
	  
	  
	  
    }
    return this._container;
  },

  onRemove: function(map) {
    if (this.options.button) {
     L.DomEvent.off(this._container, 'mouseup', this._fireClick, this);
      /*  L.DomEvent.off(this._container, 'mouseover', this._fireMouseOver, this);
      L.DomEvent.off(this._container, 'mouseout', this._fireMouseOut, this); */
    }
    this._container.style.display = 'none';
    this._map = null;
  },

  _createLanguageSelector: function(container) {
    if (this.options.title) {
      let titleDiv = L.DomUtil.create('div', 'leaflet-languageselector-title', container);
      titleDiv.innerHTML = this.options.title;
    }
    let languagesDiv = L.DomUtil.create('div', 'leaflet-languageselector-languagesdiv', container);
    for (let i1 = 0; i1 < this.options.languages.length; i1++) {
      let lang = this.options.languages[i1];
      let langDiv = L.DomUtil.create('div', 'leaflet-languageselector-langdiv' +
        (this.options.vertical ? '' : ' leaflet-languageselector-float-left') +
        (i1 > 0 ? ' leaflet-languageselector-mleft' : ''), languagesDiv);
      if (lang.image) {
        let img = L.DomUtil.create('img', '', langDiv);
        img.src = lang.image;
        img.title = (lang.displayText ? lang.displayText : lang.id);
      } else {
        langDiv.innerHTML = lang.displayText ? lang.displayText : lang.id;
      }
      langDiv.id = 'languageselector_' + lang.id;
      langDiv._langselinstance = this;
      if (langDiv.addEventListener) {
        console.log("mouseup");
        langDiv.addEventListener('mouseup', this._languageChanged, false);
      } else {






        console.log("onmouseup");
        langDiv.attachEvent('onmouseup', this._languageChanged);
      }
      if (this.options.hideSelected && this.options.initialLanguage && this.options.initialLanguage == lang.id) {
        langDiv.style.display = 'none';
      }
      this._buttons.push(langDiv);
    }
  },

  _languageChanged: function(pEvent) {
    let elem = pEvent.target;
    if (!elem._langselinstance) {
      elem = elem.parentElement;
    }
    let inst = elem._langselinstance;
    let lang = elem.id.substr(0, 17) == 'languageselector_' ? elem.id.substr(17) : null;

    // hide language button
    if (inst.options.hideSelected) {
      for (let i = 0; i < inst._buttons.length; i++) {
        let b = inst._buttons[i];
        if (b.id == elem.id) {
          b.style.display = 'none';
        } else {
          b.style.display = 'block';
        }
      }
    }

    // callback
    if (inst.options.callback && typeof inst.options.callback == 'function') {
      inst.options.callback(lang);
    }
  },

  _isButton: function() {
    return L.DomUtil.hasClass(this._container, this.options.buttonClassName);
  },

  _toggleButton: function() {
  
    //this._container.classList.toggle(this.options.buttonClassName);
    
    if (this._isButton()) {
      L.DomUtil.removeClass(this._container, this.options.buttonClassName);
    } else {
      L.DomUtil.addClass(this._container, this.options.buttonClassName);
    }
  },

  _fireClick: function(e) {
    //this.fire('mouseover');

    if (this._isButton()) {
	  console.log('mouseover');
     /* this.fire('mouseover'); */
      setTimeout(this._toggleButton(), 500);
      //this._toggleButton();
    }
  },

  _fireMouseOver: function(e) {
    //this.fire('mouseover');

    if (this._isButton()) {
	  console.log('mouseover');
     /* this.fire('mouseover'); */
      setTimeout(this._toggleButton(), 500);
      //this._toggleButton();
    }
  },

  _fireMouseOut: function(e) {
    if (!this._isButton()) {
		console.log('mouseout');
      /* this.fire('mouseout'); */
      setTimeout(this._toggleButton(), 500);
      //this._toggleButton();
    }
  },

});

L.langObject = function(langId, text, img) {
  return {
    id: langId,
    displayText: text,
    image: img
  }
};

L.languageSelector = function(options) {
  return new L.LanguageSelector(options);
};
