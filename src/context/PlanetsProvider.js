import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const endpointAPI = 'https://swapi-trybe.herokuapp.com/api/planets/';
const INITIAL_VALUE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIAL_VALUE);
  useEffect(() => {
    const planetsStarWarsAPI = async () => {
      const { results } = await fetch(endpointAPI).then((response) => response.json());
      setPlanets(results);
    };
    planetsStarWarsAPI();
  }, []);

  const filterPlanet = (search, column, comparison, value) => {
    setFilters({
      filterByName: {
        name: search,
      },
      filterByNumericValues: [...filters.filterByNumericValues
        .map((numericValues) => numericValues),
      {
        column,
        comparison,
        value,
      },
      ],
    });
  };

  const newFilterPlanet = (NewFilter) => {
    setFilters(NewFilter);
  };

  const contextValue = {
    planets,
    filterPlanet,
    filters,
    newFilterPlanet,
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
