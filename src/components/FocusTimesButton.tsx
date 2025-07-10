import { LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { useFocusTimes } from "@/hooks/useFocusTimes";
import BarChart from "./BarChart";
import {
  Drawer, DrawerContent,
  DrawerDescription, DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { useMemo } from "react";
import { subDays } from "date-fns";
import { formatDate } from "@/lib/utils";


export default function FocusTimesButton() {
  const { data: focusTimes } = useFocusTimes();

  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        raw: date,
        formatted: formatDate(date),
      };
    });
  }, []);

  const data = useMemo(() => {
    return last7Days.map(({ formatted }) => {
      const record = focusTimes?.find((t) => t.date === formatted);
      return {
        label: formatted,
        time: record?.time ?? 0,
      };
    });
  }, [focusTimes, last7Days]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="cursor-pointer p-1.5"
        >
          <LayoutDashboard className="box-content" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col pb-12 pt-3">
        <DrawerHeader>
          <DrawerTitle>Focus Times for the last 7 days</DrawerTitle>
          <DrawerDescription>idk what to put here</DrawerDescription>
        </DrawerHeader>
        <BarChart data={data} />
      </DrawerContent>
    </Drawer>
  );
}
