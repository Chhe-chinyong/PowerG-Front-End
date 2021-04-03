import React from "react";
import ContentPrintList from "../ListAndShop/ContentPrintList";
function ContentList() {
  return (
    <div className="ContentList">
      <div>
        <h3>List</h3>
        <ContentPrintList />
      </div>

      <ContentPrintList />
    </div>
  );
}

export default ContentList;
