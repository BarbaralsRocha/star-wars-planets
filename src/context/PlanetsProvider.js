import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const MENOS_UM = -1;
const endpointAPI = 'https://swapi-trybe.herokuapp.com/api/planets/';
const INITIAL_VALUE = {
  filterByNumericValues: [],
};

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIAL_VALUE);
  const [currentPlanets, setCurrentPlanets] = useState([]);
  const [filterSearchName, setFilterSearchName] = useState({});
  const [order, setOrder] = useState({
    column: '',
    sort: '',
  });

  useEffect(() => {
    const planetsStarWarsAPI = async () => {
      const { results } = await fetch(endpointAPI).then((response) => response.json());
      setPlanets(results);
      setCurrentPlanets(results.sort((a, b) => a.name < b.name && MENOS_UM));
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

  const sortPlanets = (column, sort) => {
    const planetsSort = {
      order: {
        column,
        sort,
      },
    };
    setOrder(planetsSort);

    const sortNumbers = (a, b) => {
      if (a === 'unknown') return 1;
      if (b === 'unknown') return MENOS_UM;
      if (planetsSort.order.sort === 'ASC') {
        return +a - +b;
      } if (planetsSort.order.sort === 'DESC') {
        return +b - +a;
      }
    };

    const orderPlanets = currentPlanets.sort((planet1, planet2) => {
      const a = planet1[column];
      const b = planet2[column];
      return sortNumbers(a, b);
    });

    return orderPlanets;
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
    sortPlanets,
    order,
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
