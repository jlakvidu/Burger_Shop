class Item {
    itemId;
    name;
    date;
    qty;
    suplier;

    constructor(itemId, name, date, qty, suplier) {
        this.itemId = itemId;
        this.name = name;
        this.date = date;
        this.qty = qty;
        this.suplier = suplier;
    }

}

let items = [];
let itemCount = 0;

function addItem() {
    const itemId = document.getElementById("itemId").value;
    const name = document.getElementById("name").value;
    const date = new Date(document.getElementById("date").value);
    const qty = parseInt(document.getElementById("qty").value, 10);
    const suplier = document.getElementById("supplier").value;

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (!name || !date || isNaN(qty) || !suplier) {
        alert("Some fields are empty or invalid!");
    } else if (qty <= 0) {
        document.getElementById("qty").value = "";
        alert("Invalid Quantity");
    } else if (date < currentDate) {
        document.getElementById("date").value = "";
        alert("Invalid date!");
    } else {
        const item = new Item(itemId, name, date, qty, suplier);
        items.push(item);
        itemCount++;

        localStorage.setItem('items', JSON.stringify(items));

        console.log(items);

        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
        document.getElementById("qty").value = "";
        document.getElementById("supplier").value = "";

        alert("Item added successfully");

        generateId();
    }
}


function generateId() {
    const id = "I0" + (itemCount + 1).toString().padStart(2, '0');
    console.log(id);
    document.getElementById("itemId").value = id;
}

function loadItems() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
        itemCount = items.length;
    }
    generateId();
}

document.addEventListener("DOMContentLoaded", loadItems);

let foundElement = -1;

function searchItem(data) {
    const value = data;
    let found = false;

    document.getElementById("viewItemId").value = "";
    document.getElementById("viewName").value = "";
    document.getElementById("viewDate").value = "";
    document.getElementById("viewQty").value = "";
    document.getElementById("viewSupplier").value = "";

    for (let index = 0; index < items.length; index++) {
        let item = items[index];
        if (item.name === value || item.itemId == value) {
            document.getElementById("viewItemId").value = item.itemId;
            document.getElementById("viewName").value = item.name;
            document.getElementById("viewDate").value = item.date;
            document.getElementById("viewQty").value = item.qty;
            document.getElementById("viewSupplier").value = item.suplier;

            document.getElementById('search-input').value = "";

            console.log("Found");
            foundElement = index;
            console.log(foundElement);
            found = true;
        }
    }

    if (found) {
        alert('Item Found!');
    } else {
        document.getElementById("viewItemId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewDate").value = "";
        document.getElementById("viewQty").value = "";
        document.getElementById("viewSupplier").value = "";

        document.getElementById('search-input').value = "";

        alert('Item Not Found!');
    }
}

document.getElementById('search-button').addEventListener('click', function () {
    const data = document.getElementById('search-input').value;
    if (data) {
        searchItem(data);
    } else {
        alert('Please search for a Item!');
    }
});

document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});

function deleteItem() {
    if (foundElement !== -1) {
        items.splice(foundElement, 1);
        localStorage.setItem('items', JSON.stringify(items));

        foundElement = -1;
        document.getElementById("viewItemId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewDate").value = "";
        document.getElementById("viewQty").value = "";
        document.getElementById("viewSupplier").value = "";
        alert("Item deleted successfully.");
    } else {
        alert("No Item selected to delete.");
    }
}


function updateItem() {
    if (foundElement !== -1) {
        const name = document.getElementById("viewName").value;
        const date = new Date(document.getElementById("viewDate").value);
        const qty = parseInt(document.getElementById("viewQty").value, 10);
        const suplier = document.getElementById("viewSupplier").value;

        const currentDate = new Date();

        currentDate.setHours(0, 0, 0, 0);

        if (!name || !date || isNaN(qty) || !suplier) {
            alert("Some fields are empty or invalid!");
        } else if (qty <= 0) {
            document.getElementById("qty").value = "";
            alert("Invalid Quantity");
        } else if (date < currentDate) {
            document.getElementById("date").value = "";
            alert("Invalid date!");
        } else {

            items[foundElement].name = name;
            items[foundElement].date = date;
            items[foundElement].qty = qty;
            items[foundElement].suplier = suplier;

            localStorage.setItem('items', JSON.stringify(items));
            alert("Item updated successfully.");
            document.getElementById("viewItemId").value = "";
            document.getElementById("viewName").value = "";
            document.getElementById("viewDate").value = "";
            document.getElementById("viewQty").value = "";
            document.getElementById("viewSupplier").value = "";
            foundElement = -1;

        }
    } else {
        alert("No item selected to update.");
    }
}

function loadTable() {

    let table = document.getElementById("tbl");

    let body = `<thead style="position: sticky; top: 0; z-index: 1;">
                    <tr>
                        <th scope="col">Item-ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Expire Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Suplier</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">`;

    items.forEach(item => {
        body += `
        <tr>
            <th scope="row">${item.itemId}</th>
            <td>${item.name}</td>
            <td>${item.date}</td>
            <td>${item.qty}</td>
            <td>${item.suplier}</td>
        </tr>`
    });
    table.innerHTML = body;
}









