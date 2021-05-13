import {
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ExpandMoreOutlined as ExpandMoreIcon } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { Loading, NoData } from ".";

class IdfTableCard extends React.PureComponent {
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
      <Accordion expanded={expanded} onChange={this.handleExpand}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{icon}</Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {!error && !loading ? (
            hasData ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Durees</TableCell>
                    <TableCell>5 mins</TableCell>
                    <TableCell>10 mins</TableCell>
                    <TableCell>15 mins</TableCell>
                    <TableCell>30 mins</TableCell>
                    <TableCell>1 hr</TableCell>
                    <TableCell>2 hrs</TableCell>
                    <TableCell>6 hrs</TableCell>
                    <TableCell>12 hrs</TableCell>
                    <TableCell>24 hrs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Intensite (mm/h)
                    </TableCell>
                    {data.map((stationData) => (
                      <TableCell key={stationData.increment}>
                        {parseFloat(stationData.intensity).toFixed(2)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <NoData />
            )
          ) : (
            <Loading />
          )}
        </AccordionDetails>
      </Accordion>
    );
  }
}

IdfTableCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  hasData: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default IdfTableCard;
