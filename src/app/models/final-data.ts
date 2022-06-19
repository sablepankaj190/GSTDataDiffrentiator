export class FinalData {
    SupplierName!: string;
    GSTIN!: string;
    InvoiceNo!: string;
    InvoiceValue: number = 0;
    TaxableValue: number = 0;
    Cgst: number = 0;
    Sgst: number = 0;
    Igst: number = 0;
    GrossTotal: number = 0;
    InvoiceDate!: string;
    Type!: string;
    color!: string;
    foundMatching: boolean = false;
}


export class Supplier {
    supplierName!: string;
    billList: FinalData[] = [];
    unmatchList: FinalData[] = [];
}
