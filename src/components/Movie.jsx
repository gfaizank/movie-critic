import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [reviews, setReviews] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [movieData, setMovieData] = useState({
    name: "",
    release: "",
  });

  const toggleMovieModal = () => {
    setIsMovieOpen(!isMovieOpen);
  };

  const toggleReviewModal = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    toggleReviewModal();
  };

  useEffect(() => {
    fetchMovieDetails(movieName);
  }, [movieName]);

  const fetchMovieDetails = async (movieName) => {
    try {
      const response = await fetch(
        `https://saasmonkbackend.onrender.com/getMovie/${encodeURIComponent(
          movieName
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* navbar */}
      <div className="flex flex-row h-20 bg-[#e3e8ec] justify-between px-6 items-center">
        <div className="">MOVIECRITIC</div>
        <div className="flex flex-row gap-4">
          <button
            onClick={toggleMovieModal}
            className="bg-white text-[#756af5] text-sm p-2 border border-[#756af5] rounded-md"
          >
            Add New Movie
          </button>
          <button
            onClick={toggleReviewModal}
            className="bg-[#756af5] text-white text-sm p-2 border rounded-md"
          >
            Add New Review
          </button>
        </div>
      </div>

      {/* movie-modal */}
      {isMovieOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-500 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            {/* movie Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* movie Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add new movie
                </h3>
                <button
                  onClick={toggleMovieModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* movie Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="flex flex-col gap-4 mb-4">
                  <div className="">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Release Date"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-[#756af5] hover:bg-[#756af5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create movie
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* review-modal */}
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-500 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            {/* review Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* review Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Review
                </h3>
                <button
                  onClick={toggleReviewModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* review Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="flex flex-col gap-4 mb-4">
                  <div className="">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Select a movie</option>
                      <option value="TV">Avengers</option>
                      <option value="PC">IronMan</option>
                      <option value="GA">Tarzan</option>
                      <option value="PH">Welcome</option>
                    </select>
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rating out of 10"
                      required
                    />
                  </div>
                  <div className="">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Review Comments"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-[#756af5] hover:bg-[#756af5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* hero */}
      <div className="flex flex-row justify-between px-12 mt-8">
        <h1 className="text-3xl">{movieDetails.movieName}</h1>
        <h1 className="text-3xl text-[#6558f5]">9/10</h1>
      </div>

      <div className="relative flex flex-col gap-4 px-12 mt-8">
        <div className="flex flex-col border-2 h-24 py-4 px-4 gap-3">
          <div className="flex flex-row justify-between">
            <h1>This is the best movie ever! I really enjoyed it</h1>
            <h1 className="text-[#6558f5]">9/10</h1>
          </div>
          <h1 className="text-sm italic">By Amitav Khandelwal</h1>
        </div>
        <div className="flex flex-col border-2 h-24 py-4 px-4 gap-3">
          <div className="flex flex-row justify-between">
            <h1>This is the best movie ever! I really enjoyed it</h1>
            <h1 className="text-[#6558f5]">9/10</h1>
          </div>
          <h1 className="text-sm italic">By Amitav Khandelwal</h1>
        </div>
        <div className="flex flex-col border-2 h-24 py-4 px-4 gap-3">
          <div className="flex flex-row justify-between">
            <h1>This is the best movie ever! I really enjoyed it</h1>
            <h1 className="text-[#6558f5]">9/10</h1>
          </div>
          <h1 className="text-sm italic">By Amitav Khandelwal</h1>
        </div>
      </div>

      {/* footer */}
      <footer className="flex flex-row h-16 bg-[#ced8e0] justify-between px-6 items-center fixed bottom-0 w-full">
        <h1 className="text-gray-100">Copyright 2021</h1>
        <h1 className="text-gray-100">Follow us on instagram</h1>
      </footer>
    </div>
  );
};

export default Movie;
