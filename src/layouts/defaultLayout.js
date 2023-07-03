import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

function DefaultLayout({ children }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div style={{ flex: "1" }}>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
