import React from 'react'

function Profile() {
  return (
    // <!-- OWNER SLIDE -->
    <div class="pt-40">
        <h1 class="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">OWNER DETAILS</h1>

        <div class="container md:ml-72 px-6 text-gray-600 md:px-12 xl:px-6">
            <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div class="md:7/12 lg:w-6/12">
                    <p class="mt-6 text-gray-700">I am John Smith, the owner of this Company. You can contact me at <a href="mailto:john.smith@example.com" class="font-semibold">john.smith@example.com</a> or by phone at <a href="tel:+1 (555) 123-4567" class="font-semibold">+1 (555) 123-4567</a>. My business, Smith Enterprises LLC, is registered under the number 12345-67890, with the registered office address at 123 Main Street, Anytown, USA. For your privacy, please review our Privacy Policy and our Terms of Service. All content on this website is protected by copyright, and you may not reproduce it without permission. Please note that the information provided on this website is for general informational purposes only and should not be considered professional advice. The website operates under the jurisdiction of the State of California, USA. Additionally, this website may participate in affiliate marketing programs, and we may receive compensation for product recommendations made through affiliate links. Connect with me on <a href="" class="font-semibold">Twitter</a> , and <a href="" class="font-semibold">LinkedIn</a> for updates and further interaction.</p>
                </div>
                <div class="md:5/12 lg:w-5/12">
                    <img src="Images/owner.jpg" class="rounded-lg shadow-lg" alt="image" loading="lazy" width="" height=""/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile