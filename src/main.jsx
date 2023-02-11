import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

/* import Roboto Font */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* import routes */
import Layout from './routes/layout';
import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import Students, { loader as StudentLoader } from './routes/students';
import CreateStudent, {
  action as CreateStduentAction,
} from './routes/create-student';
import ViewStudent, { loader as ViewStudentLoder } from './routes/view-student';
import EditStudent, {
  loader as EditStudentLoader,
  action as EditStudentAction,
} from './routes/edit-student';
import { action as DeleteStudentAction } from './routes/delete-student';

import NotFound from './404';

import { CssBaseline } from '@mui/material';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:1337';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: 'about',
//         element: <About />,
//       },
//       {
//         path: 'contact',
//         element: <Contact />,
//       },
//       {
//         path: 'students',
//         element: <Students />,
//         loader: StudentLoader,
//       },
//       {
//         path: 'students/create',
//         element: <CreateStudent />,
//         action: CreateStduentAction,
//       },
//       {
//         path: 'students/:id/view',
//         element: <ViewStudent />,
//         loader: ViewStudentLoder,
//       },
//       {
//         path: 'students/:id/edit',
//         element: <EditStudent />,
//         loader: EditStudentLoader,
//         action: EditStudentAction,
//       },
//       {
//         path: 'students/:id/delete',
//         action: DeleteStudentAction,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="students" element={<Students />} loader={StudentLoader} />
      <Route
        path="students/create"
        element={<CreateStudent />}
        action={CreateStduentAction}
      />

      <Route
        path="students/:id/view"
        element={<ViewStudent />}
        loader={ViewStudentLoder}
      />
      <Route
        path="students/:id/edit"
        element={<EditStudent />}
        loader={EditStudentLoader}
        action={EditStudentAction}
      />
      <Route path="students/:id/delete" action={DeleteStudentAction} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <RouterProvider router={router} />
  </>
);
