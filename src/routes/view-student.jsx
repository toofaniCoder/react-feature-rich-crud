import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import axios from 'axios';
import {
  useLoaderData,
  useNavigate,
  Form,
  useNavigation,
} from 'react-router-dom';
import DownloaderBtn from '../components/downloader-btn';
import _ from 'lodash';
import LoadingButton from '@mui/lab/LoadingButton';

export const loader = async ({ params }) => {
  const id = params.id;
  const res = await axios.get(`/api/students/${id}?populate=*`);
  return res.data.data;
};

const ViewStudent = () => {
  const student = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { id, attributes } = student;
  console.log(attributes);
  return (
    <Grid spacing={2} container>
      <Grid md={3} item>
        <Paper
          component="img"
          sx={{ maxWidth: '100%' }}
          src={
            attributes.profile.data?.attributes.url
              ? `${axios.defaults.baseURL}${attributes.profile.data?.attributes.url}`
              : `https://via.placeholder.com/400x400/333/fff`
          }
        />

        <Paper>
          <DownloaderBtn
            items={[
              {
                url: `${axios.defaults.baseURL}${attributes.profile.data?.attributes.url}`,
                name: attributes.profile.data?.attributes.name,
              },
              {
                url: `${axios.defaults.baseURL}${attributes.previousMarksheet.data?.attributes.url}`,
                name: attributes.previousMarksheet.data?.attributes.name,
              },
            ]}
          />
        </Paper>
      </Grid>
      <Grid md={9} item>
        <Paper>
          <Paper
            elevation={0}
            component={Stack}
            direction="row"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Button
              onClick={() => navigate('/students')}
              variant="outlined"
              color="inherit"
            >
              go back
            </Button>
            <Form method="post" action={`/students/${id}/delete`}>
              <LoadingButton
                loading={
                  navigation.state !== 'idle' &&
                  navigation.formMethod === 'post'
                }
                type="submit"
                variant="contained"
                color="error"
              >
                delete
              </LoadingButton>
            </Form>
          </Paper>
          <List>
            {[
              'firstName',
              'lastName',
              'phone',
              'standard',
              'section',
              'state',
              'city',
              'town',
              'country',
              'pincode',
            ].map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Typography variant="body2" color="text.secondary">
                    {attributes[item]}
                  </Typography>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      {_.startCase(item)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewStudent;
