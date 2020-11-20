import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { TuneOutlined as CoefficientIcon } from "@material-ui/icons";
import CoefficientsTableCard from "../../components/CoefficientsTableCard";

import { fetchCoefficients } from "../actions";

class CoefficientsContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchCoefficientData();
  }
  componentDidUpdate(nextProps) {
    const { stationId, start, end } = this.props;
    if (
      stationId !== nextProps.stationId ||
      start !== nextProps.start ||
      end !== nextProps.end
    ) {
      this.fetchCoefficientData();
    }
  }

  fetchCoefficientData() {
    const { stationId, start, end } = this.props;
    stationId && this.props.fetchCoefficients(stationId, start, end);
  }

  render() {
    const { data, error, loading } = this.props;

    return (
      <CoefficientsTableCard
        title="Coefficients de calibration"
        icon={<CoefficientIcon />}
        hasData={true}
        data={data}
        error={error}
        loading={loading}
      />
    );
  }
}

CoefficientsContainer.propTypes = {
  fetchCoefficients: PropTypes.func.isRequired,
  data: PropTypes.array,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state.coefficients,
});

const mapDispatchToProps = {
  fetchCoefficients,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoefficientsContainer);
