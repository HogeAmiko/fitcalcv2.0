import React from 'react';
import 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

const data = {
  options: {
    plugins: {
      datalabels: {
        color: 'white',
        textAlign: 'center',
        font: {
          weight: 'bold',
          size: 30
        }
      }
    }
  },

  datasets: [
    {
      label: '# of Votes',
      data: [131.3, 67.5, 178.9],
      backgroundColor: [
        '#62BF9A',
        '#81D5A4',
        '#56B1A2',
      ],
      borderColor: [
        '#62BF9A',
      ],
      borderWidth: 1,
    },
  ],
};

export const Chart = () => (
  <>
    <Pie data={data}/>
  </>
);


