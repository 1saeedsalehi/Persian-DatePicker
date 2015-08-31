
/*!
 * jQuery UI 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c, j) {
  function k(a, b) {
    var d = a.nodeName.toLowerCase();
    if ("area" === d) {
      b = a.parentNode;
      d = b.name;
      if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
      a = c("img[usemap=#" + d + "]")[0];
      return !!a && l(a)
    }
    return (/input|select|textarea|button|object/.test(d) ? !a.disabled : "a" == d ? a.href || b : b) && l(a)
  }

  function l(a) {
    return !c(a).parents().andSelf().filter(function() {
      return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
    }).length
  }
  c.ui = c.ui || {};
  if (!c.ui.version) {
    c.extend(c.ui, {
      version: "1.8.14",
      keyCode: {
        ALT: 18,
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91
      }
    });
    c.fn.extend({
      _focus: c.fn.focus,
      focus: function(a, b) {
        return typeof a === "number" ? this.each(function() {
          var d = this;
          setTimeout(function() {
            c(d).focus();
            b && b.call(d)
          }, a)
        }) : this._focus.apply(this, arguments)
      },
      scrollParent: function() {
        var a;
        a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
          return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
        }).eq(0) : this.parents().filter(function() {
          return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this,
            "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
        }).eq(0);
        return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
      },
      zIndex: function(a) {
        if (a !== j) return this.css("zIndex", a);
        if (this.length) {
          a = c(this[0]);
          for (var b; a.length && a[0] !== document;) {
            b = a.css("position");
            if (b === "absolute" || b === "relative" || b === "fixed") {
              b = parseInt(a.css("zIndex"), 10);
              if (!isNaN(b) && b !== 0) return b
            }
            a = a.parent()
          }
        }
        return 0
      },
      disableSelection: function() {
        return this.bind((c.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection",
          function(a) {
            a.preventDefault()
          })
      },
      enableSelection: function() {
        return this.unbind(".ui-disableSelection")
      }
    });
    c.each(["Width", "Height"], function(a, b) {
      function d(f, g, m, n) {
        c.each(e, function() {
          g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
          if (m) g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
          if (n) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
        });
        return g
      }
      var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        h = b.toLowerCase(),
        i = {
          innerWidth: c.fn.innerWidth,
          innerHeight: c.fn.innerHeight,
          outerWidth: c.fn.outerWidth,
          outerHeight: c.fn.outerHeight
        };
      c.fn["inner" + b] = function(f) {
        if (f === j) return i["inner" + b].call(this);
        return this.each(function() {
          c(this).css(h, d(this, f) + "px")
        })
      };
      c.fn["outer" + b] = function(f, g) {
        if (typeof f !== "number") return i["outer" + b].call(this, f);
        return this.each(function() {
          c(this).css(h, d(this, f, true, g) + "px")
        })
      }
    });
    c.extend(c.expr[":"], {
      data: function(a, b, d) {
        return !!c.data(a, d[3])
      },
      focusable: function(a) {
        return k(a, !isNaN(c.attr(a, "tabindex")))
      },
      tabbable: function(a) {
        var b = c.attr(a, "tabindex"),
          d = isNaN(b);
        return (d || b >= 0) && k(a, !d)
      }
    });
    c(function() {
      var a = document.body,
        b = a.appendChild(b = document.createElement("div"));
      c.extend(b.style, {
        minHeight: "100px",
        height: "auto",
        padding: 0,
        borderWidth: 0
      });
      c.support.minHeight = b.offsetHeight === 100;
      c.support.selectstart = "onselectstart" in b;
      a.removeChild(b).style.display = "none"
    });
    c.extend(c.ui, {
      plugin: {
        add: function(a, b, d) {
          a = c.ui[a].prototype;
          for (var e in d) {
            a.plugins[e] = a.plugins[e] || [];
            a.plugins[e].push([b, d[e]])
          }
        },
        call: function(a, b, d) {
          if ((b = a.plugins[b]) && a.element[0].parentNode)
            for (var e =
                0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d)
        }
      },
      contains: function(a, b) {
        return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
      },
      hasScroll: function(a, b) {
        if (c(a).css("overflow") === "hidden") return false;
        b = b && b === "left" ? "scrollLeft" : "scrollTop";
        var d = false;
        if (a[b] > 0) return true;
        a[b] = 1;
        d = a[b] > 0;
        a[b] = 0;
        return d
      },
      isOverAxis: function(a, b, d) {
        return a > b && a < b + d
      },
      isOver: function(a, b, d, e, h, i) {
        return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
      }
    })
  }
})(jQuery);
/*
 * jQuery UI Datepicker 1.8.14 (with custom calendar support)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Support for custom calendar added by Mahdi Hasheminezhad. email: hasheminezhad at gmail dot com (http://hasheminezhad.com)
 * Release date: 2011-08-05
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function($, undefined) {
  $.extend($.ui, {
    datepicker: {
      version: "1.8.14"
    }
  });
  var PROP_NAME = "datepicker";
  var dpuuid = new Date().getTime();
  var instActive;

  function Datepicker() {
    this.debug = false;
    this._curInst = null;
    this._keyEvent = false;
    this._disabledInputs = [];
    this._datepickerShowing = false;
    this._inDialog = false;
    this._mainDivId = "ui-datepicker-div";
    this._inlineClass = "ui-datepicker-inline";
    this._appendClass = "ui-datepicker-append";
    this._triggerClass = "ui-datepicker-trigger";
    this._dialogClass = "ui-datepicker-dialog";
    this._disableClass = "ui-datepicker-disabled";
    this._unselectableClass = "ui-datepicker-unselectable";
    this._currentClass = "ui-datepicker-current-day";
    this._dayOverClass = "ui-datepicker-days-cell-over";
    this.regional = [];
    this.regional[""] = {
      calendar: Date,
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "mm/dd/yy",
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ""
    };
    this._defaults = {
      showOn: "focus",
      showAnim: "fadeIn",
      showOptions: {},
      defaultDate: null,
      appendText: "",
      buttonText: "...",
      buttonImage: "",
      buttonImageOnly: false,
      hideIfNoPrevNext: false,
      navigationAsDateFormat: false,
      gotoCurrent: false,
      changeMonth: false,
      changeYear: false,
      yearRange: "c-10:c+10",
      showOtherMonths: false,
      selectOtherMonths: false,
      showWeek: false,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: "+10",
      minDate: null,
      maxDate: null,
      duration: "fast",
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: "",
      altFormat: "",
      constrainInput: true,
      showButtonPanel: false,
      autoSize: false
    };
    $.extend(this._defaults, this.regional[""]);
    this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
  }
  $.extend(Datepicker.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    log: function() {
      if (this.debug) {
        console.log.apply("", arguments)
      }
    },
    _widgetDatepicker: function() {
      return this.dpDiv
    },
    setDefaults: function(settings) {
      extendRemove(this._defaults, settings || {});
      return this
    },
    _attachDatepicker: function(target, settings) {
      var inlineSettings = null;
      for (var attrName in this._defaults) {
        var attrValue = target.getAttribute("date:" + attrName);
        if (attrValue) {
          inlineSettings = inlineSettings || {};
          try {
            inlineSettings[attrName] = eval(attrValue)
          } catch (err) {
            inlineSettings[attrName] = attrValue
          }
        }
      }
      var nodeName = target.nodeName.toLowerCase();
      var inline = (nodeName == "div" || nodeName == "span");
      if (!target.id) {
        this.uuid += 1;
        target.id = "dp" + this.uuid
      }
      var inst = this._newInst($(target), inline);
      var regional = $.extend({}, settings && this.regional[settings.regional] || {});
      inst.settings = $.extend(regional, settings || {}, inlineSettings || {});
      if (nodeName == "input") {
        this._connectDatepicker(target, inst)
      } else {
        if (inline) {
          this._inlineDatepicker(target, inst)
        }
      }
    },
    _newInst: function(target, inline) {
      var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
      return {
        id: id,
        input: target,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: inline,
        dpDiv: (!inline ? this.dpDiv : bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
      }
    },
    _connectDatepicker: function(target, inst) {
      var input = $(target);
      inst.append = $([]);
      inst.trigger = $([]);
      if (input.hasClass(this.markerClassName)) {
        return
      }
      this._attachments(input, inst);
      input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
        inst.settings[key] = value
      }).bind("getData.datepicker", function(event, key) {
        return this._get(inst, key)
      });
      this._autoSize(inst);
      $.data(target, PROP_NAME, inst)
    },
    _attachments: function(input, inst) {
      var appendText = this._get(inst, "appendText");
      var isRTL = false;
      if (inst.append) {
        inst.append.remove()
      }
      if (appendText) {
        inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
        input[isRTL ? "before" : "after"](inst.append)
      }
      input.unbind("focus", this._showDatepicker);
      if (inst.trigger) {
        inst.trigger.remove()
      }
      var showOn = this._get(inst, "showOn");
      if (showOn == "focus" || showOn == "both") {
        input.focus(this._showDatepicker)
      }
      if (showOn == "button" || showOn == "both") {
        var buttonText = this._get(inst, "buttonText");
        var buttonImage = this._get(inst, "buttonImage");
        inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
          src: buttonImage,
          alt: buttonText,
          title: buttonText
        }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
          src: buttonImage,
          alt: buttonText,
          title: buttonText
        })));
        input[isRTL ? "before" : "after"](inst.trigger);
        inst.trigger.click(function() {
          if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0]) {
            $.datepicker._hideDatepicker()
          } else {
            $.datepicker._showDatepicker(input[0])
          }
          return false
        })
      }
    },
    _autoSize: function(inst) {
      if (this._get(inst, "autoSize") && !inst.inline) {
        var date = new Date(2009, 12 - 1, 20);
        var dateFormat = this._get(inst, "dateFormat");
        if (dateFormat.match(/[DM]/)) {
          var findMax = function(names) {
            var max = 0;
            var maxI = 0;
            for (var i = 0; i < names.length; i++) {
              if (names[i].length > max) {
                max = names[i].length;
                maxI = i
              }
            }
            return maxI
          };
          date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))));
          date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - date.getDay())
        }
        inst.input.attr("size", this._formatDate(inst, date).length)
      }
    },
    _inlineDatepicker: function(target, inst) {
      var divSpan = $(target);
      if (divSpan.hasClass(this.markerClassName)) {
        return
      }
      divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
        inst.settings[key] = value
      }).bind("getData.datepicker", function(event, key) {
        return this._get(inst, key)
      });
      $.data(target, PROP_NAME, inst);
      this._setDate(inst, this._getDefaultDate(inst), true);
      this._updateDatepicker(inst);
      this._updateAlternate(inst);
      inst.dpDiv.show()
    },
    _dialogDatepicker: function(input, date, onSelect, settings, pos) {
      var inst = this._dialogInst;
      if (!inst) {
        this.uuid += 1;
        var id = "dp" + this.uuid;
        this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
        this._dialogInput.keydown(this._doKeyDown);
        $("body").append(this._dialogInput);
        inst = this._dialogInst = this._newInst(this._dialogInput, false);
        inst.settings = {};
        $.data(this._dialogInput[0], PROP_NAME, inst)
      }
      extendRemove(inst.settings, settings || {});
      date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
      this._dialogInput.val(date);
      this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
      if (!this._pos) {
        var browserWidth = document.documentElement.clientWidth;
        var browserHeight = document.documentElement.clientHeight;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
      }
      this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
      inst.settings.onSelect = onSelect;
      this._inDialog = true;
      this.dpDiv.addClass(this._dialogClass);
      this._showDatepicker(this._dialogInput[0]);
      if ($.blockUI) {
        $.blockUI(this.dpDiv)
      }
      $.data(this._dialogInput[0], PROP_NAME, inst);
      return this
    },
    _destroyDatepicker: function(target) {
      var $target = $(target);
      var inst = $.data(target, PROP_NAME);
      if (!$target.hasClass(this.markerClassName)) {
        return
      }
      var nodeName = target.nodeName.toLowerCase();
      $.removeData(target, PROP_NAME);
      if (nodeName == "input") {
        inst.append.remove();
        inst.trigger.remove();
        $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
      } else {
        if (nodeName == "div" || nodeName == "span") {
          $target.removeClass(this.markerClassName).empty()
        }
      }
    },
    _enableDatepicker: function(target) {
      var $target = $(target);
      var inst = $.data(target, PROP_NAME);
      if (!$target.hasClass(this.markerClassName)) {
        return
      }
      var nodeName = target.nodeName.toLowerCase();
      if (nodeName == "input") {
        target.disabled = false;
        inst.trigger.filter("button").each(function() {
          this.disabled = false
        }).end().filter("img").css({
          opacity: "1.0",
          cursor: ""
        })
      } else {
        if (nodeName == "div" || nodeName == "span") {
          var inline = $target.children("." + this._inlineClass);
          inline.children().removeClass("ui-state-disabled");
          inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
        }
      }
      this._disabledInputs = $.map(this._disabledInputs, function(value) {
        return (value == target ? null : value)
      })
    },
    _disableDatepicker: function(target) {
      var $target = $(target);
      var inst = $.data(target, PROP_NAME);
      if (!$target.hasClass(this.markerClassName)) {
        return
      }
      var nodeName = target.nodeName.toLowerCase();
      if (nodeName == "input") {
        target.disabled = true;
        inst.trigger.filter("button").each(function() {
          this.disabled = true
        }).end().filter("img").css({
          opacity: "0.5",
          cursor: "default"
        })
      } else {
        if (nodeName == "div" || nodeName == "span") {
          var inline = $target.children("." + this._inlineClass);
          inline.children().addClass("ui-state-disabled");
          inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
        }
      }
      this._disabledInputs = $.map(this._disabledInputs, function(value) {
        return (value == target ? null : value)
      });
      this._disabledInputs[this._disabledInputs.length] = target
    },
    _isDisabledDatepicker: function(target) {
      if (!target) {
        return false
      }
      for (var i = 0; i < this._disabledInputs.length; i++) {
        if (this._disabledInputs[i] == target) {
          return true
        }
      }
      return false
    },
    _getInst: function(target) {
      try {
        return $.data(target, PROP_NAME)
      } catch (err) {
        throw "Missing instance data for this datepicker"
      }
    },
    _optionDatepicker: function(target, name, value) {
      var inst = this._getInst(target);
      if (arguments.length == 2 && typeof name == "string") {
        return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
      }
      var settings = name || {};
      if (typeof name == "string") {
        settings = {};
        settings[name] = value
      }
      if (inst) {
        if (this._curInst == inst) {
          this._hideDatepicker()
        }
        var date = this._getDateDatepicker(target, true);
        var minDate = this._getMinMaxDate(inst, "min");
        var maxDate = this._getMinMaxDate(inst, "max");
        extendRemove(inst.settings, settings);
        if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
          inst.settings.minDate = this._formatDate(inst, minDate)
        }
        if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
          inst.settings.maxDate = this._formatDate(inst, maxDate)
        }
        this._attachments($(target), inst);
        this._autoSize(inst);
        this._setDate(inst, date);
        this._updateAlternate(inst);
        this._updateDatepicker(inst)
      }
    },
    _changeDatepicker: function(target, name, value) {
      this._optionDatepicker(target, name, value)
    },
    _refreshDatepicker: function(target) {
      var inst = this._getInst(target);
      if (inst) {
        this._updateDatepicker(inst)
      }
    },
    _setDateDatepicker: function(target, date) {
      var inst = this._getInst(target);
      if (inst) {
        this._setDate(inst, date);
        this._updateDatepicker(inst);
        this._updateAlternate(inst)
      }
    },
    _getDateDatepicker: function(target, noDefault) {
      var inst = this._getInst(target);
      if (inst && !inst.inline) {
        this._setDateFromField(inst, noDefault)
      }
      return (inst ? this._getDate(inst) : null)
    },
    _doKeyDown: function(event) {
      var inst = $.datepicker._getInst(event.target);
      var handled = true;
      var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
      inst._keyEvent = true;
      if ($.datepicker._datepickerShowing) {
        switch (event.keyCode) {
          case 9:
            $.datepicker._hideDatepicker();
            handled = false;
            break;
          case 13:
            var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
            if (sel[0]) {
              $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
            } else {
              $.datepicker._hideDatepicker()
            }
            return false;
            break;
          case 27:
            $.datepicker._hideDatepicker();
            break;
          case 33:
            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
            break;
          case 34:
            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
            break;
          case 35:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._clearDate(event.target)
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          case 36:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._gotoToday(event.target)
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          case 37:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
            }
            handled = event.ctrlKey || event.metaKey;
            if (event.originalEvent.altKey) {
              $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
            }
            break;
          case 38:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, -7, "D")
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          case 39:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
            }
            handled = event.ctrlKey || event.metaKey;
            if (event.originalEvent.altKey) {
              $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
            }
            break;
          case 40:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, +7, "D")
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          default:
            handled = false
        }
      } else {
        if (event.keyCode == 36 && event.ctrlKey) {
          $.datepicker._showDatepicker(this)
        } else {
          handled = false
        }
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation()
      }
    },
    _doKeyPress: function(event) {
      var inst = $.datepicker._getInst(event.target);
      if ($.datepicker._get(inst, "constrainInput")) {
        var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
        var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
        return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
      }
    },
    _doKeyUp: function(event) {
      var inst = $.datepicker._getInst(event.target);
      if (inst.input.val() != inst.lastVal) {
        try {
          var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
          if (date) {
            $.datepicker._setDateFromField(inst);
            $.datepicker._updateAlternate(inst);
            $.datepicker._updateDatepicker(inst)
          }
        } catch (event) {
          $.datepicker.log(event)
        }
      }
      return true
    },
    _showDatepicker: function(input) {
      input = input.target || input;
      if (input.nodeName.toLowerCase() != "input") {
        input = $("input", input.parentNode)[0]
      }
      if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
        return
      }
      var inst = $.datepicker._getInst(input);
      if ($.datepicker._curInst && $.datepicker._curInst != inst) {
        if ($.datepicker._datepickerShowing) {
          $.datepicker._triggerOnClose($.datepicker._curInst)
        }
        $.datepicker._curInst.dpDiv.stop(true, true)
      }
      var beforeShow = $.datepicker._get(inst, "beforeShow");
      extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
      inst.lastVal = null;
      $.datepicker._lastInput = input;
      $.datepicker._setDateFromField(inst);
      if ($.datepicker._inDialog) {
        input.value = ""
      }
      if (!$.datepicker._pos) {
        $.datepicker._pos = $.datepicker._findPos(input);
        $.datepicker._pos[1] += input.offsetHeight
      }
      var isFixed = false;
      $(input).parents().each(function() {
        isFixed |= $(this).css("position") == "fixed";
        return !isFixed
      });
      if (isFixed && $.browser.opera) {
        $.datepicker._pos[0] -= document.documentElement.scrollLeft;
        $.datepicker._pos[1] -= document.documentElement.scrollTop
      }
      var offset = {
        left: $.datepicker._pos[0],
        top: $.datepicker._pos[1]
      };
      $.datepicker._pos = null;
      inst.dpDiv.empty();
      inst.dpDiv.css({
        position: "absolute",
        display: "block",
        top: "-1000px"
      });
      $.datepicker._updateDatepicker(inst);
      offset = $.datepicker._checkOffset(inst, offset, isFixed);
      inst.dpDiv.css({
        position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
        display: "none",
        left: offset.left + "px",
        top: offset.top + "px"
      });
      if (!inst.inline) {
        var showAnim = $.datepicker._get(inst, "showAnim");
        var duration = $.datepicker._get(inst, "duration");
        var postProcess = function() {
          var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
          if (!!cover.length) {
            var borders = $.datepicker._getBorders(inst.dpDiv);
            cover.css({
              left: -borders[0],
              top: -borders[1],
              width: inst.dpDiv.outerWidth(),
              height: inst.dpDiv.outerHeight()
            })
          }
        };
        inst.dpDiv.zIndex($(input).zIndex() + 1);
        $.datepicker._datepickerShowing = true;
        if ($.effects && $.effects[showAnim]) {
          inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
        } else {
          inst.dpDiv[showAnim || "show"]((showAnim ? duration : null), postProcess)
        }
        if (!showAnim || !duration) {
          postProcess()
        }
        if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
          inst.input.focus()
        }
        $.datepicker._curInst = inst
      }
    },
    _updateDatepicker: function(inst) {
      var self = this;
      self.maxRows = 4;
      var borders = $.datepicker._getBorders(inst.dpDiv);
      instActive = inst;
      inst.dpDiv.empty().append(this._generateHTML(inst));
      var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
      if (!!cover.length) {
        cover.css({
          left: -borders[0],
          top: -borders[1],
          width: inst.dpDiv.outerWidth(),
          height: inst.dpDiv.outerHeight()
        })
      }
      inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
      var numMonths = this._getNumberOfMonths(inst);
      var cols = numMonths[1];
      var width = 17;
      inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
      if (cols > 1) {
        inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
      }
      inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
      inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
      if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] != document.activeElement) {
        inst.input.focus()
      }
      if (inst.yearshtml) {
        var origyearshtml = inst.yearshtml;
        setTimeout(function() {
          if (origyearshtml === inst.yearshtml && inst.yearshtml) {
            inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
          }
          origyearshtml = inst.yearshtml = null
        }, 0)
      }
    },
    _getBorders: function(elem) {
      var convert = function(value) {
        return {
          thin: 1,
          medium: 2,
          thick: 3
        }[value] || value
      };
      return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
    },
    _checkOffset: function(inst, offset, isFixed) {
      var dpWidth = inst.dpDiv.outerWidth();
      var dpHeight = inst.dpDiv.outerHeight();
      var inputWidth = inst.input ? inst.input.outerWidth() : 0;
      var inputHeight = inst.input ? inst.input.outerHeight() : 0;
      var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
      var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
      offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
      offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
      offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
      offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
      offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
      return offset
    },
    _findPos: function(obj) {
      var inst = this._getInst(obj);
      var isRTL = this._get(inst, "isRTL");
      while (obj && (obj.type == "hidden" || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
        obj = obj[isRTL ? "previousSibling" : "nextSibling"]
      }
      var position = $(obj).offset();
      return [position.left, position.top]
    },
    _triggerOnClose: function(inst) {
      var onClose = this._get(inst, "onClose");
      if (onClose) {
        onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
      }
    },
    _hideDatepicker: function(input) {
      var inst = this._curInst;
      if (!inst || (input && inst != $.data(input, PROP_NAME))) {
        return
      }
      if (this._datepickerShowing) {
        var showAnim = this._get(inst, "showAnim");
        var duration = this._get(inst, "duration");
        var postProcess = function() {
          $.datepicker._tidyDialog(inst);
          this._curInst = null
        };
        if ($.effects && $.effects[showAnim]) {
          inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
        } else {
          inst.dpDiv[(showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess)
        }
        if (!showAnim) {
          postProcess()
        }
        $.datepicker._triggerOnClose(inst);
        this._datepickerShowing = false;
        this._lastInput = null;
        if (this._inDialog) {
          this._dialogInput.css({
            position: "absolute",
            left: "0",
            top: "-100px"
          });
          if ($.blockUI) {
            $.unblockUI();
            $("body").append(this.dpDiv)
          }
        }
        this._inDialog = false
      }
    },
    _tidyDialog: function(inst) {
      inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
    },
    _checkExternalClick: function(event) {
      if (!$.datepicker._curInst) {
        return
      }
      var $target = $(event.target);
      if ($target[0].id != $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
        $.datepicker._hideDatepicker()
      }
    },
    _adjustDate: function(id, offset, period) {
      var target = $(id);
      var inst = this._getInst(target[0]);
      if (this._isDisabledDatepicker(target[0])) {
        return
      }
      this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
      this._updateDatepicker(inst)
    },
    _gotoToday: function(id) {
      var target = $(id);
      var inst = this._getInst(target[0]);
      if (this._get(inst, "gotoCurrent") && inst.currentDay) {
        inst.selectedDay = inst.currentDay;
        inst.drawMonth = inst.selectedMonth = inst.currentMonth;
        inst.drawYear = inst.selectedYear = inst.currentYear
      } else {
        var date = new this.CDate();
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear()
      }
      this._notifyChange(inst);
      this._adjustDate(target)
    },
    _selectMonthYear: function(id, select, period) {
      var target = $(id);
      var inst = this._getInst(target[0]);
      inst._selectingMonthYear = false;
      inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
      this._notifyChange(inst);
      this._adjustDate(target)
    },
    _clickMonthYear: function(id) {
      var target = $(id);
      var inst = this._getInst(target[0]);
      if (inst.input && inst._selectingMonthYear) {
        setTimeout(function() {
          inst.input.focus()
        }, 0)
      }
      inst._selectingMonthYear = !inst._selectingMonthYear
    },
    _selectDay: function(id, month, year, td) {
      var target = $(id);
      if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
        return
      }
      var inst = this._getInst(target[0]);
      inst.selectedDay = inst.currentDay = $("a", td).html();
      inst.selectedMonth = inst.currentMonth = month;
      inst.selectedYear = inst.currentYear = year;
      this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
    },
    _clearDate: function(id) {
      var target = $(id);
      var inst = this._getInst(target[0]);
      this._selectDate(target, "")
    },
    _selectDate: function(id, dateStr) {
      var target = $(id);
      var inst = this._getInst(target[0]);
      dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
      if (inst.input) {
        inst.input.val(dateStr)
      }
      this._updateAlternate(inst);
      var onSelect = this._get(inst, "onSelect");
      if (onSelect) {
        onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
      } else {
        if (inst.input) {
          inst.input.trigger("change")
        }
      }
      if (inst.inline) {
        this._updateDatepicker(inst)
      } else {
        this._hideDatepicker();
        this._lastInput = inst.input[0];
        if (typeof(inst.input[0]) != "object") {
          inst.input.focus()
        }
        this._lastInput = null
      }
    },
    _updateAlternate: function(inst) {
      var altField = this._get(inst, "altField");
      if (altField) {
        var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
        var date = this._getDate(inst);
        var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
        $(altField).each(function() {
          $(this).val(dateStr)
        })
      }
    },
    noWeekends: function(date) {
      var day = date.getDay();
      return [(day > 0 && day < 6), ""]
    },
    iso8601Week: function(date) {
      var checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      var time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
    },
    parseDate: function(format, value, settings) {
      if (format == null || value == null) {
        throw "Invalid arguments"
      }
      value = (typeof value == "object" ? value.toString() : value + "");
      if (value == "") {
        return null
      }
      var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
      shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new this.CDate().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
      var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
      var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
      var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
      var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
      var year = -1;
      var month = -1;
      var day = -1;
      var doy = -1;
      var literal = false;
      var lookAhead = function(match) {
        var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
        if (matches) {
          iFormat++
        }
        return matches
      };
      var getNumber = function(match) {
        var isDoubled = lookAhead(match);
        var size = (match == "@" ? 14 : (match == "!" ? 20 : (match == "y" && isDoubled ? 4 : (match == "o" ? 3 : 2))));
        var digits = new RegExp("^\\d{1," + size + "}");
        var num = value.substring(iValue).match(digits);
        if (!num) {
          throw "Missing number at position " + iValue
        }
        iValue += num[0].length;
        return parseInt(num[0], 10)
      };
      var getName = function(match, shortNames, longNames) {
        var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
          return [
            [k, v]
          ]
        }).sort(function(a, b) {
          return -(a[1].length - b[1].length)
        });
        var index = -1;
        $.each(names, function(i, pair) {
          var name = pair[1];
          if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
            index = pair[0];
            iValue += name.length;
            return false
          }
        });
        if (index != -1) {
          return index + 1
        } else {
          throw "Unknown name at position " + iValue
        }
      };
      var checkLiteral = function() {
        if (value.charAt(iValue) != format.charAt(iFormat)) {
          throw "Unexpected literal at position " + iValue
        }
        iValue++
      };
      var iValue = 0;
      for (var iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
            literal = false
          } else {
            checkLiteral()
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
              day = getNumber("d");
              break;
            case "D":
              getName("D", dayNamesShort, dayNames);
              break;
            case "o":
              doy = getNumber("o");
              break;
            case "m":
              month = getNumber("m");
              break;
            case "M":
              month = getName("M", monthNamesShort, monthNames);
              break;
            case "y":
              year = getNumber("y");
              break;
            case "@":
              var date = new this.CDate(getNumber("@"));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "!":
              var date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral()
              } else {
                literal = true
              }
              break;
            default:
              checkLiteral()
          }
        }
      }
      if (iValue < value.length) {
        throw "Extra/unparsed characters found in date: " + value.substring(iValue)
      }
      if (year == -1) {
        year = new this.CDate().getFullYear()
      } else {
        if (year < 100) {
          year += new this.CDate().getFullYear() - new this.CDate().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
        }
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          var dim = this._getDaysInMonth(year, month - 1);
          if (day <= dim) {
            break
          }
          month++;
          day -= dim
        } while (true)
      }
      var date = this._daylightSavingAdjust(new this.CDate(year, month - 1, day));
      if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
        throw "Invalid date"
      }
      return date
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
    formatDate: function(format, date, settings) {
      if (!date) {
        return ""
      }
      var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
      var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
      var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
      var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
      var lookAhead = function(match) {
        var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
        if (matches) {
          iFormat++
        }
        return matches
      };
      var formatNumber = function(match, value, len) {
        var num = "" + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = "0" + num
          }
        }
        return num
      };
      var formatName = function(match, value, shortNames, longNames) {
        return (lookAhead(match) ? longNames[value] : shortNames[value])
      };
      var output = "";
      var literal = false;
      if (date) {
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
              literal = false
            } else {
              output += format.charAt(iFormat)
            }
          } else {
            switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;
              case "D":
                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                break;
              case "o":
                output += formatNumber("o", Math.round((new this.CDate(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new this.CDate(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                break;
              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;
              case "M":
                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                break;
              case "y":
                output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                break;
              case "@":
                output += date.getTime();
                break;
              case "!":
                output += date.getTime() * 10000 + this._ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'"
                } else {
                  literal = true
                }
                break;
              default:
                output += format.charAt(iFormat)
            }
          }
        }
      }
      return output
    },
    _possibleChars: function(format) {
      var chars = "";
      var literal = false;
      var lookAhead = function(match) {
        var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
        if (matches) {
          iFormat++
        }
        return matches
      };
      for (var iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
            literal = false
          } else {
            chars += format.charAt(iFormat)
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
            case "m":
            case "y":
            case "@":
              chars += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              if (lookAhead("'")) {
                chars += "'"
              } else {
                literal = true
              }
              break;
            default:
              chars += format.charAt(iFormat)
          }
        }
      }
      return chars
    },
    _get: function(inst, name) {
      return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
    },
    _setDateFromField: function(inst, noDefault) {
      if (inst.input.val() == inst.lastVal) {
        return
      }
      var dateFormat = this._get(inst, "dateFormat");
      var dates = inst.lastVal = inst.input ? inst.input.val() : null;
      var date, defaultDate;
      date = defaultDate = this._getDefaultDate(inst);
      var settings = this._getFormatConfig(inst);
      try {
        date = this.parseDate(dateFormat, dates, settings) || defaultDate
      } catch (event) {
        this.log(event);
        dates = (noDefault ? "" : dates)
      }
      inst.selectedDay = date.getDate();
      inst.drawMonth = inst.selectedMonth = date.getMonth();
      inst.drawYear = inst.selectedYear = date.getFullYear();
      inst.currentDay = (dates ? date.getDate() : 0);
      inst.currentMonth = (dates ? date.getMonth() : 0);
      inst.currentYear = (dates ? date.getFullYear() : 0);
      this._adjustInstDate(inst)
    },
    _getDefaultDate: function(inst) {
      this.CDate = this._get(inst, "calendar");
      return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new this.CDate()))
    },
    _determineDate: function(inst, date, defaultDate) {
      var Date = this.CDate;
      var offsetNumeric = function(offset) {
        var date = new Date();
        date.setDate(date.getDate() + offset);
        return date
      };
      var offsetString = function(offset) {
        try {
          return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
        } catch (e) {}
        var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
        var matches = pattern.exec(offset);
        while (matches) {
          switch (matches[2] || "d") {
            case "d":
            case "D":
              day += parseInt(matches[1], 10);
              break;
            case "w":
            case "W":
              day += parseInt(matches[1], 10) * 7;
              break;
            case "m":
            case "M":
              month += parseInt(matches[1], 10);
              day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
              break;
            case "y":
            case "Y":
              year += parseInt(matches[1], 10);
              day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
              break
          }
          matches = pattern.exec(offset)
        }
        return new Date(year, month, day)
      };
      var newDate = (date == null || date === "" ? defaultDate : (typeof date == "string" ? offsetString(date) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
      newDate = (newDate && newDate.toString() == "Invalid Date" ? defaultDate : newDate);
      if (newDate) {
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0)
      }
      return this._daylightSavingAdjust(newDate)
    },
    _daylightSavingAdjust: function(date) {
      if (!date) {
        return null
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date
    },
    _setDate: function(inst, date, noChange) {
      var clear = !date;
      var origMonth = inst.selectedMonth;
      var origYear = inst.selectedYear;
      this.CDate = this._get(inst, "calendar");
      var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new this.CDate()));
      inst.selectedDay = inst.currentDay = newDate.getDate();
      inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
      inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
      if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange) {
        this._notifyChange(inst)
      }
      this._adjustInstDate(inst);
      if (inst.input) {
        inst.input.val(clear ? "" : this._formatDate(inst))
      }
    },
    _getDate: function(inst) {
      this.CDate = this._get(inst, "calendar");
      var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new this.CDate(inst.currentYear, inst.currentMonth, inst.currentDay)));
      return startDate
    },
    _generateHTML: function(inst) {
      var today = new this.CDate();
      today = this._daylightSavingAdjust(new this.CDate(today.getFullYear(), today.getMonth(), today.getDate()));
      var isRTL = this._get(inst, "isRTL");
      var showButtonPanel = this._get(inst, "showButtonPanel");
      var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
      var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
      var numMonths = this._getNumberOfMonths(inst);
      var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
      var stepMonths = this._get(inst, "stepMonths");
      var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
      var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new this.CDate(inst.currentYear, inst.currentMonth, inst.currentDay)));
      var minDate = this._getMinMaxDate(inst, "min");
      var maxDate = this._getMinMaxDate(inst, "max");
      var drawMonth = inst.drawMonth - showCurrentAtPos;
      var drawYear = inst.drawYear;
      if (drawMonth < 0) {
        drawMonth += 12;
        drawYear--
      }
      if (maxDate) {
        var maxDraw = this._daylightSavingAdjust(new this.CDate(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
        maxDraw = (minDate && this._compareDate(maxDraw, "<", minDate) ? minDate : maxDraw);
        while (this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth, 1)) > maxDraw) {
          drawMonth--;
          if (drawMonth < 0) {
            drawMonth = 11;
            drawYear--
          }
        }
      }
      inst.drawMonth = drawMonth;
      inst.drawYear = drawYear;
      var prevText = this._get(inst, "prevText");
      prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
      var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a style="direction:ltr" class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a style="direction:ltr" class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
      var nextText = this._get(inst, "nextText");
      nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
      var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a style="direction:ltr" class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a style="direction:ltr" class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
      var currentText = this._get(inst, "currentText");
      var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
      currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
      var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
      var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
      var firstDay = parseInt(this._get(inst, "firstDay"), 10);
      firstDay = (isNaN(firstDay) ? 0 : firstDay);
      var showWeek = this._get(inst, "showWeek");
      var dayNames = this._get(inst, "dayNames");
      var dayNamesShort = this._get(inst, "dayNamesShort");
      var dayNamesMin = this._get(inst, "dayNamesMin");
      var monthNames = this._get(inst, "monthNames");
      var monthNamesShort = this._get(inst, "monthNamesShort");
      var beforeShowDay = this._get(inst, "beforeShowDay");
      var showOtherMonths = this._get(inst, "showOtherMonths");
      var selectOtherMonths = this._get(inst, "selectOtherMonths");
      var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
      var defaultDate = this._getDefaultDate(inst);
      var html = "";
      for (var row = 0; row < numMonths[0]; row++) {
        var group = "";
        this.maxRows = 4;
        for (var col = 0; col < numMonths[1]; col++) {
          var selectedDate = this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth, inst.selectedDay));
          var cornerClass = " ui-corner-all";
          var calender = "";
          if (isMultiMonth) {
            calender += '<div class="ui-datepicker-group';
            if (numMonths[1] > 1) {
              switch (col) {
                case 0:
                  calender += " ui-datepicker-group-first";
                  cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                  break;
                case numMonths[1] - 1:
                  calender += " ui-datepicker-group-last";
                  cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                  break;
                default:
                  calender += " ui-datepicker-group-middle";
                  cornerClass = "";
                  break
              }
            }
            calender += '">'
          }
          calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
          var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "");
          for (var dow = 0; dow < 7; dow++) {
            var day = (dow + firstDay) % 7;
            thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
          }
          calender += thead + "</tr></thead><tbody>";
          var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
          if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
            inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
          }
          var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
          var curRows = Math.ceil((leadDays + daysInMonth) / 7);
          var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
          this.maxRows = numRows;
          var printDate = this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth, 1 - leadDays));
          for (var dRow = 0; dRow < numRows; dRow++) {
            calender += "<tr>";
            var tbody = (!showWeek ? "" : '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>");
            for (var dow = 0; dow < 7; dow++) {
              var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
              var otherMonth = (printDate.getMonth() != drawMonth);
              var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || ((minDate && this._compareDate(printDate, "<", minDate)) || (maxDate && this._compareDate(printDate, ">", maxDate)));
              tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + inst.id + "'," + printDate.getMonth() + "," + printDate.getFullYear() + ', this);return false;"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
              printDate.setDate(printDate.getDate() + 1);
              printDate = this._daylightSavingAdjust(printDate)
            }
            calender += tbody + "</tr>"
          }
          drawMonth++;
          if (drawMonth > 11) {
            drawMonth = 0;
            drawYear++
          }
          calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
          group += calender
        }
        html += group
      }
      //html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
      inst._keyEvent = false;
      return html
    },
    _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
      var changeMonth = this._get(inst, "changeMonth");
      var changeYear = this._get(inst, "changeYear");
      var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
      var html = '<div class="ui-datepicker-title">';
      var monthHtml = "";
      if (secondary || !changeMonth) {
        monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"
      } else {
        var inMinYear = (minDate && minDate.getFullYear() == drawYear);
        var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
        monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'M');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
        for (var month = 0; month < 12; month++) {
          if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
            monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
          }
        }
        monthHtml += "</select>"
      }
      if (!showMonthAfterYear) {
        html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "")
      }
      if (!inst.yearshtml) {
        inst.yearshtml = "";
        if (secondary || !changeYear) {
          html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
        } else {
          var years = this._get(inst, "yearRange").split(":");
          var thisYear = new this.CDate().getFullYear();
          var determineYear = function(value) {
            var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
            return (isNaN(year) ? thisYear : year)
          };
          var year = determineYear(years[0]);
          var endYear = Math.max(year, determineYear(years[1] || ""));
          year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
          endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
          inst.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
          for (; year <= endYear; year++) {
            inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
          }
          inst.yearshtml += "</select>";
          html += inst.yearshtml;
          inst.yearshtml = null
        }
      }
      html += this._get(inst, "yearSuffix");
      if (showMonthAfterYear) {
        html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml
      }
      html += "</div>";
      return html
    },
    _adjustInstDate: function(inst, offset, period) {
      var year = inst.drawYear + (period == "Y" ? offset : 0);
      var month = inst.drawMonth + (period == "M" ? offset : 0);
      var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
      var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new this.CDate(year, month, day)));
      inst.selectedDay = date.getDate();
      inst.drawMonth = inst.selectedMonth = date.getMonth();
      inst.drawYear = inst.selectedYear = date.getFullYear();
      if (period == "M" || period == "Y") {
        this._notifyChange(inst)
      }
    },
    _restrictMinMax: function(inst, date) {
      var minDate = this._getMinMaxDate(inst, "min");
      var maxDate = this._getMinMaxDate(inst, "max");
      var newDate = (minDate && this._compareDate(date, "<", minDate)) ? minDate : date;
      newDate = (maxDate && this._compareDate(newDate, ">", maxDate)) ? maxDate : newDate;
      return newDate
    },
    _notifyChange: function(inst) {
      var onChange = this._get(inst, "onChangeMonthYear");
      if (onChange) {
        onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
      }
    },
    _getNumberOfMonths: function(inst) {
      var numMonths = this._get(inst, "numberOfMonths");
      return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
    },
    _getMinMaxDate: function(inst, minMax) {
      return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
    },
    _getDaysInMonth: function(year, month) {
      return 32 - this._daylightSavingAdjust(new this.CDate(year, month, 32)).getDate()
    },
    _getFirstDayOfMonth: function(year, month) {
      return new this.CDate(year, month, 1).getDay()
    },
    _canAdjustMonth: function(inst, offset, curYear, curMonth) {
      var numMonths = this._getNumberOfMonths(inst);
      var date = this._daylightSavingAdjust(new this.CDate(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
      if (offset < 0) {
        date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
      }
      return this._isInRange(inst, date)
    },
    _isInRange: function(inst, date) {
      var minDate = this._getMinMaxDate(inst, "min");
      var maxDate = this._getMinMaxDate(inst, "max");
      return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
    },
    _getFormatConfig: function(inst) {
      var shortYearCutoff = this._get(inst, "shortYearCutoff");
      this.CDate = this._get(inst, "calendar");
      shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new this.CDate().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
      return {
        shortYearCutoff: shortYearCutoff,
        dayNamesShort: this._get(inst, "dayNamesShort"),
        dayNames: this._get(inst, "dayNames"),
        monthNamesShort: this._get(inst, "monthNamesShort"),
        monthNames: this._get(inst, "monthNames")
      }
    },
    _formatDate: function(inst, day, month, year) {
      if (!day) {
        inst.currentDay = inst.selectedDay;
        inst.currentMonth = inst.selectedMonth;
        inst.currentYear = inst.selectedYear
      }
      var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new this.CDate(year, month, day))) : this._daylightSavingAdjust(new this.CDate(inst.currentYear, inst.currentMonth, inst.currentDay)));
      return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
    },
    _compareDate: function(d1, op, d2) {
      if (d1 && d2) {
        if (d1.getGregorianDate) {
          d1 = d1.getGregorianDate()
        }
        if (d2.getGregorianDate) {
          d2 = d2.getGregorianDate()
        }
        if (op == "<") {
          return d1 < d2
        }
        return d1 > d2
      } else {
        return null
      }
    }
  });

  function bindHover(dpDiv) {
    var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return dpDiv.bind("mouseout", function(event) {
      var elem = $(event.target).closest(selector);
      if (!elem.length) {
        return
      }
      elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
    }).bind("mouseover", function(event) {
      var elem = $(event.target).closest(selector);
      if ($.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) || !elem.length) {
        return
      }
      elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
      elem.addClass("ui-state-hover");
      if (elem.hasClass("ui-datepicker-prev")) {
        elem.addClass("ui-datepicker-prev-hover")
      }
      if (elem.hasClass("ui-datepicker-next")) {
        elem.addClass("ui-datepicker-next-hover")
      }
    })
  }

  function extendRemove(target, props) {
    $.extend(target, props);
    for (var name in props) {
      if (props[name] == null || props[name] == undefined) {
        target[name] = props[name]
      }
    }
    return target
  }

  function isArray(a) {
    return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
  }
  $.fn.datepicker = function(options) {
    if (!this.length) {
      return this
    }
    if (!$.datepicker.initialized) {
      $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
      $.datepicker.initialized = true
    }
    var otherArgs = Array.prototype.slice.call(arguments, 1);
    if (typeof options == "string" && (options == "isDisabled" || options == "getDate" || options == "widget")) {
      return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
    }
    if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
      return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
    }
    return this.each(function() {
      typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
    })
  };
  $.datepicker = new Datepicker();
  $.datepicker.initialized = false;
  $.datepicker.uuid = new Date().getTime();
  $.datepicker.version = "1.8.14";
  window["DP_jQuery_" + dpuuid] = $
})(jQuery);
/*
       JavaScript functions for the Fourmilab Calendar Converter

                  by John Walker  --  September, MIM
              http://www.fourmilab.ch/documents/calendar/

                This program is in the public domain.
*/
function mod(d, c) {
  return d - (c * Math.floor(d / c))
}

