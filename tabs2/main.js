const buttonsContainer = document.querySelector('.nav-links-container');
const tabContainer = document.querySelector('.tabs-container')
const ACTIVE_CLASSNAME = 'active'

buttonsContainer.addEventListener('click', ({target})=> {
    if (target.dataset.id) {
        const id = target.dataset.id;
        console.log(buttonsContainer.querySelector('.btn-active'))
        buttonsContainer.querySelector('.btn-active').classList.remove('btn-active')
        target.classList.add('btn-active')
        console.log(target)
        

        tabContainer.querySelector(`.${ACTIVE_CLASSNAME}`).classList.remove(ACTIVE_CLASSNAME);
        const tabText = tabContainer.querySelector(`[data-id="${id}"]`);
        tabText.classList.add(ACTIVE_CLASSNAME);
    }

});
