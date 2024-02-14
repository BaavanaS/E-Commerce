document.addEventListener('DOMContentLoaded', function () {

    // variables
    var toggleButton = document.querySelector('.toggle-button');
    var div3 = document.getElementById('div3');
    var cartContent = document.getElementById('cart-content');
    var totalPriceDisplay = document.getElementById('total-price');
    var totalQuantityDisplay = document.getElementById('total-quantity-display');
    var totalQuantity = 0;

    // Toggle button
toggleButton.addEventListener('click', function () {
    div3.style.display = (div3.style.display === 'none' || div3.style.display === '') ? 'block' : 'none';
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-button')) {
        // Handle the click event
        var button = event.target;
        var productContainer = button.closest('.col2'); // Adjust the selector based on your structure

        // Get product details
        var productName = productContainer.querySelector('div').innerText;
        var productImageSrc = productContainer.querySelector('img').src;
        var productPrice = parseFloat(button.getAttribute('data-price'));

        // Add the product to the cart (similar to your existing logic)
        var existingCartItem = findCartItemByName(productName);

        if (existingCartItem) {
            displayAlreadyInCartMessage(productName);
        } else {
            var cartItem = createCartItem(productName, productImageSrc, productPrice, 1);
            cartContent.appendChild(cartItem);
        }

        // Update total price and quantity
        updateTotalPrice();
        updateTotalQuantity();

        // Show the cart window
        div3.style.display = 'block';
    }
});


	function displayAlreadyInCartMessage(productName) {
        alert('The product "' + productName + '" is already in the cart.');
    }
	

    // Quantity update
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('quantity-increase') || event.target.classList.contains('quantity-decrease')) {
        // Update quantity and total price
        var productContainer = event.target.closest('.cart-item');
        updateQuantity(productContainer, event.target.classList.contains('quantity-increase') ? 1 : -1);
        updateTotalPrice();

        // Update total quantity
        updateTotalQuantity();
    }
});

    // Delete button
   document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        var productContainer = event.target.closest('.cart-item');
        cartContent.removeChild(productContainer);
        updateTotalPrice();
        // Prevent closing toggle window when deleting a product
        event.stopPropagation();

        // Update total quantity
        updateTotalQuantity();
    }
});

    document.addEventListener('click', function (event) {
    if (!event.target.closest('.toggle-button') && !event.target.closest('#div3') && !event.target.classList.contains('delete-button')) {
        div3.style.display = 'none';
    }
});


    function findCartItemByName(name) {
        return Array.from(cartContent.children).find(function (item) {
            return item.dataset.productName === name;
        });
    }

    function increaseCartItemQuantity(cartItem) {
        var quantityElement = cartItem.querySelector('.cart-quantity');
        var currentQuantity = parseInt(quantityElement.innerText, 10);
        quantityElement.innerText = currentQuantity + 1;

        updateCartItemPrice(cartItem, currentQuantity + 1);
    }

 function updateQuantity(productContainer, change) {
    var quantityElement = productContainer.querySelector('.cart-quantity');
    var currentQuantity = parseInt(quantityElement.innerText, 10);

    // Ensure that the new quantity is at least 1
    var newQuantity = Math.max(1, currentQuantity + change);

    quantityElement.innerText = newQuantity;

    // Show/hide increase and decrease buttons based on quantity
    var increaseButton = productContainer.querySelector('.quantity-increase');
    var decreaseButton = productContainer.querySelector('.quantity-decrease');

    increaseButton.style.visibility = 'visible';

    if (newQuantity === 1) {
        decreaseButton.style.visibility = 'none'; // Hide decrease button
        decreaseButton.style.backgroundColor = 'grey'; // Change background color to grey
    } else {
        decreaseButton.style.visibility = 'visible'; // Show decrease button
        decreaseButton.style.backgroundColor = ''; // Reset background color
    }

    var cartItem = productContainer;
    updateCartItemPrice(cartItem, newQuantity);
}





    function updateTotalQuantity() {
        totalQuantity = Array.from(cartContent.children).reduce(function (total, item) {
            var itemQuantity = parseInt(item.querySelector('.cart-quantity').innerText, 10);
            return total + itemQuantity;
        }, 0);

        totalQuantityDisplay.innerText = totalQuantity;
    }


    function updateCartItemPrice(cartItem, quantity) {
        var priceElement = cartItem.querySelector('.cart-price');
        var productPrice = parseFloat(priceElement.dataset.productPrice);
        var newPrice = productPrice * quantity;
        priceElement.innerText = '₹' + newPrice.toFixed(2);
    }

