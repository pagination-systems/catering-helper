import type { IUser } from "../schemas/user.schema";

interface UserDetailsProps {
  user: IUser;
}

export const UserDetails = ({ user }: UserDetailsProps) => {
  const viewDetails = [
    { label: "ID", value: user.id ?? "-" },
    { label: "Full Name", value: user.name ?? "-" },
    { label: "Email", value: user.email ?? "-" },
    { label: "Role", value: user.role ?? "-" },
    {
      label: "Created At",
      value: user.createdAt.toLocaleString() ?? "-",
    },
    {
      label: "Updated At",
      value: user.updatedAt.toLocaleString() ?? "-",
    },
  ] as const;

  return (
    <div className="grid gap-4">
      {viewDetails.map((item) => (
        <div key={item.label} className="rounded-lg border border-border/70 bg-muted/20 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</p>
          <p className="mt-1 break-words text-sm font-medium text-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
};
