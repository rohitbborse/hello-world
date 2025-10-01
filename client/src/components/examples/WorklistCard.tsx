import WorklistCard from '../WorklistCard';

export default function WorklistCardExample() {
  const mockItems = [
    {
      id: "1",
      tcoId: "TCO-005",
      assetType: "Quay Crane",
      terminal: "APM Terminals Mumbai",
      requestor: "Raj Patel",
      submittedDate: "2024-03-18",
      slaHoursLeft: 18,
      status: "pending_approval" as const,
    },
    {
      id: "2",
      tcoId: "TCO-006",
      assetType: "RTG",
      terminal: "Maersk Singapore",
      requestor: "Li Wei",
      submittedDate: "2024-03-15",
      slaHoursLeft: 96,
      status: "pending_clarification" as const,
    },
  ];

  return (
    <div className="space-y-4">
      {mockItems.map((item) => (
        <WorklistCard
          key={item.id}
          item={item}
          onApprove={(id) => console.log('Approve:', id)}
          onRequestClarification={(id) => console.log('Request clarification:', id)}
          onView={(id) => console.log('View:', id)}
        />
      ))}
    </div>
  );
}
