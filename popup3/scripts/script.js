let esc_count = 0
const modalController = ({modal, btnOpen, btnClose, time=400}) => {
    const buttonElems = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);
    modalElem.style.cssText = `
        display:flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity ${time}ms ease;
    `
    const closeModal = event=> {
        esc_count +=1
        console.log('закрываем окно', esc_count)
        const target = event.target
        if (target === modalElem || 
            (btnClose && target.closest(btnClose)) ||
            event.code === 'Escape') {
        
            modalElem.style.opacity = 0;
            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
            }, time);
            window.removeEventListener('keydown', closeModal);
        }
    };

    const openModal = ()=> {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModal)

    };

    buttonElems.forEach(btn =>{
    btn.addEventListener('click', openModal);
    });


    modalElem.addEventListener('click', closeModal);
};

modalController({
    modal: '.modal_1',
    btnOpen: '.section__button_1',
    btnClose: '.modal__close'
});

modalController({
    modal: '.modal_2',
    btnOpen: '.section__button_2',
    btnClose: '.modal__close',
    time: 2000
});