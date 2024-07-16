import React, { useEffect } from 'react';
import '../../assets/css/carrera.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import Facu1 from '../../assets/image/facu1.jpg';
import Facu2 from '../../assets/image/facu2.jpg';
import Facu3 from '../../assets/image/facu3.jpg';
import Facu4 from '../../assets/image/facu4.jpg';
import Facu5 from '../../assets/image/facu5.jpg';
import Facu6 from '../../assets/image/facu6.jpg';
import Facu7 from '../../assets/image/facu7.jpg';

const facultades = [
  {
    id: 1,
    nombre: 'Facultad de Ciencias Médicas',
    descripcion: 'La Facultad de Ciencias Médicas se dedica a formar profesionales de la salud altamente capacitados y comprometidos con el bienestar y la atención médica de la comunidad. Nuestros programas académicos integran la teoría médica con la práctica clínica para preparar a los estudiantes para una amplia gama de carreras en el campo de la medicina.',
    ubicacion: 'Puerta 1',
    imagen: Facu1
  },
  {
    id: 2,
    nombre: 'Facultad de Ciencias Informáticas',
    descripcion: 'La Facultad de Ciencias Informáticas ofrece programas académicos innovadores y de vanguardia en el campo de la informática, preparando a los estudiantes para enfrentar los desafíos tecnológicos del futuro.',
    ubicacion: 'Puerta 1',
    imagen: Facu2
  },
  {
    id: 3,
    nombre: 'Facultad de Derecho',
    descripcion: 'La Facultad de Derecho se dedica a formar profesionales con una sólida formación ética y legal, capaces de contribuir al desarrollo y la justicia en la sociedad.',
    ubicacion: 'Puerta 2',
    imagen: Facu3
  },
  {
    id: 4,
    nombre: 'Facultad de Ciencias Administrativas',
    descripcion: 'La Facultad de Ciencias Administrativas ofrece una amplia gama de programas académicos en áreas como administración de empresas, contabilidad, marketing y gestión de recursos humanos.',
    ubicacion: 'Puerta 3',
    imagen: Facu4
  },
  {
    id: 5,
    nombre: 'Facultad de Educación',
    descripcion: 'La Facultad de Educación se compromete a formar profesionales altamente capacitados y comprometidos con la mejora continua de la educación en todos los niveles.',
    ubicacion: 'Puerta 1',
    imagen: Facu5
  },
  {
    id: 6,
    nombre: 'Facultad de Arquitectura',
    descripcion: 'La Facultad de Arquitectura ofrece programas académicos rigurosos que preparan a los estudiantes para diseñar y construir entornos habitables y sostenibles.',
    ubicacion: 'Puerta 2',
    imagen: Facu6
  },
  {
    id: 7,
    nombre: 'Facultad de Ingeniería',
    descripcion: 'La Facultad de Ingeniería ofrece una amplia variedad de programas de ingeniería que combinan teoría y práctica para preparar a los estudiantes para enfrentar los desafíos tecnológicos del mundo real.',
    ubicacion: 'Puerta 3',
    imagen: Facu7
  }
];

const Carrera = () => {
  useEffect(() => {
    const verMasButtons = document.querySelectorAll('.ver-mas-btn');
    const infoFacultad = document.getElementById('info-facultad');
    const nombreFacultad = document.getElementById('nombre-facultad');
    const descripcionFacultad = document.getElementById('descripcion-facultad');
    const cerrarInfoButton = document.getElementById('cerrar-info-btn');

    const mostrarInfoFacultad = (facultadId: number) => {
      const facultad = facultades.find(fac => fac.id === facultadId);
      if (facultad && nombreFacultad && descripcionFacultad && infoFacultad) {
        nombreFacultad.textContent = facultad.nombre;
        descripcionFacultad.textContent = `${facultad.descripcion} ${facultad.ubicacion}`;
        infoFacultad.classList.remove('oculto');
      }
    };

    verMasButtons.forEach(button => {
      button.addEventListener('click', function() {
        const facultadId = Number(button.getAttribute('data-facultad'));
        mostrarInfoFacultad(facultadId);
      });
    });

    if (cerrarInfoButton) {
      cerrarInfoButton.addEventListener('click', function() {
        if (infoFacultad) infoFacultad.classList.add('oculto');
      });
    }

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

      verMasButtons.forEach(button => {
        button.removeEventListener('click', function() {
          const facultadId = Number(button.getAttribute('data-facultad'));
          mostrarInfoFacultad(facultadId);
        });
      });

      if (cerrarInfoButton) {
        cerrarInfoButton.removeEventListener('click', function() {
          if (infoFacultad) infoFacultad.classList.add('oculto');
        });
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/" id="inicio">Inicio</a></li>
          <li><a href="/login" id="login">Iniciar sesión</a></li>
          <li><a href="/registro" id="registro">Registro</a></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
          <div className="hero">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h1 className="hero-titulo">Facultades de la uleam</h1>
          </div>
        </section>
        <section>
          <div className="facultades-container">
            {facultades.map((facultad) => (
              <div className="facultad-item" key={facultad.id}>
                <img src={facultad.imagen} alt={`Facultad ${facultad.id}`} />
                <div className="info">
                  <h3>{facultad.nombre}</h3>
                  <button className="ver-mas-btn" data-facultad={facultad.id}>Ver más</button>
                </div>
              </div>
            ))}
          </div>
          <div id="info-facultad" className="oculto">
            <h2 id="nombre-facultad"></h2>
            <p id="descripcion-facultad"></p>
            <button id="cerrar-info-btn">Cerrar</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Carrera;
