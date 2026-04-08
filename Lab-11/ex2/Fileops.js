// Exercise 2: Node.js File System Operations
// Importing the built-in 'fs' module using require()
const fs = require('fs');

const FILE_NAME = 'sample.txt';

// ─────────────────────────────────────────────
// STEP 1: CREATE — Write a new file
// ─────────────────────────────────────────────
function createFile() {
    const content = 'Hello, Node.js!\nThis file was created using fs.writeFile().';

    fs.writeFile(FILE_NAME, content, (err) => {
        // Error-first callback: check err before proceeding
        if (err) {
            console.error('[CREATE] Error creating file:', err.message);
            return;
        }
        console.log('[CREATE] File created successfully:', FILE_NAME);

        // Chain next operation inside the callback to ensure proper execution flow
        readFile();
    });
}

// ─────────────────────────────────────────────
// STEP 2: READ — Read the file contents
// ─────────────────────────────────────────────
function readFile() {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err) {
            console.error('[READ] Error reading file:', err.message);
            return;
        }
        console.log('[READ] File contents:');
        console.log('----------------------------');
        console.log(data);
        console.log('----------------------------');

        appendFile();
    });
}

// ─────────────────────────────────────────────
// STEP 3: APPEND — Add data to existing file
// ─────────────────────────────────────────────
function appendFile() {
    const extraContent = '\nAppended line: Node.js fs.appendFile() works!';

    fs.appendFile(FILE_NAME, extraContent, (err) => {
        if (err) {
            console.error('[APPEND] Error appending to file:', err.message);
            return;
        }
        console.log('[APPEND] Data appended successfully to:', FILE_NAME);

        readAfterAppend();
    });
}

// ─────────────────────────────────────────────
// STEP 4: READ AGAIN — Verify appended content
// ─────────────────────────────────────────────
function readAfterAppend() {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err) {
            console.error('[READ AFTER APPEND] Error:', err.message);
            return;
        }
        console.log('[READ AFTER APPEND] Updated file contents:');
        console.log('----------------------------');
        console.log(data);
        console.log('----------------------------');

        deleteFile();
    });
}

// ─────────────────────────────────────────────
// STEP 5: DELETE — Remove the file
// ─────────────────────────────────────────────
function deleteFile() {
    fs.unlink(FILE_NAME, (err) => {
        if (err) {
            console.error('[DELETE] Error deleting file:', err.message);
            return;
        }
        console.log('[DELETE] File deleted successfully:', FILE_NAME);

        verifyDeletion();
    });
}

// ─────────────────────────────────────────────
// STEP 6: VERIFY — Confirm file no longer exists
// ─────────────────────────────────────────────
function verifyDeletion() {
    fs.readFile(FILE_NAME, 'utf8', (err) => {
        if (err) {
            // Expected error — file should not exist anymore
            console.log('[VERIFY] Confirmed: File no longer exists. (Error code:', err.code + ')');
        } else {
            console.log('[VERIFY] Warning: File still exists unexpectedly.');
        }
        console.log('\nAll file operations completed successfully!');
    });
}

// ─────────────────────────────────────────────
// START — Entry point
// ─────────────────────────────────────────────
console.log('========================================');
console.log('   Node.js File System Operations');
console.log('========================================\n');

createFile(); // Kicks off the chained async sequence
