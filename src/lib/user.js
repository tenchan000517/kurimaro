// src/lib/user.js
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const isGuestUser = () => {
    const user = getCurrentUser();
    return user?.type === 'guest';
  };
  