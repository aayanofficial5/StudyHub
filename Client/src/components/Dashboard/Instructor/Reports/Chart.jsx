import { useState } from "react";
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register necessary elements for pie chart
ChartJs.register(ArcElement, Tooltip, Legend, ...registerables); // ArcElement is essential for Pie charts :contentReference[oaicite:1]{index=1}

export default function Chart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const chartIncomeData = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-xl bg-gray-800/80 p-6">
      <p className="text-lg font-bold text-gray-200">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-blue-500 text-gray-50"
              : "text-gray-400"
          }`}
        >
          Student
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-blue-500 text-gray-50"
              : "text-gray-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto h-80 w-full">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
