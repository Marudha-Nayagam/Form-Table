function submitForm() {
  //Get form values
  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let skills = getSelectedSkills();
  let comments = document.getElementById("comments").value;
  let country = document.getElementById("country").value;

  //validating if input is not empty

  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === ""
  ) {
    alert("Please fill all required fields");
    return;
  }

  //Creating new row

  let table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.rows.length);

  //inserting cells into newrow
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);
  let cell6 = newRow.insertCell(5);
  let cell7 = newRow.insertCell(6);

  //Populating cells with form values
  cell1.innerHTML = firstName;
  cell2.innerHTML = lastName;
  cell3.innerHTML = email;
  cell4.innerHTML = gender ? gender.value : "Not Specified";
  cell5.innerHTML = skills.join(",");
  cell6.innerHTML = comments;
  cell7.innerHTML = country;

  //save form data in session storage
  saveFormData({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender ? gender.value : "",
    skills: skills,
    comments: comments,
    country: country
  })

  //clear form
  document.getElementById("myForm").reset();
}

// function to save form data in session storage
function saveFormData(data){
  let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
  formDataArray.push(data);
  localStorage.setItem("formData", JSON.stringify(formDataArray))

  
}

//function to load previously saved data

function loadFormData(){
  let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];

  if (formDataArray.length === 0) {
    console.log("No previously saved data found.");
    return;
}

  let table = document.getElementById("dataTable").getElementsByTagName("tbody")[0]
  
  formDataArray.forEach((data) => {
    let newRow = table.insertRow(table.rows.length)

     //inserting cells into newrow
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);
  let cell6 = newRow.insertCell(5);
  let cell7 = newRow.insertCell(6);

  //Populating cells with form values
  cell1.innerHTML = data.firstName;
  cell2.innerHTML = data.lastName;
  cell3.innerHTML = data.email;
  cell4.innerHTML = data.gender;
  cell5.innerHTML = data.skills.join(",");
  cell6.innerHTML = data.comments;
  cell7.innerHTML = data.country;


  })
  console.log("Previously saved data loaded successfully.");


}



//function to clear form
function resetForm() {
  document.getElementById("myForm").reset();
}

//function get skills
function getSelectedSkills() {
  let checkboxes = document.querySelectorAll('input[name="skills"]:checked');

  let skills = [];

  checkboxes.forEach((skill) => {
    skills.push(skill.value);
  });
  return skills;
}


//call loadFormData when the page is loaded

window.onload = loadFormData;
