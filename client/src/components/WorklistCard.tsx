import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface WorklistItem {
  id: string;
  tcoId: string;
  assetType: string;
  terminal: string;
  requestor: string;
  submittedDate: string;
  slaHoursLeft: number;
  status: "pending_approval" | "pending_clarification";
}

interface WorklistCardProps {
  item: WorklistItem;
  onApprove?: (id: string) => void;
  onRequestClarification?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function WorklistCard({ item, onApprove, onRequestClarification, onView }: WorklistCardProps) {
  const isUrgent = item.slaHoursLeft <= 24;
  const daysLeft = Math.ceil(item.slaHoursLeft / 24);

  return (
    <Card className="shadow-md hover-elevate transition-all" data-testid={`card-worklist-${item.id}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg font-mono" data-testid={`text-tco-id-${item.id}`}>{item.tcoId}</h3>
                <StatusBadge status={item.status} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Asset Type:</span>
                  <span className="ml-2 font-medium">{item.assetType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Terminal:</span>
                  <span className="ml-2 font-medium">{item.terminal}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Requestor:</span>
                  <span className="ml-2">{item.requestor}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="ml-2">{item.submittedDate}</span>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${isUrgent ? 'bg-destructive/10' : 'bg-muted'}`}>
              {isUrgent ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                <Clock className="h-4 w-4 text-muted-foreground" />
              )}
              <div className="text-sm">
                <div className={`font-semibold ${isUrgent ? 'text-destructive' : ''}`}>
                  {daysLeft}d left
                </div>
                <div className="text-xs text-muted-foreground">SLA</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={() => onView?.(item.id)} variant="outline" size="sm" data-testid={`button-view-${item.id}`}>
              View Details
            </Button>
            {item.status === "pending_approval" && (
              <>
                <Button onClick={() => onApprove?.(item.id)} size="sm" data-testid={`button-approve-${item.id}`}>
                  Approve
                </Button>
                <Button onClick={() => onRequestClarification?.(item.id)} variant="outline" size="sm" data-testid={`button-clarify-${item.id}`}>
                  Request Clarification
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
