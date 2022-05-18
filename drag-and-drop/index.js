const drag_able_list = document.getElementById('drag-able-list'),
check = document.getElementById('check-btn');


const richestPeople = [
    'Jeff Bezos',
    'Bill Gate',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// store list item
const listItems = [];

let dragStartIndex;

createList();

// insert list item into DOM
function createList() {
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="drag-able" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);
        drag_able_list.appendChild(listItem);
    });

    addEventListener();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const item1 = listItems[fromIndex].querySelector('.drag-able');
    const item2 = listItems[toIndex].querySelector('.drag-able');

    listItems[fromIndex].appendChild(item2);
    listItems[toIndex].appendChild(item1);
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

// check the order of list item
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.drag-able').innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener() {
    const dragAbles = document.querySelectorAll('.drag-able');
    const dragListItems = document.querySelectorAll('.drag-able-list li');

    dragAbles.forEach(dragAble => {
        dragAble.addEventListener('dragstart', dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);