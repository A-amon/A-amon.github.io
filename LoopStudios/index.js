window.onload = function () {
    handleNavbarMenu()
    handleNavScrollEffect()
}

function handleNavScrollEffect() {
    document.addEventListener("scroll", () => {
        debounce(changeNavbarColor, 100)
    })
}

function changeNavbarColor() {
    const navbar = document.getElementsByClassName("navbar")[0]

    const currentScroll = window.scrollY
    const classes = navbar.classList

    if (currentScroll > 100 && !classes.contains("filled"))
        classes.add("filled")
    else if (currentScroll <= 100)
        classes.remove("filled")
}

function debounce(method, delay) {
    clearTimeout(method.timeout)    //clear the timeout set in prev call (none if first call)
    method.timeout = setTimeout(() => {     //timeout for calling changeNavbarColor method
        method()
    }, delay)
}

function handleNavbarMenu() {
    const navbarMenu = document.getElementsByClassName("navbar__menu")[0]

    navbarMenu.addEventListener("click", () => {
        const classes = navbarMenu.classList
        if (classes.contains("show"))
            classes.remove("show")
        else
            classes.add("show")
    })
}