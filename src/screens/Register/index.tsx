import React, { useState } from 'react';
import {Modal} from 'react-native'
import { useForm, UseForm } from 'react-hook-form';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import {InputForm} from '../../components/Form/InputForm';
import {CategorySelect} from '../CategorySelect'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType,
} from './styles';

interface FormData{
    name: string,
    amount: string
}

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {control, handleSubmit, } = useForm();

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    function handleCloseCategorySelectModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenCategorySelectModal(){
        setCategoryModalOpen(true);
    }

    function handleRegister(form: FormData){
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm 
                        name="name"
                        control={control}
                        placeholder="Nome"
                    />
                    <InputForm 
                        name="name"
                        control={control}
                        placeholder="Preço"
                    />

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
                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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