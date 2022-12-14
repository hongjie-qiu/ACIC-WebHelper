import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import ExportButton from "./ExportButton";
import jsonData from "./Amazon.json"
//import { useGlobalContext } from './contexts';

function Table() {
  //const {articleData} = useGlobalContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    console.log(jsonData);
    setData(jsonData);
  };
  const columns = [
    {
        dataField: "position",
        text: "ID",
        sort: true,
        editable: false,
      },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      editable: false,
    },
    {
      dataField: "publication_info.summary",
      text: "Summary",
      sort: true,
      editable: false,
    },
    {
      dataField: "snippet",
      text: "snippet",
      sort: true,
      editable: false,
    },
    {
      dataField: "status",
      text: "Status",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "Accepted",
            label: "Accepted",
          },
          {
            value: "Pending",
            label: "Pending",
          },
          {
            value: "Rejected",
            label: "Rejected",
          },
        ],
      },
    },
  ];
  const expandRow = {
    showExpandColumn: true,
    expandByColumnOnly: true,
    renderer: row => (
      <div>
        <p>{ row.BibTex }</p>
      </div>
    )
  };

  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  return (
    <div>
      <div className="App">
        <BootstrapTable
          keyField="position"
          data={data}
          columns={columns}
          striped
          hover
          condensed
          pagination={paginationFactory(options)}
          cellEdit={cellEditFactory({ mode: "click", blurToSave: true })}
          expandRow={expandRow}
        />
        <ExportButton />
      </div>
    </div>
  );
}

export default Table;