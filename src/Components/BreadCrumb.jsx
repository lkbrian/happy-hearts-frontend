import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import propTypes from "prop-types";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useBreadStore } from "../utils/store";

function BreadCrumb() {
  const selectedItem = useBreadStore((state) => state.selectedItem);
  const item = selectedItem === "Dashboard" ? "" : selectedItem;
  return (
    <Breadcrumb
      p={2}
      spacing="8px"
      alignSelf={"end"}
      display={selectedItem === "Dashboard" ? "none" : "block"}
      separator={<ChevronRightIcon color="gray.500" />}
    >
      <BreadcrumbItem alignItems={"center"} justify={"center"} gap={"5px"}>
        <FaHome />{" "}
        <BreadcrumbLink href="/parent_portal/dashboard">
          DashBoard
        </BreadcrumbLink>{" "}
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} className="breadcrumb-link">
          {item}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default BreadCrumb;
BreadCrumb.propTypes = {
  selectedItem: propTypes.string,
};
