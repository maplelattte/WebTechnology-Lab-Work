(function() {
    const style = document.createElement('style');
    style.textContent = `
        #reg-container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 420px; margin: 40px auto; padding: 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #eee; }
        .form-group { margin-bottom: 18px; }
        label { display: block; font-weight: 600; margin-bottom: 6px; color: #333; font-size: 14px; }
        input, select { width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 6px; transition: all 0.2s; }
        input:focus { border-color: #3498db; outline: none; box-shadow: 0 0 5px rgba(52,152,219,0.3); }
        .invalid { border: 1px solid #e74c3c !important; background-color: #fdf2f2; }
        .error-text { color: #e74c3c; font-size: 11px; height: 14px; margin-top: 4px; font-weight: 500; }
        .hint { color: #7f8c8d; font-size: 11px; margin-top: 4px; }
        .hidden { display: none; }
        #submitBtn { width: 100%; padding: 12px; background: #2ecc71; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 16px; margin-top: 10px; }
        #submitBtn:disabled { background: #bdc3c7; cursor: not-allowed; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'reg-container';
    container.innerHTML = `
        <h2 style="margin-top:0; color: #2c3e50;">Create Account</h2>
        <form id="regForm" novalidate>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="name" placeholder="Enter your name">
                <div id="nameError" class="error-text"></div>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="email" placeholder="name@domain.com">
                <div id="emailError" class="error-text"></div>
            </div>
            <div class="form-group">
                <label>User Role</label>
                <select id="role">
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <div class="form-group" id="skillsGroup">
                <label>Professional Skills</label>
                <input type="text" id="skills" placeholder="e.g. Design, Coding">
                <div id="skillsError" class="error-text"></div>
            </div>
            <div class="form-group">
                <label>Age</label>
                <input type="number" id="age" placeholder="Min age varies by role">
                <div id="ageError" class="error-text"></div>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="password">
                <div id="passHint" class="hint"></div>
                <div id="passwordError" class="error-text"></div>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" id="confirmPassword">
                <div id="confirmPasswordError" class="error-text"></div>
            </div>
            <button type="submit" id="submitBtn" disabled>Register Now</button>
        </form>
    `;
    document.body.appendChild(container);

    const config = {
        Student: { age: 16, regex: /.{6,}/, hint: "Requirement: Min 6 characters" },
        Teacher: { age: 21, regex: /^(?=.*[A-Z]).{8,}$/, hint: "Requirement: Min 8 chars & 1 Uppercase" },
        Admin:   { age: 25, regex: /^(?=.*[A-Z])(?=.*[!@#$&*]).{10,}$/, hint: "Requirement: Min 10 chars, 1 Uppercase & 1 Symbol" }
    };

    const form = document.getElementById('regForm');
    const inputIds = ['name', 'email', 'age', 'password', 'confirmPassword', 'skills'];

    function validate(fieldId) {
        const input = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + 'Error');
        const role = document.getElementById('role').value;
        const val = input.value;
        let isValid = true;
        let msg = "";

        if (fieldId === 'name') {
            isValid = val.trim().length >= 3;
            msg = "Name must be at least 3 characters";
        } else if (fieldId === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
            msg = "Please enter a valid email address";
        } else if (fieldId === 'age') {
            isValid = val >= config[role].age;
            msg = `Minimum age for ${role} is ${config[role].age}`;
        } else if (fieldId === 'password') {
            isValid = config[role].regex.test(val);
            msg = "Password does not meet role security criteria";
        } else if (fieldId === 'confirmPassword') {
            isValid = val === document.getElementById('password').value && val !== "";
            msg = "Passwords do not match";
        } else if (fieldId === 'skills' && role !== 'Admin') {
            isValid = val.trim().length > 0;
            msg = "Please list your skills";
        }

        input.classList.toggle('invalid', !isValid);
        error.textContent = isValid ? "" : msg;
        
        const allFieldsValid = inputIds.every(id => {
            if (id === 'skills' && role === 'Admin') return true;
            const el = document.getElementById(id);
            return el.value !== "" && !el.classList.contains('invalid');
        });
        document.getElementById('submitBtn').disabled = !allFieldsValid;
    }

    form.addEventListener('input', (e) => {
        if (e.target.id === 'password') validate('confirmPassword');
        validate(e.target.id);
    });

    document.getElementById('role').addEventListener('change', (e) => {
        const role = e.target.value;
        document.getElementById('skillsGroup').classList.toggle('hidden', role === 'Admin');
        document.getElementById('passHint').textContent = config[role].hint;
        inputIds.forEach(validate);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Registration Successful!");
    });

    document.getElementById('role').dispatchEvent(new Event('change'));
})();