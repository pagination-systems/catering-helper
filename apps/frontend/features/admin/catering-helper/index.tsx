"use client";

import { If } from "@/components/if";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SectionHeader } from "../components/section-header";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { InvitationForm } from "./components/invitation-form";
import { SentInvitationsTable } from "./components/sent-invitations-table";
import { TableToolbar } from "./components/table-toolbar";
import { UserDetails } from "./components/user-details";
import { UserTable } from "./components/user-table";
import { useCateringHelperI18n } from "./lib/catering-helper-i18n";
import type { InvitePlatformAdminValues } from "./schemas/user.schema";
import { useUsersStore } from "./store/useStore";

export const CateringHelper = () => {
  const i18n = useCateringHelperI18n();
  const data = useUsersStore((state) => state.list);
  const isInvitationSheetOpen = useUsersStore((state) => state.isInvitationSheetOpen);
  const isInvitationHistorySheetOpen = useUsersStore((state) => state.isInvitationHistorySheetOpen);
  const isViewSheetOpen = useUsersStore((state) => state.isViewSheetOpen);
  const selectedViewItem = useUsersStore((state) => state.selectedViewItem);
  const setInvitationSheetOpen = useUsersStore((state) => state.setInvitationSheetOpen);
  const setInvitationHistorySheetOpen = useUsersStore((state) => state.setInvitationHistorySheetOpen);
  const setViewSheetOpen = useUsersStore((state) => state.setViewSheetOpen);
  const closeInvitationSheet = useUsersStore((state) => state.closeInvitationSheet);
  const closeInvitationHistorySheet = useUsersStore((state) => state.closeInvitationHistorySheet);
  const closeViewSheet = useUsersStore((state) => state.closeViewSheet);

  const onSubmitInvitation = (values: InvitePlatformAdminValues) => {
    console.log("Sending invitation with values:", values);
    closeInvitationSheet();
  };

  return (
    <section className="space-y-4" aria-labelledby="users-title">
      <SectionHeader title={i18n.title} description={i18n.description} />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar />
        </CardHeader>

        <CardContent className="space-y-4">
          <UserTable data={data} />
        </CardContent>
      </Card>

      <Sheet open={isInvitationSheetOpen} onOpenChange={setInvitationSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{i18n.invitation.title}</SheetTitle>
            <SheetDescription>{i18n.invitation.description}</SheetDescription>
          </SheetHeader>

          <InvitationForm onSubmit={onSubmitInvitation} submitLabel={i18n.invitation.sendInvitation} />
        </SheetContent>
      </Sheet>

      <Sheet
        open={isInvitationHistorySheetOpen}
        onOpenChange={(open) => (open ? setInvitationHistorySheetOpen(true) : closeInvitationHistorySheet())}
      >
        <SheetContent side="right" className="space-y-4 sm:!max-w-[700px]">
          <SheetHeader>
            <SheetTitle>{i18n.sentInvitations.title}</SheetTitle>
            <SheetDescription>{i18n.sentInvitations.description}</SheetDescription>
          </SheetHeader>

          <Card>
            <SentInvitationsTable />
          </Card>
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="space-y-6">
          <SheetHeader>
            <SheetTitle>{i18n.details.title}</SheetTitle>
            <SheetDescription>{i18n.description}</SheetDescription>
          </SheetHeader>

          <If
            expression={!!selectedViewItem}
            fallback={<p className="text-sm text-muted-foreground">{i18n.details.noUser}</p>}
          >
            {selectedViewItem && <UserDetails user={selectedViewItem} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
