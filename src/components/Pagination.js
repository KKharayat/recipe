import React from "react";
import Paginate from "react-bootstrap/Pagination";

const Pagination = ({
  recipesPerPage,
  totalRecipes,
  paginate,
  currentPage,
}) => {
  let pageNumbers = [];
  let active = currentPage;

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(
      <Paginate.Item key={i} active={i === active} onClick={() => paginate(i)}>
        {i}
      </Paginate.Item>
    );
  }

  return <Paginate>{pageNumbers}</Paginate>;
};

export default Pagination;
