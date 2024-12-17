import { Footer } from "@/components/UI/Footer";
import Header from "@/components/UI/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-between ">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};
