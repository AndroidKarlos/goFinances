import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
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
    LogOutButton,
    LoadContainer
} from './styles';
import { setLocale } from 'yup';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount: string;
}
interface HighLightData {
    entries: HighLightProps;
    expensive: HighLightProps;
    total: HighLightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData)

    const theme = useTheme();

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

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

        setTransactions(transactionsFormatted);
        const total = entriesTotal - expensiveTotal;
        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
        })
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []))

    return (
        <Container>
            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary} 
                        size="large" />
                </LoadContainer> :
                <>
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
                            amount={highLightData.entries.amount}
                            lastTransaction="Ultima transação dia 19" />
                        <HighlightCard
                            type="down"
                            title="Saidas"
                            amount={highLightData.expensive.amount}
                            lastTransaction="Ultima transação dia 19" />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highLightData.total.amount}
                            lastTransaction="Ultima transação dia 19" />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionsList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionsCard data={item} />}
                        />
                    </Transactions>
                </>
            }
        </Container>
    )
}
