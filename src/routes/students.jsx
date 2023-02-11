import { Grid, Fab } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import StudentItem from '../components/student-item';
import { Link } from 'react-router-dom';

export const loader = async () => {
  const res = await axios.get('/api/students?sort=createdAt:desc&populate=*');
  return res.data.data;
};

const Students = () => {
  const students = useLoaderData();
  console.log(students);
  return (
    <div>
      <Fab
        component={Link}
        to="create"
        color="secondary"
        sx={{ position: 'fixed', bottom: 50, right: 100 }}
      >
        <AddIcon />
      </Fab>
      <Grid spacing={2} container>
        {students.map(({ id, attributes }) => (
          <StudentItem key={id} id={id} attributes={attributes} />
        ))}
      </Grid>
    </div>
  );
};

export default Students;
