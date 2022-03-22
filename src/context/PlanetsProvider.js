import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const endpointAPI = 'https://swapi-trybe.herokuapp.com/api/planets/';


function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const planetsStarWarsAPI = async () => {
      const { results } = await fetch(endpointAPI).then((response) => response.json());
      setPlanets(results);
    };
    planetsStarWarsAPI();
  }, []);


  const contextValue = {
    planets,
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
