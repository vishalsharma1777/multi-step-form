// ASIDE IMPORTS
const circles = document.querySelectorAll('[data-stepCircle]');
const steps = document.querySelectorAll('[data-container]');

//STEP 1 IMPORTS
const signupForm = document.querySelector('[data-formName="signUp"]');
const name = document.querySelector('[data-userInputs="nameInput"]');
const email = document.querySelector('[data-userInputs="emailInput"]');
const number = document.querySelector('[data-userInputs="numberInput"]');
const userInputs = document.querySelectorAll('[data-userInputs]');
const wrongInput = document.querySelectorAll('[data-wrongInput]');
const signupButton = document.getElementById('signupButton');

//STEP 2 IMPORTS
const planSelectorForm = document.querySelector('[data-formName="planSelect"]');
const plans = document.querySelectorAll('[data-whichPlan]');
const [cards] = document.getElementsByClassName('cards');
const monthlyPlans = document.querySelectorAll('[data-duration="monthly"]');
const yearlyToggle = document.getElementById('yearlyToggle');
const monthlyToggle = document.getElementById('monthlyToggle');
const durationToggle = document.getElementById('priceToggler');


// GO BACK BUTTONS IMPORT
const plansGoBack = document.querySelector('[data-goBack="backToSignup"]');


//GLOBAL VARIABLES
var allDetails = new Map();

// HELPER FUNCTIONS

//FORM VALIDATER
function formValidate() {
    const inputs = [
        { element: name, errorElement: wrongInput[0] },
        { element: email, errorElement: wrongInput[1] },
        { element: number, errorElement: wrongInput[2] }
    ];
    inputs.forEach((input, index) => {
        if (input.element.value === '') {
            warningMessage(input.errorElement, 'This field is required');
            input.errorElement.style.display = 'block';
            userInputs[index].style.border = '1px solid hsl(0, 100%, 74%)';
        } else {
            input.errorElement.style.display = 'none';
            userInputs[index].style.border = '1px solid hsl(246, 25%, 77%)';
        }
    });
}

//NAME VALIDATOR
function nameValidate() {
    const nameValue = name.value;
    const namePattern = /^[a-zA-Z ]{2,30}$/;
    if (nameValue.match(namePattern)) {
        wrongInput[0].style.display = 'none';
        signupButton.disabled = false;
        name.style.border = '1px solid hsl(246, 25%, 77%)';
    } else {
        wrongInput[0].style.display = 'block';
        warningMessage(wrongInput[0], 'ENTER VALID NAME');
        name.style.border = '1px solid hsl(0, 100%, 74%)';
        signupButton.disabled = true;
    }
}

//EMAIL VALIDATOR
function emailValidate() {
    const emailValue = email.value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (emailValue.match(emailPattern)) {
        wrongInput[1].style.display = 'none';
        signupButton.disabled = false;
        email.style.border = '1px solid hsl(246, 25%, 77%)';
    } else {
        wrongInput[1].style.display = 'block';
        warningMessage(wrongInput[1], 'ENTER VALID EMAIL');
        email.style.border = '1px solid hsl(0, 100%, 74%)';
        signupButton.disabled = true;
    }
}

//NUMBER VALIDATOR
function numberValidate() {
    const numberValue = number.value;
    const numberPattern = /\+\d{1,3} \d{3} \d{3} \d{3}$/;
    if (numberValue.match(numberPattern)) {
        wrongInput[2].style.display = 'none';
        signupButton.disabled = false;
        number.style.border = '1px solid hsl(246, 25%, 77%)';
    } else {
        wrongInput[2].style.display = 'block';
        warningMessage(wrongInput[2], 'ENTER VALID NUMBER');
        number.style.border = '1px solid hsl(0, 100%, 74%)';
        signupButton.disabled = true;
    }
}

//WARNING MESSAGE
function warningMessage(target, message) {
    target.textContent = message;
}

// DATA MATCHER
function dataMatcher(dataCollection, toCheck, dataValue) {
    const divName = Array.from(dataCollection).filter((data) => {
        return data.getAttribute(toCheck) === dataValue;
    });
    return divName[0];
}

