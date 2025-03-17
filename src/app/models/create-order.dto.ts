export interface CreateOrderDto {
  customer: {
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNumber: string;
    address: string;
    aptSuite?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  rentalStartDate: Date;
  rentalEndDate: Date;
  comments?: string;
  orderDetails: {
    productId: string;
    quantity: number;
  }[];
}