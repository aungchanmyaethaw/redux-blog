import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
const Date = ({ timestamp }) => {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = timePeriod;
  }

  return <div>{`${timeAgo} ago`}</div>;
};

export default Date;
