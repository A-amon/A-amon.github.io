var selectedReward = null
var isBookmarked = false

var selectedCard = null

const rewards = [
    {
        id: 1,
        name: "Bamboo Stand",
        min: 25,
        description: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.",
        amount: 101
    },
    {
        id: 2,
        name: "Black Edition Stand",
        min: 75,
        description: "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
        amount: 64
    },
    {
        id: 3,
        name: "Mahogany Special Edition",
        min: 200,
        description: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
        amount: 0
    }
]

const mainStatus = {
    backedAmount: 89914,
    backersCount: 5007,
    daysLeft: 56
}

window.onload = function () {
    updateMainStatus()
    listRewards()

    document.addEventListener('scroll', handleScroll);

    const backButton = document.getElementsByClassName("back__btn")[0]  // back project button

    backButton.addEventListener("click", () => { showRewardsModal() })

    const bookmarkButton = document.getElementsByClassName("bookmark__btn")[0]  // bookmark switch
    bookmarkButton.addEventListener("click", () => { bookmarkProject(bookmarkButton) })

    const navbarButton = document.getElementsByClassName("navbar__btn")[0]
    navbarButton.addEventListener("click", () => { handleMenu(navbarButton) })

    const modalRewardCard = document.getElementsByClassName("rewards__modal")[0].children[0]
    addClickEventToCard(modalRewardCard)
}

function handleScroll() {
    const scroll_loc = window.scrollY
    const navbar = document.getElementsByClassName("navbar")[0]

    if (scroll_loc > 100)
        navbar.classList.add("filled")
    else
        navbar.classList.remove("filled")
}

function handleMenu(navbarButton) {
    const isMenuOpen = navbarButton.getAttribute("data-open") == "true"
    const menu = document.getElementsByClassName("navbar__links")[0]
    const mainContent = document.getElementsByClassName("main")[0]

    if (isMenuOpen) {
        menu.classList.remove("active")
        navbarButton.setAttribute("data-open", "false")
        mainContent.classList.remove("hide")
    }
    else {
        menu.classList.add("active")
        navbarButton.setAttribute("data-open", "true")
        mainContent.classList.add("hide")
    }
}

function bookmarkProject(bookmarkButton) {
    const bookmarkCheckbox = document.getElementById("bookmark__checkbox")
    const isChecked = bookmarkCheckbox.checked

    bookmarkCheckbox.checked = !isChecked
    isBookmarked = !isChecked

    bookmarkButton.innerHTML = `<span>Bookmark${isBookmarked ? 'ed' : ''}</span>`
}

function setCloseModalEvents(modal) {
    const modalBackdrop = modal.querySelector(".modal__backdrop")
    modalBackdrop.addEventListener("click", () => closeModal(modal))    // close on backdrop clicked
    const modalCloseBtn = modal.querySelector(".close__btn")
    modalCloseBtn.addEventListener("click", () => closeModal(modal))    // close on close button clicked
}

function showCompleteModal() {
    const completeModal = document.getElementsByClassName("complete__modal")[0]
    let modalClasslist = completeModal.classList
    if (!modalClasslist.contains('active')) {
        modalClasslist.add('active')

        setCloseModalEvents(completeModal)
    }
}

function showRewardsModal() {
    const rewardsModal = document.getElementsByClassName("rewards__modal")[0]

    let modalClasslist = rewardsModal.classList
    if (!modalClasslist.contains('active')) {
        modalClasslist.add('active')

        setCloseModalEvents(rewardsModal)
    }
}

function closeModal(modal) {
    if (modal.classList.contains('active'))
        modal.classList.remove('active')
}

function unselectPrevReward() {
    if (selectedReward !== null) {
        selectedCard.classList.remove('selected')
        const selectedRadio = selectedCard.querySelector("[type='radio']")
        selectedRadio.checked = false
    }
}

function selectReward(__selectedCard, isModal = true) {
    unselectPrevReward()

    const selectedId = parseInt(__selectedCard.getAttribute("data-id"))
    let selectedRadio
    if (isModal) {
        selectedRadio = __selectedCard.querySelector("[type='radio']")
        __selectedCard.classList.add("selected")
        selectedCard = __selectedCard
    }
    else {
        const rewardCard = getCardInModal(selectedId)
        selectedRadio = getRadioInModal(rewardCard)
        rewardCard.classList.add("selected")
        selectedCard = rewardCard
    }

    selectedReward = parseInt(selectedId)
    selectedRadio.checked = true
}

function getCardInModal(selectedId) {
    const rewardsModal = document.getElementsByClassName("rewards__modal")[0]
    const rewardCard = rewardsModal.querySelector(`[data-id='${selectedId}']`)

    return rewardCard
}

function getRadioInModal(rewardCard) {
    const radio = rewardCard.querySelector("[type='radio']")

    return radio
}

