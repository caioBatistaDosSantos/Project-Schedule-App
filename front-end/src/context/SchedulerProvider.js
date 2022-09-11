import React, { useMemo } from 'react';
import proptypes from 'prop-types';
import SchedulerContext from './SchedulerContext';

function SchedulerProvider({ children }) {
  const memo = useMemo(() => ({ test: 0 }), []);

  return (
    <SchedulerContext.Provider
      value={ memo }
    >
      { children }
    </SchedulerContext.Provider>
  );
}

SchedulerProvider.propTypes = {
  children: proptypes.node,
}.isRequired;

export default SchedulerProvider;
