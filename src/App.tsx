import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useActions } from 'hooks/useActions';
import { Auth } from 'pages/Auth';
import { UsersTask } from 'pages/UsersTask';

const App: React.FC = () => {
    const { updateLogin } = useActions();

    useEffect(() => {
        updateLogin();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Auth />} />
                <Route path="home" element={<UsersTask />} />
                <Route path="*" element={<Navigate to={'home?page=1'} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
