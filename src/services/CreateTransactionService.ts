import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const validType = type === 'income' || type === 'outcome';

    if (!validType) {
      throw Error('Incorrect transaction type.');
    }

    const { total } = this.transactionsRepository.getBalance();

    const validBalance = type === 'outcome' && value > total;

    if (validBalance) {
      throw Error('You do not have enough money.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
