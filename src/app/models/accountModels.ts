export interface account {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  amount: number;
  includeTotal: boolean;
  mainAccount: boolean;
  userId: number;
}

export interface addAccount {
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  includeTotal: boolean;
}
