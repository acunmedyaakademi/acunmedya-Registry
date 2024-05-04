const registerForm = document.querySelector('#register-form');

async function fetchData(){
    const response = await fetch("assets/JSON/data.json");
    const data = await response.json();
    return data;
}

async function showForm(){
    const data = await fetchData();
    data.forEach(question => {
        registerForm.innerHTML += 
        `
            ${getInputType(question)}
        `
    })
    registerForm.innerHTML += 
    `
        <button class="form-btn">Kaydet</button>
    `;

    const phoneNumberInput = document.querySelector(`[data-phoneNumber="phoneNumber"]`);
    const formBtn = document.querySelector('.form-btn');
    console.log(phoneNumberInput);
    phoneNumberInput.addEventListener('input',(e) => {
        if(isValidTurkishPhoneNumber(e.target.value) !== true){
            formBtn.disabled = true;
        } else{
            formBtn.disabled = false;
        }
    })
}

function getInputType(question){
    if(question.inputType == "text" || question.inputType == "email"){
        return `
            <label for="${question.labelFor}">${question.question}</label>
            ${question.labelFor == "phoneNumber" ? `<input id="${question.inputName}" data-phoneNumber="phoneNumber" type='number' name="${question.inputName}"/>`  : `<input id="${question.inputName}" type='${question.inputType}' name="${question.inputName}"/>`}
            `
    }else if(question.inputType == "radio"){
        return `${question.radioChoices.map(choice => {
            return`
                <label for="${choice}">${choice}</label>
                <input id="${choice}" type="radio" name="${question.name}" value="${choice}"/>
            `
        }).join('')}`;
    }
}

function isValidTurkishPhoneNumber(phoneNumber) {
    const regex = /^(0|\+90)(2[0-9]{2}|[1-9]{2})([0-9]{2})(\d{3})(\d{2})$/;
    return regex.test(phoneNumber);
  }

registerForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    console.log(formObj)
})



showForm();