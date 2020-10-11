import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <DataContext.Provider
      value={{ data, setData, loading, setLoading, error, setError }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
