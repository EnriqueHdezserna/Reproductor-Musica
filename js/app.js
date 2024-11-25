const tituloSong = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const botonPlay = document.querySelector('.controles button.boton-play-pause');
const iconoControl = document.getElementById('iconoControl');

const minutoInicial =  document.getElementById('minutoInicial');
const minutoFinal =  document.getElementById('minutoFinal');

const canciones = [
  {
    titulo: 'Coldplay - Higher Power',
    artista: 'Coldplay',
    src: 'music/Coldplay - Higher Power.mp3',
  },
  {
    titulo: 'Coldplay - Magic',
    artista: 'Coldplay',
    src: 'music/Coldplay - Magic.mp3',
  },
  {
    titulo: 'Coldplay - My Universe',
    artista: 'Coldplay',
    src: 'music/Coldplay - My Universe.mp3',
  },
  {
    titulo: 'Coldplay - Yellow',
    artista: 'Coldplay',
    src: 'music/Coldplay - Yellow.mp3',
  },
  {
    titulo: 'NEFFEX - Just Breathing',
    artista: 'NEFFEX',
    src: '/music/NEFFEX - Just Breathing.mp3',
  },
  {
    titulo: 'The Weeknd - Take My Breath',
    artista: 'The Weeknd',
    src: 'music/The Weeknd - Take My Breath.mp3',
  },
  {
    titulo: 'Tiago PZK - Salimo de Noche',
    artista: 'Tiago PZK',
    src: 'music/Tiago PZK - Salimo de Noche.mp3',
  },
];

let indiceCancionActual = 0;

function cargarInformacionCancionActual() {
  tituloSong.textContent = canciones[indiceCancionActual].titulo;
  nombreArtista.textContent = canciones[indiceCancionActual].artista;
  cancion.src = canciones[indiceCancionActual].src;
  cancion.addEventListener('loadeddata', function () {});
}
// Al cargar la información de la canción, establecer la duración total
cancion.addEventListener('loadedmetadata', function () {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;

    // Mostrar el tiempo total en minutos y segundos
    let minutos = Math.floor(cancion.duration/60);
    let segundos = Math.floor(cancion.duration % 60).toString().padStart(2, '0');
    minutoFinal.textContent = `${minutos}:${segundos}`;

})



botonPlay.addEventListener('click', reproducirPausar);

function reproducirPausar() {
  //si da play se reproduce sino se pausa
  if (cancion.paused) {
    reproducirCancion();
  } else {
    pausarCancion();
  }
}

function reproducirCancion() {
  cancion.play();
  iconoControl.classList.add('bi-pause-fill');
  iconoControl.classList.remove('bi-play-fill');
}

function pausarCancion() {
  cancion.pause();
  iconoControl.classList.remove('bi-pause-fill');
  iconoControl.classList.add('bi-play-fill');
}

cancion.addEventListener('timeupdate', function() {
    if (!cancion.paused) {
        progreso.value = cancion.currentTime;

        let minutos = Math.floor(cancion.currentTime / 60);
        let segundos = Math.floor(cancion.currentTime % 60).toString().padStart(2, '0');
        minutoInicial.textContent = `${minutos}:${segundos}`;

    }
})

progreso.addEventListener('input', function() {
    cancion.currentTime = progreso.value;
})

progreso.addEventListener('change', function() {
    reproducirCancion();
})

//creamos funcion de la siguiente cancion con el boton

botonAdelante.addEventListener('click', function() {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;   
    cargarInformacionCancionActual();
    reproducirCancion();
});

botonAtras.addEventListener('click', function() {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;   
    cargarInformacionCancionActual();
    reproducirCancion();
});

//cuando la cancion acabe inicia la siguiente cancion

cancion.addEventListener('ended', function () {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    cargarInformacionCancionActual();
    reproducirCancion();
})
cargarInformacionCancionActual();
