import React, { useState } from 'react';
import {Modal} from 'react-native'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import {CategorySelect} from '../CategorySelect'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType,
} from './styles';


export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    function handleCloseCategorySelectModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenCategorySelectModal(){
        setCategoryModalOpen(true);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome"/>
                    <Input placeholder="Preço"/>
                    <TransactionsType>
                        <TransactionTypeButton 
                            title="Income" 
                            type='up' 
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                            />
                        <TransactionTypeButton 
                            title="Outcome" 
                            type='down' 
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                            />
                    </TransactionsType>
                    <CategorySelectButton 
                        title={category.name} 
                        onPress={handleOpenCategorySelectModal}
                    />
                </Fields>
                <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseCategorySelectModal}
                />
            </Modal>

        </Container>
    )

}