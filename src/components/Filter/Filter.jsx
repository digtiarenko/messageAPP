import React from 'react';

export const Filter = ({ className }) => {
   return (
      <input
         type="text"
         placeholder="find a friend here"
         className={className}
      />
   );
};
