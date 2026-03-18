const student = {
  id: 101,
  name: "Priya",
  department: "CSE",
  marks: 92
};

const { id, name, department, marks } = student;

console.log(id, name, department, marks);

let grade = marks >= 90 ? "A" :
            marks >= 80 ? "B" :
            marks >= 70 ? "C" :
            marks >= 60 ? "D" : "F";

const updatedStudent = {
  ...student,
  grade
};

console.log(updatedStudent);