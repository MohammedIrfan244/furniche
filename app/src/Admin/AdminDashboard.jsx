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
import { LuPackage, LuCircleCheck, LuUsers, LuShoppingBag, LuDollarSign } from "react-icons/lu";

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

        setProductStats(productRes.data?.data || {});
        setUserStats(userRes.data || {});
        setOrderStats(orderRes.data || {});
        setRevenueStats(revenueRes.data || {});
      } catch (err) {
        toast.error(axiosErrorManager(err));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = {
    labels: ["Total Works", "Active In Catalog", "Registered Clients", "Total Orders", "Revenue (INR)"],
    datasets: [
      {
        label: "Count",
        data: [
          productStats?.totalProducts || 0,
          productStats?.availableProducts || 0,
          userStats?.totalUsers || 0,
          orderStats?.totalOrders || 0,
          null,
        ],
        backgroundColor: ["#171615", "#C2A676", "#6E6B65", "#A3875A"],
        borderColor: ["#171615", "#C2A676", "#6E6B65", "#A3875A"],
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Revenue In Currency",
        data: [null, null, null, null, revenueStats?.totalRevenue || 0],
        backgroundColor: ["#B59560"],
        borderColor: ["#947849"],
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { family: "Plus Jakarta Sans", size: 11 },
          color: "#171615",
        },
      },
      tooltip: {
        backgroundColor: "#171615",
        titleFont: { family: "Plus Jakarta Sans" },
        bodyFont: { family: "Plus Jakarta Sans" },
        padding: 10,
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        grid: { color: "rgba(0,0,0,0.04)" },
        ticks: {
          beginAtZero: true,
          font: { family: "Plus Jakarta Sans", size: 11 },
        },
      },
      y2: {
        type: "linear",
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: {
          beginAtZero: true,
          font: { family: "Plus Jakarta Sans", size: 11 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "Plus Jakarta Sans", size: 11 },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
          Overview & Insights
        </span>
        <h2 className="font-serif text-3xl text-obsidian font-normal">
          Atelier Performance
        </h2>
      </div>

      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <>
          {/* 5 Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-stone-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[10px] uppercase tracking-widest font-semibold">Catalog Works</span>
                <LuPackage className="w-4 h-4 text-champagne" />
              </div>
              <p className="font-serif text-2xl text-obsidian font-normal">
                {productStats?.totalProducts || 0}
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[10px] uppercase tracking-widest font-semibold">In Stock</span>
                <LuCircleCheck className="w-4 h-4 text-champagne" />
              </div>
              <p className="font-serif text-2xl text-obsidian font-normal">
                {productStats?.availableProducts || 0}
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[10px] uppercase tracking-widest font-semibold">Clients</span>
                <LuUsers className="w-4 h-4 text-champagne" />
              </div>
              <p className="font-serif text-2xl text-obsidian font-normal">
                {userStats?.totalUsers || 0}
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[10px] uppercase tracking-widest font-semibold">Orders</span>
                <LuShoppingBag className="w-4 h-4 text-champagne" />
              </div>
              <p className="font-serif text-2xl text-obsidian font-normal">
                {orderStats?.totalOrders || 0}
              </p>
            </div>

            <div className="bg-white border border-stone-200/80 p-5 shadow-sm space-y-2 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[10px] uppercase tracking-widest font-semibold">Total Revenue</span>
                <LuDollarSign className="w-4 h-4 text-champagne" />
              </div>
              <p className="font-serif text-2xl text-obsidian font-normal">
                ₹{revenueStats?.totalRevenue || 0}
              </p>
            </div>
          </div>

          {/* Chart View */}
          <div className="bg-white border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-lg text-obsidian font-normal">
              Acquisition & Inventory Distributions
            </h3>
            <div className="h-80 w-full">
              <Bar data={data} options={options} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
