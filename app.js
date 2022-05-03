// Cart array
let cart = [];

// Cart 
let cartQuantity = document.getElementById('cont-cart');
let totalPrice = document.getElementById('total-price');
let closeCart = document.getElementById('close-cart');
let payButton = document.getElementById('pay-button');

// Items/products in the cart
let modalContent = document.getElementById('div-cont-prodAdded');

// Products container
let contProducts = document.getElementById('cont-products');


// Timer 
let timer = 0;


// 2nd Timer 
let scndTimer = 0;


// 3rd Timer
let thrdTimer = 0;

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
                    <img src=${item.img} alt="" class="card-img">
                </div>
                <div class="cont-card-info">
                    <p class="item-title">${item.name}</p>
                    <p>$${item.price}</p>
                </div>
                <div class="cont-card-btn">
                    <button id="add${item.id}" class="addTocartButton">Add to cart</button>
                </div>
            </div>
        `;

        

        contProducts.appendChild(div);

        let addBtn = document.getElementById(`add${item.id}`);


        // Adding items to the cart
        addBtn.addEventListener('click', function () {
            let addtocartbuttons = document.getElementsByClassName('addTocartButton');

            window.setInterval(function (){
                timer++
                // console.log(timer);
                if(timer == 1) {
                    Swal.fire({
                        text: 'Item added to the cart',
                        imageUrl:'img/alert-add-icon.png',
                        imageWidth:'40%',
                        width:'300px',
                        confirmButtonText: 'Continue shopping',
                        confirmButtonColor:'#D28B49',
                        confirmButtonAriaLabel:'#E5B265',
                        focusConfirm:'false'
                    })
                    
                }
            },300)

            
            console.log('item ' + item.id +  ' was added to the cart');

            // Calling add to cart function
            addToCart(item.id);

            timer=0;
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
        cartProduct.style.transform="rotate(.2turn) translate(-1000px, 0px)";
        cartProduct.style.transition="all 2s ease";

        // We filter all elements that matches the asked condition --> removing the one that doesn't match it 
        cart = cart.filter(element => element.id != addProduct.id);

        console.log(cart);

        // We remove the element from the HTML

        window.setInterval(function (){
            thrdTimer++
            // console.log(timer);
            if(thrdTimer == 1) {
                deleteBtn.parentElement.remove();
            }

            thrdTimer = 0;
        },300)

        

        // Update the quantity of products in the cart icon
        itemsAdded();

        // Update the local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    })



    // PAY
    payButton.addEventListener('click', function () {

            if (totalPrice.innerText>0) {


                window.setInterval(function (){
                    scndTimer++
                    // console.log(timer);
                    if(scndTimer == 1) {
                        // Alert payment
                        Swal.fire({
                            title: 'Thanks for the payment!',
                            text: '"Not just coffee"',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            confirmButtonColor:'#E5B265',
                            confirmButtonAriaLabel:'#E5B265',
                            focusConfirm:'false',
                            timer:5000,
                            timerProgressBar:'true',

                        })
                        
                    }
                },300)


                scndTimer=0;

                
            }

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
    // Guardamos la data
    let getData = JSON.parse(localStorage.getItem('cart'));

    if (getData) {
        getData.forEach(element => {
            showItems(element);
            cart.push(element);
            itemsAdded ();
        })
    }
}





// Searchbar 
let cardCont = document.getElementsByClassName('card');
let tittleCont = document.getElementsByClassName('cont-card-info');
let titles = document.getElementsByClassName('item-title');

let searchBar = document.getElementById('search');


let testBtn = document.getElementById('test-btn');


searchBar.addEventListener('keyup', function(e) {

    const term = e.target.value.toLowerCase();
    console.log(term);
    
    Array.from(titles).forEach(function (t) {

        for(let i = 0; i < titles.length; i++) {
            
            if (titles[i].innerText.toLowerCase().includes(term)) {
                titles[i].parentElement.parentElement.parentElement.style.display="block";
                console.log(titles[i].innerText.toLowerCase().includes(term));
            }else {
                titles[i].parentElement.parentElement.parentElement.style.display="none";
            }
        }

        let itemstitles = t.innerText;

        
   })
})




// MODAL JS --> shopping cart js

// Cart icon --> header
let cartIconButton = document.getElementById('cart-btn');

// Cart close button
let closingCart = document.getElementById('close-cart');


// cover 
let cover = document.getElementById('cover');

// Modal container
let modalContainer = document.getElementById('modal');

cartIconButton.addEventListener('click', function () {
    console.log("you've opened the cart");
    console.log(modalContainer);
    modalContainer.className = "show";
    cover.className="show-cover";

})

closeCart.addEventListener('click', function () {
    console.log("you've closed the cart");
    console.log(modalContainer);
    modalContainer.className = "remove";
    cover.className="remove";
})
