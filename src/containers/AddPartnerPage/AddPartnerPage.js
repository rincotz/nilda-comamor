import React from 'react';
import { connect } from 'react-redux'
import PartnerForm from "../PartnerForm/PartnerForm";
import { startAddPartner } from "../../actions/partners";

import FormLabel from '@material-ui/core/FormLabel'

export class AddPartnerPage extends React.Component {
    onSubmit = (partner) => {
        this.props.startAddPartner(partner)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <FormLabel component='legend'>Complete seu cadastro</FormLabel>
                <PartnerForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddPartner: (partner) => dispatch(startAddPartner(partner))
})

export default connect(undefined, mapDispatchToProps)(AddPartnerPage);