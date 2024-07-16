import React, { useEffect, useState } from 'react';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import '../../assets/css/matricula.css';

const Matriculas = () => {
  const [matriculas, setMatriculas] = useState<any[]>([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [matriculaIdToDelete, setMatriculaIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    mostrarMatriculas();
  }, []);

  const mostrarMatriculas = () => {
    const userId = localStorage.getItem('userId');
    const allMatriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const userMatriculas = allMatriculas.filter((matricula: any) => matricula.userId === userId);

    setMatriculas(userMatriculas);
  };

  const eliminarMatricula = (matriculaId: number) => {
    const allMatriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const matriculaToRemove = allMatriculas.find((matricula: any) => matricula.id === matriculaId);

    if (!matriculaToRemove) {
      alert('La matrícula no se encontró.');
      return;
    }

    const allHorarios = JSON.parse(localStorage.getItem('horarios') || '[]');
    const horario = allHorarios.find((horario: any) => horario.materia === matriculaToRemove.materia);
    if (horario) {
      horario.cupos++;
      localStorage.setItem('horarios', JSON.stringify(allHorarios));
    }

    const updatedMatriculas = allMatriculas.filter((matricula: any) => matricula.id !== matriculaId);
    localStorage.setItem('matriculas', JSON.stringify(updatedMatriculas));

    mostrarMatriculas();
  };

  const confirmarEliminacionMatricula = (matriculaId: number) => {
    setMatriculaIdToDelete(matriculaId);
    setConfirmVisible(true);
  };

  const handleConfirmYes = () => {
    if (matriculaIdToDelete !== null) {
      eliminarMatricula(matriculaIdToDelete);
    }
    setConfirmVisible(false);
    setMatriculaIdToDelete(null);
  };

  const handleConfirmNo = () => {
    setConfirmVisible(false);
    setMatriculaIdToDelete(null);
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
          <li><a href="/horario" id="registro-horarios">Registro de horario</a></li>
          <li><button id="boton-perfil">Ver perfil</button></li>
          <li><button id="boton-soporte">Soporte</button></li>
        </ul>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="barra-medio">
          <button id="contenedorBoton-arriba"><i className="fa-solid fa-bars"></i></button>
          <div className="hero">
            <img className="hero-logo" src={Logo} alt="hero de uleam" />
            <h1 className="hero-titulo">Matriculas de horarios</h1>
          </div>
        </section>
        <section>
          <div id="matriculas-container" className="matriculas-container">
            {matriculas.length === 0 ? (
              <p>No hay matrículas registradas.</p>
            ) : (
              matriculas.map((matricula, index) => (
                <div key={index} className="matricula-item">
                  <span>Materia: {matricula.materia}</span>
                  <span>Créditos: {matricula.creditos}</span>
                  <span>Facultad: {matricula.facultad}</span>
                  <span>Profesor: {matricula.profesor}</span>
                  <span>Día: {matricula.dia}</span>
                  <span>Hora de inicio: {matricula.horaInicio}</span>
                  <span>Hora de fin: {matricula.horaFin}</span>
                  <button className="eliminar-btn" onClick={() => confirmarEliminacionMatricula(matricula.id)}>Eliminar</button>
                </div>
              ))
            )}
          </div>
        </section>
        {confirmVisible && (
        <div className="confirm-dialog">
          <p>¿Estás seguro que deseas eliminar esta matrícula?</p>
          <button onClick={handleConfirmYes}>Sí</button>
          <button onClick={handleConfirmNo}>No</button>
        </div>
      )}
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

export default Matriculas;
