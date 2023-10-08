import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReturnButton from "../../CommonComponents/Return/ReturnButton"


function ProjectList() {
    const navigate= useNavigate()

    const handleBackArrowClick=()=>{
        navigate(-1)
    }
  return (
    <>
    <ReturnButton/>

  <div className='flex justify-center mt-8'>
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
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                </th>
                <td class="px-6 py-4 text-blue-500 cursor-pointer">
                    view
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
