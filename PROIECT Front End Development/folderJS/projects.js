
function doStartupConfig() {
    checkUserLogin();
    createTable();
}
// =================================================================
function checkUserLogin() {
    const userLoggedIn = sessionStorage.getItem('userLogged');
    if (userLoggedIn !== 'logged') {
        window.location.replace('login.html');
    }
    
}
const prjFromLocalStorage = localStorage.getItem('projectsArr');
let projectsArr =   prjFromLocalStorage ? JSON.parse(prjFromLocalStorage) : [];


// ====================================================================

function createTable() {

    if (projectsArr && projectsArr.length === 0){
        document.getElementById('no_emp_container').style.display = 'block';
        document.getElementById('table_container').style.display = 'none';
    } else {
        document.getElementById('no_emp_container').style.display = 'none';
        document.getElementById('table_container').style.display = 'block';
        const table = document.getElementById('projects_table');
        let tableStr =  '<tr><th>No.</th><th>Project</th><th>Start date</th><th>Duration(months)</th><th>Emp needed</th><th>Emp working</th><th>Actions</th>';
       
        projectsArr.forEach((project, i) =>{
          
            tableStr += createRow(project, i);
        });

        table.innerHTML = tableStr;
    } 
  }
// ========================================================================

function createRow(project, i) {
    const rowIndex = i + 1;
    //const projectName = person.project ? person.project : '-';
   let rowStr = '<tr>';
   rowStr += '<td>' +  rowIndex +'</td>';
   rowStr += '<td>' +  project.name +'</td>';
   rowStr += '<td>' +  project.start_date +'</td>';
   rowStr += '<td>' +  project.duration +'</td>';
   rowStr += '<td>' +  project.no_pers +'</td>';
   rowStr += '<td>' +  project.employees +'</td>';
 
   rowStr += '<td><button class="editButton" onclick="editPrj(' + i + ')">Edit</button><button class="deleteButton" onclick="deletePrj(' + i + ')">Delete</button></td>';
   rowStr += '</tr>';
   return rowStr;
}
// ============================================================================

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
//  ===========================================================================
let initialValidationObj = {
    name: false,
    start_date: false,
    duration: false,
    no_pers: false,
   
};
 let validationObj = initialValidationObj;
function checkValidationObj() {
    const validationkeys = Object.keys(validationObj);
    let flag = true;
    // console.log(validationkeys, validationObj);
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

// ===============================================================================


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
// =============================================================================
function checkStartDate() {
    const html_el = document.getElementById('start_date');
  const el_value = html_el.value;
  let patt = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g;

  if(el_value === '' ||  !patt.test(el_value)) {
    document.getElementById('start_date_error').style.display ='block';
    html_el.classList.add('input_error');
    validationObj['start_date'] = false;
} else {
   document.getElementById('start_date_error').style.display ='none';
   html_el.classList.remove('input_error');
   validationObj['start_date'] = true;
}
checkValidationObj();
  }

// ================================================================AM DAT ACEEASI FUNCTIE PENTRU PERSONNEL SI DURATION SA NU DEPASEASCA 36 SI 10

function checkElement(el) {
    const html_el = document.getElementById(el);
  const el_value = html_el.value;
  const end_range = (el === 'duration') ? 36 : 10;

  if(el_value === '' ||  isNaN(el_value) || el_value <1 || el_value > end_range) {
    document.getElementById(el + '_error').style.display ='block';
    html_el.classList.add('input_error');
    validationObj[el] = false;
} else {
   document.getElementById(el + '_error').style.display ='none';
   html_el.classList.remove('input_error');
   validationObj[el] = true;
}
checkValidationObj();

}
// ==============================================================================


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
// =================================================================================

function addNewProject() {
    console.log('adding...');

   

    const newPrjObj = {
        name: document.getElementById('name').value,
        start_date: document.getElementById('start_date').value,
        duration: document.getElementById('duration').value,
        no_pers: document.getElementById('no_pers').value,
        employees: 0,
    }
 
  projectsArr.push(newPrjObj);
  localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
  createTable();
  clearAndHideForm();
}

function deletePrj(i) {
   
    if (confirm('Are you sure you want to delete ' + projectsArr[i].name +'? ')) {
       
        projectsArr.splice(i, 1);
        localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
        createTable();
    }
}
// ==============================================================
let savePrjIndex = 0;
  function editPrj(i) {
      savePrjIndex = i;
       displayAddForm();

       document.getElementById('add_button').style.display = 'none';
       document.getElementById('edit_button').style.display = 'inline-block';

       const validationkeys = Object.keys(validationObj);
       validationkeys.forEach( key => {
         document.getElementById(key).value = projectsArr[i][key];
         validationObj[key] = true;

       });

       checkValidationObj();
}
// ============================================================================
function saveEditProject() {
 console.log('index', savePrjIndex);

const validationKeys = Object.keys(validationObj);
 validationKeys.forEach( key =>{
        projectsArr[savePrjIndex][key] = document.getElementById(key).value;

     });
     localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
     createTable();
     document.getElementById('add_form_container').style.display = 'none';
     document.getElementById('add_container').style.display = 'block';
     clearAndHideForm ();
}
