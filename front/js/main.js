(function () {
    const apiURL = 'https://fav-prom.com/api_legendary_trophy',
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        participateBtns = document.querySelectorAll('.btn-join'),
        youAreInBtns = document.querySelectorAll('.took-part'),
        mainPage = document.querySelector(".fav-page")

    let translateState = false
    let debug = false

    // let locale = sessionStorage.getItem("locale") ?? "uk"
    let locale = "uk"

    const ukLeng = document.querySelector('#ukLeng');
    const enLeng = document.querySelector('#enLeng');


    let i18nData = {};

    let userId;
    // userId = 100300268;

    if (ukLeng) locale = 'uk';
    if (enLeng) locale = 'en';


    const request = function (link, extraOptions) {
        return fetch(apiURL + link, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...(extraOptions || {})
        }).then(res => res.json())
    }

    const InitPage = () => {
        checkUserAuth();
    }

    let checkUserAuth = () => {
        if (userId) {
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.add('hide');
            }
            request(`/favuser/${userId}`)
                .then(res => {
                    if (res.userid) {
                        participateBtns.forEach(item => item.classList.add('hide'));
                        youAreInBtns.forEach(item => item.classList.remove('hide'));

                    } else {
                        participateBtns.forEach(item => item.classList.remove('hide'));
                    }
                })
        } else {
            for (let participateBtn of participateBtns) {
                participateBtn.classList.add('hide');
            }
            for (let youAreInBtn of youAreInBtns) {
                youAreInBtn.classList.add('hide');
            }
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.remove('hide');
            }
        }
    }


    function participate() {
        if (!userId) {
            return;
        }

        const params = {userid: userId};

        request('/user', {
            method: 'POST',
            body: JSON.stringify(params)
        }).then(res => {
            checkUserAuth();
            InitPage();
        });
    }

    function loadTranslations() {
        return fetch(`${apiURL}/new-translates/${locale}`).then(res => res.json())
            .then(json => {
                i18nData = json;
                console.log(i18nData);
                translate();
                var mutationObserver = new MutationObserver(function (mutations) {
                    translate();
                });
                mutationObserver.observe(document.getElementById('goals-or-zeros'), {
                    childList: true,
                    subtree: true,
                });
            });
    }

    function translate() {
        const elems = document.querySelectorAll('[data-translate]')
        if(translateState){
            elems.forEach(elem => {
                const key = elem.getAttribute('data-translate');
                elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
                elem.removeAttribute('data-translate');
            })
        }else{
            console.log("translation work!")
        }
        refreshLocalizedClass(mainPage);
    }

    function refreshLocalizedClass(element) {
        if (!element) {
            return;
        }
        for (const lang of ['uk', 'en']) {
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
            let c = 0;
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

        participateBtns.forEach((authBtn, i) => {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                participate();
            });
        });
    }

    loadTranslations()
        .then(init)


    // 3D anim
    const cards = document.querySelectorAll(".team, .animCard, .animRight"); // Добавляем .animRight
    let angle = 0;

    function animateCards() {
        angle += 0.9; // speed
        const rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
        const rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y

        cards.forEach(card => {
            if (card.classList.contains("animRight")) {
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

//go to predict
    document.querySelector(".toPredict").addEventListener('click', function () {
        const targetElement = document.getElementById("predict");
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    });

// TEST
    document.querySelector('.dark-btn').addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
})()