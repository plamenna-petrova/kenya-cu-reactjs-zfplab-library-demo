export interface ExternalDatabaseArticleSaleFormData {
  withCorrection: boolean;
  articleName: string;
  vatGroup: string;
  price: string | number;
  quantity: string | number | null;
  isDiscountOrAdditionInPercentage: boolean;
  discountOrAddition: string;
  departmentNumber: string | number | null;
}