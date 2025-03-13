"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function () {
  var _sessionStorage$getIt;
  var apiURL = 'https://fav-prom.com/api_goals_or_zeroes',
    unauthMsgs = document.querySelectorAll('.unauth-msg'),
    participateBtns = document.querySelectorAll('.btn-join'),
    youAreInBtns = document.querySelectorAll('.took-part'),
    mainPage = document.querySelector(".fav-page"),
    resultsTable = document.querySelector('#results-table'),
    resultsTableOther = document.querySelector('#results-table-other');
  var cache = {};
  var predictData = [];
  var translateState = true;
  var debug = false;
  var locale = (_sessionStorage$getIt = sessionStorage.getItem("locale")) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : "uk";
  // let locale = "uk"

  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var i18nData = {};
  var userId;
  // userId = 100300268;

  if (ukLeng) locale = 'uk';
  if (enLeng) locale = 'en';
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      return res.json();
    });
  };
  var InitPage = function InitPage() {
    checkUserAuth();
  };
  var checkUserAuth = function checkUserAuth() {
    if (userId) {
      var _iterator = _createForOfIteratorHelper(unauthMsgs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var unauthMes = _step.value;
          unauthMes.classList.add('hide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      request("/favuser/".concat(userId)).then(function (res) {
        if (res.userid) {
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          youAreInBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        } else {
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        }
      });
    } else {
      var _iterator2 = _createForOfIteratorHelper(participateBtns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var participateBtn = _step2.value;
          participateBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(youAreInBtns),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var youAreInBtn = _step3.value;
          youAreInBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var _iterator4 = _createForOfIteratorHelper(unauthMsgs),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _unauthMes = _step4.value;
          _unauthMes.classList.remove('hide');
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  };
  function participate() {
    if (!userId) {
      return;
    }
    var params = {
      userid: userId
    };
    request('/user', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      checkUserAuth();
      InitPage();
    });
  }
  function loadTranslations() {
    return fetch("".concat(apiURL, "/new-translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nData = json;
      console.log(i18nData);
      translate();
      var mutationObserver = new MutationObserver(function (mutations) {
        translate();
      });
      mutationObserver.observe(document.getElementById('goals-or-zeros'), {
        childList: true,
        subtree: true
      });
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (translateState) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
    } else {
      console.log("translation work!");
    }
    refreshLocalizedClass(mainPage);
  }
  function refreshLocalizedClass(element) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(lang);
    }
    element.classList.add(locale);
  }
  function init() {
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      InitPage();
    } else {
      InitPage();
      var c = 0;
      var i = setInterval(function () {
        if (c < 50) {
          if (!!window.g_user_id) {
            userId = window.g_user_id;
            InitPage();
            checkUserAuth();
            clearInterval(i);
          }
        } else {
          clearInterval(i);
        }
      }, 200);
    }
    InitPage();
    participateBtns.forEach(function (authBtn, i) {
      authBtn.addEventListener('click', function (e) {
        e.preventDefault();
        participate();
      });
    });
  }
  loadTranslations().then(init);

  // table
  function getData() {
    var currentStage = STAGE_KEYS[selectedTab - 1];
    if (cache[currentStage]) {
      return Promise.resolve(cache[currentStage]);
    }
    return request("/users/".concat(currentStage)).then(function (res) {
      cache[currentStage] = res;
      return res;
    });
  }
  function refreshUsers() {
    getData().then(function (users) {
      if (!debug) {
        renderUsers(users);
      }
    });
  }
  function renderUsers(users) {
    populateUsersTable(users, userId);
  }
  function populateUsersTable(users, currentUserId) {
    resultsTable.innerHTML = ''; // Очищуємо основну таблицю
    resultsTableOther.innerHTML = ''; // Очищуємо додаткову таблицю

    if (!users || !users.length) return; // Перевіряємо, чи є користувачі

    // Знаходимо індекс поточного користувача
    var currentUserIndex = users.findIndex(function (user) {
      return user.userid === currentUserId;
    });
    if (currentUserIndex !== -1) {
      // Видаляємо currentUserId зі списку
      users.splice(currentUserIndex, 1);
    }

    // Додаємо currentUserId на 11 позицію (індекс 10)
    users.splice(10, 0, users.find(function (user) {
      return user.userid === currentUserId;
    }));

    // Виводимо всіх користувачів у таблицю
    users.forEach(function (user) {
      return displayUser(user, user.userid === currentUserId, resultsTable, users);
    });
  }
  function displayUser(user, isCurrentUser, table, allUsers) {
    var additionalUserRow = document.createElement('div');
    additionalUserRow.classList.add('table__row');
    var place = allUsers.indexOf(user) + 1;
    var prizeKey;
    prizeKey = getPrizeTranslationKey(place);
    var bonusKey;
    bonusKey = getBonusTranslationKey(place);
    additionalUserRow.innerHTML = "\n        <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n        <div class=\"table__row-item\">\n            <span>").concat(user.scoreLeft, "</span>\n            <img src=\"img/vs.png\" alt=\"vs\">\n            <span>").concat(user.scoreRight, "</span>\n        </div>\n        <div class=\"table__row-item\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n        <div class=\"table__row-item\">").concat(bonusKey ? translateKey(bonusKey) : ' - ', "</div>\n    ");
    if (isCurrentUser) {
      additionalUserRow.classList.add("you");
      var youBlock = document.createElement('div');
      youBlock.classList.add('table__row-you');
      youBlock.setAttribute('data-translate', 'tableYou');
      youBlock.textContent = "You";
      additionalUserRow.insertBefore(youBlock, additionalUserRow.children[1]);
    }
    table.append(additionalUserRow);
  }
  function maskUserId(userId) {
    return "**" + userId.toString().slice(2);
  }

  // 3D anim
  var cards = document.querySelectorAll(".team, .animCard, .animRight"); // Добавляем .animRight
  var angle = 0;
  function animateCards() {
    angle += 0.9; // speed
    var rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
    var rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y

    cards.forEach(function (card) {
      if (card.classList.contains("animRight")) {
        card.style.transform = "rotateY(".concat(-rotateY, "deg) rotateX(").concat(-rotateX, "deg)");
      } else {
        card.style.transform = "rotateY(".concat(rotateY, "deg) rotateX(").concat(rotateX, "deg)");
      }
    });
    requestAnimationFrame(animateCards);
  }
  animateCards();

  // predict tabs
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll('.predict__tabs-global > div, .predict__tabs-dates > div');
    var containers = document.querySelectorAll('.predict__container');
    function handleTabClick(event) {
      var clickedTab = event.target;
      var tabPair = clickedTab.closest('.predict__tabs-global') || clickedTab.closest('.predict__tabs-dates');
      if (clickedTab.classList.contains('active')) return;
      if (tabPair) {
        var pair = tabPair.querySelectorAll('.active');
        if (pair.length > 0) {
          pair[0].classList.remove('active');
        }
      }
      clickedTab.classList.add('active');
      updateContainers();
    }
    function updateContainers() {
      containers.forEach(function (container) {
        return container.classList.remove('active');
      });
      if (document.querySelector('.predict__tabs-score.active') && document.querySelector('.predict__tabs-date.date1.active')) {
        document.querySelector('.predict__container.score-1').classList.add('active');
      } else if (document.querySelector('.predict__tabs-score.active') && document.querySelector('.predict__tabs-date.date2.active')) {
        document.querySelector('.predict__container.score-2').classList.add('active');
      } else if (document.querySelector('.predict__tabs-goal.active') && document.querySelector('.predict__tabs-date.date1.active')) {
        document.querySelector('.predict__container.goal-1').classList.add('active');
      } else if (document.querySelector('.predict__tabs-goal.active') && document.querySelector('.predict__tabs-date.date2.active')) {
        document.querySelector('.predict__container.goal-2').classList.add('active');
      }
    }
    tabs.forEach(function (tab) {
      return tab.addEventListener('click', handleTabClick);
    });
    updateContainers();
  });

  //score
  document.querySelectorAll('.predict__team-increase').forEach(function (button) {
    button.addEventListener('click', function () {
      var teamControl = this.closest('.predict__team-control');
      var teamNumber = teamControl.querySelector('.predict__team-number');
      var value = parseInt(teamNumber.textContent);
      teamNumber.textContent = value + 1;
    });
  });
  document.querySelectorAll('.predict__team-decrease').forEach(function (button) {
    button.addEventListener('click', function () {
      var teamControl = this.closest('.predict__team-control');
      var teamNumber = teamControl.querySelector('.predict__team-number');
      var value = parseInt(teamNumber.textContent);
      if (value > 0) {
        teamNumber.textContent = value - 1;
      }
    });
  });

  //table tabs
  document.querySelectorAll('.table__tabs-date').forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (this.classList.contains('active')) {
        return;
      }
      document.querySelectorAll('.table__tabs-date').forEach(function (tab) {
        return tab.classList.remove('active');
      });
      this.classList.add('active');
      document.querySelectorAll('.table__body').forEach(function (content) {
        return content.classList.remove('active');
      });
      var bodyClass = this.classList.contains('date1') ? '.table__body.table1' : '.table__body.table2';
      document.querySelector(bodyClass).classList.add('active');
      refreshUsers();
    });
  });

  //popups

  function setPopups(triggerButtons, popupClass) {
    var popupsContainer = document.querySelector('.popups');
    var popup = document.querySelector(".popups__item.".concat(popupClass));
    if (!triggerButtons || !popup || !popupsContainer) return;
    triggerButtons.forEach(function (triggerButton) {
      triggerButton.addEventListener('click', function () {
        popupsContainer.classList.remove('_opacity');
        popupsContainer.classList.add(popupClass);
        document.body.style.overflow = 'hidden';
      });
    });
    var closeButton = popup.querySelector('.popups__item-close');
    var btnClose = popup.querySelector('.btn-close');
    popupsContainer.addEventListener("click", function (e) {
      if (e.target === popupsContainer || e.target === closeButton || e.target === btnClose) {
        closePopup();
      }
    });
    function closePopup() {
      popupsContainer.classList.add('_opacity');
      popupsContainer.classList.remove(popupClass);
      document.body.style.overflow = '';
    }
  }
  setPopups(document.querySelectorAll('.gide__list-btn'), 'gidePopup');
  setPopups(document.querySelectorAll('.predict__btn'), '_confirmPopup');

  //go to predict
  document.querySelector(".toPredict").addEventListener('click', function () {
    var targetElement = document.getElementById("predict");
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });

  // TEST
  document.querySelector('.dark-btn').addEventListener('click', function () {
    document.body.classList.toggle('dark');
  });
  var lngBtn = document.querySelector(".lng-btn");
  lngBtn.addEventListener("click", function () {
    if (sessionStorage.getItem("locale")) {
      sessionStorage.removeItem("locale");
    } else {
      sessionStorage.setItem("locale", "en");
    }
    window.location.reload();
  });
  var authBtn = document.querySelector(".auth-btn");
  authBtn.addEventListener("click", function () {
    if (userId) {
      sessionStorage.removeItem("userId");
    } else {
      sessionStorage.setItem("userId", "18908465");
    }
    window.location.reload();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnRpY2lwYXRlQnRucyIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsInVzZXJJZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJJbml0UGFnZSIsImNoZWNrVXNlckF1dGgiLCJ1bmF1dGhNZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1c2VyaWQiLCJmb3JFYWNoIiwiaXRlbSIsInJlbW92ZSIsInBhcnRpY2lwYXRlQnRuIiwieW91QXJlSW5CdG4iLCJwYXJ0aWNpcGF0ZSIsInBhcmFtcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZFRyYW5zbGF0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2xhdGUiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImluaXQiLCJ3aW5kb3ciLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwiaSIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsImF1dGhCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0RGF0YSIsImN1cnJlbnRTdGFnZSIsIlNUQUdFX0tFWVMiLCJzZWxlY3RlZFRhYiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVmcmVzaFVzZXJzIiwidXNlcnMiLCJyZW5kZXJVc2VycyIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJjdXJyZW50VXNlckluZGV4IiwiZmluZEluZGV4IiwidXNlciIsInNwbGljZSIsImZpbmQiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJpbmRleE9mIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwiYm9udXNLZXkiLCJnZXRCb251c1RyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsInNjb3JlTGVmdCIsInNjb3JlUmlnaHQiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNsaWNlIiwiY2FyZHMiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiY2FyZCIsImNvbnRhaW5zIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiY29udGFpbmVycyIsImhhbmRsZVRhYkNsaWNrIiwiZXZlbnQiLCJjbGlja2VkVGFiIiwidGFyZ2V0IiwidGFiUGFpciIsImNsb3Nlc3QiLCJwYWlyIiwidXBkYXRlQ29udGFpbmVycyIsImNvbnRhaW5lciIsInRhYiIsImJ1dHRvbiIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsInZhbHVlIiwicGFyc2VJbnQiLCJjb250ZW50IiwiYm9keUNsYXNzIiwic2V0UG9wdXBzIiwidHJpZ2dlckJ1dHRvbnMiLCJwb3B1cENsYXNzIiwicG9wdXBzQ29udGFpbmVyIiwicG9wdXAiLCJ0cmlnZ2VyQnV0dG9uIiwib3ZlcmZsb3ciLCJjbG9zZUJ1dHRvbiIsImJ0bkNsb3NlIiwiY2xvc2VQb3B1cCIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsInRvZ2dsZSIsImxuZ0J0biIsInJlbW92ZUl0ZW0iLCJzZXRJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQUE7RUFDVCxJQUFNQSxNQUFNLEdBQUcsMENBQTBDO0lBQ3JEQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3hERSxZQUFZLEdBQUdILFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RERyxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUM5Q0MsWUFBWSxHQUFHTixRQUFRLENBQUNLLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2REUsaUJBQWlCLEdBQUdQLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLHNCQUFzQixDQUFDO0VBRXRFLElBQU1HLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDaEIsSUFBSUMsV0FBVyxHQUFHLEVBQUU7RUFFcEIsSUFBSUMsY0FBYyxHQUFHLElBQUk7RUFDekIsSUFBSUMsS0FBSyxHQUFHLEtBQUs7RUFFakIsSUFBSUMsTUFBTSw0QkFBR0MsY0FBYyxDQUFDQyxPQUFPLENBQUMsUUFBUSxDQUFD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IHtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2dvYWxzX29yX3plcm9lcycsXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIiksXG4gICAgICAgIHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKVxuXG4gICAgY29uc3QgY2FjaGUgPSB7fTtcbiAgICBsZXQgcHJlZGljdERhdGEgPSBbXTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGF0ZSA9IHRydWVcbiAgICBsZXQgZGVidWcgPSBmYWxzZVxuXG4gICAgbGV0IGxvY2FsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgPz8gXCJ1a1wiXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwidWtcIlxuXG4gICAgY29uc3QgdWtMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG5cbiAgICBsZXQgdXNlcklkO1xuICAgIC8vIHVzZXJJZCA9IDEwMDMwMDI2ODtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgeW91QXJlSW5CdG4gb2YgeW91QXJlSW5CdG5zKSB7XG4gICAgICAgICAgICAgICAgeW91QXJlSW5CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHBhcnRpY2lwYXRlKCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGkxOG5EYXRhKTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2Fscy1vci16ZXJvcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0aW9uIHdvcmshXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKG1haW5QYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIEluaXRQYWdlKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG4gICAgLy8gdGFibGVcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhZ2UgPSBTVEFHRV9LRVlTW3NlbGVjdGVkVGFiIC0gMV07XG4gICAgICAgIGlmIChjYWNoZVtjdXJyZW50U3RhZ2VdKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNhY2hlW2N1cnJlbnRTdGFnZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0KGAvdXNlcnMvJHtjdXJyZW50U3RhZ2V9YCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgY2FjaGVbY3VycmVudFN0YWdlXSA9IHJlcztcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2VycygpIHtcbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgaWYoIWRlYnVnKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnModXNlcnMpIHtcbiAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJzsgLy8g0J7Rh9C40YnRg9GU0LzQviDQvtGB0L3QvtCy0L3RgyDRgtCw0LHQu9C40YbRjlxuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJzsgLy8g0J7Rh9C40YnRg9GU0LzQviDQtNC+0LTQsNGC0LrQvtCy0YMg0YLQsNCx0LvQuNGG0Y5cblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjsgLy8g0J/QtdGA0LXQstGW0YDRj9GU0LzQviwg0YfQuCDRlCDQutC+0YDQuNGB0YLRg9Cy0LDRh9GWXG5cbiAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INGW0L3QtNC10LrRgSDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gdXNlcnMuZmluZEluZGV4KHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuXG4gICAgICAgIGlmIChjdXJyZW50VXNlckluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgLy8g0JLQuNC00LDQu9GP0ZTQvNC+IGN1cnJlbnRVc2VySWQg0LfRliDRgdC/0LjRgdC60YNcbiAgICAgICAgICAgIHVzZXJzLnNwbGljZShjdXJyZW50VXNlckluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+IGN1cnJlbnRVc2VySWQg0L3QsCAxMSDQv9C+0LfQuNGG0ZbRjiAo0ZbQvdC00LXQutGBIDEwKVxuICAgICAgICB1c2Vycy5zcGxpY2UoMTAsIDAsIHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCkpO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0LLRgdGW0YUg0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyINGDINGC0LDQsdC70LjRhtGOXG4gICAgICAgIHVzZXJzLmZvckVhY2godXNlciA9PlxuICAgICAgICAgICAgZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZSwgdXNlcnMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cnKTtcblxuICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuXG4gICAgICAgIGxldCBwcml6ZUtleTtcbiAgICAgICAgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKVxuICAgICAgICBsZXQgYm9udXNLZXk7XG4gICAgICAgIGJvbnVzS2V5ID0gZ2V0Qm9udXNUcmFuc2xhdGlvbktleShwbGFjZSlcblxuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICA8c3Bhbj4ke3VzZXIuc2NvcmVMZWZ0fTwvc3Bhbj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+XG4gICAgICAgICAgICA8c3Bhbj4ke3VzZXIuc2NvcmVSaWdodH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7Ym9udXNLZXkgPyB0cmFuc2xhdGVLZXkoYm9udXNLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgYDtcbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJ5b3VcIik7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgndGFibGVfX3Jvdy15b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAndGFibGVZb3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCJZb3VcIjtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93Lmluc2VydEJlZm9yZSh5b3VCbG9jaywgYWRkaXRpb25hbFVzZXJSb3cuY2hpbGRyZW5bMV0pXG5cbiAgICAgICAgfVxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG5cbiAgICAvLyAzRCBhbmltXG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW0sIC5hbmltQ2FyZCwgLmFuaW1SaWdodFwiKTsgLy8g0JTQvtCx0LDQstC70Y/QtdC8IC5hbmltUmlnaHRcbiAgICBsZXQgYW5nbGUgPSAwO1xuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZUNhcmRzKCkge1xuICAgICAgICBhbmdsZSArPSAwLjk7IC8vIHNwZWVkXG4gICAgICAgIGNvbnN0IHJvdGF0ZVggPSBNYXRoLnNpbihhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWFxuICAgICAgICBjb25zdCByb3RhdGVZID0gTWF0aC5jb3MoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFlcblxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbVJpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgkey1yb3RhdGVZfWRlZykgcm90YXRlWCgkey1yb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7cm90YXRlWX1kZWcpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZUNhcmRzKTtcbiAgICB9XG4gICAgYW5pbWF0ZUNhcmRzKCk7XG5cbi8vIHByZWRpY3QgdGFic1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYsIC5wcmVkaWN0X190YWJzLWRhdGVzID4gZGl2Jyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUYWIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKSB8fCBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWRhdGVzJyk7XG5cbiAgICAgICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0YWJQYWlyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFpclswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsaWNrZWRUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXJzKCkge1xuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuc2NvcmUtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUyLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMi5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhYkNsaWNrKSk7XG5cbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgIH0pO1xuXG4vL3Njb3JlXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IHZhbHVlICsgMTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IHRoaXMuY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQodGVhbU51bWJlci50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IHZhbHVlIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbi8vdGFibGUgdGFic1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4gdGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fYm9keScpLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICAgICAgY29uc3QgYm9keUNsYXNzID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2RhdGUxJykgPyAnLnRhYmxlX19ib2R5LnRhYmxlMScgOiAnLnRhYmxlX19ib2R5LnRhYmxlMic7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvZHlDbGFzcykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIHJlZnJlc2hVc2VycygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuLy9wb3B1cHNcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwcyh0cmlnZ2VyQnV0dG9ucywgcG9wdXBDbGFzcykge1xuICAgICAgICBjb25zdCBwb3B1cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzJyk7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBvcHVwc19faXRlbS4ke3BvcHVwQ2xhc3N9YCk7XG5cbiAgICAgICAgaWYgKCF0cmlnZ2VyQnV0dG9ucyB8fCAhcG9wdXAgfHwgIXBvcHVwc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIHRyaWdnZXJCdXR0b25zLmZvckVhY2godHJpZ2dlckJ1dHRvbiA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHNfX2l0ZW0tY2xvc2UnKTtcbiAgICAgICAgY29uc3QgYnRuQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNsb3NlJyk7XG5cbiAgICAgICAgcG9wdXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cHNDb250YWluZXIgfHwgZS50YXJnZXQgPT09IGNsb3NlQnV0dG9uIHx8IGUudGFyZ2V0ID09PSBidG5DbG9zZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bicpLCAnX2NvbmZpcm1Qb3B1cCcpO1xuXG4vL2dvIHRvIHByZWRpY3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvUHJlZGljdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlZGljdFwiKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIDI7XG5cbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4vLyBURVNUXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbG5nQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sbmctYnRuXCIpXG5cbiAgICBsbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJsb2NhbGVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibG9jYWxlXCIsIFwiZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idG5cIilcblxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih1c2VySWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgXCIxODkwODQ2NVwiKVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pXG5cbn0pKCkiXX0=
