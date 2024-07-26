// show cart

(function(){
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");
    
    

    cartInfo.addEventListener("click", function() {
        cart.classList.toggle("show-cart")
    });
})();


// add items into the cart

(function(){
    const cartBtn = document.querySelectorAll(".store-item-icon");

    cartBtn.forEach(function(btn){
        btn.addEventListener("click", function(event){
         //   console.log(event.target);

         if (event.target.parentElement.classList.contains("store-item-icon")){
            let fullPath = event.target.parentElement.previousElementSibling.src;
            let pos = fullPath.indexOf("img") + 3;
            let partPath = fullPath.slice(pos);

            const item = {};
            item.img = `img-cart${partPath}`;

            let name = event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
            item.name = name;

            let price = event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
            let finalPrice = price.slice(1).trim();
            item.price = finalPrice;


           // console.log(finalPrice)
           //console.log(item)

           const cartItem = document.createElement("div");
           cartItem.classList.add(
            "cart-item", "d-flex", "justify-content-between", "text-capitalize", "my-3",
           );

           cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <div class="quantity d-flex justify-content-between text-capitalize">
            <button class="minus" id="minus">-</button>
            <span class="number">1</span>
            <button class="plus" id="plus">+</button>
          </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
            </div>
           `;

           //select cart
           const cart = document.getElementById("cart");
           const total = document.querySelector(".cart-total-container");

           cart.insertBefore(cartItem, total);
           alert('item added to the cart');
           showTotals();
         }

        })
    })

    //  decrement of quantity
    document.getElementById("minus").addEventListener('click', function (e){
        console.log('decrement button')
    })
    // decrement of quantity
    document.getElementById("plus").addEventListener('click', function (e){
        console.log('crement button')
    })

    // show totals
    function showTotals() {
        const total = [];
        const items = document.querySelectorAll(".cart-item-price");

       
        items.forEach(function(item) {
            total.push(parseFloat(item.textContent));
        });

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total
        }, 0);

        const finalMoney = totalMoney.toFixed(2);

        document.getElementById("cart-total").textContent = finalMoney;
        document.querySelector(".item-total").textContent = finalMoney;
        document.getElementById("item-count").textContent = total.length;
    
    }
// remove cartItem
document.getElementById('cart').addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('cart-item-remove')) {
        e.target.parentElement.parentElement.remove();
        showTotals();
    }
});

// clear cart
document.querySelector('.clear-cart').addEventListener('click', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(function(item) {
        item.remove();
    });
    showTotals();
});

})();

// search items
document.getElementById('search-item').addEventListener('keyup', searchItems);

// search items
function searchItems(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    const cardItems = document.querySelectorAll('.card');

    cardItems.forEach(cardItem => {
        const itemName = cardItem.querySelector('.card-body').textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            cardItem.style.display = 'flex';
        } else {
            cardItem.style.display = 'none';
        }
    });
}

// Add event listeners to all filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', filterItems);
});

function filterItems(e) {
    e.preventDefault();
    
    const filter = e.target.getAttribute('data-filter');
    const items = document.querySelectorAll('.store-item');
    
    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
        } else {
            if (item.getAttribute('data-item') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}



