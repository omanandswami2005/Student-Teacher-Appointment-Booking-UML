// import React from 'react';
import KeyMetrics from '../components/admin/KeyMatrics';
import Charts from '../components/admin/Charts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Renders the Dashboard component.
 *
 * @return {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = () => {
  return (
    <div className="container mx-auto p-1">
      <Navbar title={'Admin Dashboard !'} />
      {/* <h1 className="text-3xl font-bold mb-6">Dashboard</h1> */}
      <KeyMetrics />
      <h2 className="text-2xl font-semibold mt-10 mb-4">Graphs/Charts</h2>
      <Charts />

      <Footer />
    </div>
  );
};

export default Dashboard;
