const modalContainer = document.querySelector('.modal-container');
const modalOverlay = document.querySelector('.modal-overlay');

const displayCart = () => {
    //modal Header
    const modalHeader = document.createElement('div');

    const modalClose = document.createElement('div');
    modalClose.innerText='❎';
    modalClose.className = 'modal-close';
    modalHeader.append(modalClose);

};