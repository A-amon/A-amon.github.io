window.onload = () => {
    document.querySelector(".navbar__close").addEventListener('click', () => handleDropdown('close'));
    document.querySelector(".navbar__hamburger").addEventListener('click', () => handleDropdown('open'));

    document.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scroll_loc = window.scrollY
    const navbar = document.querySelector("nav")

    if (scroll_loc > 100)
        navbar.classList.add("filled")
    else
        navbar.classList.remove("filled")
}

function handleDropdown(event) {
    const navbar__close = document.querySelector(".navbar__close")
    const navbar__hamburger = document.querySelector(".navbar__hamburger")

    navbar__close.classList.remove("active")
    navbar__hamburger.classList.remove("active")

    if (event === 'close') {
        navbar__hamburger.classList.add("active")
    }
    else if (event === 'open') {
        navbar__close.classList.add("active")
    }
}