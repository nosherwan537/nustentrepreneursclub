import MainPage1 from "@/components/module_01";
import AboutSection from "@/components/module_02";
import MainPage5 from "@/components/model_05";
import JoinUs from "@/components/JoinUs";
import Footer from "@/components/footer";
 

const App = () => {
  return (
    <>
                <div className="fixed inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-10 w-1/4 h-1/4 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-1/5 h-1/5 bg-teal-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>
      <MainPage1 />
      <AboutSection />
      <MainPage5 />
      <JoinUs />
      <Footer/>
    </>
  );
};

export default App;
