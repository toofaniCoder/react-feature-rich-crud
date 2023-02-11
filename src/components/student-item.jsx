import {
  Typography,
  Grid,
  Paper,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DownloaderBtn from './downloader-btn';
import { Link, useFetcher, useNavigation } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

const StudentItem = ({ id, attributes }) => {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <Grid md={2} item>
      <Paper component={Stack} spacing={2} alignItems="center" sx={{ p: 2 }}>
        <Avatar
          src={`${axios.defaults.baseURL}${attributes.profile.data?.attributes.url}`}
        />
        <Typography
          sx={{ textDecoration: 'none', color: 'primary.main' }}
          component={Link}
          to={`${id}/view`}
          variant="h5"
        >
          {attributes.firstName} {attributes.lastName}
        </Typography>

        <List
          sx={{
            alignSelf: 'stretch',
            bgcolor: 'grey.100',
            borderRadius: 2,
            px: 2,
          }}
        >
          {['standard', 'section'].map((item, index) => (
            <ListItem
              disableGutters
              disablePadding
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
        <Stack
          direction="row"
          alignSelf="stretch
              "
          justifyContent="space-between"
        >
          {navigation.state === 'loading' &&
          navigation.location.pathname.includes(id) &&
          navigation.location.pathname.endsWith('/edit') ? (
            <LoadingButton loading />
          ) : (
            <IconButton component={Link} to={`${id}/edit`} color="warning">
              <EditTwoToneIcon />
            </IconButton>
          )}

          <fetcher.Form method="post" action={`${id}/delete`}>
            {fetcher.state === 'idle' ? (
              <IconButton type="submit" color="error">
                <DeleteTwoToneIcon />
              </IconButton>
            ) : (
              <LoadingButton loading />
            )}
          </fetcher.Form>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default StudentItem;
