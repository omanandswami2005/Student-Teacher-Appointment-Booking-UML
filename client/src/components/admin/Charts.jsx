// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line,  } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useEffect, useState } from 'react';
import { requestHandler } from '../../utils';
import { getMonthlyData } from '../../api/adminApi';



const Charts = () => {

const  [appointmentData, setAppointmentData] = useState({});

  useEffect(() => {

    setAppointmentData({});
    async function getAppointmentData() {
      await requestHandler(
        async () => await getMonthlyData(),
        null,
        (res) => {
          const { data } = res;
        //   console.log(data);
          const { appointmentData } = data;
          setAppointmentData(appointmentData);
        }
      );
    }
    getAppointmentData();


  }, [ ]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">
          Appointment Trends
        </h3>
        {appointmentData && appointmentData.labels && appointmentData.datasets ? (
          <Line data={appointmentData} />
        ) : (
          <p className="dark:text-gray-200">Loading...</p>
        )}   
        </div>
    </div>
  );
};

export default Charts;
