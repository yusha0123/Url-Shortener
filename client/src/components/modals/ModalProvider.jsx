import React from "react";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";
import UrlDetailsDialog from "./UrlDetailsDialog";

const ModalProvider = () => {
  return (
    <>
      <DeleteDialog />
      <UpdateDialog />
      <UrlDetailsDialog />
    </>
  );
};

export default ModalProvider;
