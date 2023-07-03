import Sidebar from "../component/admin/Sidebar";
function AdminLayout({ children }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        overflow: "scroll-y",
      }}
    >
      <Sidebar />
      {children}
    </div>
  );
}

export default AdminLayout;
