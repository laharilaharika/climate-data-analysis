import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../App.css";

/* Register Chart.js components ONCE */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function UploadCSV() {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = String(event.target.result || "");
      const rows = text.split(/\r?\n/);

      const newLabels = [];
      const newValues = [];

      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(",");
        if (cols.length >= 2 && cols[0] && !isNaN(cols[1])) {
          newLabels.push(cols[0].trim());
          newValues.push(Number(cols[1]));
        }
      }

      setLabels(newLabels);
      setValues(newValues);
    };

    reader.readAsText(file);
  };

  /* Memoized chart data to avoid object recreation issues */
  const chartData = useMemo(() => {
    return {
      labels: [...labels],
      datasets: [
        {
          label: "Climate Data",
          data: [...values],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)",
          tension: 0.4,
        },
      ],
    };
  }, [labels, values]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
    };
  }, []);

  return (
    <div className="upload-container">
      <h2>Upload Climate CSV</h2>

      <input type="file" accept=".csv" onChange={handleFile} />

      {/* SAFETY CHECK BEFORE RENDERING CHART */}
      {Array.isArray(labels) &&
        Array.isArray(values) &&
        labels.length > 0 &&
        values.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
    </div>
  );
}
