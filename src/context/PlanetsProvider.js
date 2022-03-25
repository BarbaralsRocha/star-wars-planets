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

  useEffect(() => {
    const planetsFiltered = planets.filter((planet) => {
      const filtrados = filters.filterByNumericValues.every((filtro) => {
        if (Number.isNaN(planet[filtro.column])) return planet;
        if (filtro.comparison === 'maior que') {
          return Number(planet[filtro.column]) > filtro.value;
        }
        if (filtro.comparison === 'menor que') {
          return Number(planet[filtro.column]) < filtro.value;
        }
        if (filtro.comparison === 'igual a') {
          return planet[filtro.column] === filtro.value;
        }
        return null;
      });
      return filtrados;
    });
    setCurrentPlanets(planetsFiltered);
  }, [filters, planets]);

  const filterName = (search) => {
    setFilterSearchName({
      filterByName: {
        name: search,
      },
    });
    setCurrentPlanets(planets.filter((planet) => planet.name.includes(search)));
  };

  const filterPlanet = (column, comparison, value) => {
    const filtrosNumericos = {
      filterByNumericValues: [...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    };

    setFilters(filtrosNumericos);
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
    setFilters,
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
