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
var HeaderNav = require('./HeaderNav');

var AptList = require('./AptList');

var MainInterface = createReactClass({
    
    getInitialState: function(){
        return {
            aptBodyVisible: false,
            myAppointments: loadApts,
            queryText: '',
            orderBy: 'petName',
            orderDir: 'asc'
        }
    },
    deleteMessage: function(item){
        var allApts = this.state.myAppointments;
        var newApts = _.without(allApts, item);

        this.setState({
            myAppointments: newApts
        });
    },
    componentDidMount: function(){
        ipc.on('addAppointment',function(event, message) {
            this.toggleAddDisplay();
        }.bind(this));
    },
    componentWillUnmount: function(){
        ipc.removeListener('addAppointment',function(event, message) {
            this.toggleAddDisplay();
        }.bind(this));
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
    searchApts: function(query){
        this.setState({
            queryText: query
        });
    },
    reOrder: function(orderBy, orderDir){
        console.log(orderBy);
        console.log(orderDir);
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir
        });
    },
    render: function(){
        var filteredApts = []
        var queryText = this.state.queryText;
        var orderBy = this.state.orderBy;
        var orderDir = this.state.orderDir;

        var myAppointments = this.state.myAppointments;

        if (this.state.aptBodyVisible === true){
            $('#addAppointment').modal('show');
        }
        else {
            $('#addAppointment').modal('hide');
        }

        for (var i = 0; i < myAppointments.length; i++){
            if (
                (myAppointments[i].petName.toLowerCase().indexOf(queryText) != -1) ||
                (myAppointments[i].ownerName.toLowerCase().indexOf(queryText) != -1) ||
                (myAppointments[i].aptDate.toLowerCase().indexOf(queryText) != -1) ||
                (myAppointments[i].aptNotes.toLowerCase().indexOf(queryText) != -1)
            ){
                filteredApts.push(myAppointments[i]);
            }
        }

        filteredApts = _.orderBy(filteredApts, function(item){
            return item[orderBy].toLowerCase();
        }, orderDir);

        filteredApts = filteredApts.map(function(item, index){
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
                <HeaderNav
                    onSearch = {this.searchApts}
                    orderBy = {this.state.orderBy}
                    orderDir = {this.state.orderDir}
                    onReOrder = {this.reOrder} />
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
                            {filteredApts}
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