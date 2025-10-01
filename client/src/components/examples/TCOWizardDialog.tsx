import { useState } from 'react';
import TCOWizardDialog from '../TCOWizardDialog';
import { Button } from '@/components/ui/button';

export default function TCOWizardDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open TCO Wizard</Button>
      <TCOWizardDialog
        open={open}
        onOpenChange={setOpen}
        onComplete={(data) => console.log('Completed:', data)}
      />
    </div>
  );
}
