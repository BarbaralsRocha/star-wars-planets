import React from 'react';
import TablePlanets from './components/TablePlanets';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <TablePlanets />
      </PlanetsProvider>
    </div>
  );
}

export default App;
