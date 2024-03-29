import { Container} from "@material-ui/core";
import "./App.css";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Container>
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
        </div>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
