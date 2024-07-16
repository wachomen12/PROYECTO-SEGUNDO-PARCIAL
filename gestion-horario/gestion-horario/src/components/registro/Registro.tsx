import React, { useEffect, useState } from 'react';
import '../../assets/css/registro.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    facultad: '',
    cedula: '',
    celular: '',
    correo: '',
    contrasena: '',
    verificarContrasena: '',
    fechaNacimiento: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      nombre,
      apellido,
      facultad,
      cedula,
      celular,
      correo,
      contrasena,
      verificarContrasena,
      fechaNacimiento
    } = formData;

    // Validaciones
    if (
      nombre === '' ||
      apellido === '' ||
      facultad === '' ||
      cedula === '' ||
      celular === '' ||
      correo === '' ||
      contrasena === '' ||
      verificarContrasena === '' ||
      fechaNacimiento === ''
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{1,20}$/.test(nombre)) {
      alert('Por favor ingresa un primer nombre válido (solo letras, máximo 20 caracteres).');
      return;
    }

    if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{1,20}$/.test(apellido)) {
      alert('Por favor ingresa un apellido válido (solo letras, máximo 20 caracteres).');
      return;
    }

    if (!/^\d{10}$/.test(cedula)) {
      alert('Por favor ingresa una cédula válida (10 dígitos numéricos).');
      return;
    }

    if (!/^\d{10}$/.test(celular)) {
      alert('Por favor ingresa un número de celular válido (10 dígitos numéricos).');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(correo)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (contrasena.length < 4 || contrasena.length > 10) {
      alert('La contraseña debe tener entre 4 y 10 caracteres.');
      return;
    }

    if (contrasena !== verificarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const fechaNacimientoObj = new Date(fechaNacimiento);
    const fechaNacimientoLimite = new Date('1950-01-01');
    const fechaNacimientoMaxima = new Date('2007-12-31');

    if (
      isNaN(fechaNacimientoObj.getTime()) ||
      fechaNacimientoObj < fechaNacimientoLimite ||
      fechaNacimientoObj > fechaNacimientoMaxima
    ) {
      alert('Por favor ingresa una fecha de nacimiento válida (entre 1950 y 2007).');
      return;
    }

    // Almacenar datos en el localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      apellido,
      facultad,
      cedula,
      celular,
      correo,
      contrasena,
      fechaNacimiento
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado exitosamente.');
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

    const contenedorBotonArriba = document.getElementById('contenedorBoton-arriba');
    const botonSoporte = document.getElementById('boton-soporte');
    const botonLogin = document.getElementById('boton-login');

    if (contenedorBotonArriba) {
      contenedorBotonArriba.addEventListener('click', toggleMenu);
    }

    if (botonSoporte) {
      botonSoporte.addEventListener('click', goToSupport);
    }

    if (botonLogin) {
      botonLogin.addEventListener('click', () => {
        window.location.href = '/login';
      });
    }

    return () => {
      if (contenedorBotonArriba) {
        contenedorBotonArriba.removeEventListener('click', toggleMenu);
      }

      if (botonSoporte) {
        botonSoporte.removeEventListener('click', goToSupport);
      }

      if (botonLogin) {
        botonLogin.removeEventListener('click', () => {
          window.location.href = '/login';
        });
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/" id="Inicio">Inicio</a></li>
          <li><a href="/login" id="login">Iniciar sesión</a></li>
          <li><a href="/carrera" id="carreras">Facultades</a></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
        </section>
        <div className="contenedor-medio-panel">
          <div className="registro-panel">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h2>Registro de Usuario</h2>
            <form id="registro-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Primer Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="facultad">Facultad:</label>
                <select id="facultad" name="facultad" value={formData.facultad} onChange={handleChange} required>
                  <option value="">Seleccionar Carrera</option>
                  <option value="Ingenieria">Ingeniería</option>
                  <option value="Salud">Medicina</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Educacion">Educación</option>
                  <option value="Informatica">Informática</option>
                </select>
              </div>
              <div>
                <label htmlFor="cedula">Cédula:</label>
                <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="celular">Celular:</label>
                <input type="text" id="celular" name="celular" value={formData.celular} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="correo">Correo Electrónico:</label>
                <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="verificar-contrasena">Verificar Contraseña:</label>
                <input type="password" id="verificar-contrasena" name="verificarContrasena" value={formData.verificarContrasena} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="fecha-nacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fecha-nacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
              </div>
              <button type="submit">Registrar</button>
            </form>
            <button id="boton-login">Volver al inicio de sesión</button>
          </div>
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

export default Registro;
