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
  // podríamos llamar a tasklist y así, asignarle todas las funcionalidades por parametro, y nos ahorramos 1 componente
  return <AlternativeList taskElements={inactiveCheck()} />;
}
