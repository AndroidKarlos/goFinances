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
    category: Category,
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category, 
    setCategory, 
    closeSelectCategory}: Props){

    function handleCategorySelect(category: Category){
        setCategory(category)
    }

    return (
        <Container>
            <Header>
            </Header>
            <FlatList 
                    data={categories} 
                    keyExtractor={(item) => item.key} 
                    renderItem={({item}) => (
                        <Category 
                            isActive={category.key === item.key} 
                            onPress={() => handleCategorySelect(item)}>
                                <Icon name={item.icon}/>
                                <Name>{item.name}</Name>
                        </Category>
                    )}   
                    ItemSeparatorComponent={() => <Separetor />} 
                    />
                    <Footer>
                        <Button 
                            title="Selecionar" 
                            onPress={closeSelectCategory}>
                        </Button>
                    </Footer>
        </Container>
    )
}