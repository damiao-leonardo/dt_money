import LogoImg from '../../assets/logo.svg';

import { Container, Content } from "./styles"

interface HeaderPros{
  onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal} : HeaderPros){

    return(
        <Container>
           <Content>
                <img src={LogoImg} alt="dt-money"/>
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
               
           </Content> 

        </Container>
    )
}