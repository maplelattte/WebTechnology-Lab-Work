class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
    this.maxSeats = 30;
    this.enrolled = 28;
  }

  displayCourse() {
    console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
  }

  checkEnrollment() {
    return new Promise((resolve, reject) => {
      if (this.enrolled < this.maxSeats) {
        this.enrolled++;
        resolve("Enrollment Successful");
      } else {
        reject("Course Full");
      }
    });
  }
}

const course1 = new Course("Web Technologies", "Dr. Kumar");

course1.displayCourse();

course1.checkEnrollment()
  .then(message => console.log(message))
  .catch(error => console.log(error));