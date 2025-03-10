// 3D anim
const cards = document.querySelectorAll(".team, .animCard, .animRight"); // Добавляем .animRight
let angle = 0;

function animateCards() {
    angle += 0.9; // Скорость движения
    const rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
    const rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y

    cards.forEach(card => {
        if (card.classList.contains("animRight")) {
            // Для .animRight меняем направление вращения
            card.style.transform = `rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`;
        } else {
            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        }
    });

    requestAnimationFrame(animateCards);
}
animateCards();

// predict tabs
document.addEventListener("DOMContentLoaded", function() {

    const tabs = document.querySelectorAll('.predict__tabs-global > div, .predict__tabs-dates > div');
    const containers = document.querySelectorAll('.predict__container');

    function handleTabClick(event) {
        const clickedTab = event.target;
        const tabPair = clickedTab.closest('.predict__tabs-global') || clickedTab.closest('.predict__tabs-dates');

        if (clickedTab.classList.contains('active')) return;
        if (tabPair) {
            const pair = tabPair.querySelectorAll('.active');
            if (pair.length > 0) {
                pair[0].classList.remove('active');
            }
        }

        clickedTab.classList.add('active');
        updateContainers();
    }

    function updateContainers() {
        containers.forEach(container => container.classList.remove('active'));

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

    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

    updateContainers();
});

//score
document.querySelectorAll('.predict__team-increase').forEach(button => {
    button.addEventListener('click', function() {
        const teamControl = this.closest('.predict__team-control');
        const teamNumber = teamControl.querySelector('.predict__team-number');
        let value = parseInt(teamNumber.textContent);
        teamNumber.textContent = value + 1;
    });
});

document.querySelectorAll('.predict__team-decrease').forEach(button => {
    button.addEventListener('click', function() {
        const teamControl = this.closest('.predict__team-control');
        const teamNumber = teamControl.querySelector('.predict__team-number');
        let value = parseInt(teamNumber.textContent);
        if (value > 0) {
            teamNumber.textContent = value - 1;
        }
    });
});

//table tabs
document.querySelectorAll('.table__tabs-date').forEach(tab => {
    tab.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            return;
        }

        document.querySelectorAll('.table__tabs-date').forEach(tab => tab.classList.remove('active'));

        this.classList.add('active');

        document.querySelectorAll('.table__body').forEach(content => content.classList.remove('active'));

        const bodyClass = this.classList.contains('date1') ? '.table__body.table1' : '.table__body.table2';
        document.querySelector(bodyClass).classList.add('active');
    });
});

//popups

function setPopups(triggerButtons, popupClass) {
    const popupsContainer = document.querySelector('.popups');
    const popup = document.querySelector(`.popups__item.${popupClass}`);

    if (!triggerButtons || !popup || !popupsContainer) return;

    triggerButtons.forEach(triggerButton => {
        triggerButton.addEventListener('click', () => {
            popupsContainer.classList.remove('_opacity');
            popupsContainer.classList.add(popupClass);
            document.body.style.overflow = 'hidden';
        });
    });

    const closeButton = popup.querySelector('.popups__item-close');
    const btnClose = popup.querySelector('.btn-close');

    popupsContainer.addEventListener("click", (e) => {
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

// TEST
document.querySelector('.dark-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});