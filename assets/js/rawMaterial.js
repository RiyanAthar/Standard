const getAllRawMaterial = async () => {
    const response = await fetch('https://localhost:7061/api/rawMaterials');
    const rawMaterials = await response.json();
    
    displayRawMaterial(rawMaterials);
}

const  displayRawMaterial=(rawMaterials)=>{
    rawMaterials.forEach(rawMaterial => {
      const row = document.createElement("tr");
      row.id=rawMaterial.id;
      
      const rawMaterialIdColumn = document.createElement("td");
      const rawMaterialIdData = document.createTextNode(rawMaterial.id);
      rawMaterialIdColumn.appendChild(rawMaterialIdData);

      const itemNameColumn = document.createElement("td");
      const itemNameData = document.createTextNode(rawMaterial.itemName);
      itemNameColumn.appendChild(itemNameData);

      const itemColorColumn = document.createElement("td");
      const itemColorData = document.createTextNode(rawMaterial.itemColor);
      itemColorColumn.appendChild(itemColorData);

      const itemSizeColumn = document.createElement("td");
      const itemSizeData = document.createTextNode(rawMaterial.itemSize);
      itemSizeColumn.appendChild(itemSizeData);

      const itemQuantityColumn = document.createElement("td");
      const itemQuantityData = document.createTextNode(rawMaterial.itemQuantity);
      itemQuantityColumn.appendChild(itemQuantityData);

      const rawMaterialDateColumn = document.createElement("td");
      const rawMaterialDateData = document.createTextNode(rawMaterial.date);
      rawMaterialDateColumn.appendChild(rawMaterialDateData);

      const rawMaterialPricePerUnitColumn = document.createElement("td");
      const rawMaterialPricePerUnitData = document.createTextNode(rawMaterial.pricePerUnit);
      rawMaterialPricePerUnitColumn.appendChild(rawMaterialPricePerUnitData);

      const itemActionsColumn = document.createElement("td");
      const editIcon = document.createElement("i");
      editIcon.onclick = editRawMaterial;
      editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
      deleteIcon.onclick=deleteRawMaterial;
      itemActionsColumn.appendChild(editIcon);
      itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(rawMaterialIdColumn);
      row.appendChild(itemNameColumn);
      row.appendChild(itemColorColumn);
      row.appendChild(itemSizeColumn);
      row.appendChild(itemQuantityColumn);
      row.appendChild(rawMaterialDateColumn);
      row.appendChild(rawMaterialPricePerUnitColumn);
      row.appendChild(itemActionsColumn);

      const rawMaterialTableBody = document.getElementById("rawMaterial-table-body");
      rawMaterialTableBody.appendChild(row);
    });
  }
    
  getAllRawMaterial();

  const createRawMaterial=()=>{
    const createRawMaterialForm = document.getElementById("create-rawMaterial-form");
    

    let rawMaterial = {};
    let rawMaterialAttributes = ["itemName", "itemColor",  "itemSize", "itemQuantity", "date", "pricePerUnit"];

    for (let i = 0; i < createRawMaterialForm.length ;i++) {
      console.log(createRawMaterialForm.elements[i].value);


      rawMaterial[rawMaterialAttributes[i]] = createRawMaterialForm.elements[i].value;
    }

    apiCallForCreateRawMaterial(rawMaterial);

    createRawMaterialForm.reset();
  }

  const cancelCreateRawMaterial=()=>{
    const createRawMaterialForm = document.getElementById("create-rawMaterial-form");
    createRawMaterialForm.reset();
  }


  const apiCallForCreateRawMaterial = async (rawMaterial) => {

  const response = await fetch("https://localhost:7061/api/rawMaterials", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rawMaterial)
  });

    const content = await response.json();

    console.log(content);

    displayRawMaterial([content]);


}

//////
const editRawMaterial = async (event) => {
  console.log("editRawMaterial");
  document.getElementById("submit-btn").onclick = updaterawMaterial;
  const id = event.target.parentElement.parentElement.id;
  rawMaterialInEditStateId = id;
  const rawMaterial = await apiCallForGetrawMaterial(id);

  

  console.log("date")
  console.log(rawMaterial);
  
  var now = new Date(rawMaterial.date);
  var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
console.log(today);

rawMaterial.date=today;

  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);

  // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  // rawMaterial.date = today;




  const editModal = document.getElementById("create-rawMaterial-form");

  let rawMaterialAttributes = ["itemName", "itemColor",  "itemSize", "itemQuantity", "date", "pricePerUnit"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = rawMaterial[rawMaterialAttributes[i]];
  }

  // open modal from javascript
  let editRawMaterialModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editRawMaterialModal.show();
};

const updaterawMaterial = () => {
  console.log("updaterawMaterial");
  const createrawMaterialForm = document.getElementById("create-rawMaterial-form");

  let rawMaterial = {id: rawMaterialInEditStateId};
  let rawMaterialAttributes = ["itemName", "itemColor",  "itemSize", "itemQuantity", "date", "pricePerUnit"];

  for (let i = 0; i < createrawMaterialForm.length; i++) {
    console.log(createrawMaterialForm.elements[i].value);

    rawMaterial[rawMaterialAttributes[i]] = createrawMaterialForm.elements[i].value;
  }

  apiCallForeditRawMaterial(rawMaterial);

  createrawMaterialForm.reset();

  const row = document.getElementById(rawMaterialInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=rawMaterial[rawMaterialAttributes[i-1]];
  }
}

const apiCallForeditRawMaterial = async (rawMaterial) => {
  const response = await fetch(`https://localhost:7061/api/rawMaterials/${rawMaterialInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawMaterial),
  });

  // console.log(response);
  // const content = await response.json();

  // console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createrawMaterial;
}





/////




  const deleteRawMaterial = (event) => {
    const id = event.target.parentElement.parentElement.id;
    apiCallForDeleteRawMaterial(id);
    event.target.parentElement.parentElement.remove();
  }

  const apiCallForDeleteRawMaterial = async (id) => {
    const response = await fetch(`https://localhost:7061/api/rawMaterials/${id}`,{
      method:'Delete',
    });
  }

  const apiCallForGetrawMaterial = async (id) => {
    const response = await fetch(`https://localhost:7061/api/rawMaterials/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  
  // main
  let rawMaterialInEditStateId;