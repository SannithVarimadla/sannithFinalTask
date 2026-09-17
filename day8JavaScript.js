

//============================================day 8 Tasks===============================================

//date and time
var date=new Date();
document.querySelector(".dateTime .date").textContent="Today : "+ date.toLocaleDateString();
document.querySelector(".dateTime .time").textContent="Time : "+ date.toLocaleTimeString();


//API
 
        let api = fetch("https://dummyjson.com/users"); //fetch the API using fetch method.

        var JsonFormat = api.then((data)=>{
            return data.json();                  //convert to json format
        });

        api.catch((error) => {
                console.log("Error occurred:", error);   //handle if any error occures
            });


    api.finally(() => {
        console.log("Fetch operation completed");
    });


console.log(JsonFormat);

JsonFormat.then((details)=>{
    console.log(details);

    console.log(details.users[0].firstName);    //users array
    console.log(details.users[0].lastName);
    console.log(details.users[0].age);
    console.log(details.users[0].email);
    console.log(details.users[0].phone);
    console.log(details.users[0].company.name);
    console.log(details.users[2].company.department);

});

function searchEmployees() 
{

            var inputEmployeeName=null;  //first it will be no value but in future there will be assigned
            JsonFormat.then((details)=>
                {
                        let employeeNam = document.querySelector(".searchEmployees form");  //get the information from form
                            employeeNam.addEventListener("submit" , (event)=>
                                {              //add eventlistener ,
                                            event.preventDefault();                                    //stopes from refreshing the page
                                        var eName = document.getElementsByTagName("input"); 
                                        inputEmployeeName= (eName[0].value);                       // .value to get value of that particular data
                                        totalEmployeesCards(inputEmployeeName);  //call the method ,that method will search for the employee card of that entered name.
                                });
                });
}
searchEmployees();


function addSalaries(){
    //add salaries randomly
    JsonFormat.then((details) => {
    details.users.forEach((employee) => {
       employee.salary = Math.floor(Math.random() * 50000) + 30000;
    });
});
}
addSalaries();

//sorting

    var byName=document.querySelector("[name='byName']").value;
    var byAge=document.querySelector("[name='byAge']").value;
    var bySalary = document.querySelector("[name='bySalary']").value;

    console.log(byName);
var sortButtons = document.querySelectorAll(".sorting input[type='submit']");

sortButtons.forEach((submit) => {
    submit.addEventListener("click", (event) => {
        var type = event.target.value;
        console.log(type);
        sortEmployees(type);
    });
});

function sortEmployees(type) {      //sorts according to entered parameter

    JsonFormat.then((details) => {

        if (type == "Sort By Name") {

            details.users.sort((a, b) => {
                return a.firstName.localeCompare(b.firstName);
            });
        }
        else if (type == "Sort By Age") {
            details.users.sort((a, b) => {
                return a.age - b.age;
            });
        }
        else if (type == "Sort By Salary") {
            details.users.sort((a, b) => {
                return a.salary - b.salary;
            });
        }
        totalEmployeesCards("ALL");
    });
}

    //create 30 cards using grid , createElement linke --div ,inside div
    //print cards according to entered parameters

