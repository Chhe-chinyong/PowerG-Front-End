import React from "react";
import ContentPrintList from "../ListAndShop/ContentPrintList";
import ContentShop from "../ListAndShop/ContentShop";

function ContentList() {
  return (
    <div className="ContentList">
      <div className="list">
        <h4>List</h4>
        <ContentPrintList className="listTable" />
      </div>
      <div className="shop">
        <ContentShop className="listShop" />
      </div>
    </div>
  );
}

export default ContentList;
