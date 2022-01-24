const getAllInventory = async () => {
    const response = await fetch('https://localhost:7061/api/Inventories');
    const inventories = await response.json();

    displayInventory(inventories);

  }
   
  getAllInventory();

const  displayInventory=(inventories)=>{

  inventories.forEach(inventory => {
    const row = document.createElement("tr");
    row.id=inventory.id;
    
    const itemNameColumn = document.createElement("td");
    const itemNameData = document.createTextNode(inventory.itemName);
    itemNameColumn.appendChild(itemNameData);

    const itemColorColumn = document.createElement("td");
    const itemColorData = document.createTextNode(inventory.itemColor);
    itemColorColumn.appendChild(itemColorData);

    const itemQuantityColumn = document.createElement("td");
    const itemQuantityData = document.createTextNode(inventory.itemQuantity);
    itemQuantityColumn.appendChild(itemQuantityData);

    const itemSizeColumn = document.createElement("td");
    const itemSizeData = document.createTextNode(inventory.itemSize);
    itemSizeColumn.appendChild(itemSizeData);

    const itemUnitColumn = document.createElement("td");
    const itemUnitData = document.createTextNode(inventory.itemUnit);
    itemUnitColumn.appendChild(itemUnitData);

    const itemActionsColumn = document.createElement("td");
    const editIcon = document.createElement("i");
    editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
    editIcon.onclick = editInventory;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
    deleteIcon.onclick = deleteInventory;
    itemActionsColumn.appendChild(editIcon);
    itemActionsColumn.appendChild(deleteIcon);

    row.appendChild(itemNameColumn);
    row.appendChild(itemColorColumn);
    row.appendChild(itemQuantityColumn);
    row.appendChild(itemSizeColumn);
    row.appendChild(itemUnitColumn);
    row.appendChild(itemActionsColumn);

    const inventoryTableBody = document.getElementById("inventory-table-body");
    inventoryTableBody.appendChild(row);
  });
}



  const createInventory=()=>{
    const createInventoryForm = document.getElementById("create-inventory-form");
    

    let inventory = {};
    let inventoryAttributes = ["itemName", "itemColor", "itemQuantity", "itemSize", "itemUnit"];

    for (let i = 0; i < createInventoryForm.length ;i++) {
      console.log(createInventoryForm.elements[i].value);


      inventory[inventoryAttributes[i]] = createInventoryForm.elements[i].value;
    }

    apiCallForCreateInventory(inventory);

    createInventoryForm.reset();
  }

  const cancelCreateInventory=()=>{
    const createInventoryForm = document.getElementById("create-inventory-form");
    createInventoryForm.reset();
  }


  const apiCallForCreateInventory = async (inventory) => {

  const response = await fetch("https://localhost:7061/api/inventories", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inventory)
  });

  const content = await response.json();

  console.log(content);

  displayInventory([content]);


}

const editInventory = async (event) => {
  console.log("editInventory");
  document.getElementById("submit-btn").onclick = updateInventory;
  const id = event.target.parentElement.parentElement.id;
  inventoryInEditStateId = id;
  const inventory = await apiCallForGetInventory(id);

  

  // console.log("date")
  console.log(inventory);
  
//   var now = new Date(inventory.date);
//   var day = ("0" + now.getDate()).slice(-2);
// var month = ("0" + (now.getMonth() + 1)).slice(-2);

// var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
// console.log(today);

// inventory.date=today;

  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);

  // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  // inventory.date = today;




  const editModal = document.getElementById("create-inventory-form");

  let inventoryAttributes = ["itemName", "itemColor", "itemQuantity", "itemSize", "itemUnit"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = inventory[inventoryAttributes[i]];
  }

  // open modal from javascript
  let editInventoryModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editInventoryModal.show();
};

const updateInventory = () => {
  console.log("updateinventory");
  const createInventoryForm = document.getElementById("create-inventory-form");

  let inventory = {id: inventoryInEditStateId};
  let inventoryAttributes = ["itemName", "itemColor", "itemQuantity", "itemSize", "itemUnit"];

  for (let i = 0; i < createInventoryForm.length; i++) {
    console.log(createInventoryForm.elements[i].value);

    inventory[inventoryAttributes[i]] = createInventoryForm.elements[i].value;
  }

  apiCallForeditInventory(inventory);

  createInventoryForm.reset();

  const row = document.getElementById(inventoryInEditStateId);

  for(let i = 0; i < row.children.length - 1; i++){
    row.children[i].innerHTML=inventory[inventoryAttributes[i]];
  }
}

const apiCallForeditInventory = async (inventory) => {
  const response = await fetch(`https://localhost:7061/api/inventories/${inventoryInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  });

  // console.log(response);
  // const content = await response.json();

  // console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createInventory;
}



const deleteInventory = (event) => {
  const id = event.target.parentElement.parentElement.id;
  apiCallForDeleteInventory(id);
  event.target.parentElement.parentElement.remove();
}

const apiCallForDeleteInventory = async (id) => {
  const response = await fetch(`https://localhost:7061/api/inventories/${id}`,{
    method:'Delete',
  });
}

  


const apiCallForGetInventory = async (id) => {
  const response = await fetch(`https://localhost:7061/api/inventories/${id}`);
  const content = await response.json();

  console.log(content);

  return content;
};

// main
let inventoryInEditStateId;