var React = require('react');
var createReactClass = require('create-react-class');

var AptList = createReactClass({

    handleDelete: function(){
        this.props.onDelete(this.props.whichItem)
    },
    render: function(){
        return(
            <li className="pet-item media">
                <div className="media-left">
                    <button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
                        x
                    </button>
                </div>
                <div className="pet-info media-body">
                    <div className="pet-head">
                        <span className="pet-name">{this.props.singleItem.petName}</span>
                        <span className="apt-date pull-right">{this.props.singleItem.aptDate}</span>
                    </div>
                    <div className="owner-name"><span className="label-item">Owner:</span>
                        {this.props.singleItem.ownerName}</div>
                    <div className="apt-notes">{this.props.singleItem.aptNotes}</div>
                </div>
            </li>
        );
    }
    
})

module.exports = AptList;