import React from "react";
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div className="missing min-h-screen">
      <div>
        <h1 className="text-2xl text-yellow-500">Page Not Found</h1>
        <p>Something went wrong.</p>
        <p>
          <Link to={-1}>Go back to previous page</Link>
        </p>
      </div>
    </div>
  );
};

export default Missing;
