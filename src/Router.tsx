import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';



function Router(){
    return (
        <BrowserRouter>
          {/* Switch: 가장 먼저 매칭된 맨위의 <Route> 하나만 보여준다 */}
          <Switch>
            <Route path={"/:coinId"}>
              <Coin></Coin>
            </Route>
            <Route path={"/"}>
              <Coins ></Coins>
            </Route>
          </Switch>
      </BrowserRouter>
    );
}

export default Router;