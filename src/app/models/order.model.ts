export interface Order {
  id: string;
  customer: {
    id: string;
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
  totalAmount: number;
  comments?: string;
  isCancelled: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderDetails: {
    id: string;
    orderId: string;
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}