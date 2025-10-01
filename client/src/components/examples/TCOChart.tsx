import TCOChart from '../TCOChart';

export default function TCOChartExample() {
  const mockData = [
    { year: 1, acquisition: 2450000, energy: 120000, maintenance: 85000, retrofits: 0, total: 2655000 },
    { year: 2, acquisition: 0, energy: 125000, maintenance: 90000, retrofits: 0, total: 215000 },
    { year: 3, acquisition: 0, energy: 130000, maintenance: 95000, retrofits: 150000, total: 375000 },
    { year: 4, acquisition: 0, energy: 135000, maintenance: 100000, retrofits: 0, total: 235000 },
    { year: 5, acquisition: 0, energy: 140000, maintenance: 105000, retrofits: 200000, total: 445000 },
  ];

  return (
    <div className="space-y-6">
      <TCOChart data={mockData} type="area" title="TCO Breakdown by Year" />
    </div>
  );
}
