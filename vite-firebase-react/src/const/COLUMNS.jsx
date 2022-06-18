import React from "react";
import DetailButton from "../Component/DetailButton";
import Status from "../Component/Status";

export const COLUMNS = [
  {
    field: "status",
    headerName: "対応状況",
    width: 200,
    disableClickEventBubbling: true,
    renderCell: (params) => <Status params={params.row.status} />,
  },
  {
    field: "more",
    headerName: "詳細",
    width: 200,
    disableClickEventBubbling: true,
    renderCell: (params) => <DetailButton params={params} />,
  },
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "お名前",
    width: 200,
  },
  {
    field: "email",
    headerName: "メールアドレス",
    width: 200,
  },
  //   {
  //     field: "product",
  //     headerName: "製品型番",
  //     width: 110,
  //   },
  {
    field: "displayDetail",
    headerName: "お問い合わせ内容",
    width: 350,
  },
  {
    field: "timestamp",
    headerName: "お問い合わせ日時",
    width: 200,
  },
];
