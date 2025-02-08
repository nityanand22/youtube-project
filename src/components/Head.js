import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => clearInterval(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestion(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 justify-around">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/What%20is%20a%20Hamburger%20Button.png?width=225&name=What%20is%20a%20Hamburger%20Button.png"
          alt="hamburger icon"
        />
        <a href="/">
          <img
            className="h-8"
            src="https://t4.ftcdn.net/jpg/07/37/98/99/360_F_737989984_yqhTN9GhvLeuUiLjUp9MSe1IacGNXlsl.jpg"
            alt="youtube logo"
          />
        </a>
      </div>
      <div className="col-span-10 px-15">
        <div>
          <input
            value={searchQuery}
            type="text"
            className=" px-5 w-1/2 border border-gray-800 p-2 rounded-l-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-800 px-5 py-2  rounded-r-full">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="absolute bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-200">
            <ul>
              {suggestion.map((sug) => (
                <li key={sug} className="py-2 px-3 shadow-sm hover:bg-gray-200">
                  🔍{sug}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
