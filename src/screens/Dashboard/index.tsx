import React from 'react';
import { 
    Container, 
    Header,  
    UserWrapper,  
    UserInfo, 
    Photo, 
    User, 
    UserGretting, 
    UserName } from './styles';

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
                            <UserGretting></UserGretting>
                            <UserName></UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>
            </Header>
        </Container>
    )
}
