import React, { useEffect } from 'react';
import '../../assets/css/home.css';
import Uleam1 from '../../assets/image/uleam1.jpeg';
import Uleam2 from '../../assets/image/uleam2.jpg';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import Mapa from '../../assets/image/mapaUleam.png';

const Home = () => {
  useEffect(() => {
    const toggleMenu = () => {
      const contenedorArriba = document.getElementById('contenedor-arriba');
      const contenedorMedio = document.getElementById('contenedor-medio');
      if (contenedorArriba && contenedorMedio) {
        if (contenedorArriba.style.display === 'block') {
          contenedorArriba.style.display = 'none';
          contenedorMedio.style.marginLeft = '0';
        } else {
          contenedorArriba.style.display = 'block';
          contenedorMedio.style.marginLeft = '250px';
        }
      }
    };

    const goToSupport = () => {
      window.location.href = 'https://wa.me/+593992599789';
    };

    const contenedorBotonArriba = document.getElementById('contenedorBoton-arriba');
    const botonSoporte = document.getElementById('boton-soporte');

    if (contenedorBotonArriba) {
      contenedorBotonArriba.addEventListener('click', toggleMenu);
    }

    if (botonSoporte) {
      botonSoporte.addEventListener('click', goToSupport);
    }

    return () => {
      if (contenedorBotonArriba) {
        contenedorBotonArriba.removeEventListener('click', toggleMenu);
      }

      if (botonSoporte) {
        botonSoporte.removeEventListener('click', goToSupport);
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/login" id="login">Iniciar sesión</a></li>
          <li><a href="registro" id="registro">Registro</a></li>
          <li><a href="/carrera" id="carreras">Facultades</a></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
          <div className="hero">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h1 className="hero-titulo">Gestión de horarios de la uleam</h1>
          </div>
        </section>
        <section className="contenido">
          <div className="contenido-titulo_forma">
            <h2 className="contenido-titulo_titulo">En la ULEAM, nos comprometemos a ofrecerte una educación de calidad que te prepare para enfrentar los desafíos del mundo actual. Nuestra comunidad universitaria está dedicada a fomentar el aprendizaje, la investigación y la excelencia académica en un entorno inclusivo y colaborativo.</h2>
          </div>
          <div className="contenido-imagenes">
            <img src={Uleam1} alt="Imagen 1" />
            <img src={Uleam2} alt="Imagen 2" />
          </div>
        </section>
        <section className="ubicacion">
          <h2>Ubicación de la Universidad</h2>
          <img src={Mapa} alt="ubicación" />
          <a href="https://www.bing.com/maps?osid=fb0be5b7-bbe9-4666-839f-0b4367e904f5&cp=-0.957218~-80.758334&lvl=17.05&pi=0&imgid=477f0fe5-9494-440d-8e04-34b0ca4e1942&v=2&sV=2&form=S00027">Ir</a>
        </section>
      </main>
      <footer className="contenedor-abajo">
        <div className="contenido-abajo">
          <h3 className="contenido-texto">
            © 2024 Universidad Laica Eloy Alfaro de Manabí - Jaramillo Cano Bryan Roberto.
          </h3>
        </div>
      </footer>
    </div>
  );
};

export default Home;