function totalEmployeesCards(inputEmployeeNam) 
{
    var employeeCard = document.querySelector(".employeeCard");
    employeeCard.innerHTML = "";
    JsonFormat.then((details) => 
    {

        for (let i = 0; i < details.users.length; i++)
         {
            // ALL employees
            if (inputEmployeeNam == "All") 
            {
                createEmployeeCard(details.users[i]);                     
                                         details.users.forEach((currentElement, indexNum)=>{
                                                console.log("Total Employees : ",details.users.length);
                                                document.querySelector(".totalEmployees > h1").textContent="Total Employees : "+ details.users.length;
                                         });
            }
            // Search employee by first name ,entered parameter
            else if (
                inputEmployeeNam.toLowerCase() ==
                details.users[i].firstName.toLowerCase()
            ){
                createEmployeeCard(details.users[i]);
            } 
            else if (inputEmployeeNam == "IT" && details.users[i].company.department == "Engineering") 
                {
                 createEmployeeCard(details.users[i]);
                                        //--count n of IT employees ,only Engineering department
                                      var itLeng=  details.users.filter((currentElement , indexNum )=>{
                                            var ItLength=currentElement.company.department=="Engineering";
                                            return ItLength;
                                        });
                                        console.log(itLeng.length);
                                        document.querySelector(".totalEmploy h3").textContent="Total IT Employees :"+(itLeng.length);
                 }

        else if (
            inputEmployeeNam == "HR" &&
            details.users[i].company.department == "Human Resources"
                )
                {
                     createEmployeeCard(details.users[i]);
                    //---count only of HR employees
                   var HRleng= details.users.filter((currentElement , indexNum)=>{
                                var ITLen=currentElement.company.department=="Human Resources";
                                return ITLen;
                    });
                    document.querySelector(".totalEmploy h3").textContent="Total HR Employees :"+ HRleng.length;
                 }
        else if (
                    inputEmployeeNam == "Support" &&
                    details.users[i].company.department == "Support"
                ) 
                {
                     createEmployeeCard(details.users[i]);

                    var SupportEmployees=details.users.filter((currentElement, indexNum)=>{
                        var supportLen = currentElement.company.department=="Support";
                        return supportLen;
                    });
                    document.querySelector(".totalEmploy h3").textContent="Total Support Employees :"+ SupportEmployees.length;
                 }
        else if (
                    inputEmployeeNam == "Marketing" &&
                    details.users[i].company.department == "Marketing"
               ) 
               {
                 createEmployeeCard(details.users[i]);


                         var SupportEmployees=details.users.filter((currentElement, indexNum)=>{
                        var supportLen = currentElement.company.department=="Marketing";
                        return supportLen;
                    });
                    document.querySelector(".totalEmploy h3").textContent="Total Marketing Employees :"+ SupportEmployees.length;
        }
    }
    });

    function createEmployeeCard(currentElement) 
    {

        let employee = document.createElement("div");
        let employeeImage = document.createElement("img");

        employeeImage.className = "employeeImage";
        employeeImage.setAttribute("src", currentElement.image);   //setAttribute is like, adds html attributes ,linke src , href , alt
        employee.className = "employee";

        var empNAME = document.createElement("h4");

        empNAME.textContent ="Name : " + currentElement.firstName + " " + currentElement.lastName;
        empNAME.className = "empNAME";
        var empAGE = document.createElement("h4");

        empAGE.textContent = "AGE: " + currentElement.age;
        empAGE.className = "empAGE";

        var empEmail = document.createElement("h4");
        empEmail.textContent =currentElement.email;
        empEmail.className = "empEMAIL";
        var empDepart = document.createElement("h4");
        empDepart.textContent ="Department : " +currentElement.company.department;
        empDepart.className = "empDEPART";

        var empPhone = document.createElement("h4");
        empPhone.textContent ="Phone : " +currentElement.phone;
        empPhone.className = "empPHONE";

                // delete  button to remove the employees==============================
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.style.color="red";
        deleteButton.className = "deleteButton";

                            deleteButton.addEventListener("click", () => 
                                {
                                    JsonFormat.then((details) => {
                                            details.users = details.users.filter((emp) => {
                                                return emp.id != currentElement.id;
                                            });

                                            employee.remove();          //.remove()  used to remove the elemnts

                                    document.querySelector(".totalEmploy h3").textContent ="Total Employees : " + details.users.length;

                                    //================ ADDED =================
                                    //keep the selected department count after deleting
                                    if(currentDepartment == "IT")
                                    {
                                        var ITEmployees = details.users.filter((emp) => {
                                            return emp.company.department == "Engineering";
                                        });

                                        document.querySelector(".totalEmploy h3").textContent =
                                            "Total IT Employees : " + ITEmployees.length;
                                    }
                                    else if(currentDepartment == "HR")
                                    {
                                        var HREmployees = details.users.filter((emp) => {
                                            return emp.company.department == "Human Resources";
                                        });

                                        document.querySelector(".totalEmploy h3").textContent =
                                            "Total HR Employees : " + HREmployees.length;
                                    }
                                    else if(currentDepartment == "Support")
                                    {
                                        var SupportEmployees = details.users.filter((emp) => {
                                            return emp.company.department == "Support";
                                        });

                                        document.querySelector(".totalEmploy h3").textContent =
                                            "Total Support Employees : " + SupportEmployees.length;
                                    }
                                    else if(currentDepartment == "Marketing")
                                    {
                                        var MarketingEmployees = details.users.filter((emp) => {
                                            return emp.company.department == "Marketing";
                                        });

                                        document.querySelector(".totalEmploy h3").textContent =
                                            "Total Marketing Employees : " + MarketingEmployees.length;
                                    }
                                    //=================================




                                                var totalSalaries = details.users.reduce((accumulator ,currentElement , indexNum)=>{ 
                                                    return accumulator + currentElement.salary;
                                                },0);

                                                document.querySelector(".totalSalary h3").textContent="Total Salarys :"+ totalSalaries;


                                                var average=(totalSalaries/details.users.length);

                                                document.querySelector(".averageSalary h3").textContent="Average Salaries:"+"            "+ average;


                                                var temp=0;
                                                var highestSalaryPerson=null;

                                                details.users.forEach((currentElement , indexNum)=>{

                                                    if(currentElement.salary > temp)
                                                    {
                                                        temp=currentElement.salary;
                                                        highestSalaryPerson=currentElement.firstName +"  "+ currentElement.lastName;
                                                    }

                                                });

                                                document.querySelector(".highestSalary h3").textContent="Highest Salary :"+temp  +"      "+"Name :"+ highestSalaryPerson;


                                            });

    });
        employee.append(employeeImage);    //append()  to add data to existed data
        employee.append(empNAME);
        employee.append(empAGE);
        employee.append(empEmail);
        employee.append(empDepart);
        employee.append(empPhone);
        employee.append(deleteButton);
        employeeCard.append(employee);
    }
}


