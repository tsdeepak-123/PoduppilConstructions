import React, { useState } from 'react';
import Buttons from '../../CommonComponents/Button/Buttons';
import CloseIcon from '@mui/icons-material/Close';
import FormatDate from "../../../utils/FormatDate"
import Search from '../../CommonComponents/Search/Search';

const MaterialListModal = ({ showModal, setShowModal, selectedPurchase }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPurchaseData = selectedPurchase?.materialList?.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="modal-content bg-white w-3/4 p-4 rounded-lg">
            <Search value={searchTerm} onChange={handleSearch} />
            <span className='flex justify-end'>
              <CloseIcon className=' cursor-pointer' onClick={() => setShowModal(false)} />
            </span>

            <h2 className="text-xl font-bold mb-4">Material List</h2>
            <div className='relative overflow-y-scroll max-h-[400px] '>
              {filteredPurchaseData && filteredPurchaseData.length > 0 ? (
                <table className="w-full  border-collapse">
                     <thead className='sticky top-0'>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Puchase date</th>
                  <th className="py-2 px-4 border">Project name</th>
                  <th className="py-2 px-4 border">Material Name</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Total</th>
                </tr>
              </thead>
                  <tbody>
                    {filteredPurchaseData.map((material, index) => (
                      <tr key={index} className="border">
                        <td className="py-2 px-4 border">{FormatDate(material.date)}</td>
                        <td className="py-2 px-4 border">{material.projectname}</td>
                        <td className="py-2 px-4 border">{material.name}</td>
                        <td className="py-2 px-4 border">{material.quantity}</td>
                        <td className="py-2 px-4 border">{material.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <tr>
                <td colspan="12" class="text-center py-4">
                  No data available 
                </td>
              </tr>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialListModal;
