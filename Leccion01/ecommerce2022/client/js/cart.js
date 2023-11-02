const modalContainer = document.querySelector('.modal-container');
const modalOverlay = document.querySelector('.modal-overlay');

const cartBtn = document.getElementById('cart-btn'); // captura el id del buttom

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
            
        }); //fin decrease
    }); 
    const increase = modalBody.querySelector('.quantity-btn-increase');
    increase.addEventListener('click', () => {
        product.quanty ++;
        displayCart();
        
    });//fin increase

    //modal Footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.innerHTML = `
        <div class="total-price">Total: ${total} </div>`;
    modalContainer.append(modalFooter);
};

cartBtn.addEventListener('click', displayCart);