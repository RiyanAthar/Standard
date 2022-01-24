const getAllPayment = async () => {
    const response = await fetch('https://localhost:7061/api/payments');
    const payments = await response.json();
    
    displayPayment(payments);

}

const  displayPayment=(payments)=>{
    payments.forEach(payment => {
      const row = document.createElement("tr");
      row.id=payment.id;
      
      const paymentIdColumn = document.createElement("td");
      const paymentIdData = document.createTextNode(payment.id);
      paymentIdColumn.appendChild(paymentIdData);

      const paymentPOColumn = document.createElement("td");
      const paymentPOData = document.createTextNode(payment.orderPO);
      paymentPOColumn.appendChild(paymentPOData);

      const clientNameColumn = document.createElement("td");
      const clientNameData = document.createTextNode(payment.clientName);
      clientNameColumn.appendChild(clientNameData);

      const paymentStatusColumn = document.createElement("td");
      const paymentStatusData = document.createTextNode(payment.orderStatus);
      paymentStatusColumn.appendChild(paymentStatusData);

      const paymentDeliveryDateColumn = document.createElement("td");
      const paymentDeliveryDateData = document.createTextNode(payment.orderDeliveryDate);
      paymentDeliveryDateColumn.appendChild(paymentDeliveryDateData);

      const paymentPriceColumn = document.createElement("td");
      const paymentPriceData = document.createTextNode(payment.orderPrice);
      paymentPriceColumn.appendChild(paymentPriceData);

      const paymentReceivedAmountColumn = document.createElement("td");
      const paymentReceivedAmountData = document.createTextNode(payment.receivedAmount);
      paymentReceivedAmountColumn.appendChild(paymentReceivedAmountData);

      const paymentReceivedAmountDateColumn = document.createElement("td");
      const paymentReceivedAmountDateData = document.createTextNode(payment.receivedAmountDate);
      paymentReceivedAmountDateColumn.appendChild(paymentReceivedAmountDateData);

      const paymentPendingAmountColumn = document.createElement("td");
      const paymentPendingAmountData = document.createTextNode(payment.pendingAmount);
      paymentPendingAmountColumn.appendChild(paymentPendingAmountData);

      const paymentPendingAmountDateColumn = document.createElement("td");
      const paymentPendingAmountDateData = document.createTextNode(payment.pendingAmountDate);
      paymentPendingAmountDateColumn.appendChild(paymentPendingAmountDateData);

      const itemActionsColumn = document.createElement("td");
      const editIcon = document.createElement("i");
      editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
      editIcon.onclick = editPayment;
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
      deleteIcon.onclick = deletePayment;
      itemActionsColumn.appendChild(editIcon);
      itemActionsColumn.appendChild(deleteIcon);

      row.appendChild(paymentIdColumn);
      row.appendChild(paymentPOColumn);
      row.appendChild(clientNameColumn);
      row.appendChild(paymentStatusColumn);
      row.appendChild(paymentDeliveryDateColumn);
      row.appendChild(paymentPriceColumn);
      row.appendChild(paymentReceivedAmountColumn);
      row.appendChild(paymentReceivedAmountDateColumn);
      row.appendChild(paymentPendingAmountColumn);
      row.appendChild(paymentPendingAmountDateColumn);
      row.appendChild(itemActionsColumn);

      const paymentTableBody = document.getElementById("payment-table-body");
      paymentTableBody.appendChild(row);
    });
  }
    
  getAllPayment();


  const createPayment=()=>{
    const createPaymentForm = document.getElementById("create-payment-form");
    

    let payment = {};
    let paymentAttributes = ["orderPO", "clientName", "orderStatus", "orderDeliveryDate", "orderPrice",
     "receivedAmount", "receivedAmountDate", "pendingAmount", "pendingAmountDate"];

    for (let i = 0; i < createPaymentForm.length ;i++) {
      console.log(createPaymentForm.elements[i].value);


      payment[paymentAttributes[i]] = createPaymentForm.elements[i].value;
    }

    apiCallForCreatePayment(payment);

    createPaymentForm.reset();
  }

  const cancelCreatePayment=()=>{
    const createPaymentForm = document.getElementById("create-payment-form");
    createPaymentForm.reset();
  }


  const apiCallForCreatePayment = async (payment) => {

  const response = await fetch("https://localhost:7061/api/payments", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payment)
  });

    const content = await response.json();

    console.log(content);

    displayPayment([content]);


}

//////
const editPayment = async (event) => {
  console.log("editPayment");
  document.getElementById("submit-btn").onclick = updatepayment;
  const id = event.target.parentElement.parentElement.id;
  paymentInEditStateId = id;
  const payment = await apiCallForGetpayment(id);

  

  console.log("date")
  console.log(payment);
  
  var now = new Date(payment.date);
  var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
console.log(today);

payment.date=today;

  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);

  // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  // payment.date = today;




  const editModal = document.getElementById("create-payment-form");

  let paymentAttributes = ["orderPO", "clientName", "orderStatus", "orderDeliveryDate", "orderPrice",
  "receivedAmount", "receivedAmountDate", "pendingAmount", "pendingAmountDate"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = payment[paymentAttributes[i]];
  }

  // open modal from javascript
  let editPaymentModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editPaymentModal.show();
};

const updatepayment = () => {
  console.log("updatepayment");
  const createpaymentForm = document.getElementById("create-payment-form");

  let payment = {id: paymentInEditStateId};
  let paymentAttributes = ["orderPO", "clientName", "orderStatus", "orderDeliveryDate", "orderPrice",
  "receivedAmount", "receivedAmountDate", "pendingAmount", "pendingAmountDate"];

  for (let i = 0; i < createpaymentForm.length; i++) {
    console.log(createpaymentForm.elements[i].value);

    payment[paymentAttributes[i]] = createpaymentForm.elements[i].value;
  }

  apiCallForeditPayment(payment);

  createpaymentForm.reset();

  const row = document.getElementById(paymentInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=payment[paymentAttributes[i-1]];
  }
}

const apiCallForeditPayment = async (payment) => {
  const response = await fetch(`https://localhost:7061/api/payments/${paymentInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });

  // console.log(response);
  // const content = await response.json();

  // console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createPayment;
}





/////


  const deletePayment = (event) => {
    const id = event.target.parentElement.parentElement.id;
    apiCallForDeletePayment(id);
    event.target.parentElement.parentElement.remove();
  }

  const apiCallForDeletePayment = async (id) => {
    const response = await fetch(`https://localhost:7061/api/payments/${id}`,{
      method:'Delete',
    });
  }

  const apiCallForGetpayment = async (id) => {
    const response = await fetch(`https://localhost:7061/api/payments/${id}`);
    const content = await response.json();
  
    console.log(content);
  
    return content;
  };
  
  // main
  let paymentInEditStateId;