// HANDLING STEP CHANGE AND CIRCLE ACTIVE
function changeStepAndGoBack(circleToRemove, circleToAdd, stepToAddContainer, stepToRemoveContainer) {
    const removeCircle = dataMatcher(circles, 'data-stepCircle', circleToRemove);
    const addCircle = dataMatcher(circles, 'data-stepCircle', circleToAdd);
    const stepToAdd = dataMatcher(steps, 'data-container', stepToAddContainer);
    const stepToRemove = dataMatcher(steps, 'data-container', stepToRemoveContainer);

    if (removeCircle && addCircle && stepToAdd && stepToRemove) {
        removeCircle.classList.remove('currentStep');
        addCircle.classList.add('currentStep');
        stepToRemove.style.display = 'none';
        stepToAdd.style.display = 'flex';
    }
}

// TOGGLE PRICES
function togglePrices() {
    monthlyToggle.classList.toggle('togglecolor');
    yearlyToggle.classList.toggle('togglecolor');
    Array.from(monthlyPlans).forEach((plan) => {
        const toChange = plan.parentElement;
        if (plan.getAttribute('data-duration') === 'monthly') {
            plan.setAttribute('data-duration', 'yearly');
            allDetails.set('duration', 'yearly');
            toChange.querySelector('.planPriceMonthly').classList.toggle('toggleDisplay');
            toChange.querySelector('.planPriceYearly').classList.toggle('toggleDisplay');
        }
        else if (plan.getAttribute('data-duration') === 'yearly') {
            plan.setAttribute('data-duration', 'monthly');
            allDetails.set('duration', 'monthly');
            toChange.querySelector('.planPriceMonthly').classList.toggle('toggleDisplay');
            toChange.querySelector('.planPriceYearly').classList.toggle('toggleDisplay');
        }
    });
}

// SELECTED ADD BACKGROUND
function selectedBackGround(collectionToPerform) {
    collectionToPerform.forEach((ele) => {
        if (!ele.checked) {
            ele.parentElement.classList.remove('selected');
        } else {
            ele.parentElement.classList.add('selected');
        }
    })
}


// EVENT LISTENERS
//NAME INPUT
name.addEventListener('input', nameValidate);
//EMAIL INPUT
email.addEventListener('input', emailValidate);
//NUMBER INPUT
number.addEventListener('input', numberValidate);
//TOGGLE PRICE
durationToggle.addEventListener('change', togglePrices);

// CHANGE BACK GROUND COLOR OF SELECTED PLAN AND ADDONS
cards.addEventListener('click', (e) => {
    selectedBackGround(plans);
});



// SUBMITTIONS

//STEP 1 FORM SUBMIT -- SIGN UP FORM
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    allDetails.set('name', name.value);
    allDetails.set('email', email.value);
    allDetails.set('number', number.value);
    if (name.value === '' || email.value === '' || number.value === '') {
        formValidate();
    } else {
        formValidate();
        changeStepAndGoBack('1', '2', 'planContainer', 'singupContainer');
    }
});

//STEP 2 FORM SUBMIT -- PLAN SELECTOR FORM
planSelectorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const [selectedPlan] = Array.from(plans).filter((plan) => {
        return plan.checked;
    });
    const selectedPlanName = selectedPlan.getAttribute('value');
    allDetails.set('plan', selectedPlanName);
    allDetails.set('duration', selectedPlan.getAttribute('data-duration'));
    let price;
    if (selectedPlan.getAttribute('data-duration') === 'monthly') {
        price = selectedPlan.getAttribute('data-priceMonthly');
    } else {
        price = selectedPlan.getAttribute('data-priceYearly');
    }
    const selectedPlanPrice = price;
    allDetails.set('price', selectedPlanPrice);
    changeStepAndGoBack('2', '3', 'addOnsContainer', 'planContainer');
});



// GO BACK BUTTONS
// PLAN GO BACK
plansGoBack.addEventListener('click', () => {
    changeStepAndGoBack('2', '1', 'singupContainer', 'planContainer');
});