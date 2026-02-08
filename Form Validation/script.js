const submitBtn=document.querySelector('#submitBtn');
const nameError=document.querySelector('#nameError');
const mailError=document.querySelector('#mailError');
const pwdError=document.querySelector('#pwdError');

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const ispassValid=validatePassword();

    if(isNameValid){
        nameError.previousElementSibling.classList.remove('bi-x');
        nameError.previousElementSibling.classList.add('bi-check');
        nameError.previousElementSibling.style.color = "green";
    }

    if(isEmailValid){
        mailError.previousElementSibling.classList.remove('bi-x');
        mailError.previousElementSibling.classList.add('bi-check');
        mailError.previousElementSibling.style.color = "green";
    }

    if(ispassValid){
        pwdError.previousElementSibling.classList.remove('bi-x');
        pwdError.previousElementSibling.classList.add('bi-check');
        pwdError.previousElementSibling.style.color = "green";
    }

    if(isNameValid && isEmailValid && ispassValid){
        alert("Form submitted successfully");
        document.querySelector('#name').value = "";
        document.querySelector('#emailid').value = "";
        document.querySelector('#pwd').value="";
    }

});

function validateName(){
    let name=document.querySelector('#name').value;
    if(name.length==0){
        nameError.innerHTML="Name is required"
        nameError.previousElementSibling.classList.add('bi-x');
        nameError.previousElementSibling.setAttribute("style","color:red");
        return false;
    }
    if(!name.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/)){
        nameError.innerHTML="First name and Last name should start with caps and with one space between."
        nameError.previousElementSibling.classList.add('bi-x');
        nameError.previousElementSibling.setAttribute("style","color:red");
        return false;
    }
    nameError.innerHTML="";
    // document.querySelector('#name').value = "";
    return true;
}

function validateEmail(){
    let mail=document.querySelector('#emailid').value;
    if(mail.length==0){
        mailError.innerHTML="Mail is required"
        mailError.previousElementSibling.classList.add('bi-x');
        mailError.previousElementSibling.setAttribute("style","color:red");
        return false;
    }
    if(!mail.match(/^[a-z0-9.]+@gmail\.com$/)){
        mailError.innerHTML="mail should be in format `xyz123@gmail.com`"
        mailError.previousElementSibling.classList.add('bi-x');
        mailError.previousElementSibling.setAttribute("style","color:red");
        return false;
    }
    mailError.innerHTML="";
    return true;
}

function validatePassword(){
    let pwd=document.querySelector('#pwd').value;
    if(pwd.length==0){
        pwdError.innerHTML="Password is is required"
        pwdError.previousElementSibling.classList.add('bi-x');
        pwdError.previousElementSibling.setAttribute("style","color:red");
        return false;
    }
    if(!pwd.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,30}$/)){
        pwdError.innerHTML="Enter valid Password"
        pwdError.previousElementSibling.classList.add('bi-x');
        pwdError.previousElementSibling.setAttribute("style","color:red");
        return false;
    }
    pwdError.innerHTML="";
    return true;
}