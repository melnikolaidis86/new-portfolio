// Fields that need validation
var form = document.getElementById('form'),
    fullNameField = form.fullName,
    emailField = form.email,
    emailField2 = form.email2,
    passwordField1 = form.password1,
    passwrodField2 = form.password2,
    phoneField = form.phone1,
    addressField = form.address;

// Button that submits the form when clicked
var submitButton = document.getElementById('submitButton');

// A validation run for full name triggered on blur
fullNameField.addEventListener('blur', function() {
    
    var errorSpan = document.getElementById('fullNameError');
    
    fullNameValidation = new Validation('ονοματεπώνυμο', fullNameField.value, {
        required: true,
        minLength: 5,
        maxLength: 30,
        regex: /^[a-zA-Zα-ωΑ-Ω\s]*$/ // accepts only String Characters english and greek
    });
    
    errorSpan.innerHTML = fullNameValidation.validate();
});

// A validation run for email triggered on blur 
emailField.addEventListener('blur', function() {
   
    var errorSpan = document.getElementById('emailError');
    
    emailValidation = new Validation('e-mail', emailField.value, {
        required: true,
        regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // a regular expression that checks for a valid e-mail address
    });
    
    errorSpan.innerHTML = emailValidation.validate();
});

// A validation that checks the previous email if it is the same
emailField2.addEventListener('blur', function() {
    
    var errorSpan = document.getElementById('email2Error');
    
    emailField = form.email;
    emailField2 = form.email2;
    
    if(emailField2.value != emailField.value) {
        
        errorSpan.innerHTML = 'Το πεδίο δεν ταιριάζει με το πεδίο e-mail που πληκτρολογήσατε παραπάνω.';
    } else {
        
        errorSpan.innerHTML = '';
    }
});

// A validation run for password triggered on blur
passwordField1.addEventListener('blur', function () {

    var errorSpan = document.getElementById('password1Error');

    passwordValidation = new Validation('κωδικός πρόσβασης', passwordField1.value, {
        required: true,
        minLength: 8,
        maxLength: 30
    });

    errorSpan.innerHTML = passwordValidation.validate();
});

passwordField1.addEventListener('keyup', function () {
    
    var passwordStrengthP = document.getElementById('passwordStrength');

    passwordStrength = new Validation('κωδικός πρόσβασης', passwordField1.value, {
        passwordStrength: true
    });
    
    passwordStrengthP.innerHTML = passwordStrength.checkPasswordStrength();
});

// A validation that checks the previous password if it is the same
passwrodField2.addEventListener('blur', function() {
    
    var errorSpan = document.getElementById('password2Error');
    
    passwordField1 = form.password1;
    passwordField2 = form.password2;
    
    if(passwordField1.value != passwordField2.value) {
        
        errorSpan.innerHTML = 'Το πεδίο δεν ταιριάζει με το πεδίο password που πληκτρολογήσατε παραπάνω.';
    } else {
        
        errorSpan.innerHTML = '';
    }
});


// A validation run for phone1 triggered on blur 
phoneField.addEventListener('blur', function() {
   
    var errorSpan = document.getElementById('phoneError');
    
    phoneValidation = new Validation('τηλέφωνο', phoneField.value, {
        required: true,
        maxLength: 13,
        regex: /^\d{3}\d{7}$/ //accepts only 10 numeric characters
    });
    
    errorSpan.innerHTML = phoneValidation.validate();
});

// A validation run for address triggered on blur 
addressField.addEventListener('blur', function() {
   
    var errorSpan = document.getElementById('addressError');
    
    addressFieldValidation = new Validation('διεύθυνση', addressField.value, {
        required: true,
        minLength: 5,
        maxLength: 30,
        regex: /^[A-Za-zΑ-Ωα-ω](?=.*[A-Za-zΑ-Ωα-ω])(?=.*\s)(?=.*\d)/ // checks for string characters as well as at least a numeric character and a whitespace
    });
    
    errorSpan.innerHTML = addressFieldValidation.validate();
});

