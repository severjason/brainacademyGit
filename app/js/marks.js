"use strict";
(function () {
    
    let students = {};

    let studentsNames = "";

    let subjects = ["Math", "Physics", "Literature"];
    let subjectsLength = subjects.length;


    let generateStudentsMarks = function (names) {

        let marksDiv = document.getElementById("marks");

        studentsNames = names.split(',');

        for (let i = 0, studentsQuantity = studentsNames.length; i < studentsQuantity; i++) {

            let studentName = studentsNames[i].trim();

            if (studentName) {

                marksDiv.appendChild(studentMarksTemplate(studentName));

                let objectMarks = {};
                for (let i = 0; i < subjectsLength; i++) {
                    objectMarks[subjects[i]] = 1;
                }
                students[studentName] = objectMarks;
            }
        }
        let button = document.createElement('button');
        button.id = "students_marks_submit";
        button.className = "btn btn-default";
        button.innerHTML = "OK";

        marksDiv.appendChild(button);
    };

    let generateMarksTable = function () {
        let studentsMarksDiv = document.getElementById("students_marks");

        let table = document.createElement("table");

        let firstTr = document.createElement('tr');

        firstTr.innerHTML ="<td rowspan='2'>Student name</td>" + "<td colspan='" + subjectsLength + "'>Marks</td>" + "<td rowspan='2'>Total</td>" + "<td rowspan='2'>Average</td>";

        table.appendChild(firstTr);

        let secondTr = document.createElement("tr");

        for (let i = 0; i < subjectsLength; i++) {
            let td = document.createElement('td');
            td.innerHTML = subjects[i];
            secondTr.appendChild(td);
        }
        table.appendChild(secondTr);


        for (let student in students) {

            if (students.hasOwnProperty(student)) {
                let newTr = document.createElement("tr");
                let total = 0;
                let td = document.createElement("td");

                td.innerHTML = student;
                newTr.appendChild(td);


                for(let i = 0; i < subjectsLength; i++) {

                    let td = document.createElement("td");
                    total += +students[student][subjects[i]];
                    td.innerHTML = students[student][subjects[i]];
                    newTr.appendChild(td);
                }

                let tdTotal = document.createElement("td");
                tdTotal.innerHTML = total;
                newTr.appendChild(tdTotal);

                let average = total / subjectsLength;
                let tdAverage = document.createElement("td");
                tdAverage.innerHTML = average.toFixed(2);
                tdAverage.className = ( average <= 3) ? "failed" : "";
                newTr.appendChild(tdAverage);

                table.appendChild(newTr);
            }
        }

        studentsMarksDiv.appendChild(table);
    };
    
    let studentMarksTemplate = function (studentName) {
        
        let mainDiv = document.createElement('div');
        mainDiv.className = 'form-inline student_name_form';
        
        let studentNameDiv = document.createElement('div');
        studentNameDiv.className = 'student_name';
        studentNameDiv.innerHTML = studentName;

        let label = document.createElement('label');


        let createMarksForOneSubject = function (subject, name) {

            let spanSubject = document.createElement('span');
            spanSubject.innerHTML = subject;

            let marksSelect = document.createElement("select");
            marksSelect.id = name + "_" + subject;
            marksSelect.className = "form-control";
            marksSelect.innerHTML = "<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>"

            spanSubject.appendChild(marksSelect);

            return spanSubject;
        };

        for (let i = 0; i < subjectsLength; i++) {
            label.appendChild(createMarksForOneSubject(subjects[i], studentName))
        }

        mainDiv.appendChild(studentNameDiv);

        mainDiv.appendChild(label);

        return mainDiv;
        
    };

    document.querySelector("body").addEventListener("click", function (event) {

        if (event.target.id === "students_names_button") {

            let studentNamesInput = document.getElementById("students_names_input").value;
            
            if (studentNamesInput) {

                generateStudentsMarks(studentNamesInput);

                document.getElementById("students_names").style.display = 'none';

            }
        }

        if (event.target.id === "students_marks_submit") {

            for (let student in students) {
                if(students.hasOwnProperty(student)) {

                    for (let i = 0; i < subjectsLength; i++) {
                        //console.log(students[student][subjects[i]]);
                        students[student][subjects[i]] = document.getElementById(student + "_" + subjects[i]).value;
                    }
                }
            }
            
            document.getElementById("marks").style.display = 'none';

            generateMarksTable();
        }

    });



}());

