import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

interface TCOWizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: (data: any) => void;
}

export default function TCOWizardDialog({ open, onOpenChange, onComplete }: TCOWizardDialogProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    terminal: "",
    equipmentType: "",
    oem: "",
    model: "",
    technicalLife: "",
    dueDiligence: "",
    assetCost: "",
    installation: "",
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete?.(formData);
    onOpenChange(false);
    console.log("TCO Wizard completed:", formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl shadow-2xl" data-testid="dialog-tco-wizard">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New TCO Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="terminal">Terminal</Label>
                  <Select
                    value={formData.terminal}
                    onValueChange={(value) => setFormData({ ...formData, terminal: value })}
                  >
                    <SelectTrigger id="terminal" data-testid="select-terminal">
                      <SelectValue placeholder="Select terminal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apm-rotterdam">APM Terminals Rotterdam</SelectItem>
                      <SelectItem value="maersk-newark">Maersk Newark</SelectItem>
                      <SelectItem value="apm-la">APM Terminals LA</SelectItem>
                      <SelectItem value="hamburg">Hamburg Terminal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipmentType">Equipment Type</Label>
                  <Select
                    value={formData.equipmentType}
                    onValueChange={(value) => setFormData({ ...formData, equipmentType: value })}
                  >
                    <SelectTrigger id="equipmentType" data-testid="select-equipment-type">
                      <SelectValue placeholder="Select equipment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qc">Quay Crane (QC)</SelectItem>
                      <SelectItem value="rtg">Rubber Tyred Gantry (RTG)</SelectItem>
                      <SelectItem value="sc">Straddle Carrier (SC)</SelectItem>
                      <SelectItem value="sts">Ship-to-Shore (STS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="oem">OEM</Label>
                    <Select
                      value={formData.oem}
                      onValueChange={(value) => setFormData({ ...formData, oem: value })}
                    >
                      <SelectTrigger id="oem" data-testid="select-oem">
                        <SelectValue placeholder="Select OEM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zpmc">ZPMC</SelectItem>
                        <SelectItem value="liebherr">Liebherr</SelectItem>
                        <SelectItem value="konecranes">Konecranes</SelectItem>
                        <SelectItem value="kalmar">Kalmar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., QC-400"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      data-testid="input-model"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicalLife">Technical Life (years)</Label>
                  <Input
                    id="technicalLife"
                    type="number"
                    placeholder="e.g., 15"
                    value={formData.technicalLife}
                    onChange={(e) => setFormData({ ...formData, technicalLife: e.target.value })}
                    data-testid="input-technical-life"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Asset Acquisition Costs</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDiligence">Due Diligence (USD)</Label>
                  <Input
                    id="dueDiligence"
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.dueDiligence}
                    onChange={(e) => setFormData({ ...formData, dueDiligence: e.target.value })}
                    data-testid="input-due-diligence"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetCost">Asset Cost (USD)</Label>
                  <Input
                    id="assetCost"
                    type="number"
                    placeholder="e.g., 2000000"
                    value={formData.assetCost}
                    onChange={(e) => setFormData({ ...formData, assetCost: e.target.value })}
                    data-testid="input-asset-cost"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installation">Construction/Installation (USD)</Label>
                  <Input
                    id="installation"
                    type="number"
                    placeholder="e.g., 300000"
                    value={formData.installation}
                    onChange={(e) => setFormData({ ...formData, installation: e.target.value })}
                    data-testid="input-installation"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Review & Confirm</h3>
              <div className="rounded-md border p-4 space-y-3 bg-muted/30">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Terminal:</span>
                    <span className="ml-2 font-medium">{formData.terminal || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Equipment:</span>
                    <span className="ml-2 font-medium">{formData.equipmentType || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">OEM:</span>
                    <span className="ml-2 font-medium">{formData.oem || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Model:</span>
                    <span className="ml-2 font-medium">{formData.model || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Technical Life:</span>
                    <span className="ml-2 font-medium">{formData.technicalLife || 'Not set'} years</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Asset Cost:</span>
                    <span className="ml-2 font-medium font-mono">
                      ${formData.assetCost ? parseInt(formData.assetCost).toLocaleString() : '0'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Click "Create TCO" to save as draft. You can edit and add more details later.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            data-testid="button-wizard-back"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext} data-testid="button-wizard-next">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} data-testid="button-wizard-create">
              <Check className="mr-2 h-4 w-4" />
              Create TCO
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