function createCartItem(name, imageSrc, price, quantity) {
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.productName = name;
    cartItem.innerHTML = '<div class="cart-product-info">' +
        '<img class="cart-product-image" src="' + imageSrc + '" alt="' + name + '" style="width: 120px; height: 120px;">' +
        '<span class="cart-product-details">' +
        '<span class="cart-product-name">' + name + '</span>' +
        '<div class="cart-quantity-controls">' +
        '<button class="quantity-decrease quantity-button">-</button>' +
        '<span class="cart-quantity quantity-display" data-quantity="' + quantity + '"><b>' + quantity + '</b></span>' +
        '<button class="quantity-increase quantity-button">+</button>' +
        '</div>' +
        '<button class="delete-button delete-button">Delete</button>' +
        '</span>' +
        '</div>' +
        '<span class="cart-price" data-product-price="' + price + '">₹' + (price * quantity).toFixed(2) + '</span>';

    return cartItem;
}


    function updateTotalPrice() {
        var total = 0;
        var cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(function (item) {
            var itemPrice = parseFloat(item.querySelector('.cart-price').innerText.replace('₹', ''));
            total += itemPrice;
        });

        totalPriceDisplay.innerText = 'Total: ₹' + total.toFixed(2);
    }
	
var body2Content = [
            { imageSrc: "Jsimg/images1.jpg", price: "1500.00", productName: "Product 1" },
			{ imageSrc: "Jsimg/images2.jpg", price: "995.00", productName: "Product 2" },
			{ imageSrc: "Jsimg/images3.jpg", price: "1999.00", productName: "Product 3" },
			{ imageSrc: "Jsimg/images4.jpg", price: "790.00", productName: "Product 4" },
			{ imageSrc: "Jsimg/images20.jpg", price:"954.00", productName:"Product 5" },
            // Add more items as needed
        ];

        var body3Content = [
            { imageSrc: "Jsimg/images19.jpg", price:"993.00", productName: "Product 6" },
			{ imageSrc: "Jsimg/images9.jpg", price: "1020.00", productName: "Product 7" },
			{ imageSrc: "Jsimg/images10.jpg", price:"980.00", productName: "Product 8" },
			{ imageSrc: "Jsimg/images11.jpg", price:"940.00", productName: "Product 9" },
			{ imageSrc: "Jsimg/images13.jpg", price:"990.00", productName: "Product 10" },
            // Add more items as needed
        ];

        /*var body4Content = [
            { imageSrc: "Jsimg/images18.jpg", label: "Ethnic Wear", price: "From ₹950" }, 
			{ imageSrc: "Jsimg/images7.jpg", label: "Western Wear", price: "From ₹950" }, 
			{ imageSrc: "Jsimg/images21.jpg", label: "Sarees From", price: "From ₹950" }, 
			{ imageSrc: "Jsimg/images22.jpg", label: "Earring", price: "From ₹950" }, 
			{ imageSrc: "Jsimg/images23.jpg", label: "Footwear", price: "From ₹950" },
            // Add more items as needed
        ];*/

        // Function to populate a div with content
      function populateDiv(divId, content) {
    var div = document.getElementById(divId);
    content.forEach(function (item) {
        var productDiv = document.createElement('div');
        productDiv.className = 'col2'; // You can set the class based on your styling

        // Populate the product div with content
        // Customize this based on your actual content structure
        productDiv.innerHTML = `
            <img src="${item.imageSrc}" width="220" height="240">
             <div class="product-name" style="margin-left: -10px; text-align: center; font-weight: bold;">${item.productName}</div>
            <div class="product-price">₹<b>${item.price}</b></div>
            <button class="add-to-cart-button" data-price="${item.price}">Add To Cart</button>
            <!-- Add more content as needed -->
        `;

        // Apply styling to the product price
        productDiv.querySelector('.product-price').style.fontWeight = 'bold';
        productDiv.querySelector('.product-price').style.fontSize = '16px'; // Adjust the font size as needed

        div.appendChild(productDiv);
    });
}




        // Populate the divs with content
        populateDiv('body2', body2Content);
        populateDiv('body3', body3Content);
       //populateDiv('body4', body4Content);
	   
	   
});
