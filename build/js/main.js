"use strict";

// 3D anim
// const cards = document.querySelectorAll(".team, .animCard, .animRight"); // Добавляем .animRight
// let angle = 0;
//
// function animateCards() {
//     angle += 0.9; // Скорость движения
//     const rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
//     const rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y
//
//     cards.forEach(card => {
//         if (card.classList.contains("animRight")) {
//             // Для .animRight меняем направление вращения
//             card.style.transform = `rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`;
//         } else {
//             card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
//         }
//     });
//
//     requestAnimationFrame(animateCards);
// }
// animateCards();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb250YWluZXJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJ0YWJQYWlyIiwiY2xvc2VzdCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicGFpciIsImxlbmd0aCIsInJlbW92ZSIsImFkZCIsInVwZGF0ZUNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsInRhYiIsImJ1dHRvbiIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsInZhbHVlIiwicGFyc2VJbnQiLCJ0ZXh0Q29udGVudCIsImNvbnRlbnQiLCJib2R5Q2xhc3MiLCJzZXRQb3B1cHMiLCJ0cmlnZ2VyQnV0dG9ucyIsInBvcHVwQ2xhc3MiLCJwb3B1cHNDb250YWluZXIiLCJwb3B1cCIsInRyaWdnZXJCdXR0b24iLCJib2R5Iiwic3R5bGUiLCJvdmVyZmxvdyIsImNsb3NlQnV0dG9uIiwiYnRuQ2xvc2UiLCJlIiwiY2xvc2VQb3B1cCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBRXJELElBQU1DLElBQUksR0FBR0YsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyx5REFBeUQsQ0FBQztFQUNqRyxJQUFNQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7RUFFbkUsU0FBU0UsY0FBYyxDQUFDQyxLQUFLLEVBQUU7SUFDM0IsSUFBTUMsVUFBVSxHQUFHRCxLQUFLLENBQUNFLE1BQU07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LElBQUlRLENBQUMsQ0FBQ2pDLE1BQU0sS0FBSytCLFdBQVcsSUFBSUUsQ0FBQyxDQUFDakMsTUFBTSxLQUFLZ0MsUUFBUSxFQUFFO01BQ25GRSxVQUFVLEVBQUU7SUFDaEI7RUFDSixDQUFDLENBQUM7RUFFRixTQUFTQSxVQUFVLEdBQUc7SUFDbEJULGVBQWUsQ0FBQ3RCLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUN6Q2lCLGVBQWUsQ0FBQ3RCLFNBQVMsQ0FBQ0ksTUFBTSxDQUFDaUIsVUFBVSxDQUFDO0lBQzVDaEMsUUFBUSxDQUFDb0MsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFFBQVEsR0FBRyxFQUFFO0VBQ3JDO0FBQ0o7QUFFQVIsU0FBUyxDQUFDOUIsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQztBQUNwRTJCLFNBQVMsQ0FBQzlCLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEVBQUUsZUFBZSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAzRCBhbmltXG4vLyBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuLy8gbGV0IGFuZ2xlID0gMDtcbi8vXG4vLyBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4vLyAgICAgYW5nbGUgKz0gMC45OyAvLyDQodC60L7RgNC+0YHRgtGMINC00LLQuNC20LXQvdC40Y9cbi8vICAgICBjb25zdCByb3RhdGVYID0gTWF0aC5zaW4oYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFhcbi8vICAgICBjb25zdCByb3RhdGVZID0gTWF0aC5jb3MoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFlcbi8vXG4vLyAgICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbi8vICAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbVJpZ2h0XCIpKSB7XG4vLyAgICAgICAgICAgICAvLyDQlNC70Y8gLmFuaW1SaWdodCDQvNC10L3Rj9C10Lwg0L3QsNC/0YDQsNCy0LvQtdC90LjQtSDQstGA0LDRidC10L3QuNGPXG4vLyAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7cm90YXRlWX1kZWcpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZylgO1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuLy8gfVxuLy8gYW5pbWF0ZUNhcmRzKCk7XG5cbi8vIHByZWRpY3QgdGFic1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsID4gZGl2LCAucHJlZGljdF9fdGFicy1kYXRlcyA+IGRpdicpO1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUYWJDbGljayhldmVudCkge1xuICAgICAgICBjb25zdCBjbGlja2VkVGFiID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKSB8fCBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWRhdGVzJyk7XG5cbiAgICAgICAgaWYgKGNsaWNrZWRUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGFiUGFpcikge1xuICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHBhaXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBhaXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja2VkVGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVycygpIHtcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUxLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUyLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTInKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWRhdGUuZGF0ZTEuYWN0aXZlJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbC5hY3RpdmUnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUyLmFjdGl2ZScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUYWJDbGljaykpO1xuXG4gICAgdXBkYXRlQ29udGFpbmVycygpO1xufSk7XG5cbi8vc2NvcmVcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IHRoaXMuY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gdmFsdWUgKyAxO1xuICAgIH0pO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IHRoaXMuY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gdmFsdWUgLSAxO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuLy90YWJsZSB0YWJzXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19ib2R5JykuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuXG4gICAgICAgIGNvbnN0IGJvZHlDbGFzcyA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXRlMScpID8gJy50YWJsZV9fYm9keS50YWJsZTEnIDogJy50YWJsZV9fYm9keS50YWJsZTInO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvZHlDbGFzcykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG59KTtcblxuLy9wb3B1cHNcblxuZnVuY3Rpb24gc2V0UG9wdXBzKHRyaWdnZXJCdXR0b25zLCBwb3B1cENsYXNzKSB7XG4gICAgY29uc3QgcG9wdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBvcHVwc19faXRlbS4ke3BvcHVwQ2xhc3N9YCk7XG5cbiAgICBpZiAoIXRyaWdnZXJCdXR0b25zIHx8ICFwb3B1cCB8fCAhcG9wdXBzQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICB0cmlnZ2VyQnV0dG9ucy5mb3JFYWNoKHRyaWdnZXJCdXR0b24gPT4ge1xuICAgICAgICB0cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3B1cENsYXNzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHNfX2l0ZW0tY2xvc2UnKTtcbiAgICBjb25zdCBidG5DbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKTtcblxuICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cHNDb250YWluZXIgfHwgZS50YXJnZXQgPT09IGNsb3NlQnV0dG9uIHx8IGUudGFyZ2V0ID09PSBidG5DbG9zZSkge1xuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xuICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbiAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICB9XG59XG5cbnNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2lkZV9fbGlzdC1idG4nKSwgJ2dpZGVQb3B1cCcpO1xuc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19idG4nKSwgJ19jb25maXJtUG9wdXAnKTtcblxuIl19
