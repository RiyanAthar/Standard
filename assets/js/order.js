const getAllorder = async () => {
    const response = await fetch('https://localhost:7061/api/orders');
    const orders = await response.json();
    
    displayOrder(orders);
}

const  displayOrder=(orders)=>{
    orders.forEach(order => {
      const row = document.createElement("tr");
      row.id=order.id;
      
      const orderIdColumn = document.createElement("td");
      const orderIdData = document.createTextNode(order.id);
      orderIdColumn.appendChild(orderIdData);

      const orderPOColumn = document.createElement("td");
      const orderPOData = document.createTextNode(order.orderPO);
      orderPOColumn.appendChild(orderPOData);

      const clientNameColumn = document.createElement("td");
      const clientNameData = document.createTextNode(order.clientName);
      clientNameColumn.appendChild(clientNameData);

      const orderStatusColumn = document.createElement("td");
      const orderStatusData = document.createTextNode(order.crderStatus);
      orderStatusColumn.appendChild(orderStatusData);

      const orderQuantityColumn = document.createElement("td");
      const orderQuantityData = document.createTextNode(order.orderQuantity);
      orderQuantityColumn.appendChild(orderQuantityData);

      const orderPriceColumn = document.createElement("td");
      const orderPriceData = document.createTextNode(order.orderPrice);
      orderPriceColumn.appendChild(orderPriceData);

      const orderStartingDateColumn = document.createElement("td");
      const orderStartingDateData = document.createTextNode(order.startingDate);
      orderStartingDateColumn.appendChild(orderStartingDateData);

      const orderCompletionDateColumn = document.createElement("td");
      const orderCompletionDateData = document.createTextNode(order.completionDate);
      orderCompletionDateColumn.appendChild(orderCompletionDateData);

      const itemActionsColumn = document.createElement("td");
      const editIcon = document.createElement("i");
      editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
      editIcon.onclick = editOrder;
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
      deleteIcon.onclick = deleteOrder;
      itemActionsColumn.appendChild(editIcon);
      itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(orderIdColumn);
      row.appendChild(orderPOColumn);
      row.appendChild(clientNameColumn);
      row.appendChild(orderStatusColumn);
      row.appendChild(orderQuantityColumn);
      row.appendChild(orderPriceColumn);
      row.appendChild(orderStartingDateColumn);
      row.appendChild(orderCompletionDateColumn);
      row.appendChild(itemActionsColumn);

      const orderTableBody = document.getElementById("order-table-body");
      orderTableBody.appendChild(row);
    });
  }
    
  getAllorder();

  const createOrder=()=>{
    const createOrderForm = document.getElementById("create-order-form");
    

    let order = {};
    let orderAttributes = ["orderPO", "clientName", "crderStatus", "orderQuantity", "orderPrice", "startingDate", "completionDate"];

    for (let i = 0; i < createOrderForm.length ;i++) {
      console.log(createOrderForm.elements[i].value);


      order[orderAttributes[i]] = createOrderForm.elements[i].value;
    }

    apiCallForCreateOrder(order);

    createOrderForm.reset();
  }

  const cancelCreateOrder=()=>{
    const createOrderForm = document.getElementById("create-order-form");
    createOrderForm.reset();
  }


  const apiCallForCreateOrder = async (order) => {

  const response = await fetch("https://localhost:7061/api/orders", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });

    const content = await response.json();

    console.log(content);

    displayOrder([content]);


}

//////
const editOrder = async (event) => {
  console.log("editOrder");
  document.getElementById("submit-btn").onclick = updateorder;
  const id = event.target.parentElement.parentElement.id;
  orderInEditStateId = id;
  const order = await apiCallForGetorder(id);

  

  console.log("date")
  console.log(order);
  
  var now = new Date(order.date);
  var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
console.log(today);

order.date=today;

  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);

  // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  // order.date = today;




  const editModal = document.getElementById("create-order-form");

  let orderAttributes = ["orderPO", "clientName", "crderStatus", "orderQuantity", "orderPrice", "startingDate", "completionDate"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = order[orderAttributes[i]];
  }

  // open modal from javascript
  let editOrderModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editOrderModal.show();
};

const updateorder = () => {
  console.log("updateorder");
  const createOrderForm = document.getElementById("create-order-form");

  let order = {id: orderInEditStateId};
  let orderAttributes = ["orderPO", "clientName", "crderStatus", "orderQuantity", "orderPrice", "startingDate", "completionDate"];

  for (let i = 0; i < createOrderForm.length; i++) {
    console.log(createOrderForm.elements[i].value);

    order[orderAttributes[i]] = createOrderForm.elements[i].value;
  }

  apiCallForeditOrder(order);

  createOrderForm.reset();

  const row = document.getElementById(orderInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=order[orderAttributes[i-1]];
  }
}

const apiCallForeditOrder = async (order) => {
  const response = await fetch(`https://localhost:7061/api/orders/${orderInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  // console.log(response);
  // const content = await response.json();

  // console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createOrder;
}





/////

  const deleteOrder = (event) => {
    const id = event.target.parentElement.parentElement.id;
    apiCallForDeleteOrder(id);
    event.target.parentElement.parentElement.remove();
  }

  const apiCallForDeleteOrder = async (id) => {
    const response = await fetch(`https://localhost:7061/api/orders/${id}`,{
      method:'Delete',
    });
  }

  const apiCallForGetorder = async (id) => {
    const response = await fetch(`https://localhost:7061/api/orders/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  
  // main
  let orderInEditStateId;