import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function CircularPagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages).keys()].map((i) => i + 1);

  const getItemProps = (index) => ({
    color: currentPage === index ? "lightBlue" : "pink",
    onClick: () => setCurrentPage(index),
    className:
      "rounded-full focus:outline-none focus:ring focus:border-blue-300",
  });

  const next = () => {
    if (currentPage === nPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="pink"
        size="sm"
        className="flex items-center rounded-full "
        onClick={prev}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {pageNumbers.map((index) => (
          <IconButton key={index} {...getItemProps(index)}>
            <span className={currentPage === index ? "text-white" : ""}>
              {index}
            </span>
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="pink"
        size="sm"
        className="flex items-center  rounded-full"
        onClick={next}
        disabled={currentPage === nPages}
      >
        Next <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
      </Button>
    </div>
  );
}
