import React, { Component } from 'react';
import { Modal } from "react-bootstrap";

import Approve from "./approve.component";
import RemoveApprove from "./remove-approve.component";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import MarkWorker from './mark-worker.component';

import TimesheetDataService from "../../../services/timesheet.service";
import CrewDataService from "./../../../services/crew.service";
import WorkedHoursDataService from "./../../../services/worked-hours.service";

class ViewTimesheet extends Component {
  constructor(props) {
    super(props);
    this.retrieveTimesheet = this.retrieveTimesheet.bind(this);
    this.retrieveCrew = this.retrieveCrew.bind(this);
    this.retrieveWorkedHours = this.retrieveWorkedHours.bind(this);

    this.state = {
      code: this.props.match.params.code,
      id: this.props.match.params.id,
      timesheet: [],
      workedHours: [],
      crews: [],
      currentWorker: "",
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveTimesheet(this.props.match.params.code);
    this.retrieveCrew(this.props.match.params.id);
    this.retrieveWorkedHours(this.props.match.params.code);
  }

  retrieveCrew(id) {
    CrewDataService.getAll(id)
      .then(response => {
        this.setState({
          crews: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveTimesheet(id) {
    TimesheetDataService.get(id)
      .then(response => {
        this.setState({
          timesheet: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveWorkedHours(id) {
    WorkedHoursDataService.getTimesheetDetails(id)
      .then(response => {
        this.setState({
          workedHours: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveWorker(worker, index) {
    this.setState({
      currentWorker: worker,
      currentIndex: index
    });
    this.openModal();
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { id, timesheet, workedHours, crews, currentWorker } = this.state;

    return (
      <div>
        <Card
          bg={'success'}
          text={'white'}
          className="mb-2">
          <Card.Body>
            <h4>Timesheet</h4>
          </Card.Body>
        </Card>


        <Card
          className="mb-2"
          bg={'light'}>
          <div>
            <div class="row">
              <div class="col-6">
                <Card.Body>
                  <h6>Id:{timesheet.id}</h6>
                  <h6>Date: {timesheet.date}</h6>
                  <h6>Status: {timesheet.status}</h6>
                  <h6>ProjectId:{timesheet.projectId}</h6>
                </Card.Body>
              </div>

              <div class="col-6 text-right">
                <Card.Body>
                  <Link
                    className="btn btn-primary m-3"
                    //data-toggle="modal"
                    //data-target="#selectCrew"
                    to={"/addWorkers/" + id + "/" + timesheet.id}
                  >
                    Add Workers
                  </Link>
                  {/*      <h6>Select crew to add worker to timesheet</h6>*/}
                  {/*crews && crews.map((crew, index) => (
                            <div className="list-group" key={index}>
                                        <Link 
                                        className="list-group-item list-group-item-action"
                                        //data-toggle="modal" 
                                        //data-target="#selectWorkers"
                                        to={"/viewWorkers/"+crew.id}>
                                           {crew.name}
                                        </Link>
                            </div> 
                        ))*/}
                </Card.Body>
              </div>
            </div>
          </div>
        </Card>

        <div className="card text-right">

          <div className="card-body">
            {/*       <button                         
                    className="btn btn-primary m-3" 
                    data-toggle="modal" 
                    data-target="#addWorker">
                        Add Workers
         </button>*/}

            <table className="table table-bordered align-middle">
              <thead className="bg-light">
                <tr>
                  <th className=" align-middle text-center" rowspan="2">Crew</th>
                  <th className=" align-middle text-center" rowspan="2">Employee Name</th>
                  <th className=" align-middle text-center" rowspan="2">Location</th>
                  <th className=" align-middle text-center" rowspan="2">Start</th>
                  <th className=" align-middle text-center" colspan="2">Lunch</th>
                  <th className=" align-middle text-center" colspan="2">Tea</th>
                  <th className=" align-middle text-center" rowspan="2">Leave</th>
                  <th className=" align-middle text-center" rowspan="2"></th>
                </tr>
                <tr>
                  <th className=" align-middle text-center" >Start</th>
                  <th className=" align-middle text-center" >End</th>
                  <th className=" align-middle text-center" >Start</th>
                  <th className=" align-middle text-center" >End</th>
                </tr>
              </thead>
              <tbody>

                {workedHours && workedHours.map((worker, index) => (
                  <tr
                    key={index}>
                    <td>flooring</td>
                    <td className=" align-left text-center">{worker.firstName} {worker.lastName}</td>
                    <td>{worker.location}</td>
                    <td> {worker.start} </td>
                    <td>{worker.lunch_start} </td>
                    <td>{worker.lunch_stop}</td>
                    <td>{worker.tea_start}</td>
                    <td>{worker.tea_stop} </td>
                    <td>{worker.stop}</td>
                    <td>
                      <button
                        className="btn btn-secondary mr-3"
                        onClick={() => this.setActiveWorker(worker)}
                      >
                        Mark
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {timesheet.status == "Pending" ?
              <button
                href="#"
                className="btn btn-primary mr-3"
                data-toggle="modal"
                data-target="#approve">
                Approve
              </button> :

              <button
                href="#"
                className="btn btn-primary mr-3"
                data-toggle="modal"
                data-target="#removeApprove">
                Remove the Approval
              </button>}

            {/*------------------------------------ Approve Starts------------------------------------------------------------------ */}
            <div className="modal fade" id="approve" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <Approve
                timesheetId={timesheet.id} />
            </div>
            {/*-------------------------------------Approve Ends----------------------------------------------------------------------*/}

            {/*------------------------------------ Remove Approve Starts------------------------------------------------------------------ */}
            <div className="modal fade" id="removeApprove" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <RemoveApprove
                timesheetId={timesheet.id} />
            </div>
          </div>
        </div>
        {/* mark Worker Starts */}
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <MarkWorker
            id={currentWorker.id}
            location={currentWorker.location}
            start={currentWorker.start}
            lunch_start={currentWorker.lunch_start}
            lunch_stop={currentWorker.lunch_stop}
            tea_start={currentWorker.tea_start}
            tea_stop={currentWorker.tea_stop}
            stop={currentWorker.stop}
          />
        </Modal>




      </div>

    );
  }
}

export default ViewTimesheet;