import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../component/DashSidebar";
import DashProfile from "../component/DashProfile";
import DashPosts from "../component/DashPosts";
import DashUsers from "../component/DashUsers";
import DashComment from "../component/dashComment";
import DashView from "../component/DashView";

export default function Dashboard() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}

      {/* dash posts */}
      {tab === "posts" && <DashPosts />}
      {/* dash users */}
      {tab === "users" && <DashUsers />}
      {/* dash comment */}
      {tab === "all-comment" && <DashComment />}
      {tab === "dashboard-view" && <DashView />}
    </div>
  );
}
