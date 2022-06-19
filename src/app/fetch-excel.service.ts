import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class FetchExcelService {

  gstFile: any;
  localFile: any;
  gstArrayBuffer: any;
  localArrayBuffer: any;

  constructor() { }

  getGstFileData = (event: any, callback: any) => {
    this.gstFile = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.gstFile);
    fileReader.onload = (e) => {
      this.gstArrayBuffer = fileReader.result;
      var data = new Uint8Array(this.gstArrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let dataList = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      let columnsList = this.fetchColumnDetails(dataList);
      callback({ dataList, columnsList });
    }
  }

  getLocalFileData = (event: any, callback: any) => {
    this.localFile = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.localFile);
    fileReader.onload = (e) => {
      this.localArrayBuffer = fileReader.result;
      var data = new Uint8Array(this.localArrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let dataList = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      let columnsList = this.fetchColumnDetails(dataList);
      callback({ dataList, columnsList });
    }
  }

  fetchColumnDetails(list: any) {
    let keysArray = list[0];
    let columns = [];
    for (let key in keysArray) {
      columns.push(key);
    }
    return columns;
  }
}
