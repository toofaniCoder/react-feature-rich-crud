import { ButtonGroup, Button } from '@mui/material';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import download from 'downloadjs';

const DownloaderBtn = ({ items }) => {
  console.log(items);
  return (
    <ButtonGroup
      sx={{
        '&>*': {
          justifyContent: 'flex-start !important',
        },
      }}
      orientation="vertical"
      color="inherit"
      fullWidth
    >
      {items.map((item, index) => (
        <Button
          disabled={item.name === undefined}
          key={index}
          onClick={() => download(item.url)}
          startIcon={<FileDownloadTwoToneIcon />}
        >
          {item.name ?? 'not available'}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default DownloaderBtn;
