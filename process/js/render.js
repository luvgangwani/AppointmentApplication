var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');

// $("#petAppointments").append("<h3 class=text-success>Wisdom Pet App loaded!</h3>");

var fs = eRequire('fs')

var loadApts = JSON.parse(fs.readFileSync(dataLocation));

var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var _ = require('lodash');
var Toolbar = require('./Toolbar');
var electron = eRequire('electron');
var ipc = electron.ipcRenderer;
var AddAppointment = require('./AddAppointment');

var AptList = require('./AptList');

var MainInterface = createReactClass({
    
    getInitialState: function(){
        return {
            aptBodyVisible: false,
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
    showAbout: function(){
        ipc.sendSync('openInfoWindow');
    },
    toggleAddDisplay: function(){
        var tempVisibility = !this.state.aptBodyVisible;
        this.setState({
            aptBodyVisible: tempVisibility
        });
    },
    addItem: function(tempItem){
        var tempApts = this.state.myAppointments;
        tempApts.push(tempItem);
        this.setState({
            myAppointments: tempApts,
            aptBodyVisible: false
        });
    },
    render: function(){
        var myAppointments = this.state.myAppointments;

        if (this.state.aptBodyVisible === true){
            $('#addAppointment').modal('show');
        }
        else {
            $('#addAppointment').modal('hide');
        }

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
                <div className = "interface">
                    <Toolbar
                    handleAbout = {this.showAbout}
                    handleToggle = {this.toggleAddDisplay} />
                    
                    <AddAppointment
                    handleToggle = {this.toggleAddDisplay}
                    addAppointment = {this.addItem} />
                    
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
            </div>

        )
    }
});

ReactDOM.render(
    <MainInterface />,
    document.getElementById("petAppointments")
);