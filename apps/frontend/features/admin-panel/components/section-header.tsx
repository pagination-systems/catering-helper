interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <header className="space-y-1">
      <h1 id="dashboard-title" className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
};
