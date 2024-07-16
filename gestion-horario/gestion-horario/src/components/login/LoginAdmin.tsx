import React, { useState, useEffect } from 'react';
import '../../assets/css/login.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ usuario: '', contrasena: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { usuario, contrasena } = formData;

    // Verificar si las credenciales son válidas
    if (usuario === 'bryanCano' && contrasena === 'bryan123') {
      // Credenciales válidas, redirigir a la página de administración
      window.location.href = '/perfilAdmin'; // Cambiar 'admin.html' por la página de administración
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
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

    const goToLogin = () => {
      window.location.href = '/login';
    };

    const contenedorBotonArriba = document.getElementById('contenedorBoton-arriba');
    const botonLogin = document.getElementById('boton-login');

    if (contenedorBotonArriba) {
      contenedorBotonArriba.addEventListener('click', toggleMenu);
    }

    if (botonLogin) {
      botonLogin.addEventListener('click', goToLogin);
    }

    return () => {
      if (contenedorBotonArriba) {
        contenedorBotonArriba.removeEventListener('click', toggleMenu);
      }

      if (botonLogin) {
        botonLogin.removeEventListener('click', goToLogin);
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/" id="Inicio">Inicio</a></li>
          <li><a href="/registro" id="registro">Registro</a></li>
          <li><a href="/carrera" id="carreras">Facultades</a></li>
        </ul>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
        </section>
        <section className="panel">
          <div className="panel-login">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h2>Administración</h2>
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="usuario">Usuario:</label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
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
            <button id="boton-login">Iniciar sesión como usuario</button>
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

export default LoginAdmin;
