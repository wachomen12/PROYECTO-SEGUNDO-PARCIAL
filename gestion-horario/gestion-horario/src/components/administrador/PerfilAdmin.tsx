import React, { useEffect, useState } from 'react';
import '../../assets/css/perfilAdmin.css';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';

const PerfilAdmin = () => {
  const [formData, setFormData] = useState({
    materia: '',
    creditos: 0,
    facultad: '',
    paralelo: '',
    profesor: '',
    cupos: 0,
    dias: [] as string[],
    horasInicio: [] as string[],
    horasFin: [] as string[]
  });
  const [horarios, setHorarios] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const dias = checked ? [...prevData.dias, value] : prevData.dias.filter((dia) => dia !== value);
        return { ...prevData, dias };
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseInt(value) : value
      });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [day, timeType] = name.split('-');
    const dayIndex = formData.dias.indexOf(day);
    if (dayIndex !== -1) {
      setFormData((prevData) => {
        const horasInicio = [...prevData.horasInicio];
        const horasFin = [...prevData.horasFin];
        if (timeType === 'inicio') {
          horasInicio[dayIndex] = value;
        } else {
          horasFin[dayIndex] = value;
        }
        return { ...prevData, horasInicio, horasFin };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newHorario = { ...formData };
    setHorarios((prevHorarios) => {
      const updatedHorarios = [...prevHorarios, newHorario];
      localStorage.setItem('horarios', JSON.stringify(updatedHorarios));
      return updatedHorarios;
    });
    alert('Horario agregado exitosamente.');
    setFormData({
      materia: '',
      creditos: 0,
      facultad: '',
      paralelo: '',
      profesor: '',
      cupos: 0,
      dias: [],
      horasInicio: [],
      horasFin: []
    });
  };

  const mostrarHorarios = () => {
    const storedHorarios = JSON.parse(localStorage.getItem('horarios') || '[]');
    setHorarios(storedHorarios);
  };

  const eliminarHorario = (index: number) => {
    const updatedHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(updatedHorarios);
    localStorage.setItem('horarios', JSON.stringify(updatedHorarios));
  };

  useEffect(() => {
    mostrarHorarios();

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

  useEffect(() => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="dia"]');
    const horasInicio = document.querySelectorAll<HTMLInputElement>('input[type="time"][name$="-inicio"]');
    const horasFin = document.querySelectorAll<HTMLInputElement>('input[type="time"][name$="-fin"]');

    const toggleHoras = () => {
      checkboxes.forEach((checkbox, index) => {
        const dia = checkbox.value;
        const horasInicioField = document.querySelector(`input[name="${dia}-inicio"]`) as HTMLInputElement;
        const horasFinField = document.querySelector(`input[name="${dia}-fin"]`) as HTMLInputElement;

        if (horasInicioField && horasFinField) {
          if (checkbox.checked) {
            horasInicioField.removeAttribute('disabled');
            horasFinField.removeAttribute('disabled');
          } else {
            horasInicioField.setAttribute('disabled', 'true');
            horasFinField.setAttribute('disabled', 'true');
          }
        }
      });
    };

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', toggleHoras);
    });

    toggleHoras();
  }, [formData.dias]);

  return (
    <div>
      <header className="contenedor-arriba" id="contenedor-arriba">
        <h2>Menú</h2>
        <ul id="menu-opciones">
          <li><a href="/loginAdmin" id="loginAdmin">Cerrar sesión</a></li>
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
        <section className="contenedor">
          <h2>Ingresar Horarios</h2>
          <form id="horarios-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="materia">Materia:</label>
              <input
                type="text"
                id="materia"
                name="materia"
                value={formData.materia}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="creditos">Créditos:</label>
              <input
                type="number"
                id="creditos"
                name="creditos"
                value={formData.creditos}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="facultad">Facultad:</label>
              <select id="facultad" name="facultad" value={formData.facultad} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                <option value="Salud">Facultad de Ciencias de la salud</option>
                <option value="Ingenieria">Facultad de Ingeniería</option>
                <option value="Educacion">Facultad de educación</option>
                <option value="Informatica">Facultad de Informatica</option>
              </select>
            </div>
            <div>
              <label htmlFor="paralelo">Paralelo:</label>
              <input
                type="text"
                id="paralelo"
                name="paralelo"
                value={formData.paralelo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="profesor">Profesor:</label>
              <input
                type="text"
                id="profesor"
                name="profesor"
                value={formData.profesor}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cupos">Cupos disponibles:</label>
              <input
                type="number"
                id="cupos"
                name="cupos"
                value={formData.cupos}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Seleccionar días y horas:</label>
              <div>
                <label>
                  <input type="checkbox" name="dia" value="Lunes" onChange={handleChange} />
                  Lunes
                </label>
                <input
                  type="time"
                  name="Lunes-inicio"
                  id="hora-inicio-lunes"
                  onChange={handleTimeChange}
                  disabled
                  required
                />{' '}
                -{' '}
                <input
                  type="time"
                  name="Lunes-fin"
                  id="hora-fin-lunes"
                  onChange={handleTimeChange}
                  disabled
                  required
                />
              </div>
              <div>
                <label>
                  <input type="checkbox" name="dia" value="Martes" onChange={handleChange} />
                  Martes
                </label>
                <input
                  type="time"
                  name="Martes-inicio"
                  id="hora-inicio-martes"
                  onChange={handleTimeChange}
                  disabled
                  required
                />{' '}
                -{' '}
                <input
                  type="time"
                  name="Martes-fin"
                  id="hora-fin-martes"
                  onChange={handleTimeChange}
                  disabled
                  required
                />
              </div>
              <div>
                <label>
                  <input type="checkbox" name="dia" value="Miércoles" onChange={handleChange} />
                  Miércoles
                </label>
                <input
                  type="time"
                  name="Miércoles-inicio"
                  id="hora-inicio-miercoles"
                  onChange={handleTimeChange}
                  disabled
                  required
                />{' '}
                -{' '}
                <input
                  type="time"
                  name="Miércoles-fin"
                  id="hora-fin-miercoles"
                  onChange={handleTimeChange}
                  disabled
                  required
                />
              </div>
              <div>
                <label>
                  <input type="checkbox" name="dia" value="Jueves" onChange={handleChange} />
                  Jueves
                </label>
                <input
                  type="time"
                  name="Jueves-inicio"
                  id="hora-inicio-jueves"
                  onChange={handleTimeChange}
                  disabled
                  required
                />{' '}
                -{' '}
                <input
                  type="time"
                  name="Jueves-fin"
                  id="hora-fin-jueves"
                  onChange={handleTimeChange}
                  disabled
                  required
                />
              </div>
              <div>
                <label>
                  <input type="checkbox" name="dia" value="Viernes" onChange={handleChange} />
                  Viernes
                </label>
                <input
                  type="time"
                  name="Viernes-inicio"
                  id="hora-inicio-viernes"
                  onChange={handleTimeChange}
                  disabled
                  required
                />{' '}
                -{' '}
                <input
                  type="time"
                  name="Viernes-fin"
                  id="hora-fin-viernes"
                  onChange={handleTimeChange}
                  disabled
                  required
                />
              </div>
            </div>
            <button type="submit">Guardar</button>
          </form>
        </section>
        <section>
          <h2>Horarios registrados</h2>
          <div id="horarios-container" className="horarios-container">
            {horarios.length === 0 ? (
              <p>No hay horarios guardados.</p>
            ) : (
              horarios.map((horario, index) => (
                <div key={index} className="horario-item">
                  <span>Materia: {horario.materia}</span>
                  <span>Créditos: {horario.creditos}</span>
                  <span>Facultad: {horario.facultad}</span>
                  <span>Paralelo: {horario.paralelo}</span>
                  <span>Profesor: {horario.profesor}</span>
                  <span>Cupos disponibles: {horario.cupos}</span>
                  <span>Días: {horario.dias.join(', ')}</span>
                  <span>
                    Horas: {horario.horasInicio.join(' - ')} a {horario.horasFin.join(' - ')}
                  </span>
                  <button className="eliminar-btn" onClick={() => eliminarHorario(index)}>
                    Eliminar
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

export default PerfilAdmin;
