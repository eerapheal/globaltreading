import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from "../component/Profile";
import DashboardSidebar from "../component/DashboardSidebar";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <div>
        <DashboardSidebar />
      </div>
      <div>{tab === "profile" && <Profile />}</div>
    </div>
  );
};

export default Dashboard;
