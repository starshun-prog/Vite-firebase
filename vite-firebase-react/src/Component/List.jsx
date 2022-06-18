import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { COLUMNS } from "../const/COLUMNS";
import { db } from "../firebase";
import MenuBar from "./Basic/MenuBar";
import CustomNoRowsOverlay from "./Basic/NoRows";

const List = () => {
  const [posts, setPosts] = useState([{ id: "" }]);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const q = query(collection(db, "testSubmit"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          status: doc.data().status ? doc.data().status : "未対応",
          name: doc.data().name,
          email: doc.data().email,
          displayDetail:
            doc.data().detail.length >= 100
              ? doc.data().detail.slice(0, 99) + "..."
              : doc.data().detail,
          detail: doc.data().detail,
          timestamp: new Date(doc.data().timestamp.toDate()).toLocaleString(),
        }))
      );
      posts.map((post) => console.log(post));
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <>
      <MenuBar color="#9c27b0" menuTitle="お問い合わせ一覧" />

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={COLUMNS}
          pageSize={pageSize}
          disableSelectionOnClick
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          getRowHeight={() => "auto"}
          sx={{
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: 1,
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "15px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "22px",
            },
          }}
        />
      </div>
    </>
  );
};

export default List;
