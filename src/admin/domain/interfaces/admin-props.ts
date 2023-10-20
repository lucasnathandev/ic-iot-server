import { CustomerProps } from 'src/customer/domain/entites/interfaces/customer-props.interface';

export interface AdminProps extends CustomerProps {
  role: string;
  isActive?: boolean;
}
