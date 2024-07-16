import React, { useEffect, useState } from 'react';
import '../../assets/css/horario.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const Horarios = () => {
  const [horarios, setHorarios] = useState<any[]>([]);
  const [userFacultad, setUserFacultad] = useState<string | null>(null);

  useEffect(() => {
    // Obtener la facultad del usuario que ha iniciado sesión
    const userId = localStorage.getItem('userId');
    if (userId) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioActual = usuarios.find((usuario: any) => usuario.id === parseInt(userId));

      if (usuarioActual) {
        setUserFacultad(usuarioActual.facultad);
      }
    }

    const mostrarHorarios = () => {
      const storedHorarios = JSON.parse(localStorage.getItem('horarios') || '[]');
      setHorarios(storedHorarios);
    };

    mostrarHorarios();
  }, []);

  const matricularseEnMateria = (index: number) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Debes iniciar sesión para matricularte en una materia.');
      return;
    }

    const horarios = JSON.parse(localStorage.getItem('horarios') || '[]');
    const horario = horarios[index];

    if (horario.cupos <= 0) {
      alert('Lo sentimos, no hay cupos disponibles para esta materia.');
      return;
    }

    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');

    const matriculaExistente = matriculas.find((matricula: any) => matricula.userId === userId && matricula.materia === horario.materia);
    if (matriculaExistente) {
      alert('Ya estás matriculado en esta materia.');
      return;
    }

    const nuevaMatricula = {
      id: matriculas.length + 1,
      userId: userId,
      materia: horario.materia,
      creditos: horario.creditos,
      facultad: horario.facultad,
      profesor: horario.profesor,
      dia: horario.dias[0] as string, // Solo toma el primer día por simplicidad
      horaInicio: (horario.horasInicio[0] || '') as string, // Solo toma la primera hora de inicio por simplicidad
      horaFin: (horario.horasFin[0] || '') as string, // Solo toma la primera hora de fin por simplicidad
    };

    // Agregar la nueva matrícula al arreglo de matrículas
    matriculas.push(nuevaMatricula);

    // Disminuir el número de cupos disponibles
    horarios[index].cupos--;

    // Actualizar los datos en el localStorage
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
    localStorage.setItem('horarios', JSON.stringify(horarios));
    setHorarios(horarios);

    alert('Matrícula exitosa.');
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

    const goToPerfil = () => {
      window.location.href = '/perfil';
    };

    const contenedorBotonArriba = document.getElementById('contenedorBoton-arriba');
    const botonSoporte = document.getElementById('boton-soporte');
    const botonPerfil = document.getElementById('boton-perfil');

    if (contenedorBotonArriba) {
      contenedorBotonArriba.addEventListener('click', toggleMenu);
    }

    if (botonSoporte) {
      botonSoporte.addEventListener('click', goToSupport);
    }

    if (botonPerfil) {
      botonPerfil.addEventListener('click', goToPerfil);
    }

    return () => {
      if (contenedorBotonArriba) {
        contenedorBotonArriba.removeEventListener('click', toggleMenu);
      }

      if (botonSoporte) {
        botonSoporte.removeEventListener('click', goToSupport);
      }

      if (botonPerfil) {
        botonPerfil.removeEventListener('click', goToPerfil);
      }
    };
  }, []);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/login" id="login">Cerrar sesión</a></li>
          <li><a href="/matriculas" id="matriculas">Ver Matriculas existentes</a></li>
          <li><button id="boton-perfil">Ver perfil</button></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>

      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
          <div className="hero">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h1 className="hero-titulo">Horarios disponibles</h1>
          </div>
        </section>
        <section>
          <div id="horarios-container" className="horarios-container">
            {horarios.length === 0 ? (
              <p>No hay horarios guardados.</p>
            ) : (
              horarios
                .filter(horario => horario.facultad === userFacultad)
                .map((horario, index) => (
                  <div key={index} className="horario-item">
                    <span>Materia: {horario.materia}</span>
                    <span>Créditos: {horario.creditos}</span>
                    <span>Facultad: {horario.facultad}</span>
                    <span>Paralelo: {horario.paralelo}</span>
                    <span>Profesor: {horario.profesor}</span>
                    <span>Cupos disponibles: {horario.cupos}</span>
                    <span>Días: {horario.dias.join(', ')}</span>
                    <span>Horas: {horario.horasInicio.join(' - ')} a {horario.horasFin.join(' - ')}</span>
                    <button className="matricular-btn" onClick={() => matricularseEnMateria(index)}>
                      Matricularse
                    </button>
                  </div>
                ))
            )}
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

export default Horarios;
