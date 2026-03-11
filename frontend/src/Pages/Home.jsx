import Categories from "../Components/Categories";
import DealsHeader from "../Components/DealsHeader";
import FoodCard from "../Components/FoodCard";

import Footer from "../Components/Footer";
import Logo from "../Components/Logo";
import ProfilePic from "../Components/ProfilePic";
import SearchSection from "../Components/SearchSection";

function Home() {
  return (
    <div className="bg-black min-h-screen pb-20">
      <header className="bg-[#fd6931] flex flex-col items-center">
        <div className="container flex justify-between items-center mx-auto px-5 py-4">
          <Logo />
          <ProfilePic />
        </div>

        <SearchSection />
      </header>

      <main>
        <Categories/>
        <DealsHeader/>
        <FoodCard/>
      </main>

      <footer className="flex justify-center w-full border-t fixed bottom-0 bg-black border-gray-700">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
