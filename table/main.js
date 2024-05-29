const anus = document.querySelector('table');
const infoUl = document.querySelectorAll('ul>li>span');
document.querySelector('table').onclick = function(event) {
    //console.log(event.target);
    if (event.target.tagName !== 'TD') return false;
    console.log(event.target.parentNode.children);
    //let data = Array.from(event.target.parentNode.cildNodes);
    const x = event.target.parentNode.children;
    const y = Array.from(x);
    const z = y.map(item =>item.textContent);
    outText(z);

    
};
function outText(text) {
    text.forEach((item, index) => infoUl[index].textContent=item);
};