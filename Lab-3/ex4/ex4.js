(function() {
    const style = document.createElement('style');
    style.textContent = `
        #monitor-system { font-family: 'Courier New', monospace; max-width: 600px; margin: 20px auto; padding: 20px; background: #1e1e1e; color: #d4d4d4; border-radius: 8px; }
        .controls { margin-bottom: 15px; display: flex; gap: 10px; }
        #log-display { height: 300px; overflow-y: auto; background: #000; padding: 10px; border: 1px solid #333; font-size: 12px; }
        .log-entry { margin-bottom: 4px; border-bottom: 1px solid #222; padding-bottom: 2px; }
        .log-type { color: #569cd6; font-weight: bold; }
        .log-target { color: #ce9178; }
        .warning { color: #f44336; font-weight: bold; animation: blink 0.5s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .interaction-zone { background: #333; padding: 20px; margin-bottom: 15px; border-radius: 4px; text-align: center; }
        input { padding: 8px; width: 80%; margin-top: 10px; background: #444; color: #fff; border: 1px solid #555; }
        button { padding: 8px 15px; cursor: pointer; border: none; border-radius: 4px; font-weight: bold; }
        .btn-reset { background: #e74c3c; color: white; }
        .btn-export { background: #3498db; color: white; }
    `;
    document.head.appendChild(style);

    const activityLog = [];
    let clickCount = 0;
    const CLICK_THRESHOLD = 10; 

    const container = document.createElement('div');
    container.id = 'monitor-system';
    document.body.appendChild(container);

    container.innerHTML = `
        <h2>User Activity Monitor</h2>
        
        <div class="interaction-zone" id="parentZone">
            <strong>Interactive Zone (Bubbling/Capturing)</strong><br>
            <input type="text" id="userInput" placeholder="Type something here...">
            <button id="testBtn" style="display:block; margin: 10px auto; background:#2ecc71; color:white;">Click Me Fast</button>
        </div>

        <div id="warningBox" class="error-text" style="height:20px; margin-bottom:10px;"></div>

        <div class="controls">
            <button class="btn-reset" onclick="window.resetLog()">Reset Log</button>
            <button class="btn-export" onclick="window.exportLog()">Export as Text</button>
        </div>

        <div id="log-display"></div>
    `;

    const logDisplay = document.getElementById('log-display');
    const warningBox = document.getElementById('warningBox');

    function addLog(type, target, details = "") {
        const entry = {
            timestamp: new Date().toLocaleTimeString(),
            type: type,
            target: target,
            details: details
        };
        activityLog.push(entry);
        
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.innerHTML = `[${entry.timestamp}] <span class="log-type">${type.toUpperCase()}</span> on <span class="log-target">${target}</span> ${details}`;
        logDisplay.prepend(div);
    }

    document.addEventListener('click', (e) => {
        addLog('click', e.target.tagName, `ID: ${e.target.id || 'N/A'}`);
        
        clickCount++;
        if (clickCount > CLICK_THRESHOLD) {
            warningBox.innerHTML = `<span class="warning">⚠️ SUSPICIOUS ACTIVITY: EXCESSIVE CLICKING</span>`;
        }
        
        setTimeout(() => { clickCount = Math.max(0, clickCount - 1); if(clickCount <= CLICK_THRESHOLD) warningBox.innerHTML = ""; }, 3000);
    }, true); 

    document.addEventListener('keydown', (e) => {
        addLog('keypress', 'WINDOW', `Key: ${e.key}`);
    });

    document.addEventListener('focusin', (e) => {
        addLog('focus', e.target.tagName, `Target: ${e.target.id}`);
    });

    const parentZone = document.getElementById('parentZone');
    parentZone.addEventListener('click', () => {
        console.log("Bubbling: Parent Zone notified of click.");
    }, false); 

    window.resetLog = () => {
        activityLog.length = 0;
        logDisplay.innerHTML = "";
        warningBox.innerHTML = "";
        clickCount = 0;
        alert("Log Cleared");
    };

    window.exportLog = () => {
        const text = activityLog.map(l => `[${l.timestamp}] ${l.type} - ${l.target} (${l.details})`).join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.download = 'activity_log.txt';
        anchor.href = window.URL.createObjectURL(blob);
        anchor.click();
    };

})();