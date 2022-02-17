import React from "react";
import AlternativeList from "../../components/AlternativeList/AlternativeList";

// eslint-disable-next-line consistent-return

export default function Active({ taskElements }) {
  function activeCheck() {
    let filteredItems = taskElements;
    filteredItems = filteredItems.filter(
      (filteredElement) => filteredElement.done === false,
    );
    return filteredItems;
  }

  return <AlternativeList taskElements={activeCheck()} />;
}
