import React from 'react';
import {MainLayout} from '../../components/MainLayout/MainLayout';
import {ProjectsPage} from './pages/ProjectsPage/ProjectsPage';

export const projectRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <ProjectsPage/>
            },
        ]
    },
]
