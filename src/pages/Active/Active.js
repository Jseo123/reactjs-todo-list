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
  // podríamos llamar a tasklist y así, asignarle todas las funcionalidades por parametro, y nos ahorramos 1 componente
  return <AlternativeList taskElements={activeCheck()} />;
}
