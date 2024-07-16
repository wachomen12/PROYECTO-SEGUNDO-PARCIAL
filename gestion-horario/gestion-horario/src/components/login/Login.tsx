import React, { useState, useEffect } from 'react';
import '../../assets/css/login.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', contrasena: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { correo, contrasena } = formData;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(
      (user: { correo: string; contrasena: string }) =>
        user.correo === correo && user.contrasena === contrasena
    );

    if (usuario) {
      localStorage.setItem('userId', usuario.id);
      localStorage.setItem('userLoggedIn', 'true');
      alert('Inicio de sesión exitoso.');
      window.location.href = '/perfil';
    } else {
      alert('Correo electrónico o contraseña incorrectos.');
    }
  };

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

    const goToRegistro = () => {
      window.location.href = '/registro';
    };

    const goToAdminLogin = () => {
      window.location.href = '/loginAdmin';
    };

    const contenedorBotonArriba = document.getElementById('contenedorBoton-arriba');
    const botonSoporte = document.getElementById('boton-soporte');
    const botonRegistro = document.getElementById('boton-registro');
    const botonAdmin = document.getElementById('boton-admin');

    if (contenedorBotonArriba) {
      contenedorBotonArriba.addEventListener('click', toggleMenu);
    }

    if (botonSoporte) {
      botonSoporte.addEventListener('click', goToSupport);
    }

    if (botonRegistro) {
      botonRegistro.addEventListener('click', goToRegistro);
    }

    if (botonAdmin) {
      botonAdmin.addEventListener('click', goToAdminLogin);
    }

    return () => {
      if (contenedorBotonArriba) {
        contenedorBotonArriba.removeEventListener('click', toggleMenu);
      }

      if (botonSoporte) {
        botonSoporte.removeEventListener('click', goToSupport);
      }

      if (botonRegistro) {
        botonRegistro.removeEventListener('click', goToRegistro);
      }

      if (botonAdmin) {
        botonAdmin.removeEventListener('click', goToAdminLogin);
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/" id="inicio">Inicio</a></li>
          <li><a href="/registro" id="registro">Registro</a></li>
          <li><a href="/carrera" id="carreras">Facultades</a></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
        </section>
        <section className="panel">
          <div className="panel-login">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h2>Usuarios</h2>
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="correo">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Iniciar Sesión</button>
            </form>
            <button id="boton-registro">Registro</button>
            <button id="boton-admin">Iniciar sesión como administrador</button>
          </div>
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

export default Login;
