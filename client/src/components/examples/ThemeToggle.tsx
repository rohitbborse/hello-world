import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <p className="text-sm text-muted-foreground">Click to toggle theme</p>
    </div>
  );
}
