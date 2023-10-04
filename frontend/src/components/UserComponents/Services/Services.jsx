import React from 'react';

function Services() {
  const serviceCardStyles = {
    backgroundImage: 'url("images/service1.jpg")',
  };

  return (
    <div className="py-28" id="Services">
      <h1 className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">OUR SERVICES</h1>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <section className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
            <article className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" style={serviceCardStyles}>
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 className="text-center">
                  <h1 className="transition ease-in delay-150 hover:text-yellow-500 font-bold text-2xl text-white">
                    <span className="absolute inset-0"></span>
                    Design-Build Services
                  </h1>
                </h3>
              </div>
            </article>
            {/* Repeat similar changes for other articles */}
          </section>
          {/* Repeat similar changes for the second section */}
        </article>
      </section>
    </div>
  );
}

export default Services;
