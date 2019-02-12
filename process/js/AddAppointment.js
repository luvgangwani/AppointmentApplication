var React = require('react');
var createReactClass = require('create-react-class');

var AddAppointment = createReactClass({

    toggleAptDisplay: function(){
        this.props.handleToggle()
    },
    handleAdd: function(e){
        e.preventDefault();

        var tempItem = {
            petName: this.refs.inputPetName.value,
            ownerName: this.refs.inputPetOwner.value,
            aptDate: this.refs.inputAptDate.value +' '+this.refs.inputAptTime.value,
            aptNotes: this.refs.inputAptNotes.value,
        }
        this.props.addAppointment(tempItem);
    },
    render: function(){
        return(
            <div className="modal fade" id="addAppointment" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" onClick={this.toggleAptDisplay} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">Add an Appointment</h4>
                        </div>

                        <form className="modal-body add-appointment form-horizontal" onSubmit={this.handleAdd}>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" htmlFor="petName">Pet Name</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control"
                                id="petName" ref="inputPetName" placeholder="Pet's Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" htmlFor="petOwner">Pet Owner</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control"
                                id="petOwner" ref="inputPetOwner" placeholder="Owner's Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" htmlFor="aptDate">Date</label>
                            <div className="col-sm-9">
                            <input type="date" className="form-control"
                                id="aptDate" ref="inputAptDate" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" htmlFor="aptTime">Time</label>
                            <div className="col-sm-9">
                            <input type="time" className="form-control"
                                id="aptTime" ref="inputAptTime"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" htmlFor="aptNotes">Apt. Notes</label>
                            <div className="col-sm-9">
                            <textarea className="form-control" rows="4" cols="50"
                                id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-9">
                            <div className="pull-right">
                                <button type="button" className="btn btn-default"  onClick={this.toggleAptDisplay}>Cancel</button>&nbsp;
                                <button type="submit" className="btn btn-primary">Add Appointment</button>
                            </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = AddAppointment;