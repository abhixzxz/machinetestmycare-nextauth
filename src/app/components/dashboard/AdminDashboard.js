import { useEffect, useState } from "react";
import { storage } from "@/lib/localStorage";
import { Users, UserPlus, UserMinus, Activity } from "lucide-react";
import { StatCard } from "./StatCard";
import { RoleDistributionChart } from "./RoleDistributionChart";
import { RegistrationTimeline } from "./RegistrationTimeline";
import { UserTable } from "./UserTable";
import { prepareChartData } from "@/utils/dashboardUtils";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessageDashboard } from "../ui/ErrorMessage";

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const registeredUsers = storage
          .getUsers()
          .filter((user) => user.username !== "admin");
        setUsers(registeredUsers);
      } catch (err) {
        setError("Failed to load users");
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessageDashboard message={error} />;

  const statsCards = [
    {
      title: "Total Users",
      value: users.length,
      subtitle: "Active accounts",
      icon: Users,
    },
    {
      title: "New Users",
      value: prepareChartData.getNewUsersCount(users),
      subtitle: "Last 7 days",
      icon: UserPlus,
    },
    {
      title: "Active Users",
      value: users.length,
      subtitle: "Currently active",
      icon: Activity,
    },
    {
      title: "Inactive Users",
      value: 0,
      subtitle: "Dormant accounts",
      icon: UserMinus,
    },
  ];

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-indigo-200 rounded-sm">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">Manage and monitor user activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoleDistributionChart data={prepareChartData.getRoleData(users)} />
          <RegistrationTimeline
            data={prepareChartData.getTimelineData(users)}
          />
        </div>

        {/* Users Table */}
        <UserTable users={users} />
      </div>
    </div>
  );
}

export default AdminDashboard;
