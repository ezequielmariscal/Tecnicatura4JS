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

};

cartBtn.addEventListener('click', displayCart);