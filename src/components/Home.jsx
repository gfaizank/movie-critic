import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    movie: "",
    name: "",
    rating: "",
    comments: "",
  });

  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [movieData, setMovieData] = useState({
    name: "",
    release: "",
  });

  const toggleMovieModal = () => {
    setIsMovieOpen(!isMovieOpen);
  };
  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
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
  //review data submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const formReviewData = {
      movieName: formData.movie,
      userName: formData.name,
      rating: formData.rating,
      comments: formData.comments,
    };

    try {
      const response = await fetch(
        "https://saasmonkbackend.onrender.com/addreview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formReviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      console.log("Form submitted with review data:", formReviewData);
      toggleReviewModal();
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  // movie data submit
  const handleMovieSubmit = async (e) => {
    e.preventDefault();

    const formMovieData = {
      movieName: movieData.name,
      date: movieData.release,
    };

    try {
      const response = await fetch(
        "https://saasmonkbackend.onrender.com/addmovie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formMovieData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      console.log("Form submitted with movie data:", formMovieData);
      toggleMovieModal();
      setModalSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  // movie cards logic
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://saasmonkbackend.onrender.com/getMovie")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setMovies(data.data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [modalSubmitted]);

  const handleCardClick = (movieName) => {
    navigate(`/movie/${encodeURIComponent(movieName)}`);
  };

  const handleDeleteMovie = async (movieName) => {
    try {
      const response = await fetch(`https://saasmonkbackend.onrender.com/deletemovie/${encodeURIComponent(movieName)}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      setMovies(prevMovies => prevMovies.filter(movie => movie.movieName !== movieName));
    } catch (error) {
      console.error('Error deleting movie:', error);
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
              <form className="p-4 md:p-5" onSubmit={handleMovieSubmit}>
                {/* Form fields */}
                <div className="flex flex-col gap-4 mb-4">
                  <div className="">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={movieData.name}
                      onChange={handleMovieChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="release"
                      id="release"
                      value={movieData.release}
                      onChange={handleMovieChange}
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
              <form className="p-4 md:p-5" onSubmit={handleReviewSubmit}>
                {/* Form fields */}
                <div className="flex flex-col gap-4 mb-4">
                  <div className="">
                    <select
                      id="movie"
                      name="movie"
                      value={formData.movie}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Select a movie</option>
                      {movies.map((movie, index) => (
                        <option key={index} value={movie.movieName}>
                          {movie.movieName}
                        </option>
                      ))}
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
                      name="rating"
                      id="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rating out of 10"
                      required
                    />
                  </div>
                  <div className="">
                    <textarea
                      id="comments"
                      name="comments"
                      defaultValue={formData.comments}
                      onChange={handleChange}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Review Comments"
                      required
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

      <h1 className="mx-6 mt-8 text-2xl">The best movies review site!</h1>

      {/* Search Bar */}

      <div class="relative ml-6 mt-8">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-80 p-4 ps-10 text-sm text-gray-900 border-2 border-[#756af5] rounded-md bg-gray-50 focus:[#756af5]"
          placeholder="Search for your favourite movie"
          required
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-2 bg-transparent h-92 px-6 mt-8">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center"
            
          >
            <h1 onClick={() => handleCardClick(movie.movieName)} className="mb-2">{movie.movieName}</h1>
            <p className="mb-2 text-xs italic">Released {movie.date}</p>
            <p className="mb-2 text-xs font-bold">
              Rating: {movie.avgRating}/10
            </p>
            <MdDelete onClick={() => handleDeleteMovie(movie.movieName)} />
          </div>
        ))}
        </div>
        {/* <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>

        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>

        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>

        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>

        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>
        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>
        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div>
        <div className="h-32 w-80 bg-[#e0defc] flex flex-col p-3 justify-center">
            <h1 className="mb-2">Star Wars: A new hope</h1>
            <p className="mb-2 text-xs italic ">Released 1st August, 2022</p>
            <p className="mb-2 text-xs font-bold">Rating: 9/10</p>
        </div> */}
      

      {/* footer */}
      <footer className="flex flex-row h-16 bg-[#ced8e0] justify-between px-6 items-center fixed bottom-0 w-full">
        <h1 className="text-gray-100">Copyright 2021</h1>
        <h1 className="text-gray-100">Follow us on instagram</h1>
      </footer>
    </div>
  );
};

export default Home;
