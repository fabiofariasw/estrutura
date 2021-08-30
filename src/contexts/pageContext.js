import React, { createContext, useContext, useState } from 'react';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [numberPage] = useState(() => {
        if (localStorage.getItem('numberPage')) {
            return parseInt(localStorage.getItem('numberPage'));
        } else {
            return 1;
        }
    });

  return (
    <PageContext.Provider value={{ numberPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);