const getAllproduction = async () => {
    const response = await fetch('https://localhost:7061/api/productions');
    const productions = await response.json();
    
    displayProduction(productions);
}

const  displayProduction=(productions)=>{

    productions.forEach(production => {
      const row = document.createElement("tr");
      row.id=production.id;
      
      const productionIdColumn = document.createElement("td");
      const productionIdData = document.createTextNode(production.id);
      productionIdColumn.appendChild(productionIdData);

      const itemNameColumn = document.createElement("td");
      const itemNameData = document.createTextNode(production.itemName);
      itemNameColumn.appendChild(itemNameData);

      const itemTypeColumn = document.createElement("td");
      const itemTypeData = document.createTextNode(production.itemType);
      itemTypeColumn.appendChild(itemTypeData);

      const itemColorColumn = document.createElement("td");
      const itemColorData = document.createTextNode(production.itemColor);
      itemColorColumn.appendChild(itemColorData);

      const itemQuantityColumn = document.createElement("td");
      const itemQuantityData = document.createTextNode(production.itemQuantity);
      itemQuantityColumn.appendChild(itemQuantityData);

      const itemSizeColumn = document.createElement("td");
      const itemSizeData = document.createTextNode(production.itemSize);
      itemSizeColumn.appendChild(itemSizeData);

      const productionDateColumn = document.createElement("td");
      const productionDateData = document.createTextNode(production.date);
      productionDateColumn.appendChild(productionDateData);

      const itemActionsColumn = document.createElement("td");
      const editIcon = document.createElement("i");
      editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
      editIcon.onclick = editProduction;
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
      deleteIcon.onclick = deleteProduction;
      itemActionsColumn.appendChild(editIcon);
      itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(productionIdColumn);
      row.appendChild(itemNameColumn);
      row.appendChild(itemTypeColumn);
      row.appendChild(itemColorColumn);
      row.appendChild(itemQuantityColumn);
      row.appendChild(itemSizeColumn);
      row.appendChild(productionDateColumn);
      row.appendChild(itemActionsColumn);

      const productionTableBody = document.getElementById("production-table-body");
      productionTableBody.appendChild(row);
    });
  }
    
  getAllproduction();

  const createProduction=()=>{
    const createProductionForm = document.getElementById("create-production-form");
    

    let production = {};
    let productionAttributes = ["itemName", "itemType", "itemColor", "itemQuantity", "itemSize", "date"];

    for (let i = 0; i < createProductionForm.length ;i++) {
      console.log(createProductionForm.elements[i].value);


      production[productionAttributes[i]] = createProductionForm.elements[i].value;
    }

    apiCallForCreateProduction(production);

    createProductionForm.reset();
  }

  const cancelCreateProduction=()=>{
    const createProductionForm = document.getElementById("create-production-form");
    createProductionForm.reset();
  }


  const apiCallForCreateProduction = async (production) => {

  const response = await fetch("https://localhost:7061/api/productions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(production)
  });

    const content = await response.json();

    console.log(content);

    displayProduction([content]);


}

//////
const editProduction = async (event) => {
  console.log("editProduction");
  document.getElementById("submit-btn").onclick = updateproduction;
  const id = event.target.parentElement.parentElement.id;
  productionInEditStateId = id;
  const production = await apiCallForGetproduction(id);

  

  console.log("date")
  console.log(production);
  
  var now = new Date(production.date);
  var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
console.log(today);

production.date=today;

  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);

  // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  // production.date = today;




  const editModal = document.getElementById("create-production-form");

  let productionAttributes = ["itemName", "itemType", "itemColor", "itemQuantity", "itemSize", "date"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = production[productionAttributes[i]];
  }

  // open modal from javascript
  let editProductionModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editProductionModal.show();
};

const updateproduction = () => {
  console.log("updateproduction");
  const createproductionForm = document.getElementById("create-production-form");

  let production = {id: productionInEditStateId};
  let productionAttributes = ["itemName", "itemType", "itemColor", "itemQuantity", "itemSize", "date"];

  for (let i = 0; i < createproductionForm.length; i++) {
    console.log(createproductionForm.elements[i].value);

    production[productionAttributes[i]] = createproductionForm.elements[i].value;
  }

  apiCallForeditProduction(production);

  createproductionForm.reset();

  const row = document.getElementById(productionInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=production[productionAttributes[i-1]];
  }
}

const apiCallForeditProduction = async (production) => {
  const response = await fetch(`https://localhost:7061/api/productions/${productionInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(production),
  });

  // console.log(response);
  // const content = await response.json();

  // console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createProduction;
}





/////



  const deleteProduction = (event) => {
    const id = event.target.parentElement.parentElement.id;
    apiCallForDeleteProduction(id);
    event.target.parentElement.parentElement.remove();
  }

  const apiCallForDeleteProduction = async (id) => {
    const response = await fetch(`https://localhost:7061/api/productions/${id}`,{
      method:'Delete',
    });
  }

  const apiCallForGetproduction = async (id) => {
    const response = await fetch(`https://localhost:7061/api/productions/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  
  // main
  let productionInEditStateId;