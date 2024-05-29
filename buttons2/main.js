const keywords = ['дрова', 'печка', 'полуденница', 'запеканка', 'дизоксирибонуклеиновая кислота', 'забор', 'гвоздь', 'калитка', 'лопух', 'тяпка', 'грядка', 'сирень'];

const btnColumn = document.querySelector('.left_side')


x = new Array(keywords.len)
const a = keywords.forEach( (element,i) => {
    x[i]={'name':element, 'id': i+1 }
});

function createButton(item) {
    return `<button class="button" id="but-${item.id}">${item.name}</button>`;
}


const btnText = x.map(elem => createButton(elem)).join('')
console.log(btnText)
btnColumn.innerHTML=btnText

const buttons = btnColumn.querySelectorAll('.button')
const lspan = document.querySelector('.very_big')

let last_rpessed;
function onOff(event) {
    if (event.target.classList.contains('button')) {
        t = event.target;
        if (last_rpessed) {
            last_rpessed.classList.remove('active')  
        };
        if (last_rpessed !== t) {
            last_rpessed = t;
            t.classList.add('active');
            lspan.textContent = `${t.textContent} (${t.id})`
            
        } else {
            last_rpessed = undefined
            lspan.textContent = default_rigth;
        };
    };
}


btnColumn.addEventListener('click', onOff )

mas=[]
buttons.forEach(button =>{
    mas.push(button.id)
})
default_rigth = mas.join(' ')

lspan.textContent = default_rigth