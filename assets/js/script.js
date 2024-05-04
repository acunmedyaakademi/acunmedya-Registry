const registerForm = document.querySelector('#register-form');

async function fetchData(){
    const response = await fetch("assets/JSON/data.json");
    const data = await response.json();
    return data;
}
let questionCounter = 0;
let currentStep = 1;

async function showForm(){
    const data = await fetchData();
    registerForm.innerHTML = "";
    data.slice(questionCounter,currentStep*3).forEach(question => {
        console.log(question);
        registerForm.innerHTML += 
        `
            ${getInputType(question)}
        `
    })
    console.log(questionCounter , currentStep * 3);
    registerForm.innerHTML += 
    `
        <button class="form-btn btn-next">İleri</button>
    `;

    if(document.querySelector(`[data-phoneNumber="phoneNumber"]`)){
        const phoneNumberInput = document.querySelector(`[data-phoneNumber="phoneNumber"]`);
        const formBtn = document.querySelector('.form-btn');
        phoneNumberInput.addEventListener('blur',(e) => {
            if(isValidTurkishPhoneNumber(e.target.value) !== true){
                formBtn.disabled = true;
            } else{
                formBtn.disabled = false;
            }
        })
    }
}

function getInputType(question){
    if(question.inputType == "text" || question.inputType == "email"){
        return `
            <div class="text-div">
                <label for="${question.labelFor}">${question.question}</label>
                ${question.labelFor == "phoneNumber" ? `<input id="${question.inputName}" data-phoneNumber="phoneNumber" type='number' name="${question.inputName}"/>`  : `<input id="${question.inputName}" type='${question.inputType}' name="${question.inputName}"/>`}
                
            </div>
            `
    }else if(question.inputType == "radio"){
        return `
            <div class="radio-div">
            <h3>${question.question}</h3>
            ${question.radioChoices.map(choice => {
            return`
            
                <input id="${choice}" type="radio" name="${question.name}" value="${choice}"/>
                <label for="${choice}">${choice}</label>
            `
            }).join('')}</div>`;
    }

}

function isValidTurkishPhoneNumber(phoneNumber) {
    var regex = /^(05\d{9})$/;
    return regex.test(phoneNumber);
}

function isValidTCIdentityNo(tckn){
    if (!/^\d{11}$/.test(tckn)) return false;
}

registerForm.addEventListener('submit',(e) => {
    e.preventDefault();
    if(document.querySelector(`#tc`)){
        const tcInput = document.querySelector(`#tc`)
        if(isValidTCIdentityNo(tcInput.value) == false){
            return
        }
    }
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    console.log(formObj)
    questionCounter += 3;
    currentStep += 1;
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.id == currentStep - 1 ? step.classList.add('active') : step.classList.add('empty'));
    return showForm();
})



showForm();