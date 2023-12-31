import { useEffect, useState } from "react";
import { useLocation, useParams ,Switch,Route ,Link ,useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import path from "path";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props=>props.isActive ? props.theme.accentColor : props.theme.textColor} ;
  a {
    display: block;
  }
`;

interface CoinUrlParams{
    coinId: string;
}

interface CoinStateParams{
    name: string;
}



interface IInfoData{
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
    logo:string,
    description:string,
    message:string,
    open_source:boolean,
    started_at:string,
    development_status:string,
    hardware_wallet:boolean,
    proof_type:string,
    org_structure:string,
    hash_algorithm:string,
    first_data_at:string,
    last_data_at:string,
}

interface IPriceData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{USD:{
        ath_date: string;
        ath_price: number; 
        market_cap: number;
        market_cap_change_24h:number;
        percent_change_1h:number;
        percent_change_1y:number;
        percent_change_6h:number;
        percent_change_7d:number;
        percent_change_12h:number;
        percent_change_15m:number;
        percent_change_24h:number;
        percent_change_30d:number;
        percent_change_30m:number;
        percent_from_price_ath:number;
        price:number;
        volume_24h:number;
        volume_24h_change_24h:number;
    }};
}

function Coin(){
    const [loading,setLoading] = useState(true);

    const {coinId} = useParams<CoinUrlParams>();
    const {state} = useLocation<CoinStateParams>();

    const [info,setInfo] = useState<IInfoData>();
    const [priceInfo, setpriceInfo] = useState<IPriceData>();

    const priceMatch = useRouteMatch(`/:coinId/price`);
    // const chartMatch = useRouteMatch(`/${coinId}/chart`);
    const chartMatch = useRouteMatch(`/:coinId/chart`);

    // Coins컴포넌트를 통하여 코인의 이름을 전달받기 때문에
    // 만약 Coins컴포넌트를 거치지 않고 해당 url로 들어올 경우(ex.사용자가 직접 url입력) state엔 값을 받아오지 못한다..
    // const coinName = state?.name || "Loading...";  
    
    //위 문제를 해결하고자 아래와 같이 변경
    const coinName = state?.name ? state.name : loading ?  "Loading..." : info?.name;  
    // const coinName = state? state.name : "Loading...";  

    useEffect(()=>{
        // fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        // .then(response=>response.json())
        // .then(json=>console.log(json))

        (async ()=>{
            //await : callApi가 끝나는 것을 기다리게 하는 명령어
            const infoData =  await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            setInfo(infoData);
            
            const priceData =  await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setpriceInfo(priceData);
            
            setLoading(false);
        })();
    },[]);

    return (
        <Container>
            <Header>{coinName}</Header> 
            {/* 옵셔널 체이닝= https://ko.javascript.info/optional-chaining */}
            {loading
                ? <Loader>Loading...</Loader>
                : 
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank</span>
                        <span>{info?.rank}</span>
                    </OverviewItem> 
                    <OverviewItem>
                        <span>Symbol</span>
                        <span>${info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Open Source</span>
                        <span>{info?.open_source ? "Yes" : "No"}</span>
                    </OverviewItem>
                </Overview>
                <Description>
                         {info?.description}
                 </Description>

                 <Overview>
                    <OverviewItem>
                        <span>ToTAL SUPLY</span>
                        <span>{priceInfo?.total_supply}</span>
                    </OverviewItem> 
                    <OverviewItem>
                        <span>MAX</span>
                        <span>${priceInfo?.max_supply}</span>
                    </OverviewItem>
                </Overview>

                <Tabs>
                    <Tab isActive={priceMatch!==null}>
                        <Link to={`/${coinId}/price`}>Price</Link>
                    </Tab>
                    <Tab isActive={chartMatch!==null}>
                        <Link to={`/${coinId}/chart`}>Chart</Link>
                    </Tab>
                </Tabs>

                <Switch>
                    <Route path={`/:coinId/price`} >
                        <Price />
                    </Route>
                    <Route path={`/:coinId/chart`} >
                        <Chart />
                    </Route>
                </Switch>
                </>
            }   
        </Container>
    );
}


export default Coin;