function pledge(reward) {
    const pledgeAmount = parseInt(document.getElementsByClassName("pledge__amount")[0].value)
    const pledgeErrorMessage = document.getElementsByClassName("pledge__error")[0]

    let errorMessage = null

    if (reward === null || pledgeAmount >= reward.min) {
        if (reward != null) {
            const rewardInd = rewards.findIndex(__reward => __reward.id === reward.id)
            rewards[rewardInd].amount--
            updateAmountShown(reward.amount)
        }
        mainStatus.backersCount++
        mainStatus.backedAmount += pledgeAmount
        updateMainStatus()

        closeModal(document.getElementsByClassName("rewards__modal")[0])
        showCompleteModal()
    }
    else if (pledgeAmount === 0) {
        errorMessage = "Pledge amount must not be empty"
    }
    else if (pledgeAmount < reward.min) {
        errorMessage = `Min pledge for this reward is ${reward.min}`
    }

    pledgeErrorMessage.textContent = errorMessage
}

function updateAmountShown(amount) {
    const rewardCards = document.querySelectorAll(`[data-id='${selectedReward}']`)
    rewardCards.forEach(rewardCard => {
        const rewardAmount = rewardCard.querySelectorAll(".amount__left")
        rewardAmount.forEach(__rewardAmount => {
            __rewardAmount.children[0].textContent = amount
        })
    })
}

function updateMainStatus() {
    const mainStatusVals = document.getElementsByClassName("status__val")

    mainStatusVals[0].textContent = `$${mainStatus.backedAmount.toLocaleString()}`
    mainStatusVals[1].textContent = mainStatus.backersCount
    mainStatusVals[2].textContent = mainStatus.daysLeft

    const progressValue = document.getElementsByClassName("progress__value")[0]
    let newProgressVal = Math.floor(mainStatus.backedAmount / 100000 * 100)
    newProgressVal = newProgressVal > 100 ? 100 : newProgressVal
    progressValue.setAttribute("data-current", newProgressVal)
    progressValue.style.width = `${newProgressVal}%`
}

function listRewards() {
    rewards.forEach(reward => {
        addToMain(reward)
        addToRewardsModal(reward)
    })
}

function addToMain(reward) {
    const mainStands = document.getElementsByClassName("main__stands")[0]
    let rewardCard = document.createElement("li")
    rewardCard.className = "card"
    rewardCard.setAttribute("data-id", reward.id)
    rewardCard.setAttribute("data-amount", reward.amount)
    rewardCard.innerHTML = `<div class="card__header">
                                <h3>${reward.name}</h3>
                                <span>Pledge $${reward.min} or more</span>
                            </div>
                            <p>
                                ${reward.description}
                            </p>
                            <div class="card__footer">
                                <span class="amount__left">
                                    <strong>${reward.amount}</strong>
                                    <span>left</span>
                                </span>
                                <button class="reward__btn">
                                    Select Reward
                                </button>
                            </div>`

    const rewardButton = rewardCard.querySelector(".reward__btn")
    rewardButton.addEventListener("click", () => {
        selectReward(rewardCard, false)
        showRewardsModal()
    })

    mainStands.appendChild(rewardCard)
}

function addToRewardsModal(reward) {
    const modalStands = document.getElementsByClassName("modal__stands")[0]
    let rewardCard = document.createElement("li")
    rewardCard.className = "card"
    rewardCard.setAttribute("data-id", reward.id)
    rewardCard.setAttribute("data-amount", reward.amount)

    rewardCard.innerHTML = `<div class="card__header">
                                <input type="radio" class="reward__radio" name="reward__radio">
                                <h3>${reward.name}</h3>
                                <span>Pledge $${reward.min} or more</span>
                                <span class="amount__left">
                                    <strong>${reward.amount}</strong>
                                    <span>left</span>
                                </span>
                            </div>
                            <p>
                                ${reward.description}
                            </p>
                            <div class="card__footer">
                                <span class="amount__left">
                                    <strong>${reward.amount}</strong>
                                    <span>left</span>
                                </span>
                            </div>
                            <div class="pledge">
                                <div class="pledge__wrapper">
                                    <input class="pledge__amount" type="number" placeholder="Enter your pledge" name="pledge__amount">
                                    <span class="pledge__error"></span>
                                </div>
                                <span class="pledge__min">${reward.min}</span>
                                <button class="pledge__submit">Continue</button>
                            </div>`

    addClickEventToCard(rewardCard, reward)

    modalStands.appendChild(rewardCard)
}

function addClickEventToCard(card, reward = null) {
    card.addEventListener("click", (event) => {
        if (event.target.className === "pledge__submit")
            pledge(reward)
        else
            selectReward(card)
    })
}
