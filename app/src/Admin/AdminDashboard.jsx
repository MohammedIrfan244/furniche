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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
function AdminDashboard({ users = [], products = [] }) {
  const userCount = users?.length;
  const productCount = products?.length;
  let totalOrders = 0;
  let totalRevenue = 0;

  users.forEach((user) => {
    const userOrders = user.orders;
    totalOrders += userOrders.length;

    userOrders.forEach((order) => {
      totalRevenue += order.totalAmount;
    });
  });

  const data = {
    labels: ["Users", "Products", "Orders", "Revenue in Rupee"],
    datasets: [
      {
        label: "Count",
        data: [userCount, productCount, totalOrders],
        backgroundColor: ["#DC143C", "#4169E1", "#32CD32"],
        borderColor: ["#38B2AC", "#2B6CB0", "#228B22"],
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Revenue in Rupee",
        data: [null, null, null, totalRevenue],
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
    <div className="chart-container mt-10">
      <Bar data={data} options={options} />
    </div>
  );
}

export default AdminDashboard;
