function doStartupConfig() {
    checkUserLogin();
    createTable();
}

function checkUserLogin() {
    const userLoggedIn = sessionStorage.getItem('userLogged');
    if (userLoggedIn !== 'logged') {
        window.location.replace('login.html');
    }
    
};



    const empFromLocalStorage = localStorage.getItem('employeesArr');
      let employeesArr = JSON.parse(empFromLocalStorage);


  function createTable() {
       
    if (employeesArr && employeesArr.length === 0){
        document.getElementById('no_emp_container').style.display = 'block';
        document.getElementById('table_container').style.display = 'none';
    } else {
        
        const table = document.getElementById('employees_table');
        let tableStr =  '<tr><th>No.</th><th>Name</th><th>Age</th><th>Project</th><th>Birthdate</th><th>Hired at</th><th>Phone</th><th>Email</th><th>Actions</th></tr>';
       
        employeesArr.forEach((person, i) => {
          
            tableStr += createRow(person, i);
        });

        table.innerHTML = tableStr;
    } 
  }
   
  function deleteEmp(i) {
   
    if (confirm('Are you sure you want to delete ' + employeesArr[i].name +'? ')) {
       
        employeesArr.splice(i, 1);
        localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
        createTable();
    }

}
// ==================================================================================

let saveEmpIndex = 0;
  function editEmp(i) {
      saveEmpIndex = i;
       displayAddForm();

       document.getElementById('add_button').style.display = 'none';
       document.getElementById('edit_button').style.display = 'inline-block';

       const validationkeys = Object.keys(validationObj);
       validationkeys.forEach( key => {
         document.getElementById(key).value = employeesArr[i][key];
         validationObj[key] = true;

       });

       checkValidationObj();
}
// ============================================================================
function saveEditEmp() {
 console.log('index', saveEmpIndex);

const validationKeys = Object.keys(validationObj);
 validationKeys.forEach( key =>{
        employeesArr[saveEmpIndex][key] = document.getElementById(key).value;

     });
     localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
     createTable();
     document.getElementById('add_form_container').style.display = 'none';
     document.getElementById('add_container').style.display = 'block';

}




// =================================================================
 function createRow(person, i) {
     const rowIndex = i + 1;
     const projectName = person.project ? person.project : '-';
    let rowStr = '<tr>';
   rowStr += '<td>' + rowIndex +'</td>';
   rowStr += '<td><a href="employee.html?index=' + i + '" class="emp_link">' +  person.name +'</a></td>';
   rowStr += '<td>' +  person.age +'</td>';
   rowStr += '<td>' + projectName +'</td>';
   rowStr += '<td>' + person.birthdate +'</td>';
   rowStr += '<td>' +  person.hired +'</td>';
   rowStr += '<td>' +  person.phone +'</td>';
   rowStr += '<td>' +  person.email +'</td>';
   rowStr += '<td><button class="editButton" onclick="editEmp(' + i + ')">Edit</button><button class="deleteButton" onclick="deleteEmp(' + i + ')">Delete</button></td>';
    rowStr += '</tr>';
    return rowStr;
 }


// -------------------------------------------------------------
function initialDisplayAddForm() {

    displayAddForm();
}

// --------------------------------------------------------------------

 function displayAddForm() {
    document.getElementById('add_form_container').style.display = 'block';
    document.getElementById('add_container').style.display = 'none';

    document.getElementById('add_button').style.display = 'inline-block';
    document.getElementById('edit_button').style.display = 'none';
    const validationkeys = Object.keys(validationObj);
    validationkeys.forEach(key => {
        validationObj[key] = false;
    } )
    checkValidationObj();

 }
// ---------------------------------------------------------------------------



 function cancelAddForm() {
     const userConfirm = confirm('Sunteti sigur ca vrei sa iesiti din pagina?');
   
     if(userConfirm) {
      clearAndHideForm();
     } 
 }

// ----------------------------------------------------------------------------------

function clearAndHideForm () {
    document.getElementById('add_form').reset();
    document.getElementById('add_form_container').style.display = 'none';
    document.getElementById('add_container').style.display = 'block';
}

// --------------------------------------------------------------------------------------

 function addNewUser() {
     console.log('adding...');

      const newDate = new Date();
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const monthToAdd = (month < 10) ? '0' + month : month;
    const day = newDate.getDate();

     const newEmpObj = {
         name: document.getElementById('name').value,
         age: document.getElementById('age').value,
         birthdate: document.getElementById('birthdate').value,
         phone: document.getElementById('phone').value,
         email: document.getElementById('email').value,
         hired: year + '-' + monthToAdd + '-' + day,
         project: null
     }
  
   employeesArr.push(newEmpObj);
   localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
   createTable();
   clearAndHideForm();
 }
// ------------------------------------------------------------------------------
let initialValidationObj = {
    name: false,
    age: false,
    birthdate: false,
    phone: false,
    email: false
};

 let validationObj = initialValidationObj;

function checkValidationObj() {
    const validationkeys = Object.keys(validationObj);
    let flag = true;
    validationkeys.forEach(key => {
        if (!validationObj[key]) {
        flag = false;
        }
    });
    if(flag) {
        document.getElementById('add_button').disabled = false;
        document.getElementById('edit_button').disabled = false;
    } else {
        document.getElementById('add_button').disabled = true;
        document.getElementById('edit_button').disabled = true;
    }
}



// ========================================================================


 function checkName() {
     const name_el = document.getElementById('name');
    const name = name_el.value;

   
if (name === '' || name === null) {


  document.getElementById('name_error').style.display = 'block';
  name_el.classList.add('input_error');
  validationObj.name = false;
} else {
    document.getElementById('name_error').style.display = 'none';
    name_el.classList.remove('input_error');
    validationObj.name = true;
}
checkValidationObj();
 }

// -----------------------------------------------------------
 function checkAge() {
     const age_el = document.getElementById('age');
     const age = age_el.value;

     if (age !== '' && age !== isNaN(age) && age >= 18 && age <= 65 ) {
        document.getElementById('age_error').style.display = 'none';
        age_el.classList.remove('input_error');
        validationObj.age = true;
      } else {
          document.getElementById('age_error').style.display = 'block';
          age_el.classList.add('input_error');
          validationObj.age = false;
        }
      checkValidationObj();

    }
// ==========================================================================

   function checkElement(element) {
  const html_el = document.getElementById(element);
  const el_value = html_el.value;
 let patt;
// console.log(element);
 if(  element === 'birthdate') {
     patt = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g;
   
 } else if(element === 'phone') {
     patt =  /^07\d{8}$/g;
 } else if(element === 'email') {
     patt = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g;
 }
     if(el_value === '' ||  !patt.test(el_value)) {
     document.getElementById(element + '_error').style.display ='block';
     html_el.classList.add('input_error');
     validationObj[element] = false;
 } else {
    document.getElementById(element + '_error').style.display ='none';
    html_el.classList.remove('input_error');
    validationObj[element] = true;
 }
 checkValidationObj();
   }

// ===============================================================================




























// Object.key si Flag explicate
// const example1 = {
//      name: 'Andreea',
//      age: 32,
//      location: 'Bucuresti'
// };
// console.log(Object.keys(example1));




// const sizes = ['s', 'm', 'l', 'xxl', 'm', 'xxxxl', 'm'];
// let flag = 'NO';
// for(i=0; i < sizes.length; i++) {
//     if(sizes[i] === 'm') {
//         flag = 'YES';
//         console.log(i + flag);
//         break;
//     }
   

// }