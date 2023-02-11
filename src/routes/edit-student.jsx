import { useState } from 'react';
import {
  Grid,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

import LoadingButton from '@mui/lab/LoadingButton';

export const loader = async ({ params }) => {
  const id = params.id;
  const res = await axios.get(`/api/students/${id}?populate=*`);
  return res.data.data;
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const { profile, previousMarksheet, ...data } = Object.fromEntries(formData);
  const stduentFormData = new FormData();
  stduentFormData.append('data', JSON.stringify(data));
  if (profile.size != 0) stduentFormData.append('files.profile', profile);
  if (previousMarksheet.size != 0)
    stduentFormData.append('files.previousMarksheet', previousMarksheet);
  const res = await axios.put(`/api/students/${params.id}`, stduentFormData);
  return redirect(`/students/${res.data.data.id}/view`);
};

const EditStudent = () => {
  const student = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const disabled = navigation.state !== 'idle';
  const {
    firstName,
    lastName,
    phone,
    standard,
    section,
    state,
    city,
    town,
    country,
    pincode,
    profile,
    previousMarksheet,
  } = student.attributes;

  const [profileName, setProfileName] = useState(undefined);
  const [previousMarksheetName, setPreviousMarksheetName] = useState(undefined);
  return (
    <div>
      <Box>
        <Paper component={Stack} spacing={2} sx={{ p: 3 }}>
          <Typography variant="h4">Edit Student</Typography>
          <Grid
            component={Form}
            encType="multipart/form-data"
            method="post"
            id="create-student"
            spacing={2}
            container
          >
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="firstName"
                label="first name"
                placeholder="Enter Your First Name"
                defaultValue={firstName}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="lastName"
                label="last name"
                placeholder="Enter Your Last Name"
                defaultValue={lastName}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <Button
                disabled={disabled}
                component="label"
                sx={{ height: 1 }}
                size="large"
                variant="outlined"
                color="inherit"
                startIcon={<UploadFileTwoToneIcon />}
                fullWidth
              >
                {profileName
                  ? profileName
                  : profile.data?.attributes.name || 'no profile photo'}
                <input
                  accept="image/*"
                  onChange={(e) => setProfileName(e.target.files[0].name)}
                  type="file"
                  name="profile"
                  hidden
                />
              </Button>
            </Grid>
            <Grid sx={12} md={3} item>
              <Button
                disabled={disabled}
                component="label"
                sx={{ height: 1 }}
                size="large"
                variant="outlined"
                color="inherit"
                startIcon={<UploadFileTwoToneIcon />}
                fullWidth
              >
                {previousMarksheetName
                  ? previousMarksheetName
                  : previousMarksheet.data?.attributes.name ||
                    'no previous marksheet'}
                <input
                  accept="application/pdf"
                  onChange={(e) =>
                    setPreviousMarksheetName(e.target.files[0].name)
                  }
                  type="file"
                  name="previousMarksheet"
                  hidden
                />
              </Button>
            </Grid>

            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="phone"
                label="phone number"
                placeholder="Enter Your Phone Number"
                defaultValue={phone}
                fullWidth
              />
            </Grid>

            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="standard"
                label="standard"
                placeholder="Enter Your Standard"
                defaultValue={standard}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="section"
                label="section"
                placeholder="Enter Your Section"
                defaultValue={section}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="state"
                label="state name"
                placeholder="Enter Your State Name"
                defaultValue={state}
                fullWidth
              />
            </Grid>

            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="city"
                label="city name"
                placeholder="Enter Your City Name"
                defaultValue={city}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="town"
                label="town name"
                placeholder="Enter Your Town Name"
                defaultValue={town}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="country"
                label="country name"
                placeholder="Enter Your Country Name"
                defaultValue={country}
                fullWidth
              />
            </Grid>
            <Grid sx={12} md={3} item>
              <TextField
                disabled={disabled}
                name="pincode"
                label="pincode"
                placeholder="Enter Your Pincode Number"
                defaultValue={pincode}
                fullWidth
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2}>
            <LoadingButton
              disabled={disabled}
              type="submit"
              form="create-student"
              variant="contained"
              size="large"
              color="warning"
              loading={
                navigation.state != 'idle' && navigation.formMethod === 'post'
              }
              loadingIndicator="Updating..."
            >
              Update Stduent
            </LoadingButton>
            <Button
              disabled={disabled}
              color="inherit"
              onClick={() => navigate(-1)}
              variant="outlined"
              size="large"
            >
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};

export default EditStudent;
