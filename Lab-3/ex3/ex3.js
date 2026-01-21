(function() {
    const style = document.createElement('style');
    style.textContent = `
        #survey-builder { font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 30px auto; padding: 25px; background: #fff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .q-block { margin-bottom: 25px; padding: 15px; border-left: 4px solid #3498db; background: #fcfcfc; }
        .q-label { font-weight: bold; display: block; margin-bottom: 10px; color: #2c3e50; }
        .opt-row { display: block; margin-bottom: 8px; font-size: 14px; cursor: pointer; }
        input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
        .error-msg { color: #e74c3c; font-size: 12px; margin-top: 8px; font-weight: 500; height: 15px; }
        .invalid { border-color: #e74c3c !important; background: #fff5f5; }
        #submitSurvey { width: 100%; padding: 12px; background: #3498db; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
        #submitSurvey:disabled { background: #dcdde1; cursor: not-allowed; }
        .success-page { text-align: center; color: #27ae60; }
    `;
    document.head.appendChild(style);

    const surveyData = [
        { 
            id: "q1", 
            label: "Full Name (Mandatory)", 
            type: "text", 
            required: true, 
            limit: 20 
        },
        { 
            id: "q2", 
            label: "Primary Programming Language", 
            type: "radio", 
            options: ["JavaScript", "Python", "Java", "C++"],
            required: true
        },
        { 
            id: "q3", 
            label: "Interests (Select at least 2)", 
            type: "checkbox", 
            options: ["Web Dev", "Data Science", "AI", "Cybersecurity"],
            minSelect: 2
        }
    ];

    const container = document.createElement('div');
    container.id = 'survey-builder';
    document.body.appendChild(container);

    function renderForm() {
        container.innerHTML = `<h2 style="margin-top:0">Course Survey</h2><form id="surveyForm"></form>`;
        const form = document.getElementById('surveyForm');

        surveyData.forEach(q => {
            const block = document.createElement('div');
            block.className = 'q-block';
            block.innerHTML = `<label class="q-label">${q.label}</label>`;

            if (q.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = q.id;
                input.placeholder = `Max ${q.limit} chars`;
                block.appendChild(input);
            } else if (q.type === 'radio' || q.type === 'checkbox') {
                q.options.forEach(opt => {
                    const wrapper = document.createElement('label');
                    wrapper.className = 'opt-row';
                    wrapper.innerHTML = `
                        <input type="${q.type}" name="${q.id}" value="${opt}"> ${opt}
                    `;
                    block.appendChild(wrapper);
                });
            }

            const err = document.createElement('div');
            err.id = `${q.id}-err`;
            err.className = 'error-msg';
            block.appendChild(err);
            form.appendChild(block);
        });

        const btn = document.createElement('button');
        btn.id = 'submitSurvey';
        btn.type = 'submit';
        btn.textContent = 'Submit Survey';
        btn.disabled = true;
        form.appendChild(btn);
    }

    function validate() {
        let allPass = true;

        surveyData.forEach(q => {
            const errDiv = document.getElementById(`${q.id}-err`);
            let isValid = true;
            let msg = "";

            if (q.type === 'text') {
                const val = document.getElementById(q.id).value.trim();
                if (q.required && val === "") {
                    isValid = false; msg = "This field is required";
                } else if (val.length > q.limit) {
                    isValid = false; msg = `Too long (Max ${q.limit} chars)`;
                }
                document.getElementById(q.id).classList.toggle('invalid', !isValid);
            } 
            else if (q.type === 'radio') {
                const checked = document.querySelector(`input[name="${q.id}"]:checked`);
                if (q.required && !checked) {
                    isValid = false; msg = "Please select an option";
                }
            } 
            else if (q.type === 'checkbox') {
                const count = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
                if (count < q.minSelect) {
                    isValid = false; msg = `Select at least ${q.minSelect} options`;
                }
            }

            errDiv.textContent = msg;
            if (!isValid) allPass = false;
        });

        document.getElementById('submitSurvey').disabled = !allPass;
    }

    renderForm();

    const form = document.getElementById('surveyForm');
    form.addEventListener('input', validate);
    form.addEventListener('change', validate);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        container.innerHTML = `
            <div class="success-page">
                <h3>Survey Submitted Successfully!</h3>
                <p>Thank you for your responses!</p>
                <button onclick="location.reload()" style="background:none; border:1px solid #ccc; cursor:pointer; padding:5px 10px; border-radius:4px">Start New</button>
            </div>
        `;
    });

})();