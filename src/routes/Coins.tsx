import styled from "styled-components";
import { Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api/CoinsApi";
import { Helmet } from "react-helmet";
import { title } from "process";


const Container = styled.div`
    padding: 0px 2rem;
    max-width: 30rem;
    margin: 0px auto;
`;

const Header = styled.h1`
    heigth:8rem;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Loader = styled.span`
    text-align:center;
    display:block;
`;

const CoinList= styled.ul`
    display:flex;
    gap:1rem;
    flex-direction:column;
`;
const Coin = styled.li`
    background-color:white;
    color:${props=>props.theme.bgColor};
    margin-bottom:10px;
    min-height: 3.5rem;
    border-radius: 0.7rem;
    align-items:center;
    box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;

    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display:flex;
        align-items:center;
    }

    &:hover{
        a{
            color:${props=>props.theme.accentColor}
        }
    }
`;

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right:10px;
`;

interface ICoin{
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
} 

function Coins(){
    const {isLoading,data} = useQuery<ICoin[]>("allCoins",fetchCoins);

    return (
        <Container>
            <Helmet>
                <title>코인</title> 
            </Helmet>           
            <Header>코인</Header>
            {isLoading 
            ? <Loader>Loading...</Loader>
            : <CoinList>
                    {data?.slice(0,100).map(coin=>
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname:`/${coin.id}`, 
                                    state: { 
                                        name:`${coin.name}`,
                                        symbol:`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`,
                                    },
                                }}
                            >
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr; 
                            </Link>
                        </Coin>
                    )}
                </CoinList>
            }
        </Container>
    );
}

export default Coins;