$(document).ready(function () {

    $('.menu-ham').on('click', function () {
        $('.contenedor-nav').slideToggle();


    })
})

const resultado = document.querySelector('#resultado');

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
    
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
    
    imagenes.data.forEach( imagen => {

        const {preview_gif} = imagen;
        resultado.innerHTML += `
            
                    <img class="w-full" src="${preview_gif}"/>
                   
            `;
    });
      
}