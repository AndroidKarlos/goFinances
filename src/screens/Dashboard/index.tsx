import React from 'react';
import { HighlightCard } from '../../components/HighlighCard';
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
    HighlightCards
 } from './styles';

export function Dashboard(){
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                            source={{uri: 'https://avatars.githubusercontent.com/u/31963525?v=4'}}>
                        </Photo>
                        <User>
                            <UserGretting>Olá,</UserGretting>
                            <UserName>Carlos</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
            </Header>
            <HighlightCards >
                <HighlightCard/>
            </HighlightCards>
        </Container>
    )
}
