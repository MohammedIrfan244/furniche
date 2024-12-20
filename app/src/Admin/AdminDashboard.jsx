import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [productStats, setProductStats] = useState({});
  const [userStats, setUserStats] = useState({});
  const [orderStats, setOrderStats] = useState({});
  const [revenueStats, setRevenueStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [productRes, userRes, orderRes, revenueRes] = await Promise.all([
          axiosInstance.get("/admin/products/details/stats"),
          axiosInstance.get("/admin/users/details/stats"),
          axiosInstance.get("/admin/orders/details/stats"),
          axiosInstance.get("/admin/orders/details/revenue"),
        ]);

        setProductStats(productRes.data.data);
        setUserStats(userRes.data);
        setOrderStats(orderRes.data);
        setRevenueStats(revenueRes.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = {
    labels: ["Products", "Available Products", "Users", "Orders", "Revenue"],
    datasets: [
      {
        label: "Count",
        data: [
          productStats?.totalProducts,
          productStats?.availableProducts,
          userStats?.totalUsers,
          orderStats?.totalOrders,
          null, 
        ],
        backgroundColor: ["#DC143C", "#4169E1", "#32CD32", "#FFD700"],
        borderColor: ["#38B2AC", "#2B6CB0", "#228B22", "#DAA520"],
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Revenue in Rupee",
        data: [null, null, null, null, revenueStats?.totalRevenue],
        backgroundColor: ["#9370DB"],
        borderColor: ["#6A5ACD"],
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    scales: {
      y1: {
        type: "linear",
        position: "left",
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className={`w-[100%] h-[100vh] ${loading && "flex flex-col justify-center items-center"}`}>
      {loading && <div className="loader h-[100vh] w-[100%]"></div>}
    <div className="chart-container mt-10">
      {!loading && <Bar data={data} options={options} />}
    </div>
    </div>
  );
}

export default AdminDashboard;
