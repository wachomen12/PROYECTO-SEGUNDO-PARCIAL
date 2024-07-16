import React, { useEffect, useState } from 'react';
import '../../assets/css/perfil.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const Perfil = () => {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (!userLoggedIn || !userId) {
      alert('Por favor, inicie sesión primero.');
      window.location.href = '/login';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioActual = usuarios.find((usuario: any) => usuario.id === parseInt(userId));

    if (usuarioActual) {
      setUsuario(usuarioActual);
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

    const cerrarSesion = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userLoggedIn');
      window.location.href = '/login';
    };

    const contenedorBotonArriba = document.getElementById('contenedorBoton-arriba');
    const botonSoporte = document.getElementById('boton-soporte');
    const botonCerrarSesion = document.getElementById('/login');

    if (contenedorBotonArriba) {
      contenedorBotonArriba.addEventListener('click', toggleMenu);
    }

    if (botonSoporte) {
      botonSoporte.addEventListener('click', goToSupport);
    }

    if (botonCerrarSesion) {
      botonCerrarSesion.addEventListener('click', cerrarSesion);
    }

    return () => {
      if (contenedorBotonArriba) {
        contenedorBotonArriba.removeEventListener('click', toggleMenu);
      }

      if (botonSoporte) {
        botonSoporte.removeEventListener('click', goToSupport);
      }

      if (botonCerrarSesion) {
        botonCerrarSesion.removeEventListener('click', cerrarSesion);
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="login" id="login">Cerrar sesión</a></li>
          <li><a href="/horario" id="registro-horarios">Registro de horario</a></li>
          <li><a href="/matriculas" id="matriculas">Ver Matriculas existentes</a></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>

      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
          <div className="hero">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h1 className="hero-titulo">Perfil de usuario</h1>
          </div>
        </section>
        <div id="perfil-container">
          {usuario ? (
            <div>
              <h2>Perfil de {usuario.nombre} {usuario.apellido}</h2>
              <p>Nombre: {usuario.nombre}</p>
              <p>Apellido: {usuario.apellido}</p>
              <p>Facultad: {usuario.facultad}</p>
              <p>Cédula: {usuario.cedula}</p>
              <p>Celular: {usuario.celular}</p>
              <p>Correo: {usuario.correo}</p>
              <p>Fecha de Nacimiento: {usuario.fechaNacimiento}</p>
            </div>
          ) : (
            <p>No se encontró el perfil del usuario.</p>
          )}
        </div>
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

export default Perfil;
