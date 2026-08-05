import Navbar from "../components/Navbar";

function mainLayout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d7d9e1]">
      <Navbar />
      {children}
    </div>
  );
}

export default mainLayout;