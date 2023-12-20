import React from "react";

const Pagination = ({ charactersPerPage, totalCharacters, paginate }) => {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalCharacters / charactersPerPage) },
    (_, i) => i + 1
  );

  return (
    <div>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
