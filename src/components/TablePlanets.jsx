import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import './TablePlanets.css';

const headerTable = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain', 'Surface Water',
  'Population', 'Films', 'Created', 'Edited', 'URL'];

const selectDropdown = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisonFilter = ['maior que', 'menor que', 'igual a'];

function TablePlanets() {
  const { planets, filterPlanet, filters, newFilterPlanet,
    currentPlanets, filterName, setFilters, sortPlanets } = useContext(PlanetsContext);
  const [search, setSearch] = useState('');
  const [columFilter, setColumFilter] = useState(selectDropdown[0]);
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [columSort, setColumSort] = useState('population');
  const [radio, setRadio] = useState('');

  const handleChangeSearch = ({ target: { value } }) => {
    setSearch(value);
    filterName(value);
  };

  const filterDropdown = () => {
    if (filters.filterByNumericValues) {
      const findOptions = filters.filterByNumericValues
        .map((disabledOption) => disabledOption.column);
      return selectDropdown.filter((option) => (!findOptions.includes(option)) && option);
    }
    return selectDropdown;
  };

  const handleClick = () => {
    setColumFilter(selectDropdown[selectDropdown
      .findIndex((column) => column === columFilter) + 1]);
    filterPlanet(columFilter, comparison, valueFilter);
  };

  const deleteFilter = (option) => {
    const deleteFilters = filters.filterByNumericValues
      .filter((disabledOption) => disabledOption.column !== option.column);
    setFilters({ filterByNumericValues: deleteFilters });
  };

  const deleteAllFilters = () => {
    newFilterPlanet({
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    });
  };

  const handleSort = () => {
    sortPlanets(columSort, radio);
  };

  return (
    <main>
      <form className="forms">
        <input
          data-testid="name-filter"
          type="text"
          name="search"
          className="search"
          placeholder="Procure por um planeta"
          value={ search }
          onChange={ handleChangeSearch }
        />
        <select
          name="columFilter"
          id="columFilter"
          className="column-filter"
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => {
            setColumFilter(value);
          } }
          value={ columFilter }
        >
          {
            filterDropdown().map((option, index) => (
              <option
                className="option"
                data-testid={ option }
                key={ index }
              >
                { option }
              </option>
            ))
          }
        </select>
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          className="comparison"
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
          className="value"
          name="valueFilter"
          value={ valueFilter }
          onChange={ ({ target: { value } }) => setValueFilter(value) }
        />
        <button
          type="button"
          className="filter"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
        {
          filters.filterByNumericValues && filters.filterByNumericValues
            .map((filter, index) => (
              <div key={ index } data-testid="filter" className="filter-container">
                <p className="filter-name">
                  {` ${filter.column}, ${filter.comparison}, ${filter.value}`}
                </p>
                <button
                  type="button"
                  className="delete-filter"
                  onClick={ () => deleteFilter(filter) }
                >
                  X
                </button>
              </div>
            ))
        }
        <button
          type="button"
          className="delete-all-filters"
          data-testid="button-remove-filters"
          onClick={ deleteAllFilters }
        >
          Remover todos os filtros
        </button>
      </form>
      <select
        name="columSort"
        data-testid="column-sort"
        onChange={ ({ target: { value } }) => {
          setColumSort(value);
        } }
        value={ columSort }
      >
        {
          selectDropdown.map((option, index) => (
            <option
              className="option"
              data-testid={ option }
              key={ index }
            >
              { option }
            </option>
          ))
        }
      </select>
      <label htmlFor="ascendente">
        Ascendente
        <input
          type="radio"
          name="radio"
          id="ASC"
          data-testid="column-sort-input-asc"
          value={ radio }
          onChange={ ({ target: { id } }) => {
            setRadio(id);
          } }
        />
      </label>
      <label htmlFor="descendente">
        Descendente
        <input
          type="radio"
          name="radio"
          id="DESC"
          value={ radio }
          data-testid="column-sort-input-desc"
          onChange={ ({ target: { id } }) => {
            setRadio(id);
          } }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort() }
      >
        Sort
      </button>

      <div className="table-planets">
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
              planets && currentPlanets
                .map((planet) => (
                  <tr key={ planet.name }>
                    <td data-testid="planet-name">{planet.name}</td>
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

      </div>

    </main>
  );
}

export default TablePlanets;
