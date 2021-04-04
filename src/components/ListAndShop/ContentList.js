import React from "react";
import ContentPrintList from "../ListAndShop/ContentPrintList";

function ContentList() {
  return (
    <div className="ContentList">
      <div className="list">
        <h4>List</h4>
        <ContentPrintList className="listTable" />
      </div>
      <div className="shop">
        <h4>Shop</h4>
        <ContentPrintList />
      </div>
    </div>
  );
}

export default ContentList;
