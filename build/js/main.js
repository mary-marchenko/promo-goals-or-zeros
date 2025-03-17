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
  var _sessionStorage$getIt, _sessionStorage$getIt2, _document$querySelect3;
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
  userId = (_sessionStorage$getIt2 = sessionStorage.getItem("userId")) !== null && _sessionStorage$getIt2 !== void 0 ? _sessionStorage$getIt2 : null;
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
  setPopups(document.querySelectorAll('.predict__btn.took-part'), '_confirmPopup');

  //go to predict
  document.querySelector(".toPredict").addEventListener('click', function () {
    var targetElement = document.getElementById("predict");
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });

  //Show first goal winner after match
  function setRadioWinner(index) {
    var container = document.querySelector(".unactive .predict__radio");
    if (!container) return;
    var items = container.querySelectorAll(".predict__radio-item");
    if (items.length >= index) {
      var targetItem = items[index - 1]; // Отримуємо потрібного потомка (1 → 0, 2 → 1, 3 → 2)

      targetItem.classList.add("radioWinner");
      var spanElement = targetItem.querySelector('span');
      if (spanElement) {
        spanElement.dataset.translate = "winnerFirstGoal";
        spanElement.textContent = "Перший гол";
      }
    }
  }
  var firstGoalResult = 1;
  setRadioWinner(firstGoalResult);
  function toggleAndSetScores(score1, score2) {
    var scoreElement = document.querySelector(".score-1");
    var goalElement = document.querySelector(".goal-1");
    scoreElement === null || scoreElement === void 0 ? void 0 : scoreElement.classList.toggle("unactive");
    goalElement === null || goalElement === void 0 ? void 0 : goalElement.classList.toggle("unactive");
    document.querySelectorAll(".unactive .predict__team-number").forEach(function (el, index) {
      el.textContent = index === 0 ? score1 : score2;
    });
  }
  // toggleAndSetScores(1, 2)

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
  var btnParticipante = document.querySelector(".btn-participante");
  btnParticipante.addEventListener("click", function () {
    if (sessionStorage.getItem("userId") == "18908465") {
      participateBtns.forEach(function (item) {
        return item.classList.add('hide');
      });
      youAreInBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
    } else {
      sessionStorage.setItem("userId", "777");
    }
  });
  document.querySelectorAll('.btn-lastPred').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.predict__last').forEach(function (element) {
        element.classList.toggle('hide');
      });
    });
  });
  setPopups(document.querySelectorAll('.btn-thenks'), '_confirmPopup');
  document.querySelectorAll('.btn-predict').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.unconfirmed').forEach(function (unconfirmed) {
        unconfirmed.classList.toggle('active');
      });
      document.querySelectorAll('.confirmed').forEach(function (confirmed) {
        confirmed.classList.toggle('active');
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    var _document$querySelect;
    (_document$querySelect = document.querySelector(".menu-btn")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener("click", function () {
      var _document$querySelect2;
      (_document$querySelect2 = document.querySelector(".menu-test")) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.classList.toggle("hide");
    });
  });
  (_document$querySelect3 = document.querySelector(".btn-after")) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.addEventListener("click", function () {
    var _document$querySelect4;
    toggleAndSetScores(1, 2);
    if ((_document$querySelect4 = document.querySelector(".score-1")) !== null && _document$querySelect4 !== void 0 && _document$querySelect4.classList.contains("unactive")) {
      setRadioWinner(firstGoalResult);
    } else {
      document.querySelectorAll(".predict__radio-item").forEach(function (item) {
        item.classList.remove("radioWinner");
      });
    }
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnRpY2lwYXRlQnRucyIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsInVzZXJJZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJJbml0UGFnZSIsImNoZWNrVXNlckF1dGgiLCJ1bmF1dGhNZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1c2VyaWQiLCJmb3JFYWNoIiwiaXRlbSIsInJlbW92ZSIsInBhcnRpY2lwYXRlQnRuIiwieW91QXJlSW5CdG4iLCJwYXJ0aWNpcGF0ZSIsInBhcmFtcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZFRyYW5zbGF0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2xhdGUiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImluaXQiLCJ3aW5kb3ciLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwiaSIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsImF1dGhCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0RGF0YSIsImN1cnJlbnRTdGFnZSIsIlNUQUdFX0tFWVMiLCJzZWxlY3RlZFRhYiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVmcmVzaFVzZXJzIiwidXNlcnMiLCJyZW5kZXJVc2VycyIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJjdXJyZW50VXNlckluZGV4IiwiZmluZEluZGV4IiwidXNlciIsInNwbGljZSIsImZpbmQiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJpbmRleE9mIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwiYm9udXNLZXkiLCJnZXRCb251c1RyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsInNjb3JlTGVmdCIsInNjb3JlUmlnaHQiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNsaWNlIiwiY2FyZHMiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiY2FyZCIsImNvbnRhaW5zIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiY29udGFpbmVycyIsImhhbmRsZVRhYkNsaWNrIiwiZXZlbnQiLCJjbGlja2VkVGFiIiwidGFyZ2V0IiwidGFiUGFpciIsImNsb3Nlc3QiLCJwYWlyIiwidXBkYXRlQ29udGFpbmVycyIsImNvbnRhaW5lciIsInRhYiIsImJ1dHRvbiIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsInZhbHVlIiwicGFyc2VJbnQiLCJjb250ZW50IiwiYm9keUNsYXNzIiwic2V0UG9wdXBzIiwidHJpZ2dlckJ1dHRvbnMiLCJwb3B1cENsYXNzIiwicG9wdXBzQ29udGFpbmVyIiwicG9wdXAiLCJ0cmlnZ2VyQnV0dG9uIiwib3ZlcmZsb3ciLCJjbG9zZUJ1dHRvbiIsImJ0bkNsb3NlIiwiY2xvc2VQb3B1cCIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsInNldFJhZGlvV2lubmVyIiwiaW5kZXgiLCJpdGVtcyIsInRhcmdldEl0ZW0iLCJzcGFuRWxlbWVudCIsImRhdGFzZXQiLCJmaXJzdEdvYWxSZXN1bHQiLCJ0b2dnbGVBbmRTZXRTY29yZXMiLCJzY29yZTEiLCJzY29yZTIiLCJzY29yZUVsZW1lbnQiLCJnb2FsRWxlbWVudCIsInRvZ2dsZSIsImVsIiwibG5nQnRuIiwicmVtb3ZlSXRlbSIsInNldEl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCIsImJ0blBhcnRpY2lwYW50ZSIsInVuY29uZmlybWVkIiwiY29uZmlybWVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUFBO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLDBDQUEwQztJQUNyREMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFHRixRQUFRLENBQUNDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN4REUsWUFBWSxHQUFHSCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REcsUUFBUSxHQUFHSixRQUFRLENBQUNLLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDOUNDLFlBQVksR0FBR04sUUFBUSxDQUFDSyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDdkRFLGlCQUFpQixH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QUFZLENBQUMsMkRBQXBDLHVCQUFzQ3lCLFNBQVMsQ0FBQzBKLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEUsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0VBRUYsMEJBQUF4TCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxZQUFZLENBQUMsMkRBQXBDLHVCQUFzQ3lFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQUE7SUFDbEVxRyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLDhCQUFJbkwsUUFBUSxDQUFDSyxhQUFhLENBQUMsVUFBVSxDQUFDLG1EQUFsQyx1QkFBb0N5QixTQUFTLENBQUNzRyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7TUFDcEV3QyxjQUFjLENBQUNNLGVBQWUsQ0FBQztJQUNuQyxDQUFDLE1BQU07TUFDSGxMLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFBQyxJQUFJLEVBQUk7UUFDOURBLElBQUksQ0FBQ0osU0FBUyxDQUFDSyxNQUFNLENBQUMsYUFBYSxDQUFDO01BQ3hDLENBQUMsQ0FBQztJQUNOO0VBQ0osQ0FBQyxDQUFDO0FBR04sQ0FBQyxHQUFHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfZ29hbHNfb3JfemVyb2VzJyxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLFxuICAgICAgICB5b3VBcmVJbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpXG5cbiAgICBjb25zdCBjYWNoZSA9IHt9O1xuICAgIGxldCBwcmVkaWN0RGF0YSA9IFtdO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gdHJ1ZVxuICAgIGxldCBkZWJ1ZyA9IGZhbHNlXG5cbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/PyBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJ1a1wiXG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcblxuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSA/PyBudWxsXG4gICAgLy8gdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB5b3VBcmVJbkJ0biBvZiB5b3VBcmVJbkJ0bnMpIHtcbiAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L25ldy10cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaTE4bkRhdGEpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvYWxzLW9yLXplcm9zJyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIH1cbiAgICAgICAgSW5pdFBhZ2UoKTtcblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpXG5cbiAgICAvLyB0YWJsZVxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGFnZSA9IFNUQUdFX0tFWVNbc2VsZWN0ZWRUYWIgLSAxXTtcbiAgICAgICAgaWYgKGNhY2hlW2N1cnJlbnRTdGFnZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVbY3VycmVudFN0YWdlXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcXVlc3QoYC91c2Vycy8ke2N1cnJlbnRTdGFnZX1gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjYWNoZVtjdXJyZW50U3RhZ2VdID0gcmVzO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFVzZXJzKCkge1xuICAgICAgICBnZXREYXRhKCkudGhlbih1c2VycyA9PiB7XG4gICAgICAgICAgICBpZighZGVidWcpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJVc2Vycyh1c2Vycykge1xuICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRidGD0ZTQvNC+INC+0YHQvdC+0LLQvdGDINGC0LDQsdC70LjRhtGOXG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRidGD0ZTQvNC+INC00L7QtNCw0YLQutC+0LLRgyDRgtCw0LHQu9C40YbRjlxuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INGUINC60L7RgNC40YHRgtGD0LLQsNGH0ZZcblxuICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0ZbQvdC00LXQutGBINC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSB1c2Vycy5maW5kSW5kZXgodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4gY3VycmVudFVzZXJJZCDQt9GWINGB0L/QuNGB0LrRg1xuICAgICAgICAgICAgdXNlcnMuc3BsaWNlKGN1cnJlbnRVc2VySW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JTQvtC00LDRlNC80L4gY3VycmVudFVzZXJJZCDQvdCwIDExINC/0L7Qt9C40YbRltGOICjRltC90LTQtdC60YEgMTApXG4gICAgICAgIHVzZXJzLnNwbGljZSgxMCwgMCwgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKSk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIg0YMg0YLQsNCx0LvQuNGG0Y5cbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+XG4gICAgICAgICAgICBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG5cbiAgICAgICAgbGV0IHByaXplS2V5O1xuICAgICAgICBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgIGxldCBib251c0tleTtcbiAgICAgICAgYm9udXNLZXkgPSBnZXRCb251c1RyYW5zbGF0aW9uS2V5KHBsYWNlKVxuXG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuPiR7dXNlci5zY29yZUxlZnR9PC9zcGFuPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvdnMucG5nXCIgYWx0PVwidnNcIj5cbiAgICAgICAgICAgIDxzcGFuPiR7dXNlci5zY29yZVJpZ2h0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtib251c0tleSA/IHRyYW5zbGF0ZUtleShib251c0tleSkgOiAnIC0gJ308L2Rpdj5cbiAgICBgO1xuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcInlvdVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93LXlvdScpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd0YWJsZVlvdScpO1xuICAgICAgICAgICAgeW91QmxvY2sudGV4dENvbnRlbnQgPSBcIllvdVwiO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5zZXJ0QmVmb3JlKHlvdUJsb2NrLCBhZGRpdGlvbmFsVXNlclJvdy5jaGlsZHJlblsxXSlcblxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cblxuICAgIC8vIDNEIGFuaW1cbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuICAgIGxldCBhbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4gICAgICAgIGFuZ2xlICs9IDAuOTsgLy8gc3BlZWRcbiAgICAgICAgY29uc3Qgcm90YXRlWCA9IE1hdGguc2luKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBYXG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltUmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuICAgIH1cbiAgICBhbmltYXRlQ2FyZHMoKTtcblxuICAgIC8vIHByZWRpY3QgdGFic1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYsIC5wcmVkaWN0X190YWJzLWRhdGVzID4gZGl2Jyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUYWIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKSB8fCBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWRhdGVzJyk7XG5cbiAgICAgICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0YWJQYWlyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFpclswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsaWNrZWRUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXJzKCkge1xuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuc2NvcmUtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUyLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMi5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhYkNsaWNrKSk7XG5cbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgIH0pO1xuXG4gICAgLy9zY29yZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gdGhpcy5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSArIDE7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy90YWJsZSB0YWJzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19ib2R5JykuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgICAgICBjb25zdCBib2R5Q2xhc3MgPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZGF0ZTEnKSA/ICcudGFibGVfX2JvZHkudGFibGUxJyA6ICcudGFibGVfX2JvZHkudGFibGUyJztcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm9keUNsYXNzKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy9wb3B1cHNcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwcyh0cmlnZ2VyQnV0dG9ucywgcG9wdXBDbGFzcykge1xuICAgICAgICBjb25zdCBwb3B1cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzJyk7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBvcHVwc19faXRlbS4ke3BvcHVwQ2xhc3N9YCk7XG5cbiAgICAgICAgaWYgKCF0cmlnZ2VyQnV0dG9ucyB8fCAhcG9wdXAgfHwgIXBvcHVwc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIHRyaWdnZXJCdXR0b25zLmZvckVhY2godHJpZ2dlckJ1dHRvbiA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHNfX2l0ZW0tY2xvc2UnKTtcbiAgICAgICAgY29uc3QgYnRuQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNsb3NlJyk7XG5cbiAgICAgICAgcG9wdXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cHNDb250YWluZXIgfHwgZS50YXJnZXQgPT09IGNsb3NlQnV0dG9uIHx8IGUudGFyZ2V0ID09PSBidG5DbG9zZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL1Nob3cgZmlyc3QgZ29hbCB3aW5uZXIgYWZ0ZXIgbWF0Y2hcbiAgICBmdW5jdGlvbiBzZXRSYWRpb1dpbm5lcihpbmRleCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVuYWN0aXZlIC5wcmVkaWN0X19yYWRpb1wiKTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fcmFkaW8taXRlbVwiKTtcblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID49IGluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJdGVtID0gaXRlbXNbaW5kZXggLSAxXTsgLy8g0J7RgtGA0LjQvNGD0ZTQvNC+INC/0L7RgtGA0ZbQsdC90L7Qs9C+INC/0L7RgtC+0LzQutCwICgxIOKGkiAwLCAyIOKGkiAxLCAzIOKGkiAyKVxuXG4gICAgICAgICAgICB0YXJnZXRJdGVtLmNsYXNzTGlzdC5hZGQoXCJyYWRpb1dpbm5lclwiKTtcblxuICAgICAgICAgICAgY29uc3Qgc3BhbkVsZW1lbnQgPSB0YXJnZXRJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgICAgIGlmIChzcGFuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHNwYW5FbGVtZW50LmRhdGFzZXQudHJhbnNsYXRlID0gXCJ3aW5uZXJGaXJzdEdvYWxcIjtcbiAgICAgICAgICAgICAgICBzcGFuRWxlbWVudC50ZXh0Q29udGVudCA9IFwi0J/QtdGA0YjQuNC5INCz0L7Qu1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBmaXJzdEdvYWxSZXN1bHQgPSAxO1xuICAgIHNldFJhZGlvV2lubmVyKGZpcnN0R29hbFJlc3VsdCk7XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVBbmRTZXRTY29yZXMoc2NvcmUxLCBzY29yZTIpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpO1xuICAgICAgICBjb25zdCBnb2FsRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpO1xuXG4gICAgICAgIHNjb3JlRWxlbWVudD8uY2xhc3NMaXN0LnRvZ2dsZShcInVuYWN0aXZlXCIpO1xuICAgICAgICBnb2FsRWxlbWVudD8uY2xhc3NMaXN0LnRvZ2dsZShcInVuYWN0aXZlXCIpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudW5hY3RpdmUgLnByZWRpY3RfX3RlYW0tbnVtYmVyXCIpLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBpbmRleCA9PT0gMCA/IHNjb3JlMSA6IHNjb3JlMjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIHRvZ2dsZUFuZFNldFNjb3JlcygxLCAyKVxuXG4gICAgLy8gVEVTVFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxuZ0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG5nLWJ0blwiKVxuXG4gICAgbG5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImxvY2FsZVwiLCBcImVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnRuXCIpXG5cbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYodXNlcklkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIFwiMTg5MDg0NjVcIilcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0blBhcnRpY2lwYW50ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXBhcnRpY2lwYW50ZVwiKVxuXG4gICAgYnRuUGFydGljaXBhbnRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKT09XCIxODkwODQ2NVwiKXtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBcIjc3N1wiKVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbGFzdFByZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2xhc3QnKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGhlbmtzJyksICdfY29uZmlybVBvcHVwJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXByZWRpY3QnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmNvbmZpcm1lZCcpLmZvckVhY2godW5jb25maXJtZWQgPT4ge1xuICAgICAgICAgICAgICAgIHVuY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtZWQnKS5mb3JFYWNoKGNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnRuXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXRlc3RcIik/LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFmdGVyXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0b2dnbGVBbmRTZXRTY29yZXMoMSwgMilcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpPy5jbGFzc0xpc3QuY29udGFpbnMoXCJ1bmFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgc2V0UmFkaW9XaW5uZXIoZmlyc3RHb2FsUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fcmFkaW8taXRlbVwiKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInJhZGlvV2lubmVyXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG59KSgpIl19
