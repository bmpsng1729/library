//TODO::::::::::::

import * as React from 'react';
import Box from '@mui/material/Box';

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
}


function profileFrame({
    src="https://www.dakshana.org/wp-content/uploads/2022/09/22616183768.jpg"
}) {
   return (
    <div className='bg-red-400'>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} class>
      <Box sx={{ ...commonStyles, borderRadius: '50%' }} />
      je;aslfk
      <Box sx={{ ...commonStyles, borderRadius: 1 }} />
      <Box sx={{ ...commonStyles, borderRadius: '16px' }} />
    </Box>
    <div> hello from div</div>
    </div>
    
  );
}

export default profileFrame
