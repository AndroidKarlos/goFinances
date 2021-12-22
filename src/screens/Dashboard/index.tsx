import React from 'react';
import { HighlightCard } from '../../components/HighlighCard';
import { TransactionsCard, TransactionCardProps } from '../../components/TransactionsCard';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGretting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogOutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {

const data: DataListProps[] = [{
    id: '1',
    type: 'positive',
    title:"Desenvolvimento de Site",
    amount:"R$ 12.000,00",
    category:{ name: "Vendas", icon: "dollar-sign"},
    date : "30/12/2021",
},{
    id: '2',
    type: 'negative',
    title:"Uber Eats",
    amount:"R$ 130,00",
    category:{ name: "Alimentação", icon: "coffee"},
    date : "30/12/2021",
},{
    id: '3',
    type: 'positive',
    title:"Dinheiro da Vovó",
    amount:"R$ 8.000,00",
    category:{ name: "Doacão", icon: "dollar-sign"},
    date : "30/12/2021",
}];

return (
    <Container>
        <Header>
            <UserWrapper>
                <UserInfo>
                    <Photo
                        source={{ uri: 'https://avatars.githubusercontent.com/u/31963525?v=4' }}>
                    </Photo>
                    <User>
                        <UserGretting>Olá,</UserGretting>
                        <UserName>Carlos</UserName>
                    </User>
                </UserInfo>
                <LogOutButton onPress={() => {}}>
                    <Icon name="power" />
                </LogOutButton>
            </UserWrapper>
        </Header>
        <HighlightCards >
            <HighlightCard
                type="up"
                title="Entrada"
                amount="R$ 17.000,02"
                lastTransaction="Ultima transação dia 19" />
            <HighlightCard
                type="down"
                title="Saidas"
                amount="R$ 12.500,02"
                lastTransaction="Ultima transação dia 19" />
            <HighlightCard
                type="total"
                title="Total"
                amount="R$ 33.000,02"
                lastTransaction="Ultima transação dia 19" />
        </HighlightCards>

        <Transactions>
            <Title>Listagem</Title>
            <TransactionsList 
                data={data} 
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionsCard data={item}/>}
            />
        </Transactions>

    </Container>
)
}
