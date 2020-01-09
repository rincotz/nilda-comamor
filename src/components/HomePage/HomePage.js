import React from 'react';
import MealDashboard from '../MealDashboard/MealDashboard'
import MealList from "../../containers/MealList/MealList";

const HomePage = () => (
    <div>
        <h1>Comida Feita com carinho, perto de você.</h1>
        <p>Ajudamos você a encontrar comida caseira nas proximidades. A renda ajuda pessoas de verdade a realizarem seus sonhos</p>
        <form>
            <input name='adress' placeholder="Conte-nos seu endereço" />
            <button>Buscar</button>
        </form>
        <MealDashboard />
    </div>
);

export default HomePage;