//================ ADDED =================
//stores which department is currently selected
var currentDepartment = "All";
//===============================

var departmentButtons = document.querySelectorAll(
    ".departmentBtns input"
);

departmentButtons.forEach((button) => {

    button.addEventListener("click", (event) => {
        event.preventDefault();                     //to stop it from refreshing ,bec values will clear immediately if it refreshes

        var selectedDepartment = event.target.value;
        console.log(selectedDepartment);
        totalEmployeesCards(selectedDepartment);

        //================ ADDED =================
        //remember the selected department
        currentDepartment = selectedDepartment;
        //=================================

    });

});

    //Add Employees to details - users array

        //get users from frontend form
            document.addEventListener("submit",(event)=>{
                event.preventDefault();
                let empName=document.querySelector("[name='empName']").value;
                let empAge=document.querySelector("[name='empAge']").value;
                let empEmail=document.querySelector("[name='empEmail']").value;
                let empDepartment= document.querySelector(".department").value;
                let empPhone=document.querySelector("[name='empPhone']").value;
        JsonFormat.then((details) => {

           details.users.push({             //to add elements at enfing of the array
                        id: Date.now(),
                        firstName: empName,
                        lastName: "",
                        age: empAge,
                        email: empEmail,
                        company: { department: empDepartment },
                        phone: empPhone,
                        image: "https://dummyjson.com/icon/abc/128" 
                    }); 
 
                document.querySelector( ".totalEmployees > h1").textContent = "Total Employees : " + details.users.length; 
                document.getElementById("employeeAddedSuccessfully").innerText="Employe added successfully";         
        }); 
                }); 
 
 //=======================salaries , average ,total EMployees , highest salary======================================================== 
 
        var totalEmpl=null; 
       JsonFormat.then((details)=>{ 
    details.users.forEach((currentElement, indexNum)=>{ 
                        totalEmpl=details.users.length;         
                     }); 
                     document.querySelector(".totalEmploy h3").innerHTML="Total Employees : "+totalEmpl; 
 
                
            var totalSalaries = details.users.reduce((accumulator ,currentElement , indexNum)=>{ 
                    return accumulator + currentElement.salary; 
            },0); 
            document.querySelector(".totalSalary h3").textContent="Total Salarys :"+ totalSalaries; 
 
            var average=(totalSalaries/totalEmpl); 
            document.querySelector(".averageSalary h3").textContent="Average Salaries:"+"            "+ average; 
 
            //highest salary 
                    var temp=0; 
                     var highestSalaryPerson=null; 
                    details.users.find((currentElement , indexNum)=>{ 
                            if(currentElement.salary > temp) 
                            { 
                                temp=currentElement.salary; 
                               highestSalaryPerson= currentElement.firstName +"  "+ currentElement.lastName; 
                            } 
                              
                    }); 
                    document.querySelector(".highestSalary h3").textContent="Highest Salary :"+temp  +"      "+"Name :"+ highestSalaryPerson; 
            });       
 
//============================================================