import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const endpointAPI = 'https://swapi-trybe.herokuapp.com/api/planets/';
const INITIAL_VALUE = {
  filterByNumericValues: [],
};

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIAL_VALUE);
  const [currentPlanets, setCurrentPlanets] = useState([]);
  const [filterSearchName, setFilterSearchName] = useState({});
  useEffect(() => {
    const planetsStarWarsAPI = async () => {
      const { results } = await fetch(endpointAPI).then((response) => response.json());
      setPlanets(results);
      setCurrentPlanets(results);
    };
    planetsStarWarsAPI();
  }, []);

  const filterName = (search) => {
    setFilterSearchName({
      filterByName: {
        name: search,
      },
    });
    setCurrentPlanets(planets.filter((planet) => planet.name.includes(search)));
  };

  const filterPlanet = (column, comparison, value) => {
    setFilters({
      filterByNumericValues: [...filters.filterByNumericValues
        .map((numericValues) => numericValues),
      {
        column,
        comparison,
        value,
      },
      ],
    });
    if (comparison === 'maior que') {
      const planetsFiltered = planets
        .filter((planet) => (Number.isNaN(planet[column])
          ? Number(planet[column]) < value
          : Number(planet[column]) > value));
      setCurrentPlanets(planetsFiltered);
    } else if (comparison === 'menor que') {
      const planetsFiltered = planets
        .filter((planet) => (Number.isNaN(planet[column])
          ? Number(planet[column]) > value
          : Number(planet[column]) < value));
      setCurrentPlanets(planetsFiltered);
    } else if (comparison === 'igual a') {
      const planetsFiltered = planets
        .filter((planet) => planet[column] === value);
      setCurrentPlanets(planetsFiltered);
    }
  };



  const newFilterPlanet = (NewFilter) => {
    setFilters(NewFilter);
  };

  const contextValue = {
    planets,
    filterPlanet,
    filters,
    newFilterPlanet,
    currentPlanets,
    filterName,
    filterSearchName,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
