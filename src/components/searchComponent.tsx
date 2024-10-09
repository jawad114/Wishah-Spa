import { LucideSearch } from "lucide-react";

const SearchComponent = () => {
  return (
    <div className="relative w-[1525px] h-[130px] mt-[25px] ml-[304px] bg-pink-500 rounded-t-lg  top-0 opacity-90">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-pink-300 rounded-t-lg" />
      <div className="relative z-10 p-4 flex flex-col  gap-2 h-full">
        <h1 className="text-white text-lg mb-2 text-left">What are you looking for?</h1>
        <div className="w-full max-w-[98%] flex items-center bg-white rounded-lg shadow-lg">
          <LucideSearch className="ml-3 text-gray-500" />
          <input
            type="text"
            className="w-full p-3 outline-none rounded-lg"
            placeholder="Search for title, Category name etc."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
