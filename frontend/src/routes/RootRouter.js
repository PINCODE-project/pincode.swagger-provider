import {useRoutes} from 'react-router-dom';
import {authRoutes} from "../features/auth/routes";
import NotAuthGuard from "./guards/notAuthGuard";
import AuthGuard from "./guards/authGuard";
import {errorsRoutes} from "../features/errors/routes";
import {microservicesRoutes} from "../features/schemes/routes";
import {projectRoutes} from "../features/project/routes";

const routes = [
    {
        element: <NotAuthGuard/>,
        children: [
            ...authRoutes
        ]
    },
    {
        element: <AuthGuard/>,
        children: [
            ...microservicesRoutes,
            ...projectRoutes,
            ...errorsRoutes
        ]
    },

];

export const RootRouter = () => useRoutes(routes);
