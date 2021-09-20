import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DLCallService from "../../../services/project_management/dlcall.service.js";

class ViewDCL extends Component {
    constructor(props) {
        super(props);
        this.retrieveCallLog = this.retrieveCallLog.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCallfrom = this.onChangeCallfrom.bind(this);
        this.onChangeCallto = this.onChangeCallto.bind(this);
        this.onChangeStarttime = this.onChangeStarttime.bind(this);
        this.onChangeEndtime = this.onChangeEndtime.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.updateCallLog = this.updateCallLog.bind(this);
        this.deleteCallLog = this.deleteCallLog.bind(this);

        this.state = {
            dlcall: {
                id: this.props.match.params.dlid,
                date: "",
                callfrom: "",
                callto: "",
                starttime: "",
                endtime: "",
                reason: "",
                isDeleted: 0,
                projectId: this.props.match.params.id,
                submitted: false
            }
        };
    }

    componentDidMount() {
        this.retrieveCallLog(this.props.match.params.dlid);
    }

    retrieveCallLog(dlid){
        DLCallService.getOne(dlid)
        .then(response => {
            this.setState({
                dlcall: response.data
            });
        });
    }

    onChangeDate(e) {
        const date= e.target.value
        this.setState(function(prevState){
            return {
                dlcall: {
                    ...prevState.dlcall,
                    date: date
                }
            }
        });
    }

    onChangeCallfrom(e) {
        const callfrom= e.target.value
        this.setState(function(prevState){
            return {
                dlcall: {
                    ...prevState.dlcall,
                    callfrom: callfrom
                }
            }
        });
    }

    onChangeCallto(e) {
        const callto= e.target.value
        this.setState(function(prevState){
            return {
                dlcall: {
                    ...prevState.dlcall,
                    callto: callto
                }
            }
        });
    }

    onChangeStarttime(e) {
        const starttime= e.target.value
        this.setState(function(prevState){
            return {
                dlcall: {
                    ...prevState.dlcall,
                    starttime: starttime
                }
            }
        });
    }

    onChangeEndtime(e) {
        const endtime= e.target.value
        this.setState(function(prevState){
            return {
                dlcall: {
                    ...prevState.dlcall,
                    endtime: endtime
                }
            }
        });
    }

    onChangeReason(e) {
        const reason= e.target.value
        this.setState(function(prevState){
            return {
                dlcall: {
                    ...prevState.dlcall,
                    reason: reason
                }
            }
        });
    }

    updateCallLog() {
        var data = {
            date: this.state.dlcall.date,
            callfrom: this.state.dlcall.callfrom,
            callto: this.state.dlcall.callto,
            starttime: this.state.dlcall.starttime,
            endtime: this.state.dlcall.endtime,
            reason: this.state.dlcall.reason,
            projectId: this.props.match.params.id
        };

        DLCallService.update(this.props.match.params.dlid, data)
        .then(response => {
            this.setState(prevState => ({
                dlcall: {
                    ...prevState.dlcall,
                }
            }));
            console.log("update function service ekata enawa");
            window.location.reload();
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteCallLog(){
        var data= {
            isDeleted: 1
        }
        DLCallService.update(this.props.match.params.dlid, data)
        .then(response => {
            console.log(response.data);
            // this.props.history.push('/punchlist/');
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    render() {
        const {dlcall} = this.state;
        return (
        <div className="">
            <div className="">
                <h2>View Call Log  - {dlcall.date}</h2>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/home">Home</Link>
                    <Link color="inherit" to={"/projectmanagementhome/"+dlcall.projectId}>App Dashboard</Link>
                    <Link color="inherit" to={"/dailylogs/"+dlcall.projectId}>Daily Log</Link>
                    <Link color="inherit" aria-current="page" className="disabledLink">View Call Log</Link>
                </Breadcrumbs><hr/>
                <div className="">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="">Date</label>
                            <input
                                className="form-control"
                                name="title"
                                value={dlcall.date}
                                onChange={this.onChangeDate}
                                type="date"
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="">Start time</label>
                            <input
                                className="form-control"
                                name="starttime"
                                value={dlcall.starttime}
                                onChange={this.onChangeStarttime}
                                type="time"
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="">End time</label>
                            <input
                                className="form-control"
                                name="endtime"
                                value={dlcall.endtime}
                                onChange={this.onChangeEndtime}
                                type="time"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="">Call from</label>
                            <input
                                className="form-control"
                                name="callfrom"
                                type="text"
                                value={dlcall.callfrom}
                                onChange={this.onChangeCallfrom}
                                required
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">Call to</label>
                            <input
                                className="form-control"
                                name="callto"
                                value={dlcall.callto}
                                onChange={this.onChangeCallto}
                                type="text"
                                required
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="">Reason</label>
                            <input
                                className="form-control"
                                name="reason"
                                value={dlcall.reason}
                                onChange={this.onChangeReason}
                                type="text"
                                required
                            />
                        </div>                      
                    </div>
                    <hr />
                    <button className="btn btn-primary mr-2" id="updateBtn" data-target="#promptModal" data-toggle="modal" >Update</button>
                    <button className="btn btn-danger mr-2"  id="updateBtn" data-target="#deleteModal" data-toggle="modal">Delete</button>
                    <Link to={"/dailylog/"+dlcall.projectId} className="">Cancel</Link>
                </div>
            </div>

            {/* Update modal Starts */}
            <div className="modal fade" id="promptModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="exampleModalCenterTitle">Are you sure you want to update</p>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <a onClick={this.updateCallLog} className="btn btn-primary pr-3 ml-2 mr-3" data-dismiss="modal"> Yes, Update</a>
                        <a className="btn btn-secondary ml-6 mr-6 pl-3" data-dismiss="modal"> Cancel</a>
                    </div>
                    </div>
                </div>
            </div>
            {/* Update modal Ends */}

            {/* Delete modal Starts */}
            <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title" id="exampleModalCenterTitle">Are you sure you want to delete?</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <a  className="btn btn-danger pr-3 ml-2 mr-3" onClick={this.deleteCallLog} data-dismiss="modal"> Yes, Delete</a>
                            <a className="btn btn-secondary ml-6 mr-6 pl-3" id ="deleteModalDismiss" data-dismiss="modal"> Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete modal Ends */}
        </div>
        );
    }
}

export default ViewDCL;