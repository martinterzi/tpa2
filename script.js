$(document).ready(function () {

    $('.menu-ham').on('click', function () {
        $('.contenedor-nav').slideToggle();


    })
})

const resultado = document.querySelector('#resultado');

const track = document.querySelector('#track');

window.onload = () => {
    const form = document.querySelector('#form');
    form.addEventListener('click', validarFormulario);

};


function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        // mensaje de error
        mostrarAlerta("Agrega un término de búsqueda");

        return;
    }

    buscarImagenes();
}

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.aa');
    if (!alerta) {

        const alerta = document.createElement('p');
        alerta.classList.add('aa');
        alerta.innerHTML = `
             <strong class="font-bold">Error!</strong>
             <span>${mensaje}</span>`;
        resultado.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }



}

// Busca las imagenes en una API
function buscarImagenes() {
    const terminoBusqueda = document.querySelector('#termino').value;

    const key = 'va2haK5rm1yEoCYsd2zUqiLjxonxwd9M';
    const url = (`https://api.giphy.com/v1/gifs/search?api_key=${key}&limit=12&q=${terminoBusqueda}`);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {

            console.log(resultado)
            mostrarImagenes(resultado.data);
        })


}


function mostrarImagenes(imagenes) {
    document.getElementById("resultado").style.display='grid';
    
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    imagenes.forEach(imagen => {

        const { images } = imagen;
        resultado.innerHTML += `
                <div class="res-im">
                    <img class="im-pre" src="${images.preview_gif.url}"/>
                </div>
            `;
    });

}


/*TRENDING-------------------------------------------*/

function llamarTrending() {
    

    const key = 'va2haK5rm1yEoCYsd2zUqiLjxonxwd9M';
    const url = (`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=15`);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {

            console.log(resultado)
            mostrarImagenesTrending(resultado.data);
        })


}


function mostrarImagenesTrending(imagenes) {

    imagenes.forEach(imagen => {

        const { images } = imagen;
              track.innerHTML += `
                <div class="card">
                    <img class="im-pre" src="${images.preview_gif.url}"/>
                </div>
            `;
    });

}



const track = document.querySelector('.track');
let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
        transform = parseInt(transformMatrix.split(',')[4].trim());
    }
}

const gestureMove = (e) => {
    if (moving) {
        const currentPosition = e.pageX;
        const diff = currentPosition - initialPosition;
        track.style.transform = `translateX(${transform + diff}px)`;
    }
};

const gestureEnd = (e) => {
    moving = false;
}

if (window.PointerEvent) {
    window.addEventListener('pointerdown', gestureStart);

    window.addEventListener('pointermove', gestureMove);

    window.addEventListener('pointerup', gestureEnd);
} else {
    window.addEventListener('touchdown', gestureStart);

    window.addEventListener('touchmove', gestureMove);

    window.addEventListener('touchup', gestureEnd);

    window.addEventListener('mousedown', gestureStart);

    window.addEventListener('mousemove', gestureMove);

    window.addEventListener('mouseup', gestureEnd);
}

/*    */