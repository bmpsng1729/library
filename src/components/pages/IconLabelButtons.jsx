import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons(
  {
    children="delete",
    style="",
    onclick,
    type="button",
    className="",
    ...props

  }
) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined"  startIcon={<DeleteIcon />} className={className} type={type}{...props}  >
        {
      children
      }
      </Button>
      {/* <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button> */}
    </Stack>
  );
}

