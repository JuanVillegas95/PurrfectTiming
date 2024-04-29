export const Modal = ({ isOpen, close, children }: { isOpen: boolean, close: () => {}, children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full">
        <button onClick={close} className="absolute top-2 right-2">Close</button>
        {children}
      </div>
    </div>
  );
};
