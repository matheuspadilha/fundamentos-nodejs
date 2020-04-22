import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransactions {
    const allTransactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return allTransactions;
  }

  public getBalance(): Balance {
    const findIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, { value }) => total + value, 0);

    const findOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, { value }) => total + value, 0);

    const balance = {
      income: findIncome,
      outcome: findOutcome,
      total: findIncome - findOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
