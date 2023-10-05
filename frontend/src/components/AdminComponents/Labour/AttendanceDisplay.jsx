import React from 'react'
import { useNavigate } from 'react-router-dom'


function AttendanceDisplay() {
    const navigate= useNavigate()
  return (
    <>

  <div className='flex justify-center'>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Labour
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Attendance
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src="/Images/podu.png" alt="Jane Smith's image" class="w-10 h-10 rounded-full"/>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Deepak
                </td>
                <td class="px-6 py-4 font-medium text-green-600 dark:text-blue-500 cursor-pointer">Present
                  </td>
            </tr>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src="/Images/podu.png" alt="Jane Smith's image" class="w-10 h-10 rounded-full"/>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Subith
                </td>
                <td class="px-6 py-4 font-medium text-red-600 dark:text-blue-500 cursor-pointer">Absent
                  </td>
            </tr>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src="/Images/podu.png" alt="Jane Smith's image" class="w-10 h-10 rounded-full"/>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Ridin
                </td>
                <td class="px-6 py-4 font-medium text-yellow-600 dark:text-blue-500 cursor-pointer">Half-Day
                  </td>
            </tr>

        </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default AttendanceDisplay