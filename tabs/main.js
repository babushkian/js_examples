const tabs = document.querySelector('.tabs');
const tabButtons= document.querySelectorAll('[role="tab"]');
const tabPanels =  Array.from(document.querySelectorAll('[role="tabpanel"]'));

function handleClick(e) {
    //console.log(e.currentTarget)
    tabPanels.forEach(function(panel) {
        // console.log(panel)
        panel.hidden = true;
    });
    tabButtons.forEach(tab => {
        tab.ariaSelected = false;
        //tab.setAttribute('aria-selected', false) //или так
    });
    e.currentTarget.setAttribute('aria-selected', true);
    //const id = e.currentTarget.id;
    const {id} = e.currentTarget; //более хитрый способ записи взятия одноименного атрибута
    //console.log('id > ', id)
    const tabPanel = tabPanels.find(panel=> {
        if (panel.getAttribute('aria-labelledby') === id) {
            return true;
        }
    });
    tabPanel.hidden = false;
};


tabButtons.forEach(button => button.addEventListener('click', handleClick));