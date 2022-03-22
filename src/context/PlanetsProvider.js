import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const endpointAPI = 'https://swapi-trybe.herokuapp.com/api/planets/';
const INITIAL_VALUE = [{
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: 0,
      },
    ],
  },
}];

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
    setFilters([...filters, {
      filters: {
        filterByName: {
          name: search,
        },
        filterByNumericValues: [
          {
            column,
            comparison,
            value,
          },
        ],
      },
    }]);
  };

  const contextValue = {
    planets,
    filterPlanet,
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
