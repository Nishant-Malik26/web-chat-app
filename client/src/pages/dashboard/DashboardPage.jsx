import React from "react";
import WithLayout from "../../utils/WithLayout.jsx";
import Dashboard from "../../components/Dashboard.jsx";

const DashboardPage = () => {
  return (
    <>
      <WithLayout>
        <Dashboard />
      </WithLayout>
    </>
  );
};

export default DashboardPage;
