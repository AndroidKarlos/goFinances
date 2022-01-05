import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
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
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps = transactions
        .map((item: DataListProps) => {
            
            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit', 
                month: '2-digit', 
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }

        });

        setData(transactionsFormatted);

    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() =>{
        loadTransactions();
    }, []))

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
                    <LogOutButton onPress={() => { }}>
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
                    renderItem={({ item }) => <TransactionsCard data={item} />}
                />
            </Transactions>

        </Container>
    )
}
