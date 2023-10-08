import React from 'react';

function Header() {
  const headerStyles = {
    backgroundImage: "url('Images/home_background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <>
      {/* <div id="loading" className="fixed inset-0 flex items-center justify-center bg-gray-800 opacity-100 transition-opacity duration-300 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div> */}

      <div style={headerStyles}>
        {/* HEADER */}
        <header className=" text-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-transparent ">
          <nav className="container mx-auto flex items-center justify-between">
            <div className="md:flex md:items-center">
              <div className="mr-4">
                <img
                  src="/Images/podu.png"
                  alt="Logo"
                  className="h-24 w-24 "
                />
              </div>
              {/* <a href="" className="transition ease-in delay-150 text-2xl font-bold hover:text-yellow-500">Poduppil Construction</a> */}
            </div>
            <div className="md:hidden relative">
              <button id="mobileMenuButton" className="transition ease-in delay-150 text-white hover:text-yellow-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <div id="mobileMenu" className="hidden md:block flex space-x-4">
              <a href="#home" className="transition ease-in delay-150 hover:text-yellow-500 font-bold">Homeb</a>
              <a href="#Services" className="transition ease-in delay-150 hover:text-yellow-500 font-bold">Services</a>
              <a href="#About" className="transition ease-in delay-150 hover:text-yellow-500 font-bold">About</a>
              <a href="#Projects" className="transition ease-in delay-150 hover:text-yellow-500 font-bold">Projects</a>
              <a
                href="#Contact"
                className="hidden md:inline-block text-black bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-600 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Contact
              </a>
            </div>
          </nav>
        </header>
        <div class="flex flex-col justify-center h-screen bg-black bg-opacity-50" id="home">
            <h1 class="text-4xl md:text-8xl font-extrabold text-yellow-500 ml-20 md:ml-60">PODUPPIL</h1>
            <h1 class="text-4xl md:text-8xl font-extrabold ml-40 md:ml-96">
                <span class="bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text">CONSTRUCTIONS</span>
            </h1>            
        </div>        
    </div>
    </>
  );
}

export default Header;
