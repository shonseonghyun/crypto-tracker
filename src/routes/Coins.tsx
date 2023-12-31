import styled from "styled-components";
import { Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api/CoinsApi";
import { Helmet } from "react-helmet";
import { title } from "process";


const Container = styled.div`
    padding: 0px 20px
`;

const Header = styled.header`
    font-size: 48px;
    heigth:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:10px;
`;

const Loader = styled.span`
    text-align:center;
    display:block;
`;

const CoinList= styled.ul``;
const Coin = styled.li`
    background-color:white;
    color:${props=>props.theme.bgColor};
    margin-bottom:10px;
    border-radius:15px;

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