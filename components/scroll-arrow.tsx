import Link from "next/link";
import React, { useState } from "react";
import { ArrowUpCircleIcon } from "./icons";

const ScrollArrow: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 5) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <Link
      onClick={scrollTop}
      className="icon-appear fixed bottom-10 right-10"
      style={{ display: showScroll ? "block" : "none" }}
      href={"/"}
    >
      <ArrowUpCircleIcon
        width={50}
        height={50}
        strokeColor="#FBA245"
        className="hover:stroke-orange-300 transition"
      />
    </Link>
  );
};

export default ScrollArrow;
