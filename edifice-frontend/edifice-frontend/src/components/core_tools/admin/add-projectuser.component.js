import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectUserDataService from "./../../../services/projectuser.service";
import ProjectDataService from "./../../../services/project.service";
import PortfolioDataService from "./../../../services/portfolio.service";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Breadcrumbs } from "@material-ui/core";
import EmployeeDataService from "./../../../services/employee.service";
import cogoToast from "cogo-toast";
import Alert from "react-bootstrap/Alert";

export default class AssignUserProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.saveProjectUser = this.saveProjectUser.bind(this);
    this.newProjectUser = this.newProjectUser.bind(this);

    this.state = {
      id: null,
      userId: 2,
      department: "",
      position: "", 
      currentIndex: -1,
      projectId: this.props.match.params.id,
      departments: [],
      employees: [],
      accounts: [],
      project: [],
      submitted: false
    };
    
  }
  componentDidMount() {
    this.retrieveDepartments(this.props.match.params.id);
    this.retrieveProject(this.props.match.params.id);
    this.getEmployees();
    this.getUsers();
  }
  onChangeUserID(e) {
    this.setState({
      userId: e.target.value
    });
  }
  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    });
  }
  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }
  getUsers(){
    ProjectUserDataService.getUserAccounts()
      .then(response => {
        this.setState({
          accounts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveDepartments(id){
    PortfolioDataService.getAllDep(id)
      .then(response => {
        this.setState({
          departments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveProject(id){
    ProjectDataService.get(id)
    .then(response => {
      this.setState({
        project: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  saveProjectUser() {
    var data = {
      userId: this.state.userId,
      department: this.state.department,
      position: this.state.position,
      projectId: this.state.projectId
    };
    if(data.position == "" || data.department == ""){
      cogoToast.error("Fields cannot be empty");
    }else{
    cogoToast.success("User assigned successfully");
    ProjectUserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          userId: response.data.userId,
          department: response.data.department,
          position: response.data.position,
          projectId: response.data.projectId,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }
  newProjectUser() {
    this.setState({
      id: null,
      userId: "",
      department: "",
      position: "",

      submitted: false
    });
  }

  getEmployees(){
    EmployeeDataService.getUsers()
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
      //console.log(this.state.employees)
  }

  render() {
    const {departments, currentIndex, projectId,employees, accounts, project} = this.state;
    return (
      <div className="container">
        {this.state.submitted ? (
          <div>
          <center>
            <h4 className="alert alert-success">You add a ProjectUser successfully </h4>
            <button className="btn btn-success m-2" onClick={this.newProjectUser}  style={{ 'text-decoration': 'none' }}>
              Add Another ProjectUser
            </button>
            {/* <Link to={"/projects/"} className="btn btn-primary m-2"  style={{ 'text-decoration': 'none' }}>
              Back Home
            </Link> */}
            <div>
            <h5>Project Creation success</h5>
            <Link to={"/admin"} className="btn btn-warning m-2"  style={{ 'text-decoration': 'none' }}>
              Head to Dashboard
            </Link>
            <Link to={"/projectmanagementhome/"+this.state.projectId} target="_blank" className="btn btn-primary m-2"  style={{ 'text-decoration': 'none' }}>
              View Created Project
            </Link>
            </div>
          </center>
          </div>
        ) : (
          <div class="container">
          <div className="row">
            <div className="container col-8">
            <h2>Assign User To the Project</h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/home">
                  Home
                </Link>
                <Link color="inherit" to={"/admin"}>
                  Core Dashboard
                </Link>
                <Link color="inherit" to={"/projects"}>
                  Project Home
                </Link>
                <Link color="textPrimary" to={"/assignuser/"+projectId} aria-current="page">
                  Project Add : Assign users / {projectId}
                </Link>
            </Breadcrumbs>
            <h5>Step 4 : Assign Users to the project by giving the position</h5>
            <div className="form-group">
              <label htmlFor="category">User ID</label>
              <select
                className="form-control"
                id="datatype"
                required
                name="category"
                value={this.state.UserID}
                onChange={this.onChangeUserID}
              >
                {accounts &&
                accounts.map((account,index) => {
                  if(account.username != "admin"){
                  return(
                    <option value={account.id} onChange={this.onChangeUserID}>{account.username}</option>
                  )
                }})}

              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Position</label>
              <select 
                className="form-control"
                id="datatype"
                required
                name="category"
                value={this.state.position}
                onChange={this.onChangePosition}
              >
                <option value={""} onChange={this.onChangePosition}></option>
                <option value={"Project Manager"} onChange={this.onChangePosition}>Project Manager</option>
                <option value={"Senior Architect"} onChange={this.onChangePosition}>Senior Enginner</option>
                <option value={"Senior Enginner"} onChange={this.onChangePosition}>Senior Architect</option>
                <option value={"Engineer"} onChange={this.onChangePosition}>Engineer</option>
                <option value={"Architect"} onChange={this.onChangePosition}>Architect</option>
                <option value={"QA Enginner"} onChange={this.onChangePosition}>QA Enginner</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select 
                className="form-control"
                id="datatype"
                required
                name="category"
                value={this.state.department}
                onChange={this.onChangeDepartment}
              >
                <option
                    value={""}
                    onChange={this.onChangeDepartment}
                    key={-1}
                >
                Not selected
                </option>
                {departments &&
                departments.map((department, index) => (
                <option
                    value={department.name}
                    onChange={this.onChangeDepartment}
                    key={index}
                >
                
                {department.title}
                </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="projectID">Assigning Project</label>
              <input
                type="text"
                className="form-control"
                id="projectID"
                required
                // value={this.state.projectID}
                // onChange={this.onChangePosition}
                name="projectID"
                value = {project.title+" "+project.location}
                disabled
              />
            </div>
            <button onClick={this.saveProjectUser} className="btn btn-success">
              Assign User
            </button>
            </div>
            <div className="container col-4">
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><h6><strong>Step 1 :</strong>Project Settings</h6> </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><h6><strong>Step 2 :</strong>Define departments</h6></TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><h6><strong>Step 3 :</strong>Define milestones</h6></TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent><h5><strong>Step 4 </strong>Assign users for the project</h5></TimelineContent>
              </TimelineItem>
            </Timeline>
            <Alert variant="warning">
              <h6>Warning!</h6>
              <b>To successfully assign a user, make sure to select correct username and position</b><br/>
              You can verify before adding users from <a href="/employees">employee section</a>
            </Alert>
            </div>
          </div>
          </div>
        )}
      </div>
    );
  }
}