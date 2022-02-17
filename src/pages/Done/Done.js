import React from "react";
import AlternativeList from "../../components/AlternativeList/AlternativeList";

export default function Done({ taskElements }) {
  function inactiveCheck() {
    let filteredItems = taskElements;
    filteredItems = filteredItems.filter(
      (filteredElement) => filteredElement.done === true,
    );
    return filteredItems;
  }

  return <AlternativeList taskElements={inactiveCheck()} />;
}
