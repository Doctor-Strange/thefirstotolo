import * as React from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Label, Grid, Segment } from 'semantic-ui-react'
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';
import moment from 'moment-jalaali';
moment.loadPersian();
const Card = styled(Grid)`

`;

export const DateGrid: React.FunctionComponent<{
    start: any;
    end: any;
}> = ({ start = moment(), end = moment() }) => {
    let startDate = moment(start).format('jYY/jMM/jDD');
    let endDate = moment(end).format('jYY/jMM/jDD');
    return (
        <Card className="property-row">
            <Grid.Row columns={2} centered className="property">
                <Grid.Column width={8} className="right">
                    <div className="date" style={{ float: 'right', textAlign: 'right' }}>
                        <strong>سه‌شنبه</strong> <br />
                        {convertNumbers2Persian(startDate)}
                    </div>
                </Grid.Column>
                <Grid.Column width={7} className="left">
                    <div className="date" style={{ float: 'right', textAlign: 'right' }}>
                        <strong>جمعه</strong><br />
                        {convertNumbers2Persian(endDate)}
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Card>
    )
}
