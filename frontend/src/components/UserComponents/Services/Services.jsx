import React from 'react';
import ServiceCard from './ServiceCard';

function Services() {

  return (
    <div className="py-28" id="Services">
      <h1 className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">OUR SERVICES</h1>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <section className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
           <ServiceCard name='COMMERCIAL CONSTRUCTIONS' image='/Images/com.jpg'/>
           <ServiceCard name='RESIDENCIAL CONSTRUCTIONS ' image='/Images/residancial.jpg'/>
           <ServiceCard name='INTERIOR AND EXTERIOR REMODELING ' image='/Images/interior.jpg'/>
           <ServiceCard name='GENERAL CONTRACTING SERVICES' image='/Images/contract.jpg'/>
           <ServiceCard name='BUILDING MAINTENANCE AND REPAIRS ' image='/Images/main.jpg'/>
           <ServiceCard name='ROOFING SERVICES ' image='/Images/roof.jpg'/>
          </section>
        </article>
      </section>
    </div>
  );
}

export default Services
