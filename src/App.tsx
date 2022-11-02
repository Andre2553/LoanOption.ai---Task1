import { Provider } from "react-redux";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import "./global.css";
import { store } from "./store";

function App() {

  return (
  <Provider store={store}>
    <Header/>
    <Table/>
  </Provider>
  );
}

export default App;
