const getAllClient = async () => {
  const response = await fetch("https://localhost:7061/api/clients");
  const clients = await response.json();

  displayClient(clients);
};

const displayClient = (clients) => {
  clients.forEach((client) => {
    const row = document.createElement("tr");
    row.id = client.id;

    const clientIdColumn = document.createElement("td");
    const clientIdData = document.createTextNode(client.id);
    clientIdColumn.appendChild(clientIdData);

    const clientNameColumn = document.createElement("td");
    const clientNameData = document.createTextNode(client.clientName);
    clientNameColumn.appendChild(clientNameData);

    const clientNumberColumn = document.createElement("td");
    const clientNumberData = document.createTextNode(client.clientNumber);
    clientNumberColumn.appendChild(clientNumberData);

    const clientAddressColumn = document.createElement("td");
    const clientAddressData = document.createTextNode(client.clientAddress);
    clientAddressColumn.appendChild(clientAddressData);

    const itemActionsColumn = document.createElement("td");
    const editIcon = document.createElement("i");
    editIcon.className = "ri-edit-box-line mr-5 cursor-pointer";
    editIcon.onclick = editClient;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "ri-delete-bin-6-line cursor-pointer";
    deleteIcon.onclick = deleteClient;
    itemActionsColumn.appendChild(editIcon);
    itemActionsColumn.appendChild(deleteIcon);

    row.appendChild(clientIdColumn);
    row.appendChild(clientNameColumn);
    row.appendChild(clientNumberColumn);
    row.appendChild(clientAddressColumn);
    row.appendChild(itemActionsColumn);

    const clientTableBody = document.getElementById("client-table-body");
    clientTableBody.appendChild(row);
  });
};

const createClient = () => {
  const createClientForm = document.getElementById("create-client-form");

  let client = {};
  let clientAttributes = ["clientName", "clientNumber", "clientAddress"];

  for (let i = 0; i < createClientForm.length; i++) {
    console.log(createClientForm.elements[i].value);

    client[clientAttributes[i]] = createClientForm.elements[i].value;
  }

  apiCallForCreateClient(client);

  createClientForm.reset();
};

const cancelCreateClient = () => {
  const createClientForm = document.getElementById("create-client-form");
  createClientForm.reset();
};

const apiCallForCreateClient = async (client) => {
  const response = await fetch("https://localhost:7061/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  const content = await response.json();

  console.log(content);

  displayClient([content]);
};

const deleteClient = (event) => {
  const id = event.target.parentElement.parentElement.id;
  apiCallForDeleteClient(id);
  event.target.parentElement.parentElement.remove();
};

const editClient = async (event) => {
  console.log("editClient");
  document.getElementById("submit-btn").onclick = updateClient;
  const id = event.target.parentElement.parentElement.id;
  clientInEditStateId = id;
  const client = await apiCallForGetClient(id);
  console.log(client);

  const editModal = document.getElementById("create-client-form");

  let clientAttributes = ["clientName", "clientNumber", "clientAddress"];

  for (let i = 0; i < editModal.length; i++) {
    console.log(editModal.elements[i].value);

    editModal.elements[i].value = client[clientAttributes[i]];
  }

  // open modal from javascript
  let editClientModal = new bootstrap.Modal(
    document.getElementById("largeModal"),
    {}
  );
  editClientModal.show();
};

const updateClient = () => {
  console.log("updateClient");
  const createClientForm = document.getElementById("create-client-form");

  let client = {id: clientInEditStateId};
  let clientAttributes = ["clientName", "clientNumber", "clientAddress"];

  for (let i = 0; i < createClientForm.length; i++) {
    console.log(createClientForm.elements[i].value);

    client[clientAttributes[i]] = createClientForm.elements[i].value;
  }

  apiCallForEditClient(client);

  createClientForm.reset();

  const row = document.getElementById(clientInEditStateId);

  for(let i = 1; i <row.children.length - 1; i++){
    row.children[i].innerHTML=client[clientAttributes[i-1]];
  }
}

const apiCallForEditClient = async (client) => {
  const response = await fetch(`https://localhost:7061/api/clients/${clientInEditStateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  const content = await response.json();

  console.log(content);
};

const showAddModal = () => {
  document.getElementById("submit-btn").onclick = createClient;
}




const apiCallForDeleteClient = async (id) => {
  const response = await fetch(`https://localhost:7061/api/clients/${id}`, {
    method: "Delete",
  });
};




const apiCallForGetClient = async (id) => {
  const response = await fetch(`https://localhost:7061/api/clients/${id}`);
  const content = await response.json();

  console.log(content);

  return content;
};

// main
getAllClient();
let clientInEditStateId;