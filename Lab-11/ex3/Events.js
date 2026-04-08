// Exercise 3: Node.js Event-Driven Programming with EventEmitter
// Importing the built-in 'events' module using require()
const EventEmitter = require('events');

// ─────────────────────────────────────────────
// SETUP — Create an EventEmitter instance
// ─────────────────────────────────────────────
const emitter = new EventEmitter();

// ─────────────────────────────────────────────
// STEP 1: Register listeners using on()
// Single event → multiple listeners (multiple subscriptions)
// ─────────────────────────────────────────────

// Listener 1 for 'userLogin' event
emitter.on('userLogin', (user) => {
    console.log(`[LISTENER 1] User logged in: ${user.name} (Role: ${user.role})`);
});

// Listener 2 for 'userLogin' event — same event, second subscriber
emitter.on('userLogin', (user) => {
    console.log(`[LISTENER 2] Sending welcome email to: ${user.email}`);
});

// Listener 3 for 'userLogin' event — third subscriber
emitter.on('userLogin', (user) => {
    console.log(`[LISTENER 3] Logging login activity for audit: ${user.name} at ${new Date().toISOString()}`);
});

// ─────────────────────────────────────────────
// Listeners for 'dataReceived' event
// ─────────────────────────────────────────────
emitter.on('dataReceived', (payload) => {
    console.log(`[DATA] Received ${payload.type} data — Size: ${payload.size} bytes`);
});

emitter.on('dataReceived', (payload) => {
    console.log(`[DATA] Processing payload: "${payload.content}"`);
});

// ─────────────────────────────────────────────
// Listener for 'error' event (built-in EventEmitter error handling)
// ─────────────────────────────────────────────
emitter.on('error', (err) => {
    console.error(`[ERROR] Caught event error: ${err.message}`);
});

// ─────────────────────────────────────────────
// Listener for 'taskComplete' event
// ─────────────────────────────────────────────
emitter.on('taskComplete', (task) => {
    console.log(`[TASK] "${task.name}" completed in ${task.duration}ms — Status: ${task.status}`);
});

// ─────────────────────────────────────────────
// STEP 2: Emit events using emit() with data arguments
// ─────────────────────────────────────────────
console.log('========================================');
console.log('   Node.js Event-Driven Programming');
console.log('========================================\n');

// --- Event 1: userLogin (triggers 3 listeners) ---
console.log('>> Emitting "userLogin" event...');
emitter.emit('userLogin', {
    name: 'Aviral',
    email: 'aviral@example.com',
    role: 'Admin'
});

console.log();

// --- Event 2: dataReceived (triggers 2 listeners) ---
console.log('>> Emitting "dataReceived" event...');
emitter.emit('dataReceived', {
    type: 'JSON',
    size: 256,
    content: '{ "status": "ok", "value": 42 }'
});

console.log();

// --- Event 3: taskComplete ---
console.log('>> Emitting "taskComplete" event...');
emitter.emit('taskComplete', {
    name: 'Database Backup',
    duration: 340,
    status: 'SUCCESS'
});

console.log();

// --- Event 4: error event ---
console.log('>> Emitting "error" event...');
emitter.emit('error', new Error('Disk write failed — no space left'));

console.log();

// ─────────────────────────────────────────────
// STEP 3: Demonstrate async behavior
// Events fired after async delays via setTimeout
// ─────────────────────────────────────────────
console.log('>> Scheduling async events with setTimeout...\n');

setTimeout(() => {
    console.log('>> [ASYNC] Emitting delayed "userLogin" after 1000ms...');
    emitter.emit('userLogin', {
        name: 'GuestUser',
        email: 'guest@example.com',
        role: 'Viewer'
    });
}, 1000);

setTimeout(() => {
    console.log('\n>> [ASYNC] Emitting delayed "taskComplete" after 2000ms...');
    emitter.emit('taskComplete', {
        name: 'Report Generation',
        duration: 1850,
        status: 'SUCCESS'
    });
    console.log('\nAll events demonstrated successfully!');
}, 2000);

console.log('(Main thread continues — async events pending...)\n');
