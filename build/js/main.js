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
        // spanElement.dataset.translate = "winnerFirstGoal";
        spanElement.textContent = "Перший гол";
      }
    }
  }
  var firstGoalResult = 1;
  // setRadioWinner(firstGoalResult);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnRpY2lwYXRlQnRucyIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsInVzZXJJZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJJbml0UGFnZSIsImNoZWNrVXNlckF1dGgiLCJ1bmF1dGhNZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1c2VyaWQiLCJmb3JFYWNoIiwiaXRlbSIsInJlbW92ZSIsInBhcnRpY2lwYXRlQnRuIiwieW91QXJlSW5CdG4iLCJwYXJ0aWNpcGF0ZSIsInBhcmFtcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZFRyYW5zbGF0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2xhdGUiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImluaXQiLCJ3aW5kb3ciLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwiaSIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsImF1dGhCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0RGF0YSIsImN1cnJlbnRTdGFnZSIsIlNUQUdFX0tFWVMiLCJzZWxlY3RlZFRhYiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVmcmVzaFVzZXJzIiwidXNlcnMiLCJyZW5kZXJVc2VycyIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJjdXJyZW50VXNlckluZGV4IiwiZmluZEluZGV4IiwidXNlciIsInNwbGljZSIsImZpbmQiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJpbmRleE9mIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwiYm9udXNLZXkiLCJnZXRCb251c1RyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsInNjb3JlTGVmdCIsInNjb3JlUmlnaHQiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNsaWNlIiwiY2FyZHMiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiY2FyZCIsImNvbnRhaW5zIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiY29udGFpbmVycyIsImhhbmRsZVRhYkNsaWNrIiwiZXZlbnQiLCJjbGlja2VkVGFiIiwidGFyZ2V0IiwidGFiUGFpciIsImNsb3Nlc3QiLCJwYWlyIiwidXBkYXRlQ29udGFpbmVycyIsImNvbnRhaW5lciIsInRhYiIsImJ1dHRvbiIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsInZhbHVlIiwicGFyc2VJbnQiLCJjb250ZW50IiwiYm9keUNsYXNzIiwic2V0UG9wdXBzIiwidHJpZ2dlckJ1dHRvbnMiLCJwb3B1cENsYXNzIiwicG9wdXBzQ29udGFpbmVyIiwicG9wdXAiLCJ0cmlnZ2VyQnV0dG9uIiwib3ZlcmZsb3ciLCJjbG9zZUJ1dHRvbiIsImJ0bkNsb3NlIiwiY2xvc2VQb3B1cCIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsInNldFJhZGlvV2lubmVyIiwiaW5kZXgiLCJpdGVtcyIsInRhcmdldEl0ZW0iLCJzcGFuRWxlbWVudCIsImZpcnN0R29hbFJlc3VsdCIsInRvZ2dsZUFuZFNldFNjb3JlcyIsInNjb3JlMSIsInNjb3JlMiIsInNjb3JlRWxlbWVudCIsImdvYWxFbGVtZW50IiwidG9nZ2xlIiwiZWwiLCJsbmdCdG4iLCJyZW1vdmVJdGVtIiwic2V0SXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIiwiYnRuUGFydGljaXBhbnRlIiwidW5jb25maXJtZWQiLCJjb25maXJtZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQUE7RUFDVCxJQUFNQSxNQUFNLEdBQUcsMENBQTBDO0lBQ3JEQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3hERSxZQUFZLEdBQUdILFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RERyxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUM5Q0MsWUFBWSxHQUFHTixRQUFRLENBQUNLLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2REUsaUJBQWlCLEdBQUdQLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLHNCQUFzQixDQUFDO0VBRXRFLElBQU1HLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDaEIsSUFBSUMsV0FBVyxHQUFHLEVBQUU7RUFFcEIsSUFBSUMsY0FBYyxHQUFHLElBQUk7RUFDekIsSUFBSUMsS0FBSyxHQUFHLEtBQUs7RUFFakIsSUFBSUMsTUFBTSw0QkFBR0MsY0FBYyxDQUFDQyxPQUFPLENBQUMsUUFBUSxDQUFDLHlFQUFJLElBQUk7RUFDckQ7O0VBRUEsSUFBTUMsTUFBTSxHQUFHZixRQUFRLENBQUNLLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDaEQsSUFBTVcsTUFBTSxHQUFHaEIsUUFBUSxDQUFDSyxhQUFhLENBQUMsU0FBUyxDQUFDO0VBR2hELElBQUlZLFFBQVEsR0FBRyxDQUFDLENBQUM7RUFFakIsSUFBSUMsTUFBTTtFQUNWQSxNQUFNLDZCQUFHTCxjQUFjLENBQUNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsMkVBQUksSUFBSTtFQUNqRDs7RUFFQSxJQUFJQyxNQUFNLEVBQUVILE1BQU0sR0FBRyxJQUFJO0VBQ3pCLElBQUlJLE1BQU0sRUFBRUosTUFBTSxHQUFHLElBQUk7RUFHekIsSUFBTU8sT0FBTyxHQUFHLFNBQVZBLE9BQU8sQ0FBYUMsSUFBSSxFQUFFQyxZQUFZLEVBQUU7SUFDMUMsT0FBT0MsS0FBSyxDQUFDeEIsTUFBTSxHQUFHc0IsSUFBSTtNQUN0QkcsT0FBTyxFQUFFO1FBQ0wsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixjQUFjLEVBQUU7TUFDcEI7SUFBQyxHQUNHRixZQUFZLElBQUksQ0FBQyxDQUFDLEVBQ3hCLENBQUNHLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLEVBQUU7SUFBQSxFQUFDO0VBQzlCLENBQUM7RUFFRCxJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBUSxHQUFTO0lBQ25CQyxhQUFhLEVBQUU7RUFDbkIsQ0FBQztFQUVELElBQUlBLGFBQWEsR0FBRyxTQUFoQkEsYUFBYSxHQUFTO0lBQ3RCLElBQUlWLE1BQU0sRUFBRTtNQUFBLDJDQUNnQm5CLFVBQVU7UUFBQTtNQUFBO1FBQWxDLG9EQUFvQztVQUFBLElBQXpCOEIsU0FBUztVQUNoQkEsU0FBUyxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDbkM7TUFBQztRQUFBO01BQUE7UUFBQTtNQUFBO01BQ0RaLE9BQU8sb0JBQWFELE1BQU0sRUFBRyxDQUN4Qk0sSUFBSSxDQUFDLFVBQUFDLEdBQUcsRUFBSTtRQUNULElBQUlBLEdBQUcsQ0FBQ08sTUFBTSxFQUFFO1VBQ1o5QixlQUFlLENBQUMrQixPQUFPLENBQUMsVUFBQUMsSUFBSTtZQUFBLE9BQUlBLElBQUksQ0FBQ0osU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1VBQUEsRUFBQztVQUMzRDVCLFlBQVksQ0FBQzhCLE9BQU8sQ0FBQyxVQUFBQyxJQUFJO1lBQUEsT0FBSUEsSUFBSSxDQUFDSixTQUFTLENBQUNLLE1BQU0sQ0FBQyxNQUFNLENBQUM7VUFBQSxFQUFDO1FBRS9ELENBQUMsTUFBTTtVQUNIakMsZUFBZSxDQUFDK0IsT0FBTyxDQUFDLFVBQUFDLElBQUk7WUFBQSxPQUFJQSxJQUFJLENBQUNKLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLE1BQU0sQ0FBQztVQUFBLEVBQUM7UUFDbEU7TUFDSixDQUFDLENBQUM7SUFDVixDQUFDLE1BQU07TUFBQSw0Q0FDd0JqQyxlQUFlO1FBQUE7TUFBQTtRQUExQyx1REFBNEM7VUFBQSxJQUFuQ2tDLGNBQWM7VUFDbkJBLGNBQWMsQ0FBQ04sU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3hDO01BQUM7UUFBQTtNQUFBO1FBQUE7TUFBQTtNQUFBLDRDQUN1QjVCLFlBQVk7UUFBQTtNQUFBO1FBQXBDLHVEQUFzQztVQUFBLElBQTdCa0MsV0FBVztVQUNoQkEsV0FBVyxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDckM7TUFBQztRQUFBO01BQUE7UUFBQTtNQUFBO01BQUEsNENBQ3VCaEMsVUFBVTtRQUFBO01BQUE7UUFBbEMsdURBQW9DO1VBQUEsSUFBekI4QixVQUFTO1VBQ2hCQSxVQUFTLENBQUNDLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN0QztNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7SUFDTDtFQUNKLENBQUM7RUFHRCxTQUFTRyxXQUFXLEdBQUc7SUFDbkIsSUFBSSxDQUFDcEIsTUFBTSxFQUFFO01BQ1Q7SUFDSjtJQUVBLElBQU1xQixNQUFNLEdBQUc7TUFBQ1AsTUFBTSxFQUFFZDtJQUFNLENBQUM7SUFFL0JDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7TUFDYnFCLE1BQU0sRUFBRSxNQUFNO01BQ2RDLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUNKLE1BQU07SUFDL0IsQ0FBQyxDQUFDLENBQUNmLElBQUksQ0FBQyxVQUFBQyxHQUFHLEVBQUk7TUFDWEcsYUFBYSxFQUFFO01BQ2ZELFFBQVEsRUFBRTtJQUNkLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU2lCLGdCQUFnQixHQUFHO0lBQ3hCLE9BQU90QixLQUFLLFdBQUl4QixNQUFNLDZCQUFtQmMsTUFBTSxFQUFHLENBQUNZLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLEVBQUU7SUFBQSxFQUFDLENBQ3JFRixJQUFJLENBQUMsVUFBQUUsSUFBSSxFQUFJO01BQ1ZULFFBQVEsR0FBR1MsSUFBSTtNQUNmbUIsT0FBTyxDQUFDQyxHQUFHLENBQUM3QixRQUFRLENBQUM7TUFDckI4QixTQUFTLEVBQUU7TUFDWCxJQUFJQyxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBZ0IsQ0FBQyxVQUFVQyxTQUFTLEVBQUU7UUFDN0RILFNBQVMsRUFBRTtNQUNmLENBQUMsQ0FBQztNQUNGQyxnQkFBZ0IsQ0FBQ0csT0FBTyxDQUFDbkQsUUFBUSxDQUFDb0QsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEVDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLE9BQU8sRUFBRTtNQUNiLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNWO0VBRUEsU0FBU1AsU0FBUyxHQUFHO0lBQ2pCLElBQU1RLEtBQUssR0FBR3ZELFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7SUFDM0QsSUFBR1MsY0FBYyxFQUFDO01BQ2Q2QyxLQUFLLENBQUN0QixPQUFPLENBQUMsVUFBQXVCLElBQUksRUFBSTtRQUNsQixJQUFNQyxHQUFHLEdBQUdELElBQUksQ0FBQ0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQy9DRixJQUFJLENBQUNHLFNBQVMsR0FBRzFDLFFBQVEsQ0FBQ3dDLEdBQUcsQ0FBQyxJQUFJLDBDQUEwQyxHQUFHQSxHQUFHO1FBQ2xGRCxJQUFJLENBQUNJLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztNQUMxQyxDQUFDLENBQUM7SUFDTixDQUFDLE1BQUk7TUFDRGYsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDcEM7SUFDQWUscUJBQXFCLENBQUN6RCxRQUFRLENBQUM7RUFDbkM7RUFFQSxTQUFTeUQscUJBQXFCLENBQUNDLE9BQU8sRUFBRTtJQUNwQyxJQUFJLENBQUNBLE9BQU8sRUFBRTtNQUNWO0lBQ0o7SUFDQSx3QkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLDBCQUFFO01BQTVCLElBQU1DLElBQUk7TUFDWEQsT0FBTyxDQUFDaEMsU0FBUyxDQUFDSyxNQUFNLENBQUM0QixJQUFJLENBQUM7SUFDbEM7SUFDQUQsT0FBTyxDQUFDaEMsU0FBUyxDQUFDQyxHQUFHLENBQUNuQixNQUFNLENBQUM7RUFDakM7RUFFQSxTQUFTb0QsSUFBSSxHQUFHO0lBQ1osSUFBSUMsTUFBTSxDQUFDQyxLQUFLLEVBQUU7TUFDZCxJQUFJQyxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDRSxRQUFRLEVBQUU7TUFDbkNsRCxNQUFNLEdBQUdpRCxLQUFLLENBQUNFLElBQUksQ0FBQ0MsWUFBWSxJQUFJSCxLQUFLLENBQUNFLElBQUksQ0FBQ0UsRUFBRSxJQUFJLEVBQUU7TUFDdkQ1QyxRQUFRLEVBQUU7SUFDZCxDQUFDLE1BQU07TUFDSEEsUUFBUSxFQUFFO01BQ1YsSUFBSTZDLENBQUMsR0FBRyxDQUFDO01BQ1QsSUFBSUMsQ0FBQyxHQUFHQyxXQUFXLENBQUMsWUFBWTtRQUM1QixJQUFJRixDQUFDLEdBQUcsRUFBRSxFQUFFO1VBQ1IsSUFBSSxDQUFDLENBQUNQLE1BQU0sQ0FBQ1UsU0FBUyxFQUFFO1lBQ3BCekQsTUFBTSxHQUFHK0MsTUFBTSxDQUFDVSxTQUFTO1lBQ3pCaEQsUUFBUSxFQUFFO1lBQ1ZDLGFBQWEsRUFBRTtZQUNmZ0QsYUFBYSxDQUFDSCxDQUFDLENBQUM7VUFDcEI7UUFDSixDQUFDLE1BQU07VUFDSEcsYUFBYSxDQUFDSCxDQUFDLENBQUM7UUFDcEI7TUFDSixDQUFDLEVBQUUsR0FBRyxDQUFDO0lBRVg7SUFDQTlDLFFBQVEsRUFBRTtJQUVWekIsZUFBZSxDQUFDK0IsT0FBTyxDQUFDLFVBQUM0QyxPQUFPLEVBQUVKLENBQUMsRUFBSztNQUNwQ0ksT0FBTyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO1FBQ3JDQSxDQUFDLENBQUNDLGNBQWMsRUFBRTtRQUNsQjFDLFdBQVcsRUFBRTtNQUNqQixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTjtFQUVBTSxnQkFBZ0IsRUFBRSxDQUNicEIsSUFBSSxDQUFDd0MsSUFBSSxDQUFDOztFQUVmO0VBQ0EsU0FBU2lCLE9BQU8sR0FBRztJQUNmLElBQU1DLFlBQVksR0FBR0MsVUFBVSxDQUFDQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELElBQUk1RSxLQUFLLENBQUMwRSxZQUFZLENBQUMsRUFBRTtNQUNyQixPQUFPRyxPQUFPLENBQUNDLE9BQU8sQ0FBQzlFLEtBQUssQ0FBQzBFLFlBQVksQ0FBQyxDQUFDO0lBQy9DO0lBQ0EsT0FBTy9ELE9BQU8sa0JBQVcrRCxZQUFZLEVBQUcsQ0FBQzFELElBQUksQ0FBQyxVQUFBQyxHQUFHLEVBQUk7TUFDakRqQixLQUFLLENBQUMwRSxZQUFZLENBQUMsR0FBR3pELEdBQUc7TUFDekIsT0FBT0EsR0FBRztJQUNkLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBUzhELFlBQVksR0FBRztJQUNwQk4sT0FBTyxFQUFFLENBQUN6RCxJQUFJLENBQUMsVUFBQWdFLEtBQUssRUFBSTtNQUNwQixJQUFHLENBQUM3RSxLQUFLLEVBQUU7UUFDUDhFLFdBQVcsQ0FBQ0QsS0FBSyxDQUFDO01BQ3RCO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFDQSxTQUFTQyxXQUFXLENBQUNELEtBQUssRUFBRTtJQUN4QkUsa0JBQWtCLENBQUNGLEtBQUssRUFBRXRFLE1BQU0sQ0FBQztFQUVyQztFQUVBLFNBQVN3RSxrQkFBa0IsQ0FBQ0YsS0FBSyxFQUFFRyxhQUFhLEVBQUU7SUFDOUNyRixZQUFZLENBQUNxRCxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0JwRCxpQkFBaUIsQ0FBQ29ELFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQzs7SUFFbEMsSUFBSSxDQUFDNkIsS0FBSyxJQUFJLENBQUNBLEtBQUssQ0FBQ0ksTUFBTSxFQUFFLE9BQU8sQ0FBQzs7SUFFckM7SUFDQSxJQUFNQyxnQkFBZ0IsR0FBR0wsS0FBSyxDQUFDTSxTQUFTLENBQUMsVUFBQUMsSUFBSTtNQUFBLE9BQUlBLElBQUksQ0FBQy9ELE1BQU0sS0FBSzJELGFBQWE7SUFBQSxFQUFDO0lBRS9FLElBQUlFLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxFQUFFO01BQ3pCO01BQ0FMLEtBQUssQ0FBQ1EsTUFBTSxDQUFDSCxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDckM7O0lBRUE7SUFDQUwsS0FBSyxDQUFDUSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRVIsS0FBSyxDQUFDUyxJQUFJLENBQUMsVUFBQUYsSUFBSTtNQUFBLE9BQUlBLElBQUksQ0FBQy9ELE1BQU0sS0FBSzJELGFBQWE7SUFBQSxFQUFDLENBQUM7O0lBRXRFO0lBQ0FILEtBQUssQ0FBQ3ZELE9BQU8sQ0FBQyxVQUFBOEQsSUFBSTtNQUFBLE9BQ2RHLFdBQVcsQ0FBQ0gsSUFBSSxFQUFFQSxJQUFJLENBQUMvRCxNQUFNLEtBQUsyRCxhQUFhLEVBQUVyRixZQUFZLEVBQUVrRixLQUFLLENBQUM7SUFBQSxFQUN4RTtFQUNMO0VBRUEsU0FBU1UsV0FBVyxDQUFDSCxJQUFJLEVBQUVJLGFBQWEsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUU7SUFDdkQsSUFBTUMsaUJBQWlCLEdBQUd0RyxRQUFRLENBQUN1RyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3ZERCxpQkFBaUIsQ0FBQ3hFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUU3QyxJQUFNeUUsS0FBSyxHQUFHSCxRQUFRLENBQUNJLE9BQU8sQ0FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUV4QyxJQUFJVyxRQUFRO0lBQ1pBLFFBQVEsR0FBR0Msc0JBQXNCLENBQUNILEtBQUssQ0FBQztJQUN4QyxJQUFJSSxRQUFRO0lBQ1pBLFFBQVEsR0FBR0Msc0JBQXNCLENBQUNMLEtBQUssQ0FBQztJQUV4Q0YsaUJBQWlCLENBQUMzQyxTQUFTLHNEQUNJd0MsYUFBYSxHQUFHSixJQUFJLENBQUMvRCxNQUFNLEdBQUc4RSxVQUFVLENBQUNmLElBQUksQ0FBQy9ELE1BQU0sQ0FBQyxnRkFFeEUrRCxJQUFJLENBQUNnQixTQUFTLHlGQUVkaEIsSUFBSSxDQUFDaUIsVUFBVSw2RUFFSU4sUUFBUSxHQUFHTyxZQUFZLENBQUNQLFFBQVEsQ0FBQyxHQUFHLEtBQUssNERBQ3pDRSxRQUFRLEdBQUdLLFlBQVksQ0FBQ0wsUUFBUSxDQUFDLEdBQUcsS0FBSyxpQkFDM0U7SUFDRyxJQUFJVCxhQUFhLEVBQUU7TUFDZkcsaUJBQWlCLENBQUN4RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7TUFDdEMsSUFBTW1GLFFBQVEsR0FBR2xILFFBQVEsQ0FBQ3VHLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDOUNXLFFBQVEsQ0FBQ3BGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO01BQ3hDbUYsUUFBUSxDQUFDQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDO01BQ25ERCxRQUFRLENBQUNFLFdBQVcsR0FBRyxLQUFLO01BQzVCZCxpQkFBaUIsQ0FBQ2UsWUFBWSxDQUFDSCxRQUFRLEVBQUVaLGlCQUFpQixDQUFDZ0IsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNFO0lBQ0FsQixLQUFLLENBQUNtQixNQUFNLENBQUNqQixpQkFBaUIsQ0FBQztFQUNuQztFQUNBLFNBQVNRLFVBQVUsQ0FBQzVGLE1BQU0sRUFBRTtJQUN4QixPQUFPLElBQUksR0FBR0EsTUFBTSxDQUFDc0csUUFBUSxFQUFFLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDNUM7O0VBR0E7RUFDQSxJQUFNQyxLQUFLLEdBQUcxSCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztFQUN6RSxJQUFJMEgsS0FBSyxHQUFHLENBQUM7RUFFYixTQUFTQyxZQUFZLEdBQUc7SUFDcEJELEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNkLElBQU1FLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxHQUFHLENBQUNKLEtBQUssSUFBSUcsSUFBSSxDQUFDRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RCxJQUFNQyxPQUFPLEdBQUdILElBQUksQ0FBQ0ksR0FBRyxDQUFDUCxLQUFLLElBQUlHLElBQUksQ0FBQ0UsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7O0lBRXhETixLQUFLLENBQUN6RixPQUFPLENBQUMsVUFBQWtHLElBQUksRUFBSTtNQUNsQixJQUFJQSxJQUFJLENBQUNyRyxTQUFTLENBQUNzRyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdENELElBQUksQ0FBQ0UsS0FBSyxDQUFDQyxTQUFTLHFCQUFjLENBQUNMLE9BQU8sMEJBQWdCLENBQUNKLE9BQU8sU0FBTTtNQUM1RSxDQUFDLE1BQU07UUFDSE0sSUFBSSxDQUFDRSxLQUFLLENBQUNDLFNBQVMscUJBQWNMLE9BQU8sMEJBQWdCSixPQUFPLFNBQU07TUFDMUU7SUFDSixDQUFDLENBQUM7SUFFRlUscUJBQXFCLENBQUNYLFlBQVksQ0FBQztFQUN2QztFQUNBQSxZQUFZLEVBQUU7O0VBRWQ7RUFDQTVILFFBQVEsQ0FBQzhFLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7SUFFckQsSUFBTTBELElBQUksR0FBR3hJLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMseURBQXlELENBQUM7SUFDakcsSUFBTXdJLFVBQVUsR0FBR3pJLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7SUFFbkUsU0FBU3lJLGNBQWMsQ0FBQ0MsS0FBSyxFQUFFO01BQzNCLElBQU1DLFVBQVUsR0FBR0QsS0FBSyxDQUFDRSxNQUFNO01BQy9CLElBQU1DLE9BQU8sR0FBR0YsVUFBVSxDQUFDRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsSUFBSUgsVUFBVSxDQUFDRyxPQUFPLENBQUMsc0JBQXNCLENBQUM7TUFFekcsSUFBSUgsVUFBVSxDQUFDOUcsU0FBUyxDQUFDc0csUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO01BQzdDLElBQUlVLE9BQU8sRUFBRTtRQUNULElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDN0ksZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQ2hELElBQUkrSSxJQUFJLENBQUNwRCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQ2pCb0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDbEgsU0FBUyxDQUFDSyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3RDO01BQ0o7TUFFQXlHLFVBQVUsQ0FBQzlHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUNsQ2tILGdCQUFnQixFQUFFO0lBQ3RCO0lBRUEsU0FBU0EsZ0JBQWdCLEdBQUc7TUFDeEJSLFVBQVUsQ0FBQ3hHLE9BQU8sQ0FBQyxVQUFBaUgsU0FBUztRQUFBLE9BQUlBLFNBQVMsQ0FBQ3BILFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUFBLEVBQUM7TUFFckUsSUFBSW5DLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLDZCQUE2QixDQUFDLElBQUlMLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7UUFDckhMLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUN5QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDakYsQ0FBQyxNQUFNLElBQUkvQixRQUFRLENBQUNLLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJTCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFO1FBQzVITCxRQUFRLENBQUNLLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDeUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ2pGLENBQUMsTUFBTSxJQUFJL0IsUUFBUSxDQUFDSyxhQUFhLENBQUMsNEJBQTRCLENBQUMsSUFBSUwsUUFBUSxDQUFDSyxhQUFhLENBQUMsa0NBQWtDLENBQUMsRUFBRTtRQUMzSEwsUUFBUSxDQUFDSyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQ3lCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUNoRixDQUFDLE1BQU0sSUFBSS9CLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLDRCQUE0QixDQUFDLElBQUlMLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7UUFDM0hMLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUN5QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDaEY7SUFDSjtJQUVBeUcsSUFBSSxDQUFDdkcsT0FBTyxDQUFDLFVBQUFrSCxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDckUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFNEQsY0FBYyxDQUFDO0lBQUEsRUFBQztJQUVsRU8sZ0JBQWdCLEVBQUU7RUFDdEIsQ0FBQyxDQUFDOztFQUVGO0VBQ0FqSixRQUFRLENBQUNDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLENBQUNnQyxPQUFPLENBQUMsVUFBQW1ILE1BQU0sRUFBSTtJQUNuRUEsTUFBTSxDQUFDdEUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVc7TUFDeEMsSUFBTXVFLFdBQVcsR0FBRyxJQUFJLENBQUNOLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztNQUMxRCxJQUFNTyxVQUFVLEdBQUdELFdBQVcsQ0FBQ2hKLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztNQUNyRSxJQUFJa0osS0FBSyxHQUFHQyxRQUFRLENBQUNGLFVBQVUsQ0FBQ2xDLFdBQVcsQ0FBQztNQUM1Q2tDLFVBQVUsQ0FBQ2xDLFdBQVcsR0FBR21DLEtBQUssR0FBRyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGdkosUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDZ0MsT0FBTyxDQUFDLFVBQUFtSCxNQUFNLEVBQUk7SUFDbkVBLE1BQU0sQ0FBQ3RFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO01BQ3hDLElBQU11RSxXQUFXLEdBQUcsSUFBSSxDQUFDTixPQUFPLENBQUMsd0JBQXdCLENBQUM7TUFDMUQsSUFBTU8sVUFBVSxHQUFHRCxXQUFXLENBQUNoSixhQUFhLENBQUMsdUJBQXVCLENBQUM7TUFDckUsSUFBSWtKLEtBQUssR0FBR0MsUUFBUSxDQUFDRixVQUFVLENBQUNsQyxXQUFXLENBQUM7TUFDNUMsSUFBSW1DLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDWEQsVUFBVSxDQUFDbEMsV0FBVyxHQUFHbUMsS0FBSyxHQUFHLENBQUM7TUFDdEM7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7O0VBRUY7RUFDQXZKLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFBa0gsR0FBRyxFQUFJO0lBQzFEQSxHQUFHLENBQUNyRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUNyQyxJQUFJLElBQUksQ0FBQ2hELFNBQVMsQ0FBQ3NHLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNuQztNQUNKO01BRUFwSSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUNnQyxPQUFPLENBQUMsVUFBQWtILEdBQUc7UUFBQSxPQUFJQSxHQUFHLENBQUNySCxTQUFTLENBQUNLLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFBQSxFQUFDO01BQzdGLElBQUksQ0FBQ0wsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BRTVCL0IsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFBd0gsT0FBTztRQUFBLE9BQUlBLE9BQU8sQ0FBQzNILFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUFBLEVBQUM7TUFFaEcsSUFBTXVILFNBQVMsR0FBRyxJQUFJLENBQUM1SCxTQUFTLENBQUNzRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcscUJBQXFCLEdBQUcscUJBQXFCO01BQ2xHcEksUUFBUSxDQUFDSyxhQUFhLENBQUNxSixTQUFTLENBQUMsQ0FBQzVILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUV6RHdELFlBQVksRUFBRTtJQUNsQixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7O0VBRUY7O0VBRUEsU0FBU29FLFNBQVMsQ0FBQ0MsY0FBYyxFQUFFQyxVQUFVLEVBQUU7SUFDM0MsSUFBTUMsZUFBZSxHQUFHOUosUUFBUSxDQUFDSyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ3pELElBQU0wSixLQUFLLEdBQUcvSixRQUFRLENBQUNLLGFBQWEseUJBQWtCd0osVUFBVSxFQUFHO0lBRW5FLElBQUksQ0FBQ0QsY0FBYyxJQUFJLENBQUNHLEtBQUssSUFBSSxDQUFDRCxlQUFlLEVBQUU7SUFFbkRGLGNBQWMsQ0FBQzNILE9BQU8sQ0FBQyxVQUFBK0gsYUFBYSxFQUFJO01BQ3BDQSxhQUFhLENBQUNsRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtRQUMxQ2dGLGVBQWUsQ0FBQ2hJLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM1QzJILGVBQWUsQ0FBQ2hJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDOEgsVUFBVSxDQUFDO1FBQ3pDN0osUUFBUSxDQUFDeUMsSUFBSSxDQUFDNEYsS0FBSyxDQUFDNEIsUUFBUSxHQUFHLFFBQVE7TUFDM0MsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0lBRUYsSUFBTUMsV0FBVyxHQUFHSCxLQUFLLENBQUMxSixhQUFhLENBQUMscUJBQXFCLENBQUM7SUFDOUQsSUFBTThKLFFBQVEsR0FBR0osS0FBSyxDQUFDMUosYUFBYSxDQUFDLFlBQVksQ0FBQztJQUVsRHlKLGVBQWUsQ0FBQ2hGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDQyxDQUFDLEVBQUs7TUFDN0MsSUFBSUEsQ0FBQyxDQUFDOEQsTUFBTSxLQUFLaUIsZUFBZSxJQUFJL0UsQ0FBQyxDQUFDOEQsTUFBTSxLQUFLcUIsV0FBVyxJQUFJbkYsQ0FBQyxDQUFDOEQsTUFBTSxLQUFLc0IsUUFBUSxFQUFFO1FBQ25GQyxVQUFVLEVBQUU7TUFDaEI7SUFDSixDQUFDLENBQUM7SUFFRixTQUFTQSxVQUFVLEdBQUc7TUFDbEJOLGVBQWUsQ0FBQ2hJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUN6QytILGVBQWUsQ0FBQ2hJLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDMEgsVUFBVSxDQUFDO01BQzVDN0osUUFBUSxDQUFDeUMsSUFBSSxDQUFDNEYsS0FBSyxDQUFDNEIsUUFBUSxHQUFHLEVBQUU7SUFDckM7RUFDSjtFQUVBTixTQUFTLENBQUMzSixRQUFRLENBQUNDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsV0FBVyxDQUFDO0VBQ3BFMEosU0FBUyxDQUFDM0osUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLGVBQWUsQ0FBQzs7RUFFaEY7RUFDQUQsUUFBUSxDQUFDSyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUN5RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWTtJQUN2RSxJQUFNdUYsYUFBYSxHQUFHckssUUFBUSxDQUFDb0QsY0FBYyxDQUFDLFNBQVMsQ0FBQztJQUN4RCxJQUFNa0gsY0FBYyxHQUFHRCxhQUFhLENBQUNFLHFCQUFxQixFQUFFLENBQUNDLEdBQUcsR0FBR3ZHLE1BQU0sQ0FBQ3dHLFdBQVcsR0FBRyxDQUFDO0lBRXpGeEcsTUFBTSxDQUFDeUcsUUFBUSxDQUFDO01BQ1pGLEdBQUcsRUFBRUYsY0FBYztNQUNuQkssUUFBUSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDOztFQUVGO0VBQ0EsU0FBU0MsY0FBYyxDQUFDQyxLQUFLLEVBQUU7SUFDM0IsSUFBTTNCLFNBQVMsR0FBR2xKLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBRXJFLElBQUksQ0FBQzZJLFNBQVMsRUFBRTtJQUVoQixJQUFNNEIsS0FBSyxHQUFHNUIsU0FBUyxDQUFDakosZ0JBQWdCLENBQUMsc0JBQXNCLENBQUM7SUFFaEUsSUFBSTZLLEtBQUssQ0FBQ2xGLE1BQU0sSUFBSWlGLEtBQUssRUFBRTtNQUN2QixJQUFNRSxVQUFVLEdBQUdELEtBQUssQ0FBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O01BRXJDRSxVQUFVLENBQUNqSixTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7TUFFdkMsSUFBTWlKLFdBQVcsR0FBR0QsVUFBVSxDQUFDMUssYUFBYSxDQUFDLE1BQU0sQ0FBQztNQUNwRCxJQUFJMkssV0FBVyxFQUFFO1FBQ2I7UUFDQUEsV0FBVyxDQUFDNUQsV0FBVyxHQUFHLFlBQVk7TUFDMUM7SUFDSjtFQUNKO0VBQ0EsSUFBSTZELGVBQWUsR0FBRyxDQUFDO0VBQ3ZCOztFQUVBLFNBQVNDLGtCQUFrQixDQUFDQyxNQUFNLEVBQUVDLE1BQU0sRUFBRTtJQUN4QyxJQUFNQyxZQUFZLEdBQUdyTCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDdkQsSUFBTWlMLFdBQVcsR0FBR3RMLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUVyRGdMLFlBQVksYUFBWkEsWUFBWSx1QkFBWkEsWUFBWSxDQUFFdkosU0FBUyxDQUFDeUosTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUMxQ0QsV0FBVyxhQUFYQSxXQUFXLHVCQUFYQSxXQUFXLENBQUV4SixTQUFTLENBQUN5SixNQUFNLENBQUMsVUFBVSxDQUFDO0lBRXpDdkwsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDZ0MsT0FBTyxDQUFDLFVBQUN1SixFQUFFLEVBQUVYLEtBQUssRUFBSztNQUNoRlcsRUFBRSxDQUFDcEUsV0FBVyxHQUFHeUQsS0FBSyxLQUFLLENBQUMsR0FBR00sTUFBTSxHQUFHQyxNQUFNO0lBQ2xELENBQUMsQ0FBQztFQUNOO0VBQ0E7O0VBRUE7RUFDQXBMLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDeUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDaEU5RSxRQUFRLENBQUN5QyxJQUFJLENBQUNYLFNBQVMsQ0FBQ3lKLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDMUMsQ0FBQyxDQUFDO0VBRUYsSUFBTUUsTUFBTSxHQUFHekwsUUFBUSxDQUFDSyxhQUFhLENBQUMsVUFBVSxDQUFDO0VBRWpEb0wsTUFBTSxDQUFDM0csZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDbkMsSUFBSWpFLGNBQWMsQ0FBQ0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO01BQ2xDRCxjQUFjLENBQUM2SyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUMsTUFBTTtNQUNIN0ssY0FBYyxDQUFDOEssT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7SUFDMUM7SUFDQTFILE1BQU0sQ0FBQzJILFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQzVCLENBQUMsQ0FBQztFQUVGLElBQU1oSCxPQUFPLEdBQUc3RSxRQUFRLENBQUNLLGFBQWEsQ0FBQyxXQUFXLENBQUM7RUFFbkR3RSxPQUFPLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQ25DLElBQUc1RCxNQUFNLEVBQUM7TUFDTkwsY0FBYyxDQUFDNkssVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUN2QyxDQUFDLE1BQUk7TUFDRDdLLGNBQWMsQ0FBQzhLLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0lBQ2hEO0lBQ0ExSCxNQUFNLENBQUMySCxRQUFRLENBQUNDLE1BQU0sRUFBRTtFQUM1QixDQUFDLENBQUM7RUFFRixJQUFNQyxlQUFlLEdBQUc5TCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztFQUVuRXlMLGVBQWUsQ0FBQ2hILGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQzNDLElBQUdqRSxjQUFjLENBQUNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBRSxVQUFVLEVBQUM7TUFDNUNaLGVBQWUsQ0FBQytCLE9BQU8sQ0FBQyxVQUFBQyxJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDSixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFBQSxFQUFDO01BQzNENUIsWUFBWSxDQUFDOEIsT0FBTyxDQUFDLFVBQUFDLElBQUk7UUFBQSxPQUFJQSxJQUFJLENBQUNKLFNBQVMsQ0FBQ0ssTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUFBLEVBQUM7SUFDL0QsQ0FBQyxNQUFJO01BQ0R0QixjQUFjLENBQUM4SyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUMzQztFQUVKLENBQUMsQ0FBQztFQUVGM0wsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFBbUgsTUFBTSxFQUFJO0lBQ3pEQSxNQUFNLENBQUN0RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUN4QzlFLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFBNkIsT0FBTyxFQUFJO1FBQzNEQSxPQUFPLENBQUNoQyxTQUFTLENBQUN5SixNQUFNLENBQUMsTUFBTSxDQUFDO01BQ3BDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGNUIsU0FBUyxDQUFDM0osUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxlQUFlLENBQUM7RUFFcEVELFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUNnQyxPQUFPLENBQUMsVUFBQW1ILE1BQU0sRUFBSTtJQUN4REEsTUFBTSxDQUFDdEUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDbkM5RSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDZ0MsT0FBTyxDQUFDLFVBQUE4SixXQUFXLEVBQUk7UUFDN0RBLFdBQVcsQ0FBQ2pLLFNBQVMsQ0FBQ3lKLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDMUMsQ0FBQyxDQUFDO01BRUZ2TCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDZ0MsT0FBTyxDQUFDLFVBQUErSixTQUFTLEVBQUk7UUFDekRBLFNBQVMsQ0FBQ2xLLFNBQVMsQ0FBQ3lKLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDeEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0VBRUZ2TCxRQUFRLENBQUM4RSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0lBQUE7SUFDaEQseUJBQUE5RSxRQUFRLENBQUNLLGFBQWEsQ0FBQyxXQUFXLENBQUMsMERBQW5DLHNCQUFxQ3lFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQUE7TUFDakUsMEJBQUE5RSxRQUFRLENBQUNLLGFBQWEsQ0FBQyxZQUFZLENBQUMsMkRBQXBDLHVCQUFzQ3lCLFNBQVMsQ0FBQ3lKLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEUsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0VBRUYsMEJBQUF2TCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxZQUFZLENBQUMsMkRBQXBDLHVCQUFzQ3lFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQUE7SUFDbEVvRyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLDhCQUFJbEwsUUFBUSxDQUFDSyxhQUFhLENBQUMsVUFBVSxDQUFDLG1EQUFsQyx1QkFBb0N5QixTQUFTLENBQUNzRyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7TUFDcEV3QyxjQUFjLENBQUNLLGVBQWUsQ0FBQztJQUNuQyxDQUFDLE1BQU07TUFDSGpMLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFBQyxJQUFJLEVBQUk7UUFDOURBLElBQUksQ0FBQ0osU0FBUyxDQUFDSyxNQUFNLENBQUMsYUFBYSxDQUFDO01BQ3hDLENBQUMsQ0FBQztJQUNOO0VBQ0osQ0FBQyxDQUFDO0FBR04sQ0FBQyxHQUFHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfZ29hbHNfb3JfemVyb2VzJyxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLFxuICAgICAgICB5b3VBcmVJbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpXG5cbiAgICBjb25zdCBjYWNoZSA9IHt9O1xuICAgIGxldCBwcmVkaWN0RGF0YSA9IFtdO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gdHJ1ZVxuICAgIGxldCBkZWJ1ZyA9IGZhbHNlXG5cbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/PyBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJ1a1wiXG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcblxuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSA/PyBudWxsXG4gICAgLy8gdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB5b3VBcmVJbkJ0biBvZiB5b3VBcmVJbkJ0bnMpIHtcbiAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L25ldy10cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaTE4bkRhdGEpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvYWxzLW9yLXplcm9zJyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIH1cbiAgICAgICAgSW5pdFBhZ2UoKTtcblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpXG5cbiAgICAvLyB0YWJsZVxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGFnZSA9IFNUQUdFX0tFWVNbc2VsZWN0ZWRUYWIgLSAxXTtcbiAgICAgICAgaWYgKGNhY2hlW2N1cnJlbnRTdGFnZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVbY3VycmVudFN0YWdlXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcXVlc3QoYC91c2Vycy8ke2N1cnJlbnRTdGFnZX1gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjYWNoZVtjdXJyZW50U3RhZ2VdID0gcmVzO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFVzZXJzKCkge1xuICAgICAgICBnZXREYXRhKCkudGhlbih1c2VycyA9PiB7XG4gICAgICAgICAgICBpZighZGVidWcpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJVc2Vycyh1c2Vycykge1xuICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRidGD0ZTQvNC+INC+0YHQvdC+0LLQvdGDINGC0LDQsdC70LjRhtGOXG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRidGD0ZTQvNC+INC00L7QtNCw0YLQutC+0LLRgyDRgtCw0LHQu9C40YbRjlxuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INGUINC60L7RgNC40YHRgtGD0LLQsNGH0ZZcblxuICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0ZbQvdC00LXQutGBINC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSB1c2Vycy5maW5kSW5kZXgodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4gY3VycmVudFVzZXJJZCDQt9GWINGB0L/QuNGB0LrRg1xuICAgICAgICAgICAgdXNlcnMuc3BsaWNlKGN1cnJlbnRVc2VySW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JTQvtC00LDRlNC80L4gY3VycmVudFVzZXJJZCDQvdCwIDExINC/0L7Qt9C40YbRltGOICjRltC90LTQtdC60YEgMTApXG4gICAgICAgIHVzZXJzLnNwbGljZSgxMCwgMCwgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKSk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIg0YMg0YLQsNCx0LvQuNGG0Y5cbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+XG4gICAgICAgICAgICBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG5cbiAgICAgICAgbGV0IHByaXplS2V5O1xuICAgICAgICBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgIGxldCBib251c0tleTtcbiAgICAgICAgYm9udXNLZXkgPSBnZXRCb251c1RyYW5zbGF0aW9uS2V5KHBsYWNlKVxuXG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuPiR7dXNlci5zY29yZUxlZnR9PC9zcGFuPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvdnMucG5nXCIgYWx0PVwidnNcIj5cbiAgICAgICAgICAgIDxzcGFuPiR7dXNlci5zY29yZVJpZ2h0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtib251c0tleSA/IHRyYW5zbGF0ZUtleShib251c0tleSkgOiAnIC0gJ308L2Rpdj5cbiAgICBgO1xuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcInlvdVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93LXlvdScpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd0YWJsZVlvdScpO1xuICAgICAgICAgICAgeW91QmxvY2sudGV4dENvbnRlbnQgPSBcIllvdVwiO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5zZXJ0QmVmb3JlKHlvdUJsb2NrLCBhZGRpdGlvbmFsVXNlclJvdy5jaGlsZHJlblsxXSlcblxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cblxuICAgIC8vIDNEIGFuaW1cbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuICAgIGxldCBhbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4gICAgICAgIGFuZ2xlICs9IDAuOTsgLy8gc3BlZWRcbiAgICAgICAgY29uc3Qgcm90YXRlWCA9IE1hdGguc2luKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBYXG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltUmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuICAgIH1cbiAgICBhbmltYXRlQ2FyZHMoKTtcblxuICAgIC8vIHByZWRpY3QgdGFic1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYsIC5wcmVkaWN0X190YWJzLWRhdGVzID4gZGl2Jyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUYWIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKSB8fCBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWRhdGVzJyk7XG5cbiAgICAgICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0YWJQYWlyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFpclswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsaWNrZWRUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXJzKCkge1xuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuc2NvcmUtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUyLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMi5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhYkNsaWNrKSk7XG5cbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgIH0pO1xuXG4gICAgLy9zY29yZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gdGhpcy5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSArIDE7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy90YWJsZSB0YWJzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19ib2R5JykuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgICAgICBjb25zdCBib2R5Q2xhc3MgPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZGF0ZTEnKSA/ICcudGFibGVfX2JvZHkudGFibGUxJyA6ICcudGFibGVfX2JvZHkudGFibGUyJztcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm9keUNsYXNzKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy9wb3B1cHNcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwcyh0cmlnZ2VyQnV0dG9ucywgcG9wdXBDbGFzcykge1xuICAgICAgICBjb25zdCBwb3B1cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzJyk7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBvcHVwc19faXRlbS4ke3BvcHVwQ2xhc3N9YCk7XG5cbiAgICAgICAgaWYgKCF0cmlnZ2VyQnV0dG9ucyB8fCAhcG9wdXAgfHwgIXBvcHVwc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIHRyaWdnZXJCdXR0b25zLmZvckVhY2godHJpZ2dlckJ1dHRvbiA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHNfX2l0ZW0tY2xvc2UnKTtcbiAgICAgICAgY29uc3QgYnRuQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNsb3NlJyk7XG5cbiAgICAgICAgcG9wdXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cHNDb250YWluZXIgfHwgZS50YXJnZXQgPT09IGNsb3NlQnV0dG9uIHx8IGUudGFyZ2V0ID09PSBidG5DbG9zZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL1Nob3cgZmlyc3QgZ29hbCB3aW5uZXIgYWZ0ZXIgbWF0Y2hcbiAgICBmdW5jdGlvbiBzZXRSYWRpb1dpbm5lcihpbmRleCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVuYWN0aXZlIC5wcmVkaWN0X19yYWRpb1wiKTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fcmFkaW8taXRlbVwiKTtcblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID49IGluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJdGVtID0gaXRlbXNbaW5kZXggLSAxXTsgLy8g0J7RgtGA0LjQvNGD0ZTQvNC+INC/0L7RgtGA0ZbQsdC90L7Qs9C+INC/0L7RgtC+0LzQutCwICgxIOKGkiAwLCAyIOKGkiAxLCAzIOKGkiAyKVxuXG4gICAgICAgICAgICB0YXJnZXRJdGVtLmNsYXNzTGlzdC5hZGQoXCJyYWRpb1dpbm5lclwiKTtcblxuICAgICAgICAgICAgY29uc3Qgc3BhbkVsZW1lbnQgPSB0YXJnZXRJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgICAgIGlmIChzcGFuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIHNwYW5FbGVtZW50LmRhdGFzZXQudHJhbnNsYXRlID0gXCJ3aW5uZXJGaXJzdEdvYWxcIjtcbiAgICAgICAgICAgICAgICBzcGFuRWxlbWVudC50ZXh0Q29udGVudCA9IFwi0J/QtdGA0YjQuNC5INCz0L7Qu1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBmaXJzdEdvYWxSZXN1bHQgPSAxO1xuICAgIC8vIHNldFJhZGlvV2lubmVyKGZpcnN0R29hbFJlc3VsdCk7XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVBbmRTZXRTY29yZXMoc2NvcmUxLCBzY29yZTIpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpO1xuICAgICAgICBjb25zdCBnb2FsRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpO1xuXG4gICAgICAgIHNjb3JlRWxlbWVudD8uY2xhc3NMaXN0LnRvZ2dsZShcInVuYWN0aXZlXCIpO1xuICAgICAgICBnb2FsRWxlbWVudD8uY2xhc3NMaXN0LnRvZ2dsZShcInVuYWN0aXZlXCIpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudW5hY3RpdmUgLnByZWRpY3RfX3RlYW0tbnVtYmVyXCIpLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBpbmRleCA9PT0gMCA/IHNjb3JlMSA6IHNjb3JlMjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIHRvZ2dsZUFuZFNldFNjb3JlcygxLCAyKVxuXG4gICAgLy8gVEVTVFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxuZ0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG5nLWJ0blwiKVxuXG4gICAgbG5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImxvY2FsZVwiLCBcImVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnRuXCIpXG5cbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYodXNlcklkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIFwiMTg5MDg0NjVcIilcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0blBhcnRpY2lwYW50ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXBhcnRpY2lwYW50ZVwiKVxuXG4gICAgYnRuUGFydGljaXBhbnRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKT09XCIxODkwODQ2NVwiKXtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBcIjc3N1wiKVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbGFzdFByZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2xhc3QnKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGhlbmtzJyksICdfY29uZmlybVBvcHVwJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXByZWRpY3QnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmNvbmZpcm1lZCcpLmZvckVhY2godW5jb25maXJtZWQgPT4ge1xuICAgICAgICAgICAgICAgIHVuY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtZWQnKS5mb3JFYWNoKGNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnRuXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXRlc3RcIik/LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFmdGVyXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0b2dnbGVBbmRTZXRTY29yZXMoMSwgMilcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpPy5jbGFzc0xpc3QuY29udGFpbnMoXCJ1bmFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgc2V0UmFkaW9XaW5uZXIoZmlyc3RHb2FsUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fcmFkaW8taXRlbVwiKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInJhZGlvV2lubmVyXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG59KSgpIl19
