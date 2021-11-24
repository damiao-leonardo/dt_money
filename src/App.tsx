import React from 'react';
import { useState } from 'react';
import { GlobalStyle } from './styles/global';
import { Header } from './Components/Header';
import { Dashboard } from './Components/Dashboard';
import { createServer , Model } from 'miragejs';
import Modal from 'react-modal';
import { NewTransactionModal } from './Components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

createServer({

  models: {
    transaction: Model, 
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id:1, 
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
      },
      {
        id:2, 
        title: 'Aluguel',
        type: 'withdraw',
        category: 'Moradia',
        amount: 3000,
        createdAt: new Date('2021-02-12 09:00:00'),
    },
      ]

    })

  },

  routes(){
    this.namespace = 'api';
  
    this.get('/transactions', () => {
        return this.schema.all('transaction')
      })
  
    this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody)
  
        return schema.create('transaction', data )
      })
    }

})


Modal.setAppElement('#root');


export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/> 
      <GlobalStyle/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
    </TransactionsProvider>
  );
}