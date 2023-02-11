import axios from 'axios';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
  await axios.delete(`/api/students/${params.id}`);
  return redirect('/students');
};
