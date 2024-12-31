import React from "react";
import { IconButton, Tooltip } from "@mui/material";

const ActionButton = ({ icon, className, tooltip, onClick }) => (
  <Tooltip title={tooltip} arrow>
    <IconButton
      className={`${className} focus:outline-none`}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

export default function ActionButtons({ rowData, actions }) {
  return (
    <div className="flex space-x-2">
      {actions.map(({ icon, className, tooltip, action }, index) => (
        <ActionButton
          key={index}
          icon={icon}
          className={className}
          tooltip={tooltip}
          onClick={() => action(rowData)}
        />
      ))}
    </div>
  );
}
