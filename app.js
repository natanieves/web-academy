const car = document.querySelector('#car-menu');
const carContent = document.querySelector('#car-list tbody');
const emptyCarBtn = document.querySelector('#empty-car');
const coursesList = document.querySelector('#course-list');
let carItems = [];

loadEventListeners();
function loadEventListeners() {
    coursesList.addEventListener('click', addCourse);

    car.addEventListener('click', emptyCourse);

    emptyCarBtn.addEventListener('click', () => {
        carItems = [];

        emptyHtml();
    } )
}

function addCourse(e){
    if (e.target.classList.contains('btn-card')) {
        const selectCourse = e.target.parentElement.parentElement;
        readDataCourse(selectCourse);
    }   
}

function emptyCourse(e) {
    if(e.target.classList.contains('empty-course')) {
        const courseId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        carItems = carItems.filter(course => course.id !== courseId);

        carHtml();
    }
}

function readDataCourse(course) {

    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h2').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('button').getAttribute('data-id'),
        amount: 1

    }

    const exist = carItems.some( course => course.id === infoCourse.id);
    if (exist) {
        const courses = carItems.map ( course => {
            if(course.id === infoCourse.id){
                course.amount++;
                return course;
            }else {
                return course; 
            }    
        })
        carItems=[...courses];
    }else{
        carItems = [...carItems, infoCourse];
    }

    carHtml();
}

function carHtml() {

    emptyHtml();

    carItems.forEach( course => {
        const { image, title, price,amount, id} = course;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>    
            <td>${title}</td>
            <td>${price}</td>
            <td class="amount">${amount}</td>
            <td>
            <a href='#' class="empty-course" data-id="${course.id}"> X </a> 
            </td>
        `;

            carContent.appendChild(row)
    })
}

function emptyHtml() {
    while(carContent.firstChild) {
        carContent.removeChild(carContent.firstChild)
    }
}