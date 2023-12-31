import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api/CoinsApi";
import ApexChart from "react-apexcharts";
import { theme } from "../theme";

interface ChartProps{
    coinId:string;
}

interface IHistorical{
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number
}


function Chart({coinId} :ChartProps){
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId));

    const closeArr  = data?.map(function(e){
        return parseInt(`${e.close}`);
    }) as number[];

    return (
        <div>
            {
                isLoading
                ? "Loading chart..."
                : <ApexChart 
                series={[
                    {
                        name:"open",
                        data: data?.map((price) => Number(price.open)) as number[],
                    },
                    {
                        name:"close",
                        data:closeArr,
                    },
                    {
                        name:"high",
                        data: data?.map((price) => Number(price.high)) as number[],
                    }
                ]}
                type="line"
                options={{
                    theme:{
                        mode:"dark"
                     },
                    chart:{
                        toolbar:{
                            show:false,
                        },
                        width:500,
                        height:500,
                    },
                    grid:{
                        show:false,
                    },
                    stroke:{
                        curve:"smooth",
                        width:2,
                    },
                    yaxis:{
                        show:false,
                    },
                    xaxis:{
                        axisTicks:{
                            show:false,
                        },
                        labels:{
                            show:false,
                            datetimeFormatter:{month:"mmm yy"},
                            // datetimeFormatter: {month: "mmm 'yy"} ,
                        },
                        // type:"datetime",
                        categories:data?.map((price) =>
                            new Date(price.time_close * 1000).toISOString()
                        ),
                    },
                    tooltip:{
                        y:{
                            formatter:value => `$${value.toFixed(3)}`,
                        }
                    }
                    // fill:{
                    //     type: "gradient",
                    //     gradient:{gradientToColors:["blue"]},
                    // },
                    // colors:["red"],
            }}/>
            }
        </div>
    );
}

export default Chart;