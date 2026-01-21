(function() {
    const style = document.createElement('style');
    style.textContent = `
        #form-wizard { font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 40px auto; padding: 30px; background: #fff; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .progress-container { margin-bottom: 30px; background: #eee; border-radius: 10px; height: 10px; overflow: hidden; }
        #progress-bar { height: 100%; background: #3498db; width: 25%; transition: width 0.4s ease; }
        .stage { display: none; }
        .stage.active { display: block; }
        h3 { color: #2c3e50; margin-bottom: 20px; border-bottom: 2px solid #3498db; display: inline-block; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 14px; }
        input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; }
        .invalid { border-color: #e74c3c; background: #fff5f5; }
        .error-txt { color: #e74c3c; font-size: 12px; margin-top: 5px; height: 14px; }
        .nav-btns { display: flex; justify-content: space-between; margin-top: 25px; }
        button { padding: 10px 25px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold; transition: 0.3s; }
        .btn-next { background: #3498db; color: white; }
        .btn-prev { background: #95a5a6; color: white; }
        .btn-submit { background: #2ecc71; color: white; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
    `;
    document.head.appendChild(style);

    const formData = {
        step1: { name: "", email: "" },
        step2: { age: "", phone: "" },
        step3: { address: "", city: "" },
        step4: { username: "", password: "" }
    };

    let currentStep = 1;

    const container = document.createElement('div');
    container.id = 'form-wizard';
    document.body.appendChild(container);

    function render() {
        container.innerHTML = `
            <div class="progress-container"><div id="progress-bar"></div></div>
            <form id="multiStepForm" novalidate>
                <div class="stage ${currentStep === 1 ? 'active' : ''}" id="stage1">
                    <h3>Personal Info</h3>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="name" value="${formData.step1.name}">
                        <div id="nameErr" class="error-txt"></div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" value="${formData.step1.email}">
                        <div id="emailErr" class="error-txt"></div>
                    </div>
                </div>

                <div class="stage ${currentStep === 2 ? 'active' : ''}" id="stage2">
                    <h3>Contact Details</h3>
                    <div class="form-group">
                        <label>Age (18-99)</label>
                        <input type="number" id="age" value="${formData.step2.age}">
                        <div id="ageErr" class="error-txt"></div>
                    </div>
                    <div class="form-group">
                        <label>Phone (10 digits)</label>
                        <input type="text" id="phone" value="${formData.step2.phone}">
                        <div id="phoneErr" class="error-txt"></div>
                    </div>
                </div>

                <div class="stage ${currentStep === 3 ? 'active' : ''}" id="stage3">
                    <h3>Location</h3>
                    <div class="form-group">
                        <label>Street Address</label>
                        <input type="text" id="address" value="${formData.step3.address}">
                        <div id="addressErr" class="error-txt"></div>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="city" value="${formData.step3.city}">
                        <div id="cityErr" class="error-txt"></div>
                    </div>
                </div>

                <div class="stage ${currentStep === 4 ? 'active' : ''}" id="stage4">
                    <h3>Security</h3>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="username" value="${formData.step4.username}">
                        <div id="usernameErr" class="error-txt"></div>
                    </div>
                    <div class="form-group">
                        <label>Password (Min 6 chars)</label>
                        <input type="password" id="password" value="${formData.step4.password}">
                        <div id="passwordErr" class="error-txt"></div>
                    </div>
                </div>

                <div class="nav-btns">
                    ${currentStep > 1 ? '<button type="button" class="btn-prev" onclick="window.moveStep(-1)">Previous</button>' : '<div></div>'}
                    ${currentStep < 4 
                        ? '<button type="button" class="btn-next" onclick="window.moveStep(1)">Next Step</button>' 
                        : '<button type="submit" class="btn-submit">Complete Registration</button>'}
                </div>
            </form>
        `;
        document.getElementById('progress-bar').style.width = (currentStep / 4) * 100 + "%";
    }

    function validateCurrentStep() {
        let isValid = true;
        const setError = (id, msg) => {
            const el = document.getElementById(id);
            const err = document.getElementById(id + 'Err');
            if (msg) {
                el.classList.add('invalid');
                err.textContent = msg;
                isValid = false;
            } else {
                el.classList.remove('invalid');
                err.textContent = "";
            }
        };

        if (currentStep === 1) {
            const n = document.getElementById('name').value;
            const e = document.getElementById('email').value;
            setError('name', n.length < 3 ? "Name too short" : "");
            setError('email', !e.includes('@') ? "Invalid email" : "");
            if (isValid) { formData.step1.name = n; formData.step1.email = e; }
        } else if (currentStep === 2) {
            const a = document.getElementById('age').value;
            const p = document.getElementById('phone').value;
            setError('age', (a < 18 || a > 99) ? "Age must be 18-99" : "");
            setError('phone', p.length !== 10 ? "Phone must be 10 digits" : "");
            if (isValid) { formData.step2.age = a; formData.step2.phone = p; }
        } else if (currentStep === 3) {
            const ad = document.getElementById('address').value;
            const c = document.getElementById('city').value;
            setError('address', ad.length < 5 ? "Enter full address" : "");
            setError('city', c.length < 2 ? "Enter city" : "");
            if (isValid) { formData.step3.address = ad; formData.step3.city = c; }
        } else if (currentStep === 4) {
            const u = document.getElementById('username').value;
            const pw = document.getElementById('password').value;
            setError('username', u.length < 4 ? "Username too short" : "");
            setError('password', pw.length < 6 ? "Password min 6 chars" : "");
            if (isValid) { formData.step4.username = u; formData.step4.password = pw; }
        }
        return isValid;
    }

    window.moveStep = (direction) => {
        if (direction === 1 && !validateCurrentStep()) return;
        currentStep += direction;
        render();
    };

    document.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            container.innerHTML = `
                <div style="text-align:center">
                    <h2 style="color:#2ecc71">Registration Complete!</h2>
                    <p>User <strong>${formData.step4.username}</strong> has been stored in memory.</p>
                    <button onclick="location.reload()">Start Over</button>
                </div>
            `;
            console.log("Final Form Data Stored:", formData);
        }
    });

    render();
})();