import { IData } from "@/services/external-api";
import { DataTable } from "./ui/data-table";

interface IHomeTableProps {
  dataTable: Array<IData>;
}
export function HomeTable({ dataTable }: IHomeTableProps) {
  return (
    <DataTable
      columns={[
        {
          accessorKey: "title",
          header: "Titulo",
        },
        {
          accessorKey: "url",
          header: "URL",
        },
        {
          accessorKey: "thumbnailUrl",
          header: "Thumbnail",
        },
      ]}
      data={dataTable}
    />
  );
}
