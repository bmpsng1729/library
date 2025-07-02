import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from './dataset';

// function TickParamsSelector({
//   tickLabelPlacement,
//   setTickLabelPlacement,
// }) {
//   return (
//     <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
//       {/* <FormControl>
    
//         <RadioGroup
//           row
          
//         >
//           <FormControlLabel value="start" control={<Radio />} label="start" />
//           <FormControlLabel value="end" control={<Radio />} label="end" />
//           <FormControlLabel value="middle" control={<Radio />} label="middle" />
//           <FormControlLabel
//             value="extremities"
//             control={<Radio />}
//             label="extremities"
//           />
//         </RadioGroup>
//       </FormControl> */}
//       <FormControl>
//         <FormLabel id="label-placement-radio-buttons-group-label">
//           tickLabelPlacement
//         </FormLabel>
//         <RadioGroup
//           row
//           aria-labelledby="label-placement-radio-buttons-group-label"
//           name="label-placement"
//           value={tickLabelPlacement}
//           onChange={(event) => setTickLabelPlacement(event.target.value)}
//         >
//           <FormControlLabel value="tick" control={<Radio />} label="tick" />
//           <FormControlLabel value="middle" control={<Radio />} label="middle" />
//         </RadioGroup>
//       </FormControl>
//     </Stack>
//   );
// }

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
      width: 60,
    },
  ],
  series: [{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }],
  height: 300,
};

export default function BarGraph() {

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: 'month' }]}
        {...chartSetting}
      />
    </div>
  );
}
