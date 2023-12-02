import "./App.css";
import Adjustment from "./components/AdjustmentContainer";
import Form from "./components/Form";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="flex gap-5">
      <Form></Form>
      <div>
        <Adjustment></Adjustment>
        <Posts></Posts>
      </div>
    </div>
  );
}

export default App;
