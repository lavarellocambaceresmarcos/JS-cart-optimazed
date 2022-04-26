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