import React from 'react';
import ProjectCard from './ProjectCard';

function Projects() {
  return (
    <div className="py-40" id="Projects">
      <p className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80 mb-6">OUR PROJECTS</p>

      <div className="container max-w-7xl flex mx-auto">
        <div className="flex flex-wrap">
          <ProjectCard name='Adivaram Juma Masjid' image='/Images/adivaram.jpg' />
          <ProjectCard name='White House' image='/Images/whitehouse.jpg' />
          <ProjectCard name='Residential House AT Vavad' image='/Images/residancialhouse.jpg' />
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
