import { useMemo } from "react";
import { If } from "@/components/if";
import { Loader } from "../../components/loader";
import { useOrder, useUpdateOrder } from "../hooks";
import { useOrdersI18n } from "../lib/orders-i18n";
import type { IOrder } from "../schemas/order.schema";
import { getUpcomingDays, useOrdersStore } from "../store/useStore";
import { OrderForm } from "./order-form";

interface UpdateOrderProps {
  selectedOrder: IOrder;
}

export const UpdateOrder = ({ selectedOrder }: UpdateOrderProps) => {
  const i18n = useOrdersI18n();
  const upcomingDays = useMemo(() => getUpcomingDays(), []);

  const closeEditSheet = useOrdersStore((state) => state.closeEditSheet);
  const { order, isGettingOrder } = useOrder(selectedOrder.id);
  const { updateOrder } = useUpdateOrder();

  return (
    <If expression={!isGettingOrder} fallback={<Loader />}>
      <OrderForm
        onSubmit={(values) => {
          if (!selectedOrder.id) return;
          updateOrder({ id: selectedOrder.id, payload: values }, closeEditSheet);
        }}
        initialData={order}
        submitLabel={i18n.form.submitSave}
        upcomingDays={upcomingDays}
        tenantId={selectedOrder.tenantId}
      />
    </If>
  );
};
