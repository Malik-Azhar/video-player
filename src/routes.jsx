import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import ListPage from "./ListPage";
import AddNewUrl from "./AddNewUrl";
import VideoPlayer from "./VideoPlayer";

const routes = [
    {
        path: '/',
        element: <ListPage />
    },
    {
        path: '/add',
        element: <AddNewUrl />
    },
    {
        path: '/player',
        element: <VideoPlayer />
    },
    {
        path: '*',
        element: <NotFound />,
    }
];

export const router = createBrowserRouter(routes);