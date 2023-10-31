import React, { useEffect, useRef, useState } from 'react';
import FormatDate from "../../../Validation/FormatDate"

function SingleView({ materialData }) {
  const tableRef = useRef(null);
  const rowHeight = 50;
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    if (tableRef.current && materialData) {
      const documentCount = materialData.reduce(
        (acc, data) => acc + data.Material.length,
        0
      );
      const tableHeight = documentCount * rowHeight;
      tableRef.current.style.height = `${tableHeight}px`;

      const total = materialData.reduce((acc, data) => acc + parseFloat(data.TotalAmount || 0), 0);
      setOverallTotal(total);
    }
  }, [materialData]);
  return (
    <>
      <div className='flex justify-center mt-8'>
        <div className="relative overflow-y-scroll shadow-md sm:rounded-lg" ref={tableRef}>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Purchase Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Material Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Base Rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {materialData?.map((data, index) => (
                <React.Fragment key={index}>
                  {data.Material?.map((material, materialIndex) => (
                    <tr key={materialIndex} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      {materialIndex === 0 && (
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" rowSpan={data.Material.length}>
                          {FormatDate(data.date)}
                        </td>
                      )}
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {material.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {material.quantity}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {material.baseRate}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {material.total}
                      </td>
                      {materialIndex === 0 && (
                        <td className=" px-6 py-4 font-medium  text-red-500 whitespace-nowrap dark:text-white" rowSpan={data.Material.length}>
                          {data.TotalAmount}
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="font-bold text-xl border-b-2 border-gray-300 pb-2 inline-block">
          Total &nbsp;: <span className="text-red-500 ms-4">{overallTotal}</span>
        </p>
      </div>
    </>
  );
}

export default SingleView;
