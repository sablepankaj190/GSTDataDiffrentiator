import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FetchExcelService } from '../fetch-excel.service';
import { FinalData, Supplier } from '../models/final-data';


@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})

export class UploadExcelComponent implements OnInit {
  gstColumns: any[] = [];
  localColumns: any[] = [];
  gstDataList: any;
  localDataList: any;
  listBySupplierName: Supplier[] = [];
  listByParticulars: Supplier[] = [];
  selectedData: any = '';
  finalDataList: Supplier[] = [];
  buttonEnable = false;
  constructor(private excelService: FetchExcelService) { }

  ngOnInit(): void {
  }

  addGstfile(event: any) {
    this.excelService.getGstFileData(event, (data: any) => {
      this.gstColumns = data.columnsList;
      this.gstDataList = data.dataList;
      console.log(this.gstColumns, this.gstDataList);
      this.formatGSTExcelData();
    });
  }

  addLocalFile(event: any) {
    this.excelService.getLocalFileData(event, (data: any) => {
      this.localColumns = data.columnsList;
      this.localDataList = data.dataList;
      // console.log(this.localColumns, this.localDataList);
      this.formatLocalExcelData();
    });
    this.buttonEnable = true;
  }

  formatGSTExcelData() {
    let finalGstList: any[] = [];
    this.gstDataList.forEach((element: any) => {
      const row: FinalData = {
        SupplierName: element['Supplier Name'],
        GSTIN: element['GSTIN'],
        InvoiceNo: element['Invoice No'],
        InvoiceValue: element['Invoice Value'],
        TaxableValue: element['Taxable Value'],
        Cgst: element['CGST'],
        Sgst: element['SGST'],
        Igst: element['IGST'],
        GrossTotal: 0,
        InvoiceDate: element['Invoice Date'],
        Type: 'GST Excel',
        color: 'yellow',
        foundMatching: false
      }
      let existingSupplier = finalGstList.find((supplier) => supplier.supplierName == row.SupplierName);
      if (existingSupplier) {
        existingSupplier.billList.push(row);
        if (existingSupplier.billList.length > 1)
          existingSupplier.billList.sort((a: any, b: any) => { return a.InvoiceNo.localeCompare(b.InvoiceNo) });
      } else {
        let obj: Supplier = {
          supplierName: row.SupplierName,
          billList: [row],
          unmatchList: []
        }
        finalGstList.push(obj);
      }
    });
    finalGstList.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    this.listBySupplierName = finalGstList;
  }


  formatLocalExcelData() {
    let finalLocalList: any[] = [];
    this.localDataList.forEach((element: any) => {
      const row: FinalData = {
        SupplierName: element['Particulars'],
        GSTIN: element['GSTIN/UIN'],
        InvoiceNo: element['Supplier Invoice No.'],
        InvoiceValue: element['Gross Total'],
        TaxableValue: element['Value'],
        Cgst: element['Cgst'],
        Sgst: element['Sgst'],
        Igst: 0,
        GrossTotal: element['Gross Total'],
        InvoiceDate: element['Invoice Date'],
        Type: 'Local Excel',
        color: 'lightgreen',
        foundMatching: false  
      }
      let existingSupplier = finalLocalList.find((supplier) => supplier.supplierName == row.SupplierName);
      if (existingSupplier) {
        existingSupplier.billList.push(row);
      } else {
        let obj: Supplier = {
          supplierName: row.SupplierName,
          billList: [row],
          unmatchList: []
        }
        finalLocalList.push(obj);
      }
    });
    finalLocalList.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    this.listByParticulars = finalLocalList;
    console.log('Particulars list', this.listByParticulars);

  }

  differentiateExcels() {
    this.listBySupplierName.forEach((supplier) => {
      this.listByParticulars.forEach((particular) => {
        if (supplier.supplierName.toLowerCase() == particular.supplierName.toLowerCase()) {
          supplier.billList = supplier.billList.concat(particular.billList);
          supplier.billList.sort((a: any, b: any) => {
            let aInvoiceList = a.InvoiceNo.replace(/\\/g, '/').split('/');
            let bInvoiceList = b.InvoiceNo.replace(/\\/g, '/').split('/');
            let aInvoice = '';
            let bInvoice = '';
            if (aInvoiceList) {
              aInvoiceList.forEach((sec: any) => {
                aInvoice += sec;
              })
            }


            if (bInvoiceList) {
              bInvoiceList.forEach((sec: any) => {
                bInvoice += sec;
              })
            }

            aInvoice = aInvoice.replace(/^0+/, '');
            bInvoice = bInvoice.replace(/^0+/, '');

            if (aInvoice.toLowerCase().localeCompare(bInvoice.toLowerCase()) == 0) {
              a.foundMatching = true;
              b.foundMatching = true;
              const row: FinalData = {
                SupplierName: '',
                GSTIN: '',
                InvoiceNo: a.InvoiceNo,
                InvoiceValue: Math.abs(a.InvoiceValue - b.InvoiceValue),
                TaxableValue: Math.abs(a.TaxableValue - b.TaxableValue),
                Cgst: Math.abs(a.Cgst - b.Cgst),
                Sgst: Math.abs(a.Sgst - b.Sgst),
                Igst: Math.abs(a.Igst - b.Igst),
                GrossTotal: Math.abs(a.GrossTotal - b.GrossTotal),
                InvoiceDate: '',
                Type: 'Difference',
                color: 'white',
                foundMatching: true
              }

              supplier.billList.push(row);

            }

            return aInvoice.toLowerCase().localeCompare(bInvoice.toLowerCase())
          });

          supplier.billList.sort((a: any, b: any) => {
            let aInvoiceList = a.InvoiceNo.replace(/\\/g, '/').split('/');
            let bInvoiceList = b.InvoiceNo.replace(/\\/g, '/').split('/');
            let aInvoice = '';
            let bInvoice = '';
            if (aInvoiceList) {
              aInvoiceList.forEach((sec: any) => {
                aInvoice += sec;
              })
            }


            if (bInvoiceList) {
              bInvoiceList.forEach((sec: any) => {
                bInvoice += sec;
              })
            }

            aInvoice = aInvoice.replace(/^0+/, '');
            bInvoice = bInvoice.replace(/^0+/, '');

            return aInvoice.toLowerCase().localeCompare(bInvoice.toLowerCase())
          });
        }
      })
    })

    this.buttonEnable = false;

    console.log(this.listBySupplierName);
  }

}
