#! usr/bin/env node
import inquirer from "inquirer";
class Student {
  id: number;
  name: string;
  coursesEnrolled: string[];
  feeAmount: number;

  constructor(
    id: number,
    name: string,
    coursesEnrolled: string[],
    feeAmount: number
  ) {
    this.name = name;
    this.id = id;
    this.coursesEnrolled = coursesEnrolled;
    this.feeAmount = feeAmount;
  }
}
let basedID = 10000;
let studentID: any = "";
let students: Student[] = [];

while (true) {
  let action = await inquirer.prompt({
    type: "list",
    name: "ans",
    message: "please select an option:\n",
    choices: ["Enroll a Student", "Show Student Status", "Exit"],
  });

  if (action.ans === "Enroll a Student") {
    let studentName = await inquirer.prompt({
      type: "input",
      name: "Ans",
      message: "Please Enter your Name...",
    });

    let trimName = studentName.Ans.trim().toLowerCase();
    let nameCheckS = students.map((obj) => obj.name);

    if (nameCheckS.includes(trimName) == false) {
      if (trimName !== "") {
        basedID++;
        studentID = "STID" + basedID;

        console.log(`\n\t---Your Account has been Created Successfully---\n`);
        console.log(`\t\t\tWellcome, ${trimName}!\n`);

        let course = await inquirer.prompt({
          type: "list",
          name: "answr",
          message: "Please Select a Course...",
          choices: [
            "Web Development",
            "Machine Learning",
            "Artificial Inteligence",
          ],
        });
        let courseFee = 0;
        switch (course.answr) {
          case "Web Development":
            courseFee = 5000;
            break;
          case "Machine Learning":
            courseFee = 8000;
            break;
          case "Artificial Inteligence":
            courseFee = 10000;
            break;
        }
        let confrm = await inquirer.prompt({
          type: "confirm",
          name: "YorN",
          message: "Do you want to Enroll this Course..?",
        });
        if (confrm.YorN === true) {
          let student = new Student(
            studentID,
            trimName,
            [course.answr],
            courseFee
          );
          students.push(student);
          console.log("You have Enrolled in this Course");
        }
      } else {
        console.log("Invalid Name");
      }
    } else {
      console.log("This Name is already Exists try another Name");
    }
  } else if (action.ans === "Show Student Status") {
    if (students.length !== 0) {
      let againCheckName = students.map((S) => S.name);

      let status = await inquirer.prompt({
        name: "statusCheck",
        message: "Please Select Name",
        type: "list",
        choices: againCheckName,
      });
      let foundStudent = students.find(
        (student) => student.name === status.statusCheck
      );
      console.log("'Stuent Information'");
      console.log(foundStudent);
      console.log("\n");
    } else {
      console.log("Record is Empty");
    }
  } else if (action.ans === "Exit") {
    console.log("Exiting...");
    process.exit();
  }
}
