import { useState } from 'react';
import { Paper, Typography, TextField, Button, Stack } from '@mui/material';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const { profile, previousMarksheet, ...data } = Object.fromEntries(formData);
  const stduentFormData = new FormData();
  stduentFormData.append('data', JSON.stringify(data));
  if (profile.size != 0) stduentFormData.append('files.profile', profile);
  if (previousMarksheet.size != 0)
    stduentFormData.append('files.previousMarksheet', previousMarksheet);
  const res = await axios.post('/api/students', stduentFormData);
  return redirect(`/students/${res.data.data.id}/view`);
};

const CreateStudent = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const disabled = navigation.state != 'idle';
  const [profileName, setProfileName] = useState(undefined);
  const [previousMarksheetName, setPreviousMarksheetName] = useState(undefined);
  return (
    <div>
      <Paper component={Stack} spacing={2} sx={{ p: 3 }}>
        <Typography variant="h4">Create Student</Typography>
        <Grid
          component={Form}
          encType="multipart/form-data"
          method="post"
          id="create-student"
          spacing={2}
          container
        >
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="firstName"
              label="first name"
              placeholder="Enter Your First Name"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="lastName"
              label="last name"
              placeholder="Enter Your Last Name"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
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
              {profileName ?? 'Upload Profile Picture'}

              <input
                accept="image/*"
                onChange={(e) => setProfileName(e.target.files[0].name)}
                type="file"
                name="profile"
                hidden
              />
            </Button>
          </Grid>
          <Grid sx={12} md={3}>
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
              {previousMarksheetName ?? 'Upload previous Marksheet'}
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

          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="phone"
              label="phone number"
              placeholder="Enter Your Phone Number"
              fullWidth
            />
          </Grid>

          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="standard"
              label="standard"
              placeholder="Enter Your Standard"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="section"
              label="section"
              placeholder="Enter Your Section"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="state"
              label="state name"
              placeholder="Enter Your State Name"
              fullWidth
            />
          </Grid>

          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="city"
              label="city name"
              placeholder="Enter Your City Name"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="town"
              label="town name"
              placeholder="Enter Your Town Name"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="country"
              label="country name"
              placeholder="Enter Your Country Name"
              fullWidth
            />
          </Grid>
          <Grid sx={12} md={3}>
            <TextField
              disabled={disabled}
              name="pincode"
              label="pincode"
              placeholder="Enter Your Pincode Number"
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
            loading={
              navigation.state !== 'idle' && navigation.formMethod === 'post'
            }
            loadingIndicator="Creating..."
          >
            Create New Student
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
    </div>
  );
};

export default CreateStudent;