function leap_gregorian(a) {
  return ((a % 4) == 0) && (!(((a % 100) == 0) && ((a % 400) != 0)))
}
var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(b, c, a) {
  return (GREGORIAN_EPOCH - 1) + (365 * (b - 1)) + Math.floor((b - 1) / 4) + (-Math.floor((b - 1) / 100)) + Math.floor((b - 1) / 400) + Math.floor((((367 * c) - 362) / 12) + ((c <= 2) ? 0 : (leap_gregorian(b) ? -1 : -2)) + a)
}

function jd_to_gregorian(j) {
  var g, m, e, b, l, a, n, c, f, k, h, d, i;
  g = Math.floor(j - 0.5) + 0.5;
  m = g - GREGORIAN_EPOCH;
  e = Math.floor(m / 146097);
  b = mod(m, 146097);
  l = Math.floor(b / 36524);
  a = mod(b, 36524);
  n = Math.floor(a / 1461);
  c = mod(a, 1461);
  f = Math.floor(c / 365);
  h = (e * 400) + (l * 100) + (n * 4) + f;
  if (!((l == 4) || (f == 4))) {
    h++
  }
  d = g - gregorian_to_jd(h, 1, 1);
  i = ((g < gregorian_to_jd(h, 3, 1)) ? 0 : (leap_gregorian(h) ? 1 : 2));
  month = Math.floor((((d + i) * 12) + 373) / 367);
  day = (g - gregorian_to_jd(h, month, 1)) + 1;
  return new Array(h, month, day)
}

