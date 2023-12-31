const modalContainer = document.querySelector('.modal-container');
const modalOverlay = document.querySelector('.modal-overlay');

const cartBtn = document.getElementById('cart-btn'); // captura el id del buttom
const cartCounter = document.getElementById('cart-counter');

const displayCart = () => {
    modalContainer.innerHTML = ''; // me sirve para refrescar el html que ya creamos
    modalContainer.style.display = 'block'; // para que se muestren los estilos del modal
    modalOverlay.style.display = 'block';

    //modal Header
    const modalHeader = document.createElement('div');

    const modalClose = document.createElement('div');
    modalClose.innerText='❎';
    modalClose.className = 'modal-close';
    modalHeader.append(modalClose);

    modalClose.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        modalOverlay.style.display = 'none';
    });//fin modalClose

    const modalTitle = document.createElement('div');
    modalTitle.innerText = 'Cart';
    modalTitle.className = 'modal-title';
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);
    
    //modal Body
    if (cart.length > 0){
    cart.forEach((product) => {
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = `
        <div class="product">
            <img class="product-img" src="${product.img}"/>
            <div class="product-info">
                <h4>${product.productName}</h4>
            </div>
            <div class="quantity">
                <span class="quantity-btn-decrese">-</span>
                <span class="quantity-input">${product.quanty}</span>
                <span class="quantity-btn-increase">+</span>
            </div>
                <div class="price">${product.price * product.quanty}$</div>
                <div class="delete-product">❌</div>
        </div>
        `;
    modalContainer.append(modalBody);
    
    const decrese = modalBody.querySelector('.quantity-btn-decrese');
        decrese.addEventListener('click', () => {
            if (product.quanty != 1) {
            product.quanty --;
            displayCart();
            }
            displayCartCounter();
        }); //fin decrease
    }); 
    const increase = modalBody.querySelector('.quantity-btn-increase');
    increase.addEventListener('click', () => {
        product.quanty ++;
        displayCart();
        displayCartCounter();
    });//fin increase

    //delete product
    const deleteProduct = modalBody.querySelector('.delete-product');

    deleteProduct.addEventListener('click', () => {
         deleteCartProduct(product.id);
    });//fin deleteProduct

    //modal Footer
    const total = cart.reduce((acc, el) => acc + el.price * el.quanty,0);

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.innerHTML = `
        <div class="total-price">Total: ${total} </div>
        <button class="btn-primary" id="checkout-btn">go to Checkout</button>
        <div id="button-checkout"></div>
        `;
    modalContainer.append(modalFooter);
    //mp
    const mercadopago = new MercadoPago("primary key MP", {
        locale: "es-AR", // The most common are 'pt-BR', 'en-US' and 'es-AR'
    });

    const checkoutButton = modalFooter.querySelector('#checkout-btn');

    checkoutButton.addEventListener('click', function (){
       
        checkoutButton.remove();
 
         const orderData = {
             quantity: 1,
             description: 'compra de ecommerce',
             price: total,
         };
 
         fetch('http://localhost:8080/create_preference', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(orderData),
         })
         .then(function (response) {
             return response.json();
         })
         .then(function (preference) {
             createCheckoutButton(preference.id);
         })
         .catch(function () {
             alert('Unexpected error');
         });
     });

    function createCheckoutButton(preferenceId) {
        //Initialice the checkout
         const bricksBuilder = mercadopago.bricks();

         const renderComponent = async (bricksBuilder) => {
            // if (window.checkoutButton) checkoutButton.unmount();

            await bricksBuilder.create(
                "wallet",
                "button-checkout", //class/id where the payment button will be displayed
                {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                    callbacks: {
                        onError: (error) => console.error(error),
                        onReady: () => {},
                    },
                } 
            );                
        };
        window.checkoutButton = renderComponent(bricksBuilder);
    }

}else{
    const modalText = document.createElement('h2')
    modalText.className = 'modal-body';
    modalText.innerText = 'No hay productos en el carrito';
    modalContainer.append(modalText);
    }

};

cartBtn.addEventListener('click', displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cart.length > 0) {
        cartCounter.style.display = 'block';
        cartCounter.innerText = cartLength;
    }else{
        cartCounter.style.display = 'none';
    }
};