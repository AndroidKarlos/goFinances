import React, { useState } from 'react';
import {Modal, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Button } from '../../components/Form/Button';
import {InputForm} from '../../components/Form/InputForm';
import {CategorySelect} from '../CategorySelect'
import uuid from 'react-native-uuid';

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

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
   
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório')
})

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation();

    const {
        control, 
        handleSubmit,
        reset,
        formState: {errors} 
    } = useForm(
            {resolver: yupResolver(schema)}
        );

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    function handleCloseCategorySelectModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenCategorySelectModal(){
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormData){
        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação');
        }

        if(category.key === 'category'){
            return Alert.alert('selecione o categoria');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date(),
        }
        console.log(newTransaction);

        try{
            const datakey = '@gofinances:transactions';
            const data = await AsyncStorage.getItem(datakey);
            const currentData = data ? JSON.parse : [];
            const dataFormatted = [...currentData, newTransaction]

            await AsyncStorage.setItem(datakey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({key: 'category', name: 'Categoria'});

            navigation.navigate('Listagem');

        }catch(err){
            console.log(err);
            Alert.alert('Não foi possivel salvar');
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}

                    />           
                    <InputForm 
                        name="amount"
                        control={control}
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
    )

}