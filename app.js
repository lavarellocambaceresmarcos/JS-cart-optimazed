// Cart array
let cart = [];

// Search
let search = document.getElementById('search');

// Cart 
let cartQuantity = document.getElementById('cont-cart');
let totalPrice = document.getElementById('total-price');
let closeCart = document.getElementById('close-cart');
let payButton = document.getElementById('pay-button');

// Items/products in the cart
let modalContent = document.getElementById('div-cont-prodAdded');

// Products container
let contProducts = document.getElementById('cont-products');


// Show Products 
showProducts(stock);
function showProducts (array) {
    // Creating items in the page ---> this is equal to the quantity of elements in the "stock" array
    array.forEach(item => {
        let div = document.createElement('div');
        div.className = 'product';

        div.innerHTML += `
            <div class="card">
                <div class="cont-card-img">
                    <img src=${item.img} alt="">
                </div>
                <div class="cont-card-info">
                    <p>${item.name}</p>
                    <p>$${item.price}</p>
                </div>
                <div class="cont-card-btn">
                    <button id="add${item.id}">Add to cart</button>
                </div>
            </div>
        `;

        contProducts.appendChild(div);

        let addBtn = document.getElementById(`add${item.id}`);


        // Adding items to the cart
        addBtn.addEventListener('click', function () {
            alert("item added to cart");
            console.log('item ' + item.id +  ' was added to the cart');

            // Calling add to cart function
            addToCart(item.id);
        })
    });
}




// Add to cart
function addToCart (id) {

    // We search if the selected product actually exists in the "cart" array
    // We get the id of the element in "cart"
    let addProduct = cart.find(element => element.id == id);

    // If the id exists --> we update the quantity
    if (addProduct) {
        // Updating the quantity in the array
        addProduct.unity = addProduct.unity + 1;
        console.log('item quantity updated to : ' + addProduct.unity);

        document.getElementById(`quantity${addProduct.id}`).innerHTML = `<p id="quantity${addProduct.id}">x${addProduct.unity}</p>`;

        // Updating the quantity in the HTML
        // document.getElementById(`quantity${lookInTheCart.id}`).innerHTML = `<p id="quantity${lookInTheCart.id}">x ${lookInTheCart.unity}</p>`;

        // Update the quantity number
        itemsAdded();


    // If it does not exists --> we add the item to the cart
    }else {
    
    let addProduct = stock.find(element => element.id == id);
    console.log(addProduct);
    cart.push(addProduct);
    console.log(cart);

    // Items quantity ---> inside the cart
    addProduct.unity = 1;

    // Update the quantity number
    itemsAdded ();

    // We add products as content to the cart
    showItems(addProduct);
    }

    // Update the local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Show items in cart
function showItems (addProduct) {

    // Here we create a div --> inner cart items
    let cartProduct = document.createElement('div');
    cartProduct.className = 'prod-in-cart';
    cartProduct.innerHTML = `
        <p>${addProduct.name}</p>
        <p>$${addProduct.price}</p>
        <p id="quantity${addProduct.id}">x${addProduct.unity}</p>
        <button id="delete${addProduct.id}" class="del-btn${addProduct.id}"><i class="fa-solid fa-trash-can"></i></button>
        `
    // Here we add the div to it's father
    modalContent.appendChild(cartProduct);


    // Deleting items from the cart
    let deleteBtn = document.getElementById(`delete${addProduct.id}`);
    deleteBtn.addEventListener('click', function () {
        console.log('clicked');

        // We filter all elements that matches the asked condition --> removing the one that doesn't match it 
        cart = cart.filter(element => element.id != addProduct.id);

        console.log(cart);

        // We remove the element from the HTML
        deleteBtn.parentElement.remove();

        // Update the quantity of products in the cart icon
        itemsAdded();

        // Update the local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    })



    // PAY
    payButton.addEventListener('click', function () {

            // Cleaning all items in the cart
            let btnDel = document.getElementById(`delete${addProduct.id}`);
            console.log(btnDel);
            btnDel.parentElement.remove();

            // Data reset
            cart = []
            totalPrice.innerText = '0';
            cartQuantity.innerText = '0';

            // Update the local storage
            localStorage.setItem('cart', JSON.stringify(cart));
    })

}


// Number of products in the cart --> quantity number + total price
function itemsAdded () {
    let cartLength = cart.length;
    let cont = 0;
    let total = 0;

    if (cart.length > 0) {
        for (let i = 0; i < cartLength; i++) {
            console.log(cart[i].unity)
            cont = cont + cart[i].unity;
            console.log(cont);
            
            // Quantity
            cartQuantity.innerText = cont;

            // Total price
            total = total + (cart[i].unity * cart[i].price);
            totalPrice.innerText = total;
            
        }
    }else {
        cartQuantity.innerText = 0;
        totalPrice.innerText = 0;
    }
    
}






// Storage
storageSaving ();
function storageSaving () {
    let getData = JSON.parse(localStorage.getItem('cart'));

    if (getData) {
        getData.forEach(element => {
            showItems(element);
            cart.push(element);
            itemsAdded ();
        })
    }
}

