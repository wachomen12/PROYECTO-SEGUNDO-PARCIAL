import React from 'react';
import Home from '../components/home/Home'


export { Home }

export const Login = React.lazy(() => import('../components/login/Login'));
export const LoginAdministrador = React.lazy(() => import('../components/login/LoginAdmin'));
export const Registro = React.lazy(() => import('../components/registro/Registro'));
export const Horario = React.lazy(() => import('../components/usuario/Horarios'));
export const Matriculas = React.lazy(() => import('../components/usuario/Matriculas'));
export const Perfil = React.lazy(() => import('../components/usuario/perfil'));
export const PerfilAdmin= React.lazy(() => import('../components/administrador/PerfilAdmin'));
export const Carrera = React.lazy(() => import('../components/home/Carrera'));
