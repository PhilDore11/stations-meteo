import React from "react";
import PropTypes from "prop-types";

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import { ExpandMoreOutlined as ExpandMoreIcon } from "@material-ui/icons";

import { Loading, NoData } from ".";
import moment from "moment";

class CoefficientsTableCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { title, icon, hasData, data, error, loading } = this.props;
    const { expanded } = this.state;

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24} alignItems="center">
            <Grid item>{icon}</Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          {!error && !loading ? (
            hasData ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Coefficient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((coefficientData, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {moment(coefficientData.date).format("LLL")}
                      </TableCell>

                      <TableCell>{coefficientData.coefficient}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <NoData />
            )
          ) : (
            <Loading />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

CoefficientsTableCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  hasData: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CoefficientsTableCard;
