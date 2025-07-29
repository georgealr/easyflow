import React, { useEffect, useState } from 'react';

const Analytics = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    // Mock API call pentru date heatmap și statistici
    setHeatmapData([
      { x: 100, y: 200, value: 10 },
      { x: 150, y: 250, value: 15 },
      { x: 200, y: 300, value: 8 },
    ]);
    setTotalClicks(33); // Total mock clicks
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">Visitor Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Heatmap</h3>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center relative">
            {heatmapData.map((point, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 rounded-full bg-red-500 opacity-75"
                style={{ left: `${point.x}px`, top: `${point.y}px`, transform: 'translate(-50%, -50%)' }}
                title={`Clicks: ${point.value}`}
              />
            ))}
            <p className="text-gray-600">Mock Heatmap (Click points)</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Statistics</h3>
          <p>Total Clicks: {totalClicks}</p>
          <p>Average Interaction Time: 2m 15s (mock)</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