// A validation run on all required fields when the submit button is clicked
submitButton.addEventListener('click', function() {
    formErrors = new Array();
    fieldsRequired = [
        fullNameValidation = new Validation('Ονοματεπώνυμο', fullNameField.value, {required: true, minLength: 5, maxLength: 30, regex: /^[a-zA-Zα-ωΑ-Ω\s]*$/}),
        emailValidation = new Validation('E-mail', emailField.value, {required: true, regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}),
        passwordValidation = new Validation('κωδικός πρόσβασης', passwordField1.value, {required: true, minLength: 8, maxLength: 30}),
        phoneValidation = new Validation('τηλέφωνο', phoneField.value, {required: true, maxLength: 13, regex: /^\d{3}\d{7}$/}),
        addressFieldValidation = new Validation('διεύθυνση', addressField.value, {required: true, minLength: 5, maxLength: 30, regex: /^[A-Za-zΑ-Ωα-ω](?=.*[A-Za-zΑ-Ωα-ω])(?=.*\s)(?=.*\d)/ })
    ];
    
    for(i = 0; i < fieldsRequired.length; i++) {
        
        formErrors.push(fieldsRequired[i].validate());
    }
    
    for(var error in formErrors) {
        
        if(formErrors[error].length > 1) {
            
            alert(formErrors[error]);
        }
    }
});


// Validation object that validates a field based on some validation rules
function Validation (validationField, validationFieldValue, validationRules = {required: false, minLength: null, maxLength: null, regex: null, passwordStrength: false}) {
    
    // Validation properties
    this.field = validationField;
    this.fieldValue = validationFieldValue;
    this.rules = validationRules;
    this.messages = {
        
        // Error messages
        requiredMessage : 'Το πεδίο ' + this.field + ' δεν μπορεί να είναι κενό.',
        minLengthMessage : 'Για το πεδίο ' + this.field + ' απαιτούνται τουλάχιστον ' + this.rules.minLength + ' χαρακτήρες.',
        maxLengthMessage : 'Το πεδίο ' + this.field + ' δεν μπορεί να υπερβαίνει τους ' + this.rules.maxLength + ' χαρακτήρες.',
        regexMessage : 'Εισάγετε μία έγκυρη μορφή για το πεδίο ' + this.field + '.'
    }
    
    
    // Main Validation method that runs all the validation tests and returns an error message
    this.validate = function () {
        
        var error = '';
        
        if(this.rules.required == true && this.fieldValue.trim() == '') {
            
            error = this.messages.requiredMessage; 
        } else if (this.rules.minLength != null && this.fieldValue.length < this.rules.minLength) {
            
            error = this.messages.minLengthMessage;
        } else if (this.rules.maxLength != null && this.fieldValue.length > this.rules.maxLength) {
            
            error = this.messages.maxLengthMessage;
        } else if (this.rules.regex != null && this.fieldValue != '') {
            
            if(!this.rules.regex.test(this.fieldValue)) {
                
              error = this.messages.regexMessage;  
            }
        }
              
        return error;
    
    }
    
    // A Validation method that checks the password strength
    this.checkPasswordStrength = function() {

        if(this.rules.passwordStrength == true) {

            var tests = {
                medium: /^(?=.*[A-Za-z])(?=.*\d)/, // checks for at least a string character and a numeric character
                high: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/, // checks for at least a string, a numeric and a special character
                perfect: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])/ // checks for at least a lowercase, an uppercase, a numeric and a special character
            }

            if (tests.perfect.test(this.fieldValue)) {
                return 'πολύ ισχυρό';
            } else if (tests.high.test(this.fieldValue)) {
                return 'ισχυρό';
            } else if (tests.medium.test(this.fieldValue)) {
                return 'μεσαίο';
            } else {
                return 'αδύναμο';
            }
        }
    }    
}