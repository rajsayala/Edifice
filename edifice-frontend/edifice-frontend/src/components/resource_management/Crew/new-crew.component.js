import React, { Component } from 'react';

class NewCrew extends Component {
    render() {
        return (  
        <div>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Create New Crew</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  
                    <div>

                        <label htmlFor="">Enter crew Name</label>
                        <input className="form-control" type="text" required/>
                        <br/>

                    </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
        </div>
 
        );
    }
  }

export default NewCrew;
