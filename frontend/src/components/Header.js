import React, { useState } from 'react';

const Header = () => {
  const [login, setLogin] = useState(true);
  return (
    <header className="row">
      <div className="align-items">
        <p className="logo">TODO LIST</p>
      </div>
      <div>
        {login ? (
          <>
            <p>Logout</p>
          </>
        ) : (
          <p>Sign In</p>
        )}
      </div>
    </header>
  );
};

export default Header;
