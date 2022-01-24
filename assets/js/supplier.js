const getAllSupplier = async () => {
    const response = await fetch('https://localhost:7061/api/suppliers');
    const suppliers = await response.json();
    
    displaySupplier(suppliers);
}

const  displaySupplier=(suppliers)=>{
    suppliers.forEach(supplier => {
      const row = document.createElement("tr");
      row.id=supplier.id;
      
      const supplierIdColumn = document.createElement("td");
      const supplierIdData = document.createTextNode(supplier.id);
      supplierIdColumn.appendChild(supplierIdData);

      const supplierNameColumn = document.createElement("td");
      const supplierNameData = document.createTextNode(supplier.supplierName);
      supplierNameColumn.appendChild(supplierNameData);

      const supplierNumberColumn = document.createElement("td");
      const supplierNumberData = document.createTextNode(supplier.supplierNumber);
      supplierNumberColumn.appendChild(supplierNumberData);

      const supplierAddressColumn = document.createElement("td");
      const supplierAddressData = document.createTextNode(supplier.supplierAddress);
      supplierAddressColumn.appendChild(supplierAddressData);

    const itemActionsColumn = document.createElement("td");
    const editIcon = document.createElement("i");
    editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
    editIcon.onclick = editSupplier;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
    deleteIcon.onclick = deleteSupplier;
    itemActionsColumn.appendChild(editIcon);
    itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(supplierIdColumn);
      row.appendChild(supplierNameColumn);
      row.appendChild(supplierNumberColumn);
      row.appendChild(supplierAddressColumn);
      row.appendChild(itemActionsColumn);

      const supplierTableBody = document.getElementById("supplier-table-body");
      supplierTableBody.appendChild(row);
    });
  }
    
  getAllSupplier();

  const createSupplier=()=>{
    const createSupplierForm = document.getElementById("create-supplier-form");
    

    let supplier = {};
    let supplierAttributes = ["supplierName", "supplierNumber", "supplierAddress"];

    for (let i = 0; i < createSupplierForm.length ;i++) {
      console.log(createSupplierForm.elements[i].value);


      supplier[supplierAttributes[i]] = createSupplierForm.elements[i].value;
    }

    apiCallForCreateSupplier(supplier);

    createSupplierForm.reset();
  }

  const cancelCreateSupplier=()=>{
    const createSupplierForm = document.getElementById("create-supplier-form");
    createSupplierForm.reset();
  }


  const apiCallForCreateSupplier = async (supplier) => {

  const response = await fetch("https://localhost:7061/api/suppliers", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(supplier)
  });

    const content = await response.json();

    console.log(content);

    displaySupplier([content]);


}

//////
const editSupplier = async (event) => {
  console.log("editSupplier");
  document.getElementById("submit-btn").onclick = updatesupplier;
  const id = event.target.parentElement.parentElement.id;
  supplierInEditStateId = id;
  const supplier = await apiCallForGetSupplier(id);
  console.log(supplier);

  const editModal = document.getElementById("create-supplier-form");

  let supplierAttributes = ["supplierName", "supplierNumber", "supplierAddress"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = supplier[supplierAttributes[i]];
  }

  // open modal from javascript
  let editSupplierModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editSupplierModal.show();
};

const updatesupplier = () => {
  console.log("updatesupplier");
  const createSupplierForm = document.getElementById("create-supplier-form");

  let supplier = {id: supplierInEditStateId};
  let supplierAttributes = ["supplierName", "supplierNumber", "supplierAddress"];

  for (let i = 0; i < createSupplierForm.length; i++) {
    console.log(createSupplierForm.elements[i].value);

    supplier[supplierAttributes[i]] = createSupplierForm.elements[i].value;
  }

  apiCallForeditSupplier(supplier);

  createSupplierForm.reset();

  const row = document.getElementById(supplierInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=supplier[supplierAttributes[i-1]];
  }
}

const apiCallForeditSupplier = async (supplier) => {
  const response = await fetch(`https://localhost:7061/api/suppliers/${supplierInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });

  const content = await response.json();

  console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createSupplier;
}





/////
  const deleteSupplier = (event) => {
   
  }

  const apiCallForDeleteSupplier = async (id) => {
 
  }


  const apiCallForGetSupplier = async (id) => {
    const response = await fetch(`https://localhost:7061/api/suppliers/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  
  // main
  let supplierInEditStateId;