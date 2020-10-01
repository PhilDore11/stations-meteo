import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { TuneOutlined as CoefficientIcon } from "@material-ui/icons";
import CoefficientsTableCard from "../../components/CoefficientsTableCard";

// import { fetchCoefficientData } from "../actions";

class CoefficientsContainer extends React.PureComponent {
  componentDidMount() {
    // this.fetchCoefficientData();
  }
  componentDidUpdate(nextProps) {
    const { stationId, start, end } = this.props;
    if (
      stationId !== nextProps.stationId ||
      start !== nextProps.start ||
      end !== nextProps.end
    ) {
      // this.fetchCoefficientData();
    }
  }

  fetchCoefficientData() {
    const { stationId, start, end, view } = this.props;
    stationId && this.props.fetchCoefficientData(stationId, start, end, view);
  }

  render() {
    const { /*coefficientData,*/ error, loading } = this.props;

    return (
      <CoefficientsTableCard
        title="Coefficients de calibration"
        icon={<CoefficientIcon />}
        hasData={true}
        data={[{ coefficient: 1.2345, date: Date.now() }]}
        error={error}
        loading={loading}
      />
    );
  }
}

CoefficientsContainer.propTypes = {
  // fetchCoefficientData: PropTypes.func.isRequired,
  coefficientData: PropTypes.array,
  stationId: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state.coefficientData,
});

const mapDispatchToProps = {
  // fetchCoefficientData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoefficientsContainer);
