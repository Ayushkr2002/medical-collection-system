import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d7d9e1]">
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;