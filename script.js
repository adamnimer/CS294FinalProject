let count = 0;
google.charts.load("current", {packages:["corechart"]});

function search() {

  //condition makes sure it is not first search (nothing to clear if there is no previous search)
  if (count > 0){
    const removeDiv = document.querySelectorAll('.box');
    const removeTitle = document.querySelectorAll('.title')
    // const removeCurrClass = document.querySelectorAll('.currClass')
    
    removeDiv.forEach(box => {
      box.remove();
    });

    removeTitle.forEach(box => {
      box.remove();
    });
    
    // removeCurrClass.forEach(box => {
    //   box.remove();
    // });
    
  }
  count++; // searches counter

  
  let subj = document.getElementById("subject").value; 
  let courseNum = document.getElementById("course_num").value;
  let semester = document.getElementById("semester").value;
  let theSemester;
  // let currentClass = document.createElement("div");
  // currentClass.setAttribute("class", "currClass");
  

  //Get semester name to output for title
  if(semester[0].toUpperCase() == "F") 
    theSemester = "Fall";
  else if(semester[0].toUpperCase() == "S" && semester[1].toUpperCase() == "P")
    theSemester = "Spring";
  else{theSemester = "Summer";}

  //Get year for title
  let theYear = "20" + semester[2] + semester[3];

  //Connects correct link for API call that returns data that user wants.
  let link = 'https://Test-for-GD.adamnimer1.repl.co/api/allGrades?' + 'semester=' + 
  semester.toUpperCase() + "&subject=" + subj.toUpperCase() + "&class_num=" + courseNum;
  let idCounter = 0;

   fetch(link)
     .then((response) => {
       return response.json()
           })
     .then ((data) => {
       //Creates div element for title and sets it to its respective class title.
       let title = document.createElement("div");
       title.setAttribute("class", "mdc-typography--headline6");
       document.body.append(title);
       
       if(courseNum != "294"){ 
         title.innerHTML += data.response[0].subject + 
         data.response[0].class_num + ": " + data.response[0].class_title 
         + " Courses in " + theSemester + " " + theYear;  
       }
       else { //Handles edge case for 294 courses (since they have different titles)
         title.innerHTML += data.response[0].subject + 
         data.response[0].class_num + ": " + "Special Topics" 
         + " Courses in " + theSemester + " " + theYear;  
       }
       

        //Goes through each variant of the course for that semester and will output
        //the teacher in its own div.
        data.response.forEach((course) => {
          
          let oneInstance = document.createElement("div");
          document.body.append(oneInstance);
          oneInstance.setAttribute("id",idCounter);
          oneInstance.setAttribute("class", "mdc-deprecated-list-item");
          if(idCounter % 3 +1 == 0){
            oneInstance += '<br/>'
          }

          //If a div is clicked on, it will call the drawChart function which will output
          //the data for that specific course
          oneInstance.addEventListener("click", (event) => {
            event.preventDefault();
            let idNum = event.target.getAttribute("id");
            console.log(idNum);
            
            // currentClass.innerHTML = '<br/>' + data.response[idNum].class_title + ": " + "A: " + data.response[idNum].A + " B: " + data.response[idNum].B + " C: " + data.response[idNum].C + " D: " + data.response[idNum].D + " F: " + data.response[idNum].F + " Instructor: " + data.response[idNum].instructor; 
            //   document.body.append(currentClass);

            google.charts.load("current", {packages:["corechart"]});
            
            drawChart(course);
          })
          //Sets text for each div.
          oneInstance.innerHTML += "<br />" + "Instructor: " + course.instructor;
          idCounter+=1; //increments counter so next div has unique id.
          console.log(data)
        })
    })   
}



function drawChart(course) {
    var data = google.visualization.arrayToDataTable([
      ['Grades', 'Number'],
      ['A',     course.A],
      ['B',      course.B],
      ['C',  course.C],
      ['D', course.D],
      ['F',  course.F]
    ]);

    var options = {
      title: course.class_title + " with " + course.instructor,
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}   



function heart(){
  var dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'))
  dialog.open()
}


function navigation(){
  var dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'))
  dialog.open()
}


function weather(){
  console.log("weather bitches")
  var gradesScreen = document.getElementById("grades");
  gradesScreen.innerHTML = '';


  



  
}




         // showD.innerHTML += data.response[idNum].class_title + ": " + "A: " + data.response[idNum].A + " B: " + data.response[idNum].B + " C: " + data.response[idNum].C + " D: " + data.response[idNum].D + " F: " + data.response[idNum].F + " Instructor: " + data.response[idNum].instructor; 