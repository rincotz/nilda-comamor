import React from 'react'
import PartnerForm from "../PartnerForm/PartnerForm";
import { startEditPartner, startRemovePartner } from "../../actions/partners";
import { connect } from 'react-redux'
import FormLabel from '@material-ui/core/FormLabel'

export class EditPartnerPage extends React.Component {
    onSubmit = (partner) => {
        this.props.startEditPartner(this.props.partner.uid, partner)
        this.props.history.push('/')
    }
    onRemove = () => {
        this.props.startRemovePartner({ uid: this.props.partner.uid })
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                {console.log(this.props.partner)}
                <PartnerForm
                    onSubmit={this.onSubmit}
                    partner={this.props.partner}
                />
                <button
                    onClick={this.onRemove}
                >
                    Deletar Conta
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    partner: state.partners.find((partner) => partner.uid === props.match.params.uid)
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditPartner: (uid, partner) => dispatch(startEditPartner(uid, partner)),
    startRemovePartner: (data) => dispatch(startRemovePartner(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPartnerPage)