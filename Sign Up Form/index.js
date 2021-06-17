handleForm = (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    for (let data of formData.entries()) {
        let key = data[0]
        let value = data[1]
        let name = splitIdToWords(key)

        if (checkIfEmpty(value)) {
            name = capitalizeFirstLetter(name)
            displayErrorMessage(key, `${name} cannot be empty`)
        }
        else if (key === "emailAddress" && !checkIfEmailValid(value)) {
            name = name.toLowerCase()
            displayErrorMessage(key, `Looks like this is not an ${name}`)
        }
        else {
            resetErrorMessage(key)
        }
    }
}

//turn camelcase id into name with whitespace(s)
splitIdToWords = (word) => {
    return word.split(/(?=[A-Z])/).join(" ").trim()
}

//capitalize first letter of name
capitalizeFirstLetter = (word) => {
    return word[0].toUpperCase() + word.slice(1)
}

//reset error status of .form__group
resetErrorMessage = (id) => {
    let inputEl = document.getElementById(id)
    let formGroup = inputEl.parentElement
    inputEl.setAttribute("aria-invalid", false)
    formGroup.classList.remove("error")
}

//display error message under input
displayErrorMessage = (id, message) => {
    let inputEl = document.getElementById(id)
    let formGroup = inputEl.parentElement
    let errorEl = inputEl.nextElementSibling
    inputEl.setAttribute("aria-invalid", true)
    errorEl.textContent = message
    formGroup.classList.add("error")
}

//check if email is valid
checkIfEmailValid = (value) => {
    let regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regexExp.test(value)
}

//check if text is empty
checkIfEmpty = (value) => {
    if (value.replace(" ", "").length === 0)  //length after removing whitespace
        return true
    return false
}



let form = document.querySelector(".col__form")
form.addEventListener("submit", handleForm)