const inputs = Array.from(document.querySelectorAll('input'));
const spans = Array.from(document.querySelectorAll('input+span'));
const form = document.querySelector('form');


inputs.forEach(input => {
    input.addEventListener('input', e => {
        const span = document.querySelector(`[data-key=${input.id}]`);
        validate(input, span);
    })
})

form.addEventListener('submit', e => {
    inputs.forEach (input => {
        const span = document.querySelector(`[data-key=${input.id}]`);
        if (!input.validity.valid) {
            showError(input, span);
        }
    })
})

//password check
form.addEventListener('submit', e => {
    const passwords = [];
    inputs.forEach (input => {
        if (input.type === 'password') {
            passwords.push (input.value);
        }
    })

    if (passwords[0] !== passwords[1]) {
        e.preventDefault();
        const spans = Array.from(document.querySelectorAll('[type=password]+span'));
        spans.forEach (span => {
           span.textContent="Passwords do not match";
           span.className='error-message';
        })
    }
 })

function validate(input, span) {
    if (input.validity.valid) {
        span.textContent="";
        span.className = "";
    }
    else {
        showError(input, span);
    }
}

function showError(input, span) {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
        span.textContent = "This is a required field";
    }
    else if (input.validity.typeMismatch) {
        span.textContent = "Enter a valid email address";
    }
    span.className = "error-message";
}

