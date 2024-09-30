import { useRef, useState } from "react";

function useDisclose() {
  const [isOpen, setIsOpen] = useState(true);
  const navRef = useRef(null);

  const toggleDrawer = () => {
    if (navRef.current) {
      if (isOpen) {
        navRef.current.style.display = "block";
      } else {
        navRef.current.style.display = "none";
      }
      setIsOpen(!isOpen);
    }
  };

  return { isOpen, toggleDrawer, navRef };
}

export default useDisclose;
