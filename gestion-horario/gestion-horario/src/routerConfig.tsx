import React from "react";
import { Carrera, Home, Horario, Login, LoginAdministrador, Matriculas, Perfil, PerfilAdmin, Registro } from "./pages";

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/loginAdmin',
        element: <LoginAdministrador/>
    },
    {
        path: '/registro',
        element: <Registro/>
    },
    {
        path: '/horario',
        element: <Horario/>
    },
    {
        path: '/matriculas',
        element: <Matriculas/>
    },
    {
        path: '/perfil',
        element: <Perfil/>
    },
    {
        path: '/perfilAdmin',
        element: <PerfilAdmin/>
    },
    {
        path: '/carrera',
        element: <Carrera/>
    },
    {
        path: '/login',
        element: <Login/>
    }
]