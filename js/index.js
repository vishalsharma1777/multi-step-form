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

//STEP 3 IMPORTS
const addOnsForm = document.querySelector('[data-formName="addOnSelector"]');
const addOn = document.querySelectorAll('[data-whichAddOn]');
const yo = document.querySelector('[data-whichAddOn]');
const addOnCard = document.querySelector('.addOnCards');

// STEP 4 IMPORTS
const submarry = document.querySelector('[data-formName="summaryContainer"]');
const submarryAddOns = document.getElementById('addOnSelected');
const submarryPlanName = document.getElementById('mainPlanName');
const confirm = document.getElementById('confirmButton');
const submarryPlanPrice = document.getElementById('basePrice');
const totalfooter = document.getElementById('totalName');
const totalValuefooter = document.getElementById('totalPrice');

// STEP 5 IMPORTS
const thankYouContainer = document.getElementById('finalMessage');
const finalButton = document.getElementById('finalButton');

// GO BACK BUTTONS IMPORT
const plansGoBack = document.querySelector('[data-goBack="backToSignup"]');
const addsOnGoBack = document.querySelector('[data-goBack="backToPlan"]');
const summaryGoBack = document.querySelector('[data-goBack="backToAddOns"]');
const summaryChangeButton = document.getElementById('change');


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

// ARRAY SUM FUNCTION
function arraySum(array) {
    return array.reduce((a, b) => +a + +b, 0);
}

// MAKE BILL
function makeBill() {
    // RETRIVING DATA FROM ALL DETAILS MAP
    const userPlan = allDetails.get('plan');
    const userDuration = allDetails.get('duration');
    const userBaseprice = allDetails.get('price');
    const userAddons = allDetails.get('addOns');
    let addOns = Object.entries(userAddons);
    const addOnsValues = Object.values(userAddons);
    const totalToPay = +userBaseprice + arraySum(addOnsValues);

    // CHANGING THE SUMMARY MAIN INNER HTML
    submarryPlanName.textContent = `${userPlan} ( ${userDuration} )`;
    submarryAddOns.innerHTML = '';

    // IF NO ADDONS SELECTED
    if (addOns.length == 0) {
        if (userDuration === 'monthly') {
            submarryPlanPrice.textContent = `$${userBaseprice}/mo`;
            totalfooter.textContent = `Total`;
            totalValuefooter.textContent = `$${totalToPay}/mo`;
        } else {
            submarryPlanPrice.textContent = `$${userBaseprice}/yr`;
            totalfooter.textContent = `Total`;
            totalValuefooter.textContent = `$${totalToPay}/yr`;
        }
    }
    // APPENDING DIVS OF ADDONS
    addOns.forEach((addOn) => {
        const addOnName = addOn[0];
        const addOnPrice = addOn[1];
        const addOnDiv = document.createElement('div');
        addOnDiv.classList.add('mainPlan', 'extraPlan');
        if (userDuration === 'monthly') {
            submarryPlanPrice.textContent = `$${userBaseprice}/mo`;
            totalfooter.textContent = `Total ( per month )`;
            totalValuefooter.textContent = `$${totalToPay}/mo`;
            addOnDiv.innerHTML = `
            <div class="addOnSelectedName">${addOnName}</div>
            <div class="addOnSelectedPrice">+$${addOnPrice}/mo</div>`;
        } else {
            submarryPlanPrice.textContent = `$${userBaseprice}/yr`;
            totalfooter.textContent = `Total ( per year )`;
            totalValuefooter.textContent = `$${totalToPay}/yr`;
            addOnDiv.innerHTML = `
            <div class="addOnSelectedName">${addOnName}</div>
            <div class="addOnSelectedPrice">+$${addOnPrice}/yr</div>`;
        }
        submarryAddOns.appendChild(addOnDiv);
    });
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

addOnCard.addEventListener('click', (e) => {
    selectedBackGround(addOn);
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

//STEP 3 FORM SUBMIT -- ADDS ON SELECTOR FORM
addOnsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedAddOn = Array.from(addOn).filter((addOn) => {
        return addOn.checked;
    });
    let addOnObjects = selectedAddOn.map((ele) => {
        if (ele.getAttribute('data-duration') === 'monthly') {
            return [
                ele.getAttribute('data-whichAddOn'),
                ele.getAttribute('data-priceMonthly')
            ];
        } else {
            return [
                ele.getAttribute('data-whichAddOn'),
                ele.getAttribute('data-priceYearly')
            ];
        }
    });
    addOnObjects = Object.fromEntries(addOnObjects);
    allDetails.set('addOns', addOnObjects);
    changeStepAndGoBack('3', '4', 'summaryContainer', 'addOnsContainer');
    makeBill();
});

//STEP 4 CONFIRM BUTTON
confirm.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Your plan has been confirmed');
    addMessage();
    changeStepAndGoBack('4', '4', 'thankYouContainer', 'summaryContainer');
});


// STEP 5 THANK YOU BUTTON
function addMessage() {
    const name = allDetails.get('name');
    const email = allDetails.get('email');
    const number = allDetails.get('number');
    const userPlan = allDetails.get('plan');
    const userDuration = allDetails.get('duration');
    const userBaseprice = allDetails.get('price');
    const userAddons = allDetails.get('addOns');
    let addOns = Object.keys(userAddons);
    const addOnsValues = Object.values(userAddons);
    const totalToPay = +userBaseprice + arraySum(addOnsValues);

    if (addOns.length == 0) {
        addOns = 'None';

    }
    thankYouContainer.innerHTML = `Thank you <span class="values">${name}</span>! 
    Thanks for confirming your subscription of <span class="values">${userPlan}</span> 
    for <span class="values">${userDuration}</span> with base price of 
    <span class="values">$${userBaseprice}</span> only! We hope you have fun
    with addons of <span class="values">${addOns}</span> for using our platform.<br> 
    Expect a mail on <span class="values">${email}</span> or <br> a call on <span class="values">${number}</span> 
    for further details. <p>Your total bill is <span class="values">$${totalToPay}</span> only!<p>`
}


// GO BACK BUTTONS
// PLAN GO BACK
plansGoBack.addEventListener('click', () => {
    changeStepAndGoBack('2', '1', 'singupContainer', 'planContainer');
});

// ADDS ON GO BACK
addsOnGoBack.addEventListener('click', () => {
    changeStepAndGoBack('3', '2', 'planContainer', 'addOnsContainer');
});
// SUMMARY GO BACK
summaryGoBack.addEventListener('click', () => {
    changeStepAndGoBack('4', '3', 'addOnsContainer', 'summaryContainer');
});

// CHANGE BUTTON
summaryChangeButton.addEventListener('click', () => {
    changeStepAndGoBack('4', '2', 'planContainer', 'summaryContainer');
});

// FINAL BUTTON refresh the page
finalButton.addEventListener('click', () => {
    location.reload();
});
