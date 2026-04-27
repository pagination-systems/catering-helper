interface SectionHeaderProps {
  title: string;
  description: string;
  titleId?: string;
}

export const SectionHeader = ({ title, description, titleId = "dashboard-title" }: SectionHeaderProps) => {
  return (
    <header className="space-y-1">
      <h1 id={titleId} className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
};
