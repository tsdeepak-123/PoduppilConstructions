import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../Api/Api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Header() {
  const [bannerData, setBannerData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findbanner");
      setBannerData(response?.data?.allBannerData || []);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBanners = bannerData.filter(banner => !banner.IsBlocked);

  return (
    <>
      <header className="text-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10 bg-transparent">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="md:flex md:items-center">
            <div className="mr-4">
              <img src="/Images/podu.png" alt="Logo" className="h-24 w-24" />
            </div>
          </div>
          <div className="md:hidden relative">
            <button
              id="mobileMenuButton"
              className="transition ease-in delay-150 text-white hover:text-yellow-500"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div id="mobileMenu" className="hidden md:block space-x-4">
            <a
              href="#home"
              className="transition ease-in delay-150 hover:text-yellow-500 font-bold"
            >
              Home
            </a>
            <a
              href="#Services"
              className="transition ease-in delay-150 hover:text-yellow-500 font-bold"
            >
              Services
            </a>
            <a
              href="#About"
              className="transition ease-in delay-150 hover:text-yellow-500 font-bold"
            >
              About
            </a>
            <a
              href="#Projects"
              className="transition ease-in delay-150 hover:text-yellow-500 font-bold"
            >
              Projects
            </a>
            <a
              href="#Contact"
              className="hidden md:inline-block text-black bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-600 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>
      <div className="relative max-h-screen">
        {filteredBanners.length > 0 &&  (
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
          >
            {filteredBanners && filteredBanners.map((banner, index) => (
              <div key={index}>
                <img
                  src={banner.photo}
                  alt={`Banner ${index + 1}`}
                  className="sm:max-h-[680px] object-cover"
                />
                <div
                  class="absolute z-40 top-[30%] left-0 flex flex-col justify-center h-fit "
                  id="home"
                >
                  <div className="flex flex-col justify-center items-center  ml-40 md:ml-80">
                  <h1 class="text-4xl md:text-8xl font-extrabold text-yellow-500 ">
                    PODUPPIL
                  </h1>
                  <h1 class="text-4xl md:text-8xl font-extrabold">
                    <span class="bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text">
                      CONSTRUCTIONS
                    </span>
                  </h1> 
                  </div>

                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default Header;
