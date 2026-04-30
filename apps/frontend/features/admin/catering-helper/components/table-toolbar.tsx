import { Eye, SearchIcon, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsersStore } from "../store/useStore";

export const TableToolbar = () => {
  const query = useUsersStore((state) => state.query);
  const setQuery = useUsersStore((state) => state.setQuery);
  const openInvitation = useUsersStore((state) => state.openInvitation);
  const openInvitationHistory = useUsersStore((state) => state.openInvitationHistory);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[14rem] flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, email or id"
          className="pl-8"
        />
      </div>

      <Button variant="outline" type="button" onClick={openInvitationHistory}>
        <Eye className="size-4" />
        View Sent Invitations
      </Button>

      <Button type="button" className="ml-auto" onClick={openInvitation}>
        <UserPlus className="size-4" />
        Invite Platform Admin
      </Button>
    </div>
  );
};
