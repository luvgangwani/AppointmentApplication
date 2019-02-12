// var $ = jQuery = require('jquery');
// var bootstrap = require('bootstrap')

// $("#petAppointments").append("<h3 class=text-success>Wisdom Pet App loaded!</h3>");

var fs = eRequire('fs')

var loadApts = JSON.parse(fs.readFileSync(dataLocation));

var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var _ = require('lodash');

var AptList = require('./AptList');

var MainInterface = createReactClass({
    
    getInitialState: function(){
        return {
            myAppointments: loadApts
        }
    },
    deleteMessage: function(item){
        var allApts = this.state.myAppointments;
        var newApts = _.without(allApts, item);

        this.setState({
            myAppointments: newApts
        });
    },
    componentDidUpdate: function(){
        fs.writeFile(dataLocation, JSON.stringify(this.state.myAppointments), 'utf-8', function(err){
            if (err){
                console.log(err);
            }
        })
    },
    render: function(){
        var myAppointments = this.state.myAppointments;

        myAppointments = myAppointments.map(function(item, index){
           return( 
           <AptList
            key = {index}
            singleItem = {item}
            whichItem = {item}
            onDelete = {this.deleteMessage} />
            )
        }.bind(this));
        
        return(
            
            <div className="application">
                <div className="container">
                <div className="row">
                <div className="appointments col-sm-12">
                    <h2 className="appointments-headline">Current Appointments</h2>
                    <ul className="item-list media-list">
                        {myAppointments}
                    </ul>
                </div>{/* col-sm-12 */}
                </div>{/* row */}
                </div>{/* container */}
            </div>

        )
    }
});

ReactDOM.render(
    <MainInterface />,
    document.getElementById("petAppointments")
);