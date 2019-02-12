var React = require('react');
var createReactClass = require('create-react-class');

var Toolbar = createReactClass({

    toggleAbout: function(){
        this.props.handleAbout();
    },
    
    toggleAddAppointment: function(){
        this.props.handleToggle();
    },

    render: function(){
        return(
            <div className = "toolbar">
                <div className = "toolbar-item" onClick={this.toggleAbout}>
                    <span className = "toolbar-item-button">About this app</span>
                </div>
                <div className = "toolbar-item" onClick={this.toggleAddAppointment}>
                    <span className = "toolbar-item-button">Add Appointment</span>
                </div>
            </div>
        )
    }
});

module.exports = Toolbar;