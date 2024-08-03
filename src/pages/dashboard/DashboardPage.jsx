import React from "react";
import WithLayout from "../../utils/WithLayout.jsx";
import Dashboard from "../../components/Dashboard.jsx";

const DashboardPage = () => {
  return (
    <div>
      <WithLayout>
        <Dashboard />
      </WithLayout>
    </div>
  );
};

export default DashboardPage;
