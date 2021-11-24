import { createContext, ReactNode, useContext, useEffect, useState} from 'react'
import api  from '../services/api';

interface Transacions {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string; 
}

interface TransactionsProviderProps{
    children: ReactNode
}

// interface TransacionInput extends Omit<Transacions,'id'| 'created_at'>

interface TransacionInput {
    title: string,
    amount: number,
    category: string,
    type: string
}

interface TransacionsContextData {
    transactions: Transacions[],
    createTransaction: (transactions : TransacionInput) => Promise<void>,

}

const TransactionsContext = createContext<TransacionsContextData>(
    {} as TransacionsContextData
);

export function TransactionsProvider ({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transacions[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);


    async function createTransaction(transactionInput : TransacionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date('2021-02-12 09:00:00'),
        })
        const { transaction } = response.data;
        setTransactions([
            ...transactions,
            transaction
        ])

    }

    return ( 
        <TransactionsContext.Provider value={{transactions,createTransaction}}>
            {children}
        </TransactionsContext.Provider>)
}

export function useTransactions(){
    return useContext(TransactionsContext);
}