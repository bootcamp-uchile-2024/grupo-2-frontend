import { Footer } from "@/components/UI/Footer";
import Header from "@/components/UI/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};
