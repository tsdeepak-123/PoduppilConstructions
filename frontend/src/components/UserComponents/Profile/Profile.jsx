import React from 'react';

function Profile() {
  return (
    <div className="pt-40">
      <h1 className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">
      Meet Ratheeb B, Our Visionary Leader
      </h1>

      <div className="container md:ml-72 px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-7/12 lg:w-6/12">
            <p className="mt-6 text-gray-700">
             <span className='font-bold'>
             Founder & CEO, Poduppil Constructions
                </span>&nbsp;:
              Hey there! I'm Ratheeb B, the brain behind Poduppil Constructions—the go-to construction company for top-notch commercial and residential projects, tender works, and road infrastructure developments. We're all about bringing dreams to life, one brick at a time!<br></br>
              <br>
              </br>
              <span className='font-bold'>My Construction Journey :</span>
              
              I've spent years honing my craft and mastering the construction game. From managing projects and estimating costs to making sure every nail is in place, I've got it covered. My experience has taught me that attention to detail and quality are non-negotiables.<br></br>
              <br>
              </br>
              <span className='font-bold'>Leading the Charge:</span>
              I wear the CEO hat at Poduppil Constructions, and I take this role seriously. My mantra? Lead by example, foster teamwork, and chase perfection. We've set the bar high, and I'm proud to say we consistently reach and surpass it.<br></br>
              <br>
              </br>
             <span className='font-bold'> Putting You First:</span>
              Your satisfaction is what drives us. I believe in understanding your unique needs and delivering tailored solutions that blow your expectations out of the water. Your smile at the end of a project is my greatest reward.<br></br>
              <br>
              </br>
              <span className='font-bold'> If you have any questions or want to chat about your next project, I'm here and ready to make it happen!
            </span>
             </p>
          </div>
          <div className="md:w-5/12 lg:w-5/12">
            <img
              src="Images/ratheeb.jpg"
              className="rounded-lg shadow-lg"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
