import React from 'react';
import { FlatList } from 'react-native';
import {Button} from '../../components/Form/Button';
import { categories } from '../../utils/categories';
import {
    Container, 
    Header, 
    Title, 
    Category, 
    Icon, 
    Name, 
    Separetor,
    Footer,
} from './styles'

interface Category{
    key: string,
    name: string
}

interface Props {
    category: string,
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category, 
    setCategory, 
    closeSelectCategory}: Props){
    return (
        <Container>
            <Header>
            </Header>
            <FlatList 
                    data={categories} 
                    keyExtractor={(item) => item.key} 
                    renderItem={({item}) => (
                        <Category>
                            <Icon name={item.icon}/>
                            <Name>{item.name}</Name>
                        </Category>
                    )}   
                    ItemSeparatorComponent={() => <Separetor />} 
                    />
                    <Footer>
                        <Button title="Selecionar">
                        </Button>
                    </Footer>
        </Container>
    )
}