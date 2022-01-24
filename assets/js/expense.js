const getAllExpense = async () => {
    const response = await fetch('https://localhost:7061/api/expenses');
    const expenses = await response.json();
    
    displayExpense(expenses);
}

const  displayExpense=(expenses)=>{
    expenses.forEach(expense => {
      const row = document.createElement("tr");
      row.id = expense.id;
      
      const expenseIdColumn = document.createElement("td");
      const expenseIdData = document.createTextNode(expense.id);
      expenseIdColumn.appendChild(expenseIdData);

      const expenseNameColumn = document.createElement("td");
      const expenseNameData = document.createTextNode(expense.name);
      expenseNameColumn.appendChild(expenseNameData);

      const expensePriceColumn = document.createElement("td");
      const expensePriceData = document.createTextNode(expense.price);
      expensePriceColumn.appendChild(expensePriceData);

      const expenseDateColumn = document.createElement("td");
      const expenseDateData = document.createTextNode(expense.date);
      expenseDateColumn.appendChild(expenseDateData);

      const itemActionsColumn = document.createElement("td");
      const editIcon = document.createElement("i");
      editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
      editIcon.onclick = editExpense;
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
      deleteIcon.onclick = deleteExpense;
      itemActionsColumn.appendChild(editIcon);
      itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(expenseIdColumn);
      row.appendChild(expenseNameColumn);
      row.appendChild(expensePriceColumn);
      row.appendChild(expenseDateColumn);
      row.appendChild(itemActionsColumn);

      const expenseTableBody = document.getElementById("expense-table-body");
      expenseTableBody.appendChild(row);
    });
  }
    
  getAllExpense();

  const createExpense=()=>{
    const createExpenseForm = document.getElementById("create-expense-form");
    

    let expense = {};
    let expenseAttributes = ["name", "price", "date"];

    for (let i = 0; i < createExpenseForm.length ;i++) {
      console.log(createExpenseForm.elements[i].value);


      expense[expenseAttributes[i]] = createExpenseForm.elements[i].value;
    }

    apiCallForCreateExpense(expense);

    createExpenseForm.reset();
  }

  const cancelCreateExpense=()=>{
    const createExpenseForm = document.getElementById("create-expense-form");
    createExpenseForm.reset();
  }


  const apiCallForCreateExpense = async (expense) => {

  const response = await fetch("https://localhost:7061/api/expenses", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expense)
  });

    const content = await response.json();

    console.log(content);

    displayExpense([content]);

}

//////
const editExpense = async (event) => {
  console.log("editExpense");
  document.getElementById("submit-btn").onclick = updateExpense;
  const id = event.target.parentElement.parentElement.id;
  expenseInEditStateId = id;
  const expense = await apiCallForGetExpense(id);

  

  console.log("date")
  console.log(expense);
  
  var now = new Date(expense.date);
  var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
console.log(today);

expense.date=today;

  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);

  // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  // expense.date = today;




  const editModal = document.getElementById("create-expense-form");

  let expenseAttributes = ["name", "price", "date"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = expense[expenseAttributes[i]];
  }

  // open modal from javascript
  let editExpenseModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editExpenseModal.show();
};

const updateExpense = () => {
  console.log("updateExpense");
  const createExpenseForm = document.getElementById("create-expense-form");

  let expense = {id: expenseInEditStateId};
  let expenseAttributes = ["name", "price", "date"];

  for (let i = 0; i < createExpenseForm.length; i++) {
    console.log(createExpenseForm.elements[i].value);

    expense[expenseAttributes[i]] = createExpenseForm.elements[i].value;
  }

  apiCallForEditExpense(expense);

  createExpenseForm.reset();

  const row = document.getElementById(expenseInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=expense[expenseAttributes[i-1]];
  }
}

const apiCallForEditExpense = async (expense) => {
  const response = await fetch(`https://localhost:7061/api/expenses/${expenseInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  // console.log(response);
  // const content = await response.json();

  // console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createExpense;
}





/////

  const deleteExpense = (event) => {
    const id = event.target.parentElement.parentElement.firstChild.innerHTML;
    apiCallFordeleteExpense(id);
    event.target.parentElement.parentElement.remove();
  }

  const apiCallFordeleteExpense = async (id) => {
    const response = await fetch(`https://localhost:7061/api/expenses/${id}`,{
      method:'Delete',
    });
  }

  const apiCallForGetExpense = async (id) => {
    const response = await fetch(`https://localhost:7061/api/expenses/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  
  // main
  let expenseInEditStateId;