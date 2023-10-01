import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Search from '../../CommonComponents/Search/Search';

function ProjectList() {
    const navigate= useNavigate()

    const handleBackArrowClick=()=>{
        navigate(-1)
    }
  return (
    <>
    <div className='flex justify-between me-7 mt-32'>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer' onClick={handleBackArrowClick}/>
    </div>
    <div className="ms-6 mt-9">
   <Search/>
  </div>
  <div className='flex justify-center'>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Project name
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Parchased
                </th>
                <th scope="col" class="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                </td>
            </tr>

        </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default ProjectList
