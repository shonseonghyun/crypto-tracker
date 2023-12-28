import styled from "styled-components";
import { Link } from "react-router-dom"; 
import { useEffect, useState } from "react";


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
    display:block;
}

&:hover{
    a{
        color:${props=>props.theme.accentColor}
    }
}
`;

interface CoinInterface{
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
} 

function Coins(){

    const [coins,setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        (async()=>{
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,800));
            setLoading(false);
        })();
    },[])

    return (
        <Container>
            <Header>코인</Header>
            {loading ? <Loader>Loading...</Loader>:
            <CoinList>
                {coins.map(coin=>
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`}>{coin.name} &rarr; </Link>
                    </Coin>
                )}
            </CoinList>}
        </Container>
    );
}

export default Coins;