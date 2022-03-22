import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const headerTable = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain', 'Surface Water',
  'Population', 'Films', 'Created', 'Edited', 'URL'];



function TablePlanets() {
  const { planets } = useContext(PlanetsContext);
  const { filterPlanet } = useContext(PlanetsContext);

  const [search, setSearch] = useState('');


  const handleChangeSearch = ({ target: { value } }) => {
    setSearch(value);
    filterPlanet(value);
  };

  const filterSearch = () => {
    return planets.filter((planet) => planet.name.includes(search));
  };


  return (
    <main>
      <input
        data-testid="name-filter"
        type="text"
        name="search"
        placeholder="Procure por um país"
        value={ search }
        onChange={ handleChangeSearch }
      />
      <table>
        <thead>
          <tr>
            {
              headerTable.map((itens, index) => (
                <th key={ index }>{itens}</th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            planets && filterSearch()
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </main>
  );
}

export default TablePlanets;
