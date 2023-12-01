//get all needed elements from document 
var sub = document.getElementById("sub");
var page = document.getElementById("page");
var barcode = document.getElementById("code");
var quan = document.getElementById("quan");
//copy over objects
var products = {
    "689145740844": {
        name: "JavaScript Textbook",
        price: 34.95
    },
    "551943":{
        name: "Emily",
        price: 0.01
    },
    "4549292070248": {
        name: "Xerox Paper",
        price: 10.99
    },
    "092265222983": {
        name: "First Aid Kit",
        price: 20.99
    },
    "X002ELVL3J": {
        name: "Box of Pencils (50ct.)",
        price: 15.99
    },
    "686024002468": {
        name: "Sanitizing Wipes",
        price: 10.99
    },
    "860004186236": {
        name: "N95 Face Masks",
        price: 15.99
    },
    "036000214000": {
        name: "Kleenex",
        price: 3.99
    },
    "8809693254156": {
        name: "Hand Sanitizer",
        price: 7.99
    },
    "036500060480": {
        name: "Printer Paper",
        price: 9.99
    },
    "085014561877": {
        name: "Brush Pens",
        price: 10.99
    },
    "X0032YGP2T": {
        name: "Multiport Adapter",
        price: 25.99
    },
    "B07G6JT1XS": {
        name: "Scissors (20ct.)",
        price: 23.99
    },
    "9780134682334": {
        name: "iOS Programming Textbook",
        price: 119.99
    },
    "718103230759": {
        name: "Spiral Notebook",
        price: 1.99
    }
};

function getProduct(code) {
    let product = products[code];
    if (product) {
        return product;
    } else {
        return { name: "Product not found", price: 0.0 };
    }
}

//initialize add and total to create display details the first time and keep track of total
var add = 0;
var total = 0;
var items = [];

function addItem(){
    if(add === 0){//initial display(all titles)
        var hr = document.createElement("hr");
        page.appendChild(hr);
        head = document.createElement("h3");
        head.innerText = "Cart";
        page.appendChild(head); // added line + cart title
        //add headings
        cart = document.createElement("div");
        item = document.createElement("h4");
        price = document.createElement("h4");
        quantity = document.createElement("h4");
        item.innerText = "Item";
        price.innerText = "Price";
        quantity.innerText = "Quantity";
        cart.appendChild(item);
        cart.appendChild(price);
        cart.appendChild(quantity);
        cart.classList.add("cart");
        page.appendChild(cart);
        reciept = document.createElement("div");
        page.appendChild(reciept);
    }
    var obj = getProduct(barcode.value);
    obj.quan = parseInt(quan.value); // Parse quantity as an integer
    //find if obj alread an item or not
    var existingItem = items.find(item => item.name === obj.name);

    if (existingItem) {
        //if exists, just update previous display
        existingItem.quan += obj.quan;
        updateDisplay(existingItem);
    } else {
        // If the item doesn't exist, add it to the items array
        items.push(obj);

        // Create a new display entry (thing) only for new items
        total += obj.price * obj.quan;

        var thing = document.createElement("div");
        var what = document.createElement("p");
        var howMuch = document.createElement("p");
        var quant = document.createElement("p");

        what.innerText = obj.name;
        howMuch.innerText = obj.price;
        quant.innerText = obj.quan;

        thing.appendChild(what);
        thing.appendChild(howMuch);
        thing.appendChild(quant);
        thing.classList.add("item");
        reciept.appendChild(thing);
    }
    if(add === 0){
        //create end display only first time
        tot = document.createElement("p");
        tot.innerText = "Total: $" + total;
        page.appendChild(tot);
        checkout = document.createElement("button");
        checkout.innerText = "Checkout";
        page.appendChild(checkout);
        checkout.addEventListener("click", checkOut);
    }
    tot.innerText = "Total: $" + parseFloat(total).toFixed(2);
    add++;
    quan.value = "";
    barcode.value = "";
}
sub.addEventListener("click", addItem);

function updateDisplay(existingItem) {
    // Find the existing display for the item
    var existingDisplay = document.querySelector(".item p:first-child");

    // Find the correct item element for the existing item
    var itemElement = Array.from(document.querySelectorAll(".item p:first-child")).find(p => p.innerText === existingItem.name);

    if (itemElement) {
        // Update the quantity in the existing display
        itemElement.nextElementSibling.nextElementSibling.innerText = existingItem.quan;
    }
    // Update the total
    total += existingItem.price * existingItem.quan;
}
var check = 0;
function checkOut(){
    if(check === 0){
        //only create 1st time
        finalTotal = document.createElement("p");
        page.appendChild(finalTotal);
    }
    //update totals after 1st time
    finalTotal.innerText = "Your grand total (including tax, 9.25%) is $" + parseFloat(total * 1.0925).toFixed(2);
    check ++;
}