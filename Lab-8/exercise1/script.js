let studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
};

const totalMarks = mark1 + mark2 + mark3;
const averageMarks = calculateAverage(mark1, mark2, mark3);

console.log("═══════════════════════════════════════");
console.log(`      Student Report Card`);
console.log("═══════════════════════════════════════");
console.log(`Student Name    : ${studentName}`);
console.log(`Marks           : ${mark1} | ${mark2} | ${mark3}`);
console.log(`Total Marks     : ${totalMarks}`);
console.log(`Average Marks   : ${averageMarks.toFixed(2)}`);
console.log("═══════════════════════════════════════");