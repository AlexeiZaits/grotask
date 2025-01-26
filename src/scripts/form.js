import emailjs from 'emailjs-com';
emailjs.init(import.meta.env.VITE_KEY_ID);

function handleVadateForm(fullName, phone, email){
    
    const validateFullName = (fullName) => {
        const currentFullName = fullName.split(" ")
        return currentFullName.length === 2 && currentFullName[0].length > 2 && currentFullName[1].length > 2
    };

    // Валидация телефона
    const validatePhone = (phone) => {
        return phone.length === 15
    };

    // Валидация email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Простой regex для email
        return emailRegex.test(email);
    };

    const validateFullForm = {phone: validatePhone(phone), email: validateEmail(email), fullName: validateFullName(fullName)}
    const isValid = validateFullForm.phone && validateFullForm.email && validateFullForm.fullName
    
    return {isValid: isValid, validateFullForm}
}

export function handleMaskForm(){
    
    const fullNameInput = document.getElementById('fullName');
    
    // маска для имени и фамилии
    fullNameInput.addEventListener('input', () => {
        let value = fullNameInput.value.replace(/[^а-яА-ЯёЁ\s]/g, '');

        const words = value.split(/\s+/);
        
        if (words.length > 2) {
            words.length = 2; // Ограничиваем количеством слов до 2
        }

        fullNameInput.value = words.join(' ');
    });
    
    const phoneInput = document.getElementById('phone');
    
    // маска для телефона
    phoneInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, '');
        
        let formatted = '8 ';
        if (value.length > 1) formatted += `${value.slice(1, 4)} `;
        if (value.length >= 4) formatted += `${value.slice(4, 7)} `;
        if (value.length >= 7) formatted += `${value.slice(7, 9)} `;
        if (value.length >= 9) formatted += `${value.slice(9, 11)}`;
        
        event.target.value = formatted.trim();
    });

    // Маска для Email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
        let value = emailInput.value;
        emailInput.value = value.replace(/[^a-zA-Z0-9@._-]/g, ''); // Разрешаем только допустимые символы
    });
}

export function handleSandForm () {
    const form = document.querySelector('form');
    const fullNameContainer = document.querySelector('.input__name');
    const emailContainer = document.querySelector('.input__email');
    const phoneContainer = document.querySelector('.input__phone');
    const listContainers = {"phone": phoneContainer, "email": emailContainer, "fullName": fullNameContainer}

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const entriesForm = Object.fromEntries(formData.entries());
        const {isValid, validateFullForm} = handleVadateForm(entriesForm.fullName, entriesForm.phone, entriesForm.email)
        
        if (isValid){
            emailjs.send(import.meta.env.VITE_KEY_SERVICE, import.meta.env.VITE_KEY_TEMPLATE, {
                from_name: "Алексей",
                to_name: "Гротеск",
                fullName: entriesForm.fullName,
                email: entriesForm.email,
                phone: entriesForm.phone,
            })
            .then(() => {
                form.reset();
                alert('Email отправлен!')
            })
            .catch((error) => alert('Ошибка: ' + error.text));
            Object.keys(validateFullForm).forEach((item) => {
                listContainers[item].classList.remove("error")
            })
        } else {
            Object.keys(validateFullForm).forEach((item) => {
                if (validateFullForm[item]){
                    listContainers[item].classList.remove("error")
                } else {
                    listContainers[item].classList.add("error")
                }
            })
        }
        
        
    });

}