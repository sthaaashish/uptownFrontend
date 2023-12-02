import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


export function CircularPagination() {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    color: active === index ? "lightBlue" : "pink",
    onClick: () => setActive(index),
    className: "rounded-full focus:outline-none focus:ring focus:border-blue-300",
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="pink"
        size="sm"
        className="flex items-center rounded-full "
        onClick={prev}
        disabled={active === 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex  items-center gap-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <IconButton key={index} {...getItemProps(index)} >
            <span className={active === index ? "text-white" : ""}>{index}</span>
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="pink"
        size="sm"
        className="flex items-center  rounded-full"
        onClick={next}
        disabled={active === 5}
      >
        Next <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
      </Button>
    </div>
  );
}
