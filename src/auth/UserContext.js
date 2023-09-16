import React from 'react';


/** provides currentUser object and setter for it throughout app. */
const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}



export default UserContext;

