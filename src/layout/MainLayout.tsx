import Footer from "../components/Footer";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="container">
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};
