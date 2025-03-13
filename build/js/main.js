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
  var apiURL = 'https://fav-prom.com/api_legendary_trophy',
    unauthMsgs = document.querySelectorAll('.unauth-msg'),
    participateBtns = document.querySelectorAll('.btn-join'),
    youAreInBtns = document.querySelectorAll('.took-part'),
    mainPage = document.querySelector(".fav-page"),
    resultsTable = document.querySelector('#results-table'),
    topResultsTable = document.querySelector('#results-table'),
    resultsTableOther = document.querySelector('#results-table-other'),
    tableNav = document.querySelectorAll(".results__nav-item"),
    predictColumns = document.querySelectorAll(".table__column"),
    moveLeft = document.querySelector(".table__move-left"),
    moveRight = document.querySelector(".table__move-right"),
    moveLeftResult = document.querySelector(".results__move-left"),
    moveRightResult = document.querySelector(".results__move-right"),
    tabsContainer = document.querySelector('.results__tab');
  var translateState = false;
  var debug = false;

  // let locale = sessionStorage.getItem("locale") ?? "uk"
  var locale = "uk";
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

  // function refreshUsers() {
  //     getData().then(users => {
  //         if(!debug) {
  //             renderUsers(users);
  //         }
  //     });
  // }
  // function renderUsers(users) {
  //     populateUsersTable(users, userId);
  //
  // }
  //
  // function populateUsersTable(users, currentUserId) {
  //     resultsTable.innerHTML = ''; // Очищуємо основну таблицю
  //     resultsTableOther.innerHTML = ''; // Очищуємо додаткову таблицю
  //
  //     if (!users || !users.length) return; // Перевіряємо, чи є користувачі
  //
  //     // Знаходимо індекс поточного користувача
  //     const currentUserIndex = users.findIndex(user => user.userid === currentUserId);
  //
  //     if (currentUserIndex !== -1) {
  //         // Видаляємо currentUserId зі списку
  //         users.splice(currentUserIndex, 1);
  //     }
  //
  //     // Додаємо currentUserId на 11 позицію (індекс 10)
  //     users.splice(10, 0, users.find(user => user.userid === currentUserId));
  //
  //     // Виводимо всіх користувачів у таблицю
  //     users.forEach(user =>
  //         displayUser(user, user.userid === currentUserId, resultsTable, users)
  //     );
  // }
  //
  // function displayUser(user, isCurrentUser, table, allUsers) {
  //     const additionalUserRow = document.createElement('div');
  //     additionalUserRow.classList.add('table__row');
  //
  //     const place = allUsers.indexOf(user) + 1;
  //
  //     let prizeKey;
  //     prizeKey = getPrizeTranslationKey(place)
  //
  //     additionalUserRow.innerHTML = `
  //     <div class="table__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
  //     <div class="table__row-item">
  //         <span>${user.scoreLeft}</span>
  //         <img src="img/vs.png" alt="clock">
  //         <span>${user.scoreRight}</span>
  //     </div>
  //     <div class="table__row-item">${prizeKey ? translateKey(prizeKey) : ' - '}</div>
  //     <div class="table__row-item">${bonusKey ? translateKey(bonusKey) : ' - '}</div>
  // `;
  //     if (isCurrentUser) {
  //         const youBlock = document.createElement('div');
  //         youBlock.setAttribute('data-translate', 'you');
  //         youBlock.textContent = "Ти" // для тесту поки нема транслейтів
  //         youBlock.classList.add('_your');
  //         additionalUserRow.append(youBlock)
  //         additionalUserRow.classList.add("_your")
  //
  //     }
  //     table.append(additionalUserRow);
  // }
  // function maskUserId(userId) {
  //     return "**" + userId.toString().slice(2);
  // }

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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnRpY2lwYXRlQnRucyIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwidGFibGVOYXYiLCJwcmVkaWN0Q29sdW1ucyIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwibW92ZUxlZnRSZXN1bHQiLCJtb3ZlUmlnaHRSZXN1bHQiLCJ0YWJzQ29udGFpbmVyIiwidHJhbnNsYXRlU3RhdGUiLCJkZWJ1ZyIsImxvY2FsZSIsInVrTGVuZyIsImVuTGVuZyIsImkxOG5EYXRhIiwidXNlcklkIiwicmVxdWVzdCIsImxpbmsiLCJleHRyYU9wdGlvbnMiLCJmZXRjaCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsIkluaXRQYWdlIiwiY2hlY2tVc2VyQXV0aCIsInVuYXV0aE1lcyIsImNsYXNzTGlzdCIsImFkZCIsInVzZXJpZCIsImZvckVhY2giLCJpdGVtIiwicmVtb3ZlIiwicGFydGljaXBhdGVCdG4iLCJ5b3VBcmVJbkJ0biIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2FkVHJhbnNsYXRpb25zIiwiY29uc29sZSIsImxvZyIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImdldEVsZW1lbnRCeUlkIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJsYW5nIiwiaW5pdCIsIndpbmRvdyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjbGVhckludGVydmFsIiwiYXV0aEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjYXJkcyIsImFuZ2xlIiwiYW5pbWF0ZUNhcmRzIiwicm90YXRlWCIsIk1hdGgiLCJzaW4iLCJQSSIsInJvdGF0ZVkiLCJjb3MiLCJjYXJkIiwiY29udGFpbnMiLCJzdHlsZSIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRhYnMiLCJjb250YWluZXJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJ0YWJQYWlyIiwiY2xvc2VzdCIsInBhaXIiLCJsZW5ndGgiLCJ1cGRhdGVDb250YWluZXJzIiwiY29udGFpbmVyIiwidGFiIiwiYnV0dG9uIiwidGVhbUNvbnRyb2wiLCJ0ZWFtTnVtYmVyIiwidmFsdWUiLCJwYXJzZUludCIsInRleHRDb250ZW50IiwiY29udGVudCIsImJvZHlDbGFzcyIsInNldFBvcHVwcyIsInRyaWdnZXJCdXR0b25zIiwicG9wdXBDbGFzcyIsInBvcHVwc0NvbnRhaW5lciIsInBvcHVwIiwidHJpZ2dlckJ1dHRvbiIsIm92ZXJmbG93IiwiY2xvc2VCdXR0b24iLCJidG5DbG9zZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXRFbGVtZW50IiwidGFyZ2V0UG9zaXRpb24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJ0b2dnbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztJQUN0REMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFH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LEtBQUssQ0FBQzhCLFFBQVEsR0FBRyxFQUFFO0lBQ3JDO0VBQ0o7RUFFQU4sU0FBUyxDQUFDeEgsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQztFQUNwRXVILFNBQVMsQ0FBQ3hILFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEVBQUUsZUFBZSxDQUFDOztFQUUxRTtFQUNJRCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzZFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQ3ZFLElBQU1nRCxhQUFhLEdBQUdsSSxRQUFRLENBQUN3RCxjQUFjLENBQUMsU0FBUyxDQUFDO0lBQ3hELElBQU0yRSxjQUFjLEdBQUdELGFBQWEsQ0FBQ0UscUJBQXFCLEVBQUUsQ0FBQ0MsR0FBRyxHQUFHaEUsTUFBTSxDQUFDaUUsV0FBVyxHQUFHLENBQUM7SUFFekZqRSxNQUFNLENBQUNrRSxRQUFRLENBQUM7TUFDWkYsR0FBRyxFQUFFRixjQUFjO01BQ25CSyxRQUFRLEVBQUU7SUFDZCxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7O0VBRU47RUFDSXhJLFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDNkUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDaEVsRixRQUFRLENBQUM2QyxJQUFJLENBQUNYLFNBQVMsQ0FBQ3VHLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDMUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxHQUFHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbGVnZW5kYXJ5X3Ryb3BoeScsXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIiksXG4gICAgICAgIHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKSxcbiAgICAgICAgdGFibGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc3VsdHNfX25hdi1pdGVtXCIpLFxuICAgICAgICBwcmVkaWN0Q29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2NvbHVtblwiKSxcbiAgICAgICAgbW92ZUxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19tb3ZlLWxlZnRcIiksXG4gICAgICAgIG1vdmVSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX21vdmUtcmlnaHRcIiksXG4gICAgICAgIG1vdmVMZWZ0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzX19tb3ZlLWxlZnRcIiksXG4gICAgICAgIG1vdmVSaWdodFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0c19fbW92ZS1yaWdodFwiKSxcbiAgICAgICAgdGFic0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX190YWInKVxuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gZmFsc2VcbiAgICBsZXQgZGVidWcgPSBmYWxzZVxuXG4gICAgLy8gbGV0IGxvY2FsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgPz8gXCJ1a1wiXG4gICAgbGV0IGxvY2FsZSA9IFwidWtcIlxuXG4gICAgY29uc3QgdWtMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG5cbiAgICBsZXQgdXNlcklkO1xuICAgIC8vIHVzZXJJZCA9IDEwMDMwMDI2ODtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgeW91QXJlSW5CdG4gb2YgeW91QXJlSW5CdG5zKSB7XG4gICAgICAgICAgICAgICAgeW91QXJlSW5CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHBhcnRpY2lwYXRlKCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGkxOG5EYXRhKTtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2Fscy1vci16ZXJvcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0aW9uIHdvcmshXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKG1haW5QYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIEluaXRQYWdlKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG4gICAgLy8gZnVuY3Rpb24gcmVmcmVzaFVzZXJzKCkge1xuICAgIC8vICAgICBnZXREYXRhKCkudGhlbih1c2VycyA9PiB7XG4gICAgLy8gICAgICAgICBpZighZGVidWcpIHtcbiAgICAvLyAgICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cbiAgICAvLyBmdW5jdGlvbiByZW5kZXJVc2Vycyh1c2Vycykge1xuICAgIC8vICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCk7XG4gICAgLy9cbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAvLyAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRidGD0ZTQvNC+INC+0YHQvdC+0LLQvdGDINGC0LDQsdC70LjRhtGOXG4gICAgLy8gICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRidGD0ZTQvNC+INC00L7QtNCw0YLQutC+0LLRgyDRgtCw0LHQu9C40YbRjlxuICAgIC8vXG4gICAgLy8gICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INGUINC60L7RgNC40YHRgtGD0LLQsNGH0ZZcbiAgICAvL1xuICAgIC8vICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0ZbQvdC00LXQutGBINC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG4gICAgLy8gICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSB1c2Vycy5maW5kSW5kZXgodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG4gICAgLy9cbiAgICAvLyAgICAgaWYgKGN1cnJlbnRVc2VySW5kZXggIT09IC0xKSB7XG4gICAgLy8gICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4gY3VycmVudFVzZXJJZCDQt9GWINGB0L/QuNGB0LrRg1xuICAgIC8vICAgICAgICAgdXNlcnMuc3BsaWNlKGN1cnJlbnRVc2VySW5kZXgsIDEpO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgLy8g0JTQvtC00LDRlNC80L4gY3VycmVudFVzZXJJZCDQvdCwIDExINC/0L7Qt9C40YbRltGOICjRltC90LTQtdC60YEgMTApXG4gICAgLy8gICAgIHVzZXJzLnNwbGljZSgxMCwgMCwgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKSk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIg0YMg0YLQsNCx0LvQuNGG0Y5cbiAgICAvLyAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+XG4gICAgLy8gICAgICAgICBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycylcbiAgICAvLyAgICAgKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAvLyAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuICAgIC8vXG4gICAgLy8gICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IHByaXplS2V5O1xuICAgIC8vICAgICBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgLy9cbiAgICAvLyAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAvLyAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgIC8vICAgICAgICAgPHNwYW4+JHt1c2VyLnNjb3JlTGVmdH08L3NwYW4+XG4gICAgLy8gICAgICAgICA8aW1nIHNyYz1cImltZy92cy5wbmdcIiBhbHQ9XCJjbG9ja1wiPlxuICAgIC8vICAgICAgICAgPHNwYW4+JHt1c2VyLnNjb3JlUmlnaHR9PC9zcGFuPlxuICAgIC8vICAgICA8L2Rpdj5cbiAgICAvLyAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgLy8gICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2JvbnVzS2V5ID8gdHJhbnNsYXRlS2V5KGJvbnVzS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgIC8vIGA7XG4gICAgLy8gICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgLy8gICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd5b3UnKTtcbiAgICAvLyAgICAgICAgIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCLQotC4XCIgLy8g0LTQu9GPINGC0LXRgdGC0YMg0L/QvtC60Lgg0L3QtdC80LAg0YLRgNCw0L3RgdC70LXQudGC0ZbQslxuICAgIC8vICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgnX3lvdXInKTtcbiAgICAvLyAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmFwcGVuZCh5b3VCbG9jaylcbiAgICAvLyAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJfeW91clwiKVxuICAgIC8vXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAvLyB9XG4gICAgLy8gZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAvLyAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIC8vIH1cblxuXG4gICAgLy8gM0QgYW5pbVxuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZWFtLCAuYW5pbUNhcmQsIC5hbmltUmlnaHRcIik7IC8vINCU0L7QsdCw0LLQu9GP0LXQvCAuYW5pbVJpZ2h0XG4gICAgbGV0IGFuZ2xlID0gMDtcblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVDYXJkcygpIHtcbiAgICAgICAgYW5nbGUgKz0gMC45OyAvLyBzcGVlZFxuICAgICAgICBjb25zdCByb3RhdGVYID0gTWF0aC5zaW4oYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFhcbiAgICAgICAgY29uc3Qgcm90YXRlWSA9IE1hdGguY29zKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBZXG5cbiAgICAgICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIGlmIChjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcImFuaW1SaWdodFwiKSkge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHstcm90YXRlWX1kZWcpIHJvdGF0ZVgoJHstcm90YXRlWH1kZWcpYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgke3JvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7cm90YXRlWH1kZWcpYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVDYXJkcyk7XG4gICAgfVxuICAgIGFuaW1hdGVDYXJkcygpO1xuXG4vLyBwcmVkaWN0IHRhYnNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsID4gZGl2LCAucHJlZGljdF9fdGFicy1kYXRlcyA+IGRpdicpO1xuICAgICAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRhYkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjbGlja2VkVGFiID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgdGFiUGFpciA9IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsJykgfHwgY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1kYXRlcycpO1xuXG4gICAgICAgICAgICBpZiAoY2xpY2tlZFRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodGFiUGFpcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhaXIgPSB0YWJQYWlyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpZiAocGFpci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhaXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGlja2VkVGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVycygpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlLmFjdGl2ZScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWRhdGUuZGF0ZTEuYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMi5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuc2NvcmUtMicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWRhdGUuZGF0ZTEuYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWRhdGUuZGF0ZTIuYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUYWJDbGljaykpO1xuXG4gICAgICAgIHVwZGF0ZUNvbnRhaW5lcnMoKTtcbiAgICB9KTtcblxuLy9zY29yZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gdGhpcy5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSArIDE7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4vL3RhYmxlIHRhYnNcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fYm9keScpLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICAgICAgY29uc3QgYm9keUNsYXNzID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2RhdGUxJykgPyAnLnRhYmxlX19ib2R5LnRhYmxlMScgOiAnLnRhYmxlX19ib2R5LnRhYmxlMic7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvZHlDbGFzcykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4vL3BvcHVwc1xuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXBzKHRyaWdnZXJCdXR0b25zLCBwb3B1cENsYXNzKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHMnKTtcbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucG9wdXBzX19pdGVtLiR7cG9wdXBDbGFzc31gKTtcblxuICAgICAgICBpZiAoIXRyaWdnZXJCdXR0b25zIHx8ICFwb3B1cCB8fCAhcG9wdXBzQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgdHJpZ2dlckJ1dHRvbnMuZm9yRWFjaCh0cmlnZ2VyQnV0dG9uID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwc19faXRlbS1jbG9zZScpO1xuICAgICAgICBjb25zdCBidG5DbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKTtcblxuICAgICAgICBwb3B1cHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwc0NvbnRhaW5lciB8fCBlLnRhcmdldCA9PT0gY2xvc2VCdXR0b24gfHwgZS50YXJnZXQgPT09IGJ0bkNsb3NlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShwb3B1cENsYXNzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2lkZV9fbGlzdC1idG4nKSwgJ2dpZGVQb3B1cCcpO1xuICAgIHNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fYnRuJyksICdfY29uZmlybVBvcHVwJyk7XG5cbi8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbi8vIFRFU1RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrJyk7XG4gICAgfSk7XG59KSgpIl19
