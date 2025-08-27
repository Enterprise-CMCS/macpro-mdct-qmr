// components
import { Link } from "@chakra-ui/react";

export const SkipNav = () => {
  return (
    <Link
      id="skip-nav-main"
      sx={sx.skipNavLink}
      href={"#main-wrapper"}
      className="ds-c-skip-nav"
    >
      Skip to main content
    </Link>
  );
};

const sx = {
  skipNavLink: {
    zIndex: "skipLink",
    minWidth: "200px",
    background: "white",
    position: "absolute",
    transition: "all 0s !important",
    "&:focus-visible": {
      top: 1,
    },
  },
};
