// // 3D anim
// const card = document.querySelector(".team");
// let angle = 0;
//
// function animateCard() {
//     angle += 1; // Швидкість руху
//     const rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Коливання по X
//     const rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Коливання по Y
//
//     card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
//
//     requestAnimationFrame(animateCard);
// }
//
// animateCard();

// popup
document.querySelector('.gide__list-btn').addEventListener('click', function() {
    document.querySelector('.gide__popup').classList.add('active');
    document.querySelector('.gide__list').classList.add('hide');
    document.querySelector('.gide__title').classList.add('hide');
});

document.querySelector('.gide__popup-close').addEventListener('click', function() {
    document.querySelector('.gide__popup').classList.remove('active');
    document.querySelector('.gide__list').classList.remove('hide');
    document.querySelector('.gide__title').classList.remove('hide');
});

// 3D anim
const cards = document.querySelectorAll(".team, .test, .animRight"); // Добавляем .animRight
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
