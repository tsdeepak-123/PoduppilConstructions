import React from 'react'

function CashTable() {
  return (
    <>
  <div className='flex justify-center mt-8'>
    <div class=" w-[80%] relative  overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Project name
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Amount Recieved
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default CashTable

