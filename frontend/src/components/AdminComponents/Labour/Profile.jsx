import React from 'react'

function Profile() {
  return (
    
    <div className="mt-44">
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2">
          <div class="w-full mx-2">
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="md:flex no-wrap md:-mx-2">
                  <div class="w-full md:w-3/12 md:mx-2">
                    <div class="image overflow-hidden py-4 px-6">
                      <img
                        class="h-auto w-full mx-auto rounded-lg"
                        src="https://cdn.britannica.com/54/188754-004-1FED59CE/Elon-Musk-2010.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="w-full md:w-9/12 md:mx-2">
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">First Name</div>
                      <div class="px-4 py-2">Jane</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Last Name</div>
                      <div class="px-4 py-2">Doe</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Gender</div>
                      <div class="px-4 py-2">Female</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Contact No.</div>
                      <div class="px-4 py-2">+11 998001001</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Current Address</div>
                      <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div class="px-4 py-2">
                        Arlington Heights, IL, Illinois
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Email.</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com"
                          >jane@example.com</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </span>
                <span class="tracking-wide">Aadhar</span>
              </div>
              <div class="md:flex no-wrap md:-mx-2">
                <div class="w-full md:w-6/12 md:mx-2">
                  <div class="image overflow-hidden py-3 px-3">
                    <img
                      class="h-auto w-full mx-auto rounded-lg"
                      src="https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card-800x445.webp"
                      alt=""
                    />
                  </div>
                </div>
                <div class="w-full md:w-6/12 md:mx-2">
                  <div class="image overflow-hidden py-3 px-3">
                    <img
                      class="h-auto w-full mx-auto rounded-lg"
                      src="https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card-800x445.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile