import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory/*, { textFilter }*/ from "react-bootstrap-table2-filter";
import ExportButton from "./ExportButton";

function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    clickToEdit: true,
  };
  const columns = [
    {
        dataField: "id",
        text: "ID",
        sort: true,
      },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
    },
    {
      dataField: "dropdown",
      text: "Status",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "Qualified",
            label: "Qualified",
          },
          {
            value: "Pending",
            label: "Pending",
          },
          {
            value: "Not Qualified",
            label: "Not Qualified",
          },
        ],
      },
    },
  ];

  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  return (
    <div>
      <div className="App">
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          striped
          hover
          condensed
          pagination={paginationFactory(options)}
          cellEdit={cellEditFactory({
            mode: "click",
            blurToSave: true
          })}
          selectRow={selectRow}
          filter={filterFactory()}
        />
        <ExportButton />
      </div>
    </div>
  );
}

export default Table;