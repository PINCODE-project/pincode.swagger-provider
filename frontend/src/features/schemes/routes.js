import React from 'react';
import {MainLayout} from '../../components/MainLayout/MainLayout';
import {MicroservicePage} from './pages/MicroservicePage/MicroservicePage';

export const microservicesRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: 'scheme/:id',
                element: <MicroservicePage/>
            },
        ]
    },
]
