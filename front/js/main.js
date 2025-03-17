(function () {
    const apiURL = 'https://fav-prom.com/api_goals_or_zeroes',
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        participateBtns = document.querySelectorAll('.btn-join'),
        youAreInBtns = document.querySelectorAll('.took-part'),
        mainPage = document.querySelector(".fav-page"),
        resultsTable = document.querySelector('#results-table'),
        resultsTableOther = document.querySelector('#results-table-other')

    const cache = {};
    let predictData = [];

    let translateState = true
    let debug = false

    let locale = sessionStorage.getItem("locale") ?? "uk"
    // let locale = "uk"

    const ukLeng = document.querySelector('#ukLeng');
    const enLeng = document.querySelector('#enLeng');


    let i18nData = {};

    let userId;
    userId = sessionStorage.getItem("userId") ?? null
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

    // table
    function getData() {
        const currentStage = STAGE_KEYS[selectedTab - 1];
        if (cache[currentStage]) {
            return Promise.resolve(cache[currentStage]);
        }
        return request(`/users/${currentStage}`).then(res => {
            cache[currentStage] = res;
            return res;
        });
    }

    function refreshUsers() {
        getData().then(users => {
            if(!debug) {
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
        const currentUserIndex = users.findIndex(user => user.userid === currentUserId);

        if (currentUserIndex !== -1) {
            // Видаляємо currentUserId зі списку
            users.splice(currentUserIndex, 1);
        }

        // Додаємо currentUserId на 11 позицію (індекс 10)
        users.splice(10, 0, users.find(user => user.userid === currentUserId));

        // Виводимо всіх користувачів у таблицю
        users.forEach(user =>
            displayUser(user, user.userid === currentUserId, resultsTable, users)
        );
    }

    function displayUser(user, isCurrentUser, table, allUsers) {
        const additionalUserRow = document.createElement('div');
        additionalUserRow.classList.add('table__row');

        const place = allUsers.indexOf(user) + 1;

        let prizeKey;
        prizeKey = getPrizeTranslationKey(place)
        let bonusKey;
        bonusKey = getBonusTranslationKey(place)

        additionalUserRow.innerHTML = `
        <div class="table__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
        <div class="table__row-item">
            <span>${user.scoreLeft}</span>
            <img src="img/vs.png" alt="vs">
            <span>${user.scoreRight}</span>
        </div>
        <div class="table__row-item">${prizeKey ? translateKey(prizeKey) : ' - '}</div>
        <div class="table__row-item">${bonusKey ? translateKey(bonusKey) : ' - '}</div>
    `;
        if (isCurrentUser) {
            additionalUserRow.classList.add("you");
            const youBlock = document.createElement('div');
            youBlock.classList.add('table__row-you');
            youBlock.setAttribute('data-translate', 'tableYou');
            youBlock.textContent = "You";
            additionalUserRow.insertBefore(youBlock, additionalUserRow.children[1])

        }
        table.append(additionalUserRow);
    }
    function maskUserId(userId) {
        return "**" + userId.toString().slice(2);
    }


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

            refreshUsers();
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
    setPopups(document.querySelectorAll('.predict__btn.took-part'), '_confirmPopup');

    //go to predict
    document.querySelector(".toPredict").addEventListener('click', function () {
        const targetElement = document.getElementById("predict");
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    });

    //Show first goal winner after match
    function setRadioWinner(index) {
        const container = document.querySelector(".unactive .predict__radio");

        if (!container) return;

        const items = container.querySelectorAll(".predict__radio-item");

        if (items.length >= index) {
            const targetItem = items[index - 1]; // Отримуємо потрібного потомка (1 → 0, 2 → 1, 3 → 2)

            targetItem.classList.add("radioWinner");

            const spanElement = targetItem.querySelector('span');
            if (spanElement) {
                // spanElement.dataset.translate = "winnerFirstGoal";
                spanElement.textContent = "Перший гол";
            }
        }
    }
    let firstGoalResult = 1;
    // setRadioWinner(firstGoalResult);

    function toggleAndSetScores(score1, score2) {
        const scoreElement = document.querySelector(".score-1");
        const goalElement = document.querySelector(".goal-1");

        scoreElement?.classList.toggle("unactive");
        goalElement?.classList.toggle("unactive");

        document.querySelectorAll(".unactive .predict__team-number").forEach((el, index) => {
            el.textContent = index === 0 ? score1 : score2;
        });
    }
    // toggleAndSetScores(1, 2)

    // TEST
    document.querySelector('.dark-btn').addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    const lngBtn = document.querySelector(".lng-btn")

    lngBtn.addEventListener("click", () => {
        if (sessionStorage.getItem("locale")) {
            sessionStorage.removeItem("locale");
        } else {
            sessionStorage.setItem("locale", "en");
        }
        window.location.reload();
    });

    const authBtn = document.querySelector(".auth-btn")

    authBtn.addEventListener("click", () =>{
        if(userId){
            sessionStorage.removeItem("userId")
        }else{
            sessionStorage.setItem("userId", "18908465")
        }
        window.location.reload()
    });

    const btnParticipante = document.querySelector(".btn-participante")

    btnParticipante.addEventListener("click", () =>{
        if(sessionStorage.getItem("userId")=="18908465"){
            participateBtns.forEach(item => item.classList.add('hide'));
            youAreInBtns.forEach(item => item.classList.remove('hide'));
        }else{
            sessionStorage.setItem("userId", "777")
        }

    });

    document.querySelectorAll('.btn-lastPred').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.predict__last').forEach(element => {
                element.classList.toggle('hide');
            });
        });
    });

    setPopups(document.querySelectorAll('.btn-thenks'), '_confirmPopup');

    document.querySelectorAll('.btn-predict').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.unconfirmed').forEach(unconfirmed => {
                unconfirmed.classList.toggle('active');
            });

            document.querySelectorAll('.confirmed').forEach(confirmed => {
                confirmed.classList.toggle('active');
            });
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".menu-btn")?.addEventListener("click", () => {
            document.querySelector(".menu-test")?.classList.toggle("hide");
        });
    });

    document.querySelector(".btn-after")?.addEventListener("click", () => {
        toggleAndSetScores(1, 2)

        if (document.querySelector(".score-1")?.classList.contains("unactive")) {
            setRadioWinner(firstGoalResult);
        } else {
            document.querySelectorAll(".predict__radio-item").forEach(item => {
                item.classList.remove("radioWinner");
            });
        }
    });


})()