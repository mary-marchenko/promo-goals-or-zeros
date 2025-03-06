"use strict";

// 3D anim
var cards = document.querySelectorAll(".team, .test, .animRight"); // Добавляем .animRight
var angle = 0;
function animateCards() {
  angle += 0.9; // Скорость движения
  var rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
  var rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y

  cards.forEach(function (card) {
    if (card.classList.contains("animRight")) {
      // Для .animRight меняем направление вращения
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
// document.querySelectorAll('.predict__team-increase').forEach(button => {
//     button.addEventListener('click', function() {
//         const teamControl = this.closest('.predict__team-control');
//         const teamNumber = teamControl.querySelector('.predict__team-number');
//         let value = parseInt(teamNumber.textContent);
//         teamNumber.textContent = value + 1;
//     });
// });
//
// document.querySelectorAll('.predict__team-decrease').forEach(button => {
//     button.addEventListener('click', function() {
//         const teamControl = this.closest('.predict__team-control');
//         const teamNumber = teamControl.querySelector('.predict__team-number');
//         let value = parseInt(teamNumber.textContent);
//         if (value > 0) {
//             teamNumber.textContent = value - 1;
//         }
//     });
// });

//score
document.querySelectorAll('.predict__team-increase.team1-plus').forEach(function (button) {
  button.addEventListener('click', function () {
    var teamControl = this.closest('.predict__team-control');
    var teamNumber = teamControl.querySelector('.predict__team-number');
    var value = parseInt(teamNumber.textContent);
    teamNumber.textContent = value + 1; // Плюс збільшує

    // Оновлюємо значення для span.scoreTeam1
    var container = teamControl.closest('.predict__container');
    var scoreTeam1 = container.querySelector('.scoreTeam1');
    if (scoreTeam1) {
      scoreTeam1.textContent = teamNumber.textContent;
    }
  });
});
document.querySelectorAll('.predict__team-decrease.team1-minus').forEach(function (button) {
  button.addEventListener('click', function () {
    // Знаходимо елемент з числом для першої команди
    var teamControl = this.closest('.predict__team-control');
    var teamNumber = teamControl.querySelector('.predict__team-number');
    var value = parseInt(teamNumber.textContent);
    if (value > 0) {
      teamNumber.textContent = value - 1; // Мінус зменшує
    }

    // Оновлюємо значення для span.scoreTeam1
    var container = teamControl.closest('.predict__container');
    var scoreTeam1 = container.querySelector('.scoreTeam1');
    if (scoreTeam1) {
      scoreTeam1.textContent = teamNumber.textContent;
    }
  });
});
document.querySelectorAll('.predict__team-increase.team2-plus').forEach(function (button) {
  button.addEventListener('click', function () {
    // Знаходимо елемент з числом для другої команди
    var teamControl = this.closest('.predict__team-control');
    var teamNumber = teamControl.querySelector('.predict__team-number');
    var value = parseInt(teamNumber.textContent);
    teamNumber.textContent = value + 1; // Плюс збільшує

    // Оновлюємо значення для span.scoreTeam2
    var container = teamControl.closest('.predict__container');
    var scoreTeam2 = container.querySelector('.scoreTeam2');
    if (scoreTeam2) {
      scoreTeam2.textContent = teamNumber.textContent;
    }
  });
});
document.querySelectorAll('.predict__team-decrease.team2-minus').forEach(function (button) {
  button.addEventListener('click', function () {
    // Знаходимо елемент з числом для другої команди
    var teamControl = this.closest('.predict__team-control');
    var teamNumber = teamControl.querySelector('.predict__team-number');
    var value = parseInt(teamNumber.textContent);
    if (value > 0) {
      teamNumber.textContent = value - 1; // Мінус зменшує
    }

    // Оновлюємо значення для span.scoreTeam2
    var container = teamControl.closest('.predict__container');
    var scoreTeam2 = container.querySelector('.scoreTeam2');
    if (scoreTeam2) {
      scoreTeam2.textContent = teamNumber.textContent;
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
// function setPopups(triggerButton, popupClass) {
//     const popupsContainer = document.querySelector('.popups');
//     const popup = document.querySelector(`.popups__item.${popupClass}`);
//
//     if (!triggerButton || !popup || !popupsContainer) return;
//
//     triggerButton.addEventListener('click', () => {
//         popupsContainer.classList.remove('_opacity');
//         popupsContainer.classList.add(popupClass);
//         document.body.style.overflow = 'hidden';
//     });
//     const closeButton = popup.querySelector('.popups__item-close');
//
//     popupsContainer.addEventListener("click", (e) =>{
//         if (e.target === popupsContainer || e.target === closeButton){
//             closePopup()
//         }
//     })
//
//     function closePopup() {
//         popupsContainer.classList.add('_opacity');
//         popupsContainer.classList.remove(popupClass);
//         document.body.style.overflow = '';
//     }
// }
//
// setPopups(document.querySelector('.gide__list-btn'), 'gidePopup');
// setPopups(document.querySelector('.predict__btn'), '_confirmPopup');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY2FyZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiZm9yRWFjaCIsImNhcmQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInN0eWxlIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhYnMiLCJjb250YWluZXJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJ0YWJQYWlyIiwiY2xvc2VzdCIsInBhaXIiLCJsZW5ndGgiLCJyZW1vdmUiLCJhZGQiLCJ1cGRhdGVDb250YWluZXJzIiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsInRhYiIsImJ1dHRvbiIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsInZhbHVlIiwicGFyc2VJbnQiLCJ0ZXh0Q29udGVudCIsInNjb3JlVGVhbTEiLCJzY29yZVRlYW0yIiwiY29udGVudCIsImJvZHlDbGFzcyIsInNldFBvcHVwcyIsInRyaWdnZXJCdXR0b25zIiwicG9wdXBDbGFzcyIsInBvcHVwc0NvbnRhaW5lciIsInBvcHVwIiwidHJpZ2dlckJ1dHRvbiIsImJvZHkiLCJvdmVyZmxvdyIsImNsb3NlQnV0dG9uIiwiYnRuQ2xvc2UiLCJlIiwiY2xvc2VQb3B1cCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU1BLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFDckUsSUFBSUMsS0FBSyxHQUFHLENBQUM7QUFFYixTQUFTQyxZQUFZLEdBQUc7RUFDcEJELEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztFQUNkLElBQU1FLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxHQUFHLENBQUNKLEtBQUss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Q0FBQyxDQUFDO0VBRUYsU0FBU0EsVUFBVSxHQUFHO0lBQ2xCUixlQUFlLENBQUNuQyxTQUFTLENBQUNpQixHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3pDa0IsZUFBZSxDQUFDbkMsU0FBUyxDQUFDZ0IsTUFBTSxDQUFDa0IsVUFBVSxDQUFDO0lBQzVDOUMsUUFBUSxDQUFDa0QsSUFBSSxDQUFDcEMsS0FBSyxDQUFDcUMsUUFBUSxHQUFHLEVBQUU7RUFDckM7QUFDSjtBQUVBUCxTQUFTLENBQUM1QyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsV0FBVyxDQUFDO0FBQ3BFMkMsU0FBUyxDQUFDNUMsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsRUFBRSxlQUFlLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIDNEIGFuaW1cbmNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZWFtLCAudGVzdCwgLmFuaW1SaWdodFwiKTsgLy8g0JTQvtCx0LDQstC70Y/QtdC8IC5hbmltUmlnaHRcbmxldCBhbmdsZSA9IDA7XG5cbmZ1bmN0aW9uIGFuaW1hdGVDYXJkcygpIHtcbiAgICBhbmdsZSArPSAwLjk7IC8vINCh0LrQvtGA0L7RgdGC0Ywg0LTQstC40LbQtdC90LjRj1xuICAgIGNvbnN0IHJvdGF0ZVggPSBNYXRoLnNpbihhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWFxuICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbVJpZ2h0XCIpKSB7XG4gICAgICAgICAgICAvLyDQlNC70Y8gLmFuaW1SaWdodCDQvNC10L3Rj9C10Lwg0L3QsNC/0YDQsNCy0LvQtdC90LjQtSDQstGA0LDRidC10L3QuNGPXG4gICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7cm90YXRlWX1kZWcpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZylgO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZUNhcmRzKTtcbn1cbmFuaW1hdGVDYXJkcygpO1xuXG4vLyBwcmVkaWN0IHRhYnNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190YWJzLWdsb2JhbCA+IGRpdiwgLnByZWRpY3RfX3RhYnMtZGF0ZXMgPiBkaXYnKTtcbiAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgdGFiUGFpciA9IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsJykgfHwgY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1kYXRlcycpO1xuXG4gICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgaWYgKHRhYlBhaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSB0YWJQYWlyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwYWlyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpY2tlZFRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMi5hY3RpdmUnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0yJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbC5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUxLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMi5hY3RpdmUnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5nb2FsLTInKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGFiQ2xpY2spKTtcblxuICAgIHVwZGF0ZUNvbnRhaW5lcnMoKTtcbn0pO1xuXG4vL3Njb3JlXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZScpLmZvckVhY2goYnV0dG9uID0+IHtcbi8vICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbi8vICAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpO1xuLy8gICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbi8vICAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IHZhbHVlICsgMTtcbi8vICAgICB9KTtcbi8vIH0pO1xuLy9cbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJykuZm9yRWFjaChidXR0b24gPT4ge1xuLy8gICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IHRoaXMuY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuLy8gICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4vLyAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuLy8gICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4vLyAgICAgICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gdmFsdWUgLSAxO1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vLyB9KTtcblxuLy9zY29yZVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UudGVhbTEtcGx1cycpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpO1xuICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IHZhbHVlICsgMTsgLy8g0J/Qu9GO0YEg0LfQsdGW0LvRjNGI0YPRlFxuXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDQt9C90LDRh9C10L3QvdGPINC00LvRjyBzcGFuLnNjb3JlVGVhbTFcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGVhbUNvbnRyb2wuY2xvc2VzdCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzY29yZVRlYW0xID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zY29yZVRlYW0xJyk7XG4gICAgICAgIGlmIChzY29yZVRlYW0xKSB7XG4gICAgICAgICAgICBzY29yZVRlYW0xLnRleHRDb250ZW50ID0gdGVhbU51bWJlci50ZXh0Q29udGVudDtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWRlY3JlYXNlLnRlYW0xLW1pbnVzJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LXQu9C10LzQtdC90YIg0Lcg0YfQuNGB0LvQvtC8INC00LvRjyDQv9C10YDRiNC+0Zcg0LrQvtC80LDQvdC00LhcbiAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSB0aGlzLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpO1xuICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IHZhbHVlIC0gMTsgLy8g0JzRltC90YPRgSDQt9C80LXQvdGI0YPRlFxuICAgICAgICB9XG5cbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INC30L3QsNGH0LXQvdC90Y8g0LTQu9GPIHNwYW4uc2NvcmVUZWFtMVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0ZWFtQ29udHJvbC5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNjb3JlVGVhbTEgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNjb3JlVGVhbTEnKTtcbiAgICAgICAgaWYgKHNjb3JlVGVhbTEpIHtcbiAgICAgICAgICAgIHNjb3JlVGVhbTEudGV4dENvbnRlbnQgPSB0ZWFtTnVtYmVyLnRleHRDb250ZW50O1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UudGVhbTItcGx1cycpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INC10LvQtdC80LXQvdGCINC3INGH0LjRgdC70L7QvCDQtNC70Y8g0LTRgNGD0LPQvtGXINC60L7QvNCw0L3QtNC4XG4gICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gdGhpcy5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQodGVhbU51bWJlci50ZXh0Q29udGVudCk7XG4gICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSArIDE7IC8vINCf0LvRjtGBINC30LHRltC70YzRiNGD0ZRcblxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0LfQvdCw0YfQtdC90L3RjyDQtNC70Y8gc3Bhbi5zY29yZVRlYW0yXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRlYW1Db250cm9sLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc2NvcmVUZWFtMiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc2NvcmVUZWFtMicpO1xuICAgICAgICBpZiAoc2NvcmVUZWFtMikge1xuICAgICAgICAgICAgc2NvcmVUZWFtMi50ZXh0Q29udGVudCA9IHRlYW1OdW1iZXIudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1kZWNyZWFzZS50ZWFtMi1taW51cycpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INC10LvQtdC80LXQvdGCINC3INGH0LjRgdC70L7QvCDQtNC70Y8g0LTRgNGD0LPQvtGXINC60L7QvNCw0L3QtNC4XG4gICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gdGhpcy5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQodGVhbU51bWJlci50ZXh0Q29udGVudCk7XG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSB2YWx1ZSAtIDE7IC8vINCc0ZbQvdGD0YEg0LfQvNC10L3RiNGD0ZRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDQt9C90LDRh9C10L3QvdGPINC00LvRjyBzcGFuLnNjb3JlVGVhbTJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGVhbUNvbnRyb2wuY2xvc2VzdCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzY29yZVRlYW0yID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zY29yZVRlYW0yJyk7XG4gICAgICAgIGlmIChzY29yZVRlYW0yKSB7XG4gICAgICAgICAgICBzY29yZVRlYW0yLnRleHRDb250ZW50ID0gdGVhbU51bWJlci50ZXh0Q29udGVudDtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbi8vdGFibGUgdGFic1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4gdGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fYm9keScpLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICBjb25zdCBib2R5Q2xhc3MgPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZGF0ZTEnKSA/ICcudGFibGVfX2JvZHkudGFibGUxJyA6ICcudGFibGVfX2JvZHkudGFibGUyJztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib2R5Q2xhc3MpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xufSk7XG5cbi8vcG9wdXBzXG4vLyBmdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbiwgcG9wdXBDbGFzcykge1xuLy8gICAgIGNvbnN0IHBvcHVwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHMnKTtcbi8vICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wb3B1cHNfX2l0ZW0uJHtwb3B1cENsYXNzfWApO1xuLy9cbi8vICAgICBpZiAoIXRyaWdnZXJCdXR0b24gfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcbi8vXG4vLyAgICAgdHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ19vcGFjaXR5Jyk7XG4vLyAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuLy8gICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzX19pdGVtLWNsb3NlJyk7XG4vL1xuLy8gICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuLy8gICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwc0NvbnRhaW5lciB8fCBlLnRhcmdldCA9PT0gY2xvc2VCdXR0b24pe1xuLy8gICAgICAgICAgICAgY2xvc2VQb3B1cCgpXG4vLyAgICAgICAgIH1cbi8vICAgICB9KVxuLy9cbi8vICAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xuLy8gICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbi8vICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4vLyAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbi8vICAgICB9XG4vLyB9XG4vL1xuLy8gc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5naWRlX19saXN0LWJ0bicpLCAnZ2lkZVBvcHVwJyk7XG4vLyBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2J0bicpLCAnX2NvbmZpcm1Qb3B1cCcpO1xuXG5mdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbnMsIHBvcHVwQ2xhc3MpIHtcbiAgICBjb25zdCBwb3B1cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzJyk7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucG9wdXBzX19pdGVtLiR7cG9wdXBDbGFzc31gKTtcblxuICAgIGlmICghdHJpZ2dlckJ1dHRvbnMgfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcblxuICAgIHRyaWdnZXJCdXR0b25zLmZvckVhY2godHJpZ2dlckJ1dHRvbiA9PiB7XG4gICAgICAgIHRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwc19faXRlbS1jbG9zZScpO1xuICAgIGNvbnN0IGJ0bkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpO1xuXG4gICAgcG9wdXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwc0NvbnRhaW5lciB8fCBlLnRhcmdldCA9PT0gY2xvc2VCdXR0b24gfHwgZS50YXJnZXQgPT09IGJ0bkNsb3NlKSB7XG4gICAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShwb3B1cENsYXNzKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgIH1cbn1cblxuc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5naWRlX19saXN0LWJ0bicpLCAnZ2lkZVBvcHVwJyk7XG5zZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bicpLCAnX2NvbmZpcm1Qb3B1cCcpO1xuXG4iXX0=
