import { XIcon } from 'lucide-react';

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="p-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-200 text-gray-950 border p-6 rounded-lg max-w-md w-full max-h-full overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-bold">Task Form</h1>
              <button
                onClick={onClose}
                className=" text-gray-500 hover:text-gray-700"
              >
                <XIcon />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
