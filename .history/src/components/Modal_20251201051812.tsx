import React from 'react';

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 relative min-w-[300px] max-w-[90vw]">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
