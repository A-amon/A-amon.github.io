describe("Validating form input", () => {

    describe("Atomic testing", () => {
        let word

        describe("Return non-camelcased words", () => {
            it("when word is camelcased", () => {
                word = "camelCase"
                chai.assert.equal(splitIdToWords(word), "camel Case")
            })

            it("when word is lowercased", () => {
                word = "camelcase"
                chai.assert.equal(splitIdToWords(word), "camelcase")
            })

            it("when word is capitalized", () => {
                word = "Camelcase"
                chai.assert.equal(splitIdToWords(word), "Camelcase")
            })
        })

        describe("Return capitalized words", () => {
            it("when word is lowercased", () => {
                word = "cap word"
                chai.assert.equal(capitalizeFirstLetter(word), "Cap word")
            })
        })

        describe("Remove .error class from element's parent", () => {
            let elementId = "emailAddress"
            let element = document.getElementById(elementId)
            let parentEl = element.parentElement
            it("when parent has .error class", () => {
                parentEl.classList.add("error")
                resetErrorMessage(elementId)
                chai.assert.isNotTrue(parentEl.classList.contains("error"))
            })

            it("when parent has no .error class", () => {
                resetErrorMessage(elementId)
                chai.assert.isNotTrue(parentEl.classList.contains("error"))
            })
        })

        describe("Show error message", () => {
            let elementId = "emailAddress"
            let element = document.getElementById(elementId)
            let errorMessage = "Test error message"

            beforeEach(() => {
                displayErrorMessage(elementId, "Test error message")
            })
            it("form group parent should have .error", () => {
                chai.assert.isTrue(element.parentElement.classList.contains("error"))
            })

            it("error message is shown", () => {
                let errorEl = element.nextElementSibling
                chai.assert.equal(errorEl.textContent, errorMessage)
            })
        })

        describe("Return true if email valid", () => {
            let email
            it("when email is valid", () => {
                email = "something@gmail.com"
                chai.assert.isTrue(checkIfEmailValid(email))
            })

            it("when email is invalid", () => {
                email = "something"
                chai.assert.isNotTrue(checkIfEmailValid(email))
            })
        })

        describe("Return true if empty value", () => {
            let word
            it("when word is empty", () => {
                word = ""
                chai.assert.isTrue(checkIfEmpty(word))
            })
            it("when word contains words", () => {
                word = "something"
                chai.assert.isNotTrue(checkIfEmpty(word))
            })
            it("when word contains whitespace only", () => {
                word = " "
                chai.assert.isTrue(checkIfEmpty(word))
            })
        })
    })

    describe("Composed testing", () => {
        describe("Display error message for empty input", () => {
            let emailEl = document.getElementById("emailAddress")
            let passwordEl = document.getElementById("password")
            let firstNameEl = document.getElementById("firstName")
            let lastNameEl = document.getElementById("lastName")
            let submitButton = document.getElementsByClassName("col__form")[0].querySelector("button")

            it("when one input is empty", () => {
                firstNameEl.value = "Something"
                lastNameEl.value = "Something"
                passwordEl.value = "Something"

                submitButton.click()
                chai.assert.isTrue(emailEl.parentElement.classList.contains("error"))
            })
            it("when all input is empty", () => {
                firstNameEl.value = ""
                lastNameEl.value = ""
                passwordEl.value = ""

                submitButton.click()
                chai.assert.isTrue(
                    firstNameEl.parentElement.classList.contains("error") &&
                    lastNameEl.parentElement.classList.contains("error") &&
                    emailEl.parentElement.classList.contains("error") &&
                    passwordEl.parentElement.classList.contains("error")
                )
            })
        })
    })
})