import type { IUser } from "@catering/types";
import { Clock, Fingerprint, Phone, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import { useCustomersI18n } from "../lib/customers-i18n";
import { getRoleBadgeStyles } from "../utils/badge";

interface UserDetailsProps {
  user: IUser;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

const DetailField = ({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <Icon className="mt-1 h-4 w-4 flex-shrink-0 text-primary/60" />
    <div className="flex-1 min-w-0">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{label}</Label>
      <p className={`mt-1.5 text-sm font-medium text-foreground ${mono ? "font-mono text-xs" : ""} break-all`}>
        {value}
      </p>
    </div>
  </div>
);

export const CustomerDetails = ({ user }: UserDetailsProps) => {
  const i18n = useCustomersI18n();

  return (
    <div className="space-y-6">
      {/* Hero Section - Profile Header */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card via-card to-muted/30 p-8">
        {/* Decorative background elements */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex items-start gap-6">
          {/* Avatar */}
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-2xl font-bold text-primary-foreground">
            {getInitials(user.name)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-xl font-bold tracking-tight text-foreground">{user.name}</h2>
                <p className="mt-1 truncate text-sm text-muted-foreground">{user.phone}</p>
              </div>
              <div className="flex-shrink-0">
                <Badge variant="outline" className={getRoleBadgeStyles(user.role)}>
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 text-primary/60" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">{i18n.details.contact}</h3>
        </div>
        <div className="rounded-lg border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
          <DetailField icon={Phone} label={i18n.details.phoneNumber} value={user.phone} />
        </div>
      </div>

      {/* System Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Fingerprint className="h-4 w-4 text-primary/60" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">{i18n.details.systemInfo}</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <DetailField icon={Fingerprint} label={i18n.details.userId} value={user.id} mono />
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <DetailField icon={Users} label={i18n.details.roleLabel} value={user.role} />
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Clock className="h-4 w-4 text-primary/60" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">{i18n.details.activity}</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <DetailField icon={Clock} label={i18n.details.createdLabel} value={formatDate(user.createdAt)} />
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <DetailField icon={Clock} label={i18n.details.lastUpdatedLabel} value={formatDate(user.updatedAt)} />
          </div>
        </div>
      </div>
    </div>
  );
};