function leap_islamic(a) {
  return (((a * 11) + 14) % 30) < 11
}
var ISLAMIC_EPOCH = 1948439.5;

function islamic_to_jd(b, c, a) {
  return (a + Math.ceil(29.5 * (c - 1)) + (b - 1) * 354 + Math.floor((3 + (11 * b)) / 30) + ISLAMIC_EPOCH) - 1
}

function jd_to_islamic(a) {
  var c, d, b;
  a = Math.floor(a) + 0.5;
  c = Math.floor(((30 * (a - ISLAMIC_EPOCH)) + 10646) / 10631);
  d = Math.min(12, Math.ceil((a - (29 + islamic_to_jd(c, 1, 1))) / 29.5) + 1);
  b = (a - islamic_to_jd(c, d, 1)) + 1;
  return new Array(c, d, b)
}

function leap_persian(a) {
  return ((((((a - ((a > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682
}
var PERSIAN_EPOCH = 1948320.5;

function persian_to_jd(b, e, a) {
  var d, c;
  d = b - ((b >= 0) ? 474 : 473);
  c = 474 + mod(d, 2820);
  return a + ((e <= 7) ? ((e - 1) * 31) : (((e - 1) * 30) + 6)) + Math.floor(((c * 682) - 110) / 2816) + (c - 1) * 365 + Math.floor(d / 2820) * 1029983 + (PERSIAN_EPOCH - 1)
}

function jd_to_persian(j) {
  var h, g, i, k, e, a, f, d, c, b;
  j = Math.floor(j) + 0.5;
  k = j - persian_to_jd(475, 1, 1);
  e = Math.floor(k / 1029983);
  a = mod(k, 1029983);
  if (a == 1029982) {
    f = 2820
  } else {
    d = Math.floor(a / 366);
    c = mod(a, 366);
    f = Math.floor(((2134 * d) + (2816 * c) + 2815) / 1028522) + d + 1
  }
  h = f + (2820 * e) + 474;
  if (h <= 0) {
    h--
  }
  b = (j - persian_to_jd(h, 1, 1)) + 1;
  g = (b <= 186) ? Math.ceil(b / 31) : Math.ceil((b - 6) / 30);
  i = (j - persian_to_jd(h, g, 1)) + 1;
  return new Array(h, g, i)
};
// Arabic support for jQuery UI Datepicker 1.8.14 with custom calendar support
jQuery(function(a) {
  a.datepicker.regional.ar = {
    calendar: HijriDate,
    closeText: "إغلاق",
    prevText: "السابق",
    nextText: "التالي",
    currentText: "اليوم",
    monthNames: ["محرّم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
    monthNamesShort: ["محرّم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
    dayNames: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    dayNamesShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
    dayNamesMin: ["أ", "ا", "ث", "أ", "خ", "ج", "س"],
    weekHeader: "س",
    dateFormat: "dd/mm/yy",
    firstDay: 6,
    isRTL: true,
    showMonthAfterYear: false,
    yearSuffix: "",
    calculateWeek: function(b) {
      var c = new HijriDate(b.getFullYear(), b.getMonth(), b.getDate() + (b.getDay() || 7) - 3);
      return Math.floor(Math.round((c.getTime() - new HijriDate(c.getFullYear(), 0, 1).getTime()) / 86400000) / 7) + 1
    }
  };
  a.datepicker.setDefaults(a.datepicker.regional.ar)
});

function HijriDate(i, h, f) {
  var d;
  var a;
  if (!isNaN(parseInt(i)) && !isNaN(parseInt(h)) && !isNaN(parseInt(f))) {
    var c = b([parseInt(i, 10), parseInt(h, 10), parseInt(f, 10)]);
    e(new Date(c[0], c[1], c[2]))
  } else {
    e(i)
  }

  function b(k) {
    var g = jd_to_gregorian(islamic_to_jd(k[0], k[1] + 1, k[2]));
    g[1]--;
    return g
  }

  function j(k) {
    var g = jd_to_islamic(gregorian_to_jd(k[0], k[1] + 1, k[2]));
    g[1]--;
    return g
  }

  function e(g) {
    if (g && g.getGregorianDate) {
      g = g.getGregorianDate()
    }
    d = new Date(g);
    d.setHours(d.getHours() > 12 ? d.getHours() + 2 : 0);
    if (!d || d == "Invalid Date" || isNaN(d || !d.getDate())) {
      d = new Date()
    }
    a = j([d.getFullYear(), d.getMonth(), d.getDate()]);
    return this
  }
  this.getGregorianDate = function() {
    return d
  };
  this.setFullDate = e;
  this.setMonth = function(l) {
    a[1] = l;
    var k = b(a);
    d = new Date(k[0], k[1], k[2]);
    a = j([k[0], k[1], k[2]])
  };
  this.setDate = function(l) {
    a[2] = l;
    var k = b(a);
    d = new Date(k[0], k[1], k[2]);
    a = j([k[0], k[1], k[2]])
  };
  this.getFullYear = function() {
    return a[0]
  };
  this.getMonth = function() {
    return a[1]
  };
  this.getDate = function() {
    return a[2]
  };
  this.toString = function() {
    return a.join(",").toString()
  };
  this.getDay = function() {
    return d.getDay()
  };
  this.getHours = function() {
    return d.getHours()
  };
  this.getMinutes = function() {
    return d.getMinutes()
  };
  this.getSeconds = function() {
    return d.getSeconds()
  };
  this.getTime = function() {
    return d.getTime()
  };
  this.getTimeZoneOffset = function() {
    return d.getTimeZoneOffset()
  };
  this.getYear = function() {
    return a[0] % 100
  };
  this.setHours = function(g) {
    d.setHours(g)
  };
  this.setMinutes = function(g) {
    d.setMinutes(g)
  };
  this.setSeconds = function(g) {
    d.setSeconds(g)
  };
  this.setMilliseconds = function(g) {
    d.setMilliseconds(g)
  }
};
// Farsi(Persian) support for jQuery UI Datepicker 1.8.14 with custom calendar support
jQuery(function(a) {
  a.datepicker.regional.fa = {
    calendar: JalaliDate,
    closeText: "بستن",
    prevText: "قبل",
    nextText: "بعد",
    currentText: "امروز",
    monthNames: ["فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند"],
    monthNamesShort: ["فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند"],
    dayNames: ["يکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
    dayNamesShort: ["يک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه"],
    dayNamesMin: ["ي", "د", "س", "چ", "پ", "ج", "ش"],
    weekHeader: "ه",
    dateFormat: "dd/mm/yy",
    firstDay: 6,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    calculateWeek: function(b) {
      var c = new JalaliDate(b.getFullYear(), b.getMonth(), b.getDate() + (b.getDay() || 7) - 3);
      return Math.floor(Math.round((c.getTime() - new JalaliDate(c.getFullYear(), 0, 1).getTime()) / 86400000) / 7) + 1
    }
  };
  a.datepicker.setDefaults(a.datepicker.regional.fa)
});

function JalaliDate(i, h, f) {
  var d;
  var a;
  if (!isNaN(parseInt(i)) && !isNaN(parseInt(h)) && !isNaN(parseInt(f))) {
    var c = j([parseInt(i, 10), parseInt(h, 10), parseInt(f, 10)]);
    e(new Date(c[0], c[1], c[2]))
  } else {
    e(i)
  }

  function j(l) {
    var k = 0;
    if (l[1] < 0) {
      k = leap_persian(l[0] - 1) ? 30 : 29;
      l[1]++
    }
    var g = jd_to_gregorian(persian_to_jd(l[0], l[1] + 1, l[2]) - k);
    g[1]--;
    return g
  }

  function b(k) {
    var g = jd_to_persian(gregorian_to_jd(k[0], k[1] + 1, k[2]));
    g[1]--;
    return g
  }

  function e(g) {
    if (g && g.getGregorianDate) {
      g = g.getGregorianDate()
    }
    d = new Date(g);
    d.setHours(d.getHours() > 12 ? d.getHours() + 2 : 0);
    if (!d || d == "Invalid Date" || isNaN(d || !d.getDate())) {
      d = new Date()
    }
    a = b([d.getFullYear(), d.getMonth(), d.getDate()]);
    return this
  }
  this.getGregorianDate = function() {
    return d
  };
  this.setFullDate = e;
  this.setMonth = function(l) {
    a[1] = l;
    var k = j(a);
    d = new Date(k[0], k[1], k[2]);
    a = b([k[0], k[1], k[2]])
  };
  this.setDate = function(l) {
    a[2] = l;
    var k = j(a);
    d = new Date(k[0], k[1], k[2]);
    a = b([k[0], k[1], k[2]])
  };
  this.getFullYear = function() {
    return a[0]
  };
  this.getMonth = function() {
    return a[1]
  };
  this.getDate = function() {
    return a[2]
  };
  this.toString = function() {
    return a.join(",").toString()
  };
  this.getDay = function() {
    return d.getDay()
  };
  this.getHours = function() {
    return d.getHours()
  };
  this.getMinutes = function() {
    return d.getMinutes()
  };
  this.getSeconds = function() {
    return d.getSeconds()
  };
  this.getTime = function() {
    return d.getTime()
  };
  this.getTimeZoneOffset = function() {
    return d.getTimeZoneOffset()
  };
  this.getYear = function() {
    return a[0] % 100
  };
  this.setHours = function(g) {
    d.setHours(g)
  };
  this.setMinutes = function(g) {
    d.setMinutes(g)
  };
  this.setSeconds = function(g) {
    d.setSeconds(g)
  };
  this.setMilliseconds = function(g) {
    d.setMilliseconds(g)
  }
};
