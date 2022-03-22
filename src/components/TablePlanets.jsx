import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const headerTable = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain', 'Surface Water',
  'Population', 'Films', 'Created', 'Edited', 'URL'];

const selectDropdown = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisonFilter = ['maior que', 'menor que', 'igual a'];

function TablePlanets() {
  const { planets } = useContext(PlanetsContext);
  const { filterPlanet } = useContext(PlanetsContext);
  const { filters } = useContext(PlanetsContext);
  const [search, setSearch] = useState('');
  const [columFilter, setColumFilter] = useState(selectDropdown[0]);
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterPlanets, setFilterPlanets] = useState('');

  const handleChangeSearch = ({ target: { value } }) => {
    setSearch(value);
    filterPlanet(value);
  };

  const filterSearch = () => {
    if (filterPlanets) {
      return filterPlanets;
    }
    return planets.filter((planet) => planet.name.includes(search));
  };

  const filterDropdown = () => {
    const findoptions = filters.filters.filterByNumericValues.map((disabledOption) => disabledOption.column)
    return selectDropdown.filter((option) => (!findoptions.includes(option))  && option) 
  }


  const handleClick = () => {
    filterPlanet(search, columFilter, comparison, valueFilter);
    if (comparison === 'maior que') {
      const filterPlanetsWithValues = filterSearch()
      .filter((planet) => isNaN(planet[columFilter]) ? Number(planet[columFilter]) < valueFilter : Number(planet[columFilter]) > valueFilter);
      setFilterPlanets(filterPlanetsWithValues);

    } else if (comparison === 'menor que') {
      const filterPlanetsWithValues = filterSearch()
        .filter((planet) => isNaN(planet[columFilter]) ? Number(planet[columFilter]) > valueFilter : Number(planet[columFilter]) < valueFilter);
      setFilterPlanets(filterPlanetsWithValues);

    } else if (comparison === 'igual a') {
      const filterPlanetsWithValues = filterSearch()
        .filter((planet) => planet[columFilter] === valueFilter);
      setFilterPlanets(filterPlanetsWithValues);
    }
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
      <select
        name="columFilter"
        id="columFilter"
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => {
          setColumFilter(value) 
        }}
        value={ columFilter }
      >
        {
          filterDropdown().map((option, index) => (
            <option data-testid={ option } key={ index }>{ option }</option>
          ))
        }
      </select>
      <select
        name="comparisonFilter"
        id="comparisonFilter"
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setComparison(value) }
        value={ comparison }
      >
        {
          comparisonFilter.map((option, index) => (
            <option data-testid={ option } key={ index }>{ option }</option>
          ))
        }
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="valueFilter"
        value={ valueFilter }
        onChange={ ({ target: { value } }) => setValueFilter(value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
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
