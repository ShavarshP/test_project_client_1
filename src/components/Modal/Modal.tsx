import { Portal } from 'react-portal';

export const MyModal: React.FC<{ children: JSX.Element }> = ({ children }) => (
    <Portal>
        <div className="flex justify-center backdrop-blur-sm h-full w-full ">{children}</div>
    </Portal>
);
