import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  loading: {
    margin: 'auto',
  },
});

const Loading = ({ classes }) => <CircularProgress className={classes.loading} />;

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(Loading));
