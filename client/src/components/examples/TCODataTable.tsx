import TCODataTable from '../TCODataTable';

export default function TCODataTableExample() {
  const mockData = [
    { id: "TCO-001", version: 1, terminal: "APM Terminals Rotterdam", equipmentType: "Quay Crane", oem: "ZPMC", model: "QC-400", tcoValue: 2450000, status: "published" as const, creator: "John Smith", date: "2024-01-15" },
    { id: "TCO-002", version: 2, terminal: "Maersk Newark", equipmentType: "RTG", oem: "Konecranes", model: "RTG-E", tcoValue: 1850000, status: "pending_approval" as const, creator: "Sarah Chen", date: "2024-02-20" },
    { id: "TCO-003", version: 1, terminal: "APM Terminals LA", equipmentType: "Ship-to-Shore", oem: "Liebherr", model: "STS-600", tcoValue: 3200000, status: "approved" as const, creator: "Mike Johnson", date: "2024-03-05" },
    { id: "TCO-004", version: 3, terminal: "Hamburg Terminal", equipmentType: "Straddle Carrier", oem: "Kalmar", model: "SC-Elite", tcoValue: 980000, status: "draft" as const, creator: "Anna Mueller", date: "2024-03-10" },
  ];

  return (
    <TCODataTable
      data={mockData}
      onEdit={(id) => console.log('Edit:', id)}
      onCopy={(id) => console.log('Copy:', id)}
      onDelete={(id) => console.log('Delete:', id)}
    />
  );
}
