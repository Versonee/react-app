import './App.css';

function App() {
  return (
    <MainPage />
  );
}

const MainPage = () => {
  return (
    <div class="wrapper">
      <div class="nav">
        <div class="logo">LWK</div>
      </div>
      <div class="header-text">
        <h1>Lot w Kosmos</h1>
        <p>Nowy wymiar podróży.</p>
        <button type="button">WIĘCEJ</button>
      </div>
      <div class="footer">
        <div class="footer-text">Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok</div>
      </div>
    </div>
  );
} 

export default App;
