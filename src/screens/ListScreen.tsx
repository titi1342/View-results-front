import { JSX, useRef, useState } from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaSearch,
  FaFlask,
  FaBrain,
  FaHeartbeat,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import useResults from "../hooks/useResults";
import categoriesType from "../models/categoriesType";
import LoadingData from "../components/loader/LoadingData";
import ResultType from "../models/resultType";
import categories from "../components/constants/categories";
import { motion, AnimatePresence } from "framer-motion";

const categoryIcons: Record<string, JSX.Element> = {
  "1": <FaFlask title="Chimie" />,
  "2": <FaBrain title="Neurologie" />,
  "3": <FaHeartbeat title="Cardiologie" />,
};

const ListScreen = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<categoriesType>(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const { data, loading } = useResults(selectedCategory?.id);

  const cleanText = (text: string) => {
    if (!text) return "";
  
    // Remplacer les `**` et `###` et autres remplacements
    return text
      .replace(/\*\*/g, "")
      .replace(/###*/g, "")
      .replace(/(?<![a-zA-Z])-+(?![a-zA-Z])/g, "•")
      .replace(/\n/g, "\n");
  };

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollUp = () => {
    categoriesContainerRef.current?.scrollBy({ top: -100, behavior: "smooth" });
  };

  const scrollDown = () => {
    categoriesContainerRef.current?.scrollBy({ top: 100, behavior: "smooth" });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Formatter la date
  function formatDates(date: string): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  
    const dateObject = new Date(date);
    return formatter.format(dateObject);
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex px-6 pt-6 text-gray-900 dark:text-gray-100">
        {/* Left Menu */}
        <div className="w-64 bg-white/80 backdrop-blur-md dark:bg-gray-900/70 rounded-2xl shadow-md p-4 flex flex-col items-center mr-6">
          <div className="mb-4 w-full flex justify-between items-center">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full w-full">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                font-custom font-normal"
              />
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="my-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={scrollUp}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 mb-4 transition"
          >
            <FaChevronUp className="text-gray-600 dark:text-gray-300" />
          </button>

          <div
            ref={categoriesContainerRef}
            className="flex flex-col space-y-3 overflow-hidden w-full"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {filteredCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-left text-sm transition-all duration-300 font-custom font-semibold ${
                  selectedCategory.id === cat.id
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                }`}
              >
                {categoryIcons[cat.id]}
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={scrollDown}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 mt-4 transition"
          >
            <FaChevronDown className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl text-center text-gray-800 dark:text-white mb-8 underline underline-offset-4  font-custom font-bold">
            {selectedCategory.label}
          </h1>

          {loading ? (
            <LoadingData />
          ) : (
            <div className="space-y-6 pb-8">
              {data.length === 0 ? (
                <div className="text-center  font-custom font-medium text-gray-500 text-xl">No data available</div>
              ) : (
                <AnimatePresence>
                  {data.map((item: ResultType, index: number) => {
                    const itemKey = item.id?.toString() || index.toString();
                    return (
                      <motion.div
                        key={itemKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                      >
                        <button
                          onClick={() => setExpanded(expanded === itemKey ? null : itemKey)}
                          className="flex justify-between items-center w-full group"
                        >
                          <h2 className="text-xl font-custom font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors duration-200">
                            Comment count: {item.comment_count}
                          </h2>
                          {expanded === itemKey ? (
                            <FaChevronUp className="text-blue-600 transform transition-transform duration-300 rotate-180" />
                          ) : (
                            <FaChevronDown className="text-blue-600 transform transition-transform duration-300" />
                          )}
                        </button>

                        <p className="text-sm  font-custom font-medium text-gray-500 dark:text-gray-400 mt-2 italic">
                          {formatDates(item.add_timestamp) || item.id}
                        </p>

                        {expanded === itemKey && (
                          <motion.pre
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 p-4 bg-indigo-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-md whitespace-pre-wrap border border-indigo-100 dark:border-gray-600 overflow-hidden"
                          >
                            {cleanText(item.results)}
                          </motion.pre>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListScreen;