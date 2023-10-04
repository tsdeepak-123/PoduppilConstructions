import React from 'react';
import ProjectCard from './ProjectCard';

function Projects() {
  return (
    <div className="py-40" id="Projects">
      <h1 className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">OUR PROJECTS</h1>

      <div className="container my-6 ml-5 md:ml-80 max-w-7xl">
        <div className="flex flex-wrap">
          <ProjectCard name='Adivaram Juma Masjid' image='/Images/adivaram.jpg' />
          <ProjectCard name='White House' image='/Images/whitehouse.jpg' />
          <ProjectCard name='Residential House AT Vavad' image='/Images/residancialhouse.jpg' />
          {/* <ProjectCard name='' image='' /> */}
        </div>
      </div>
    </div>
  );
}

export default Projects;
