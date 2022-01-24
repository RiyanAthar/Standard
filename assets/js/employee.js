const getAllEmployee = async () => {
    const response = await fetch('https://localhost:7061/api/employees');
    const employees = await response.json();
    
    displayEmployee(employees);

   
  }

  const  displayEmployee=(employees)=>{

    employees.forEach(employee => {
      const row = document.createElement("tr");
      row.id=employee.id;
      
      const employeeIdColumn = document.createElement("td");
      const employeeIdData = document.createTextNode(employee.id);
      employeeIdColumn.appendChild(employeeIdData);

      const employeeNameColumn = document.createElement("td");
      const employeeNameData = document.createTextNode(employee.employeeName);
      employeeNameColumn.appendChild(employeeNameData);

      const employeeNumberColumn = document.createElement("td");
      const employeeNumberData = document.createTextNode(employee.employeeNumber);
      employeeNumberColumn.appendChild(employeeNumberData);

      const employeeAddressColumn = document.createElement("td");
      const employeeAddressData = document.createTextNode(employee.employeeAddress);
      employeeAddressColumn.appendChild(employeeAddressData);

      const itemActionsColumn = document.createElement("td");
      const editIcon = document.createElement("i");
      editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
      editIcon.onclick = editEmployee;
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
      deleteIcon.onclick = deleteEmployee;
      itemActionsColumn.appendChild(editIcon);
      itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(employeeIdColumn);
      row.appendChild(employeeNameColumn);
      row.appendChild(employeeNumberColumn);
      row.appendChild(employeeAddressColumn);
      row.appendChild(itemActionsColumn);

      const employeeTableBody = document.getElementById("employee-table-body");
      employeeTableBody.appendChild(row);
    });
}
    
  getAllEmployee();

  const createEmployee=()=>{
    const createEmployeeForm = document.getElementById("create-employee-form");
    

    let employee = {};
    let employeeAttributes = ["employeeName", "employeeNumber", "employeeAddress"];

    for (let i = 0; i < createEmployeeForm.length ;i++) {
      console.log(createEmployeeForm.elements[i].value);


      employee[employeeAttributes[i]] = createEmployeeForm.elements[i].value;
    }

    apiCallForCreateEmployee(employee);

    createEmployeeForm.reset();
  }

  const cancelCreateEmployee=()=>{
    const createEmployeeForm = document.getElementById("create-employee-form");
    createEmployeeForm.reset();
  }

  const apiCallForCreateEmployee = async (employee) => {

  const response = await fetch("https://localhost:7061/api/employees", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  });

    const content = await response.json();

    console.log(content);

    displayEmployee([content]);


}



//////////////

const editEmployee = async (event) => {
  console.log("editEmployee");
  document.getElementById("submit-btn").onclick = updateEmployee;
  const id = event.target.parentElement.parentElement.id;
  employeeInEditStateId = id;
  const employee = await apiCallForGetEmployee(id);
  console.log(employee);

  const editModal = document.getElementById("create-employee-form");

  let employeeAttributes = ["employeeName", "employeeNumber", "employeeAddress"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = employee[employeeAttributes[i]];
  }

  // open modal from javascript
  let editEmployeeModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editEmployeeModal.show();
};

const updateEmployee = () => {
  console.log("updateEmployee");
  const createEmployeeForm = document.getElementById("create-employee-form");

  let employee = {id: employeeInEditStateId};
  let employeeAttributes = ["employeeName", "employeeNumber", "employeeAddress"];

  for (let i = 0; i < createEmployeeForm.length; i++) {
    console.log(createEmployeeForm.elements[i].value);

    employee[employeeAttributes[i]] = createEmployeeForm.elements[i].value;
  }

  apiCallForEditEmployee(employee);

  createEmployeeForm.reset();

  const row = document.getElementById(employeeInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=employee[employeeAttributes[i-1]];
  }
}

const apiCallForEditEmployee = async (employee) => {
  const response = await fetch(`https://localhost:7061/api/employees/${employeeInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  const content = await response.json();

  console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createEmployee;
}


///////////


  const deleteEmployee = (event) => {
    const id = event.target.parentElement.parentElement.id;
    apiCallForDeleteEmployee(id);
    event.target.parentElement.parentElement.remove();
  }

  const apiCallForDeleteEmployee = async (id) => {
    const response = await fetch(`https://localhost:7061/api/employees/${id}`,{
      method:'Delete',
    });
  }
  const apiCallForGetEmployee = async (id) => {
    const response = await fetch(`https://localhost:7061/api/employees/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  let employeeInEditStateId;