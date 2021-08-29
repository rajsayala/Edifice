const db = require("./../models/index.js");
const Vendor = db.vendor;
const Op = db.Sequelize.Op;

// Create and Save a new vendor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a vendor
  const vendor = {
    id: req.body.id,
    companyName: req.body.companyName,
    type: req.body.type,
    contactNo: req.body.contactNo,
    email: req.body.email,
    contactPersonName: req.body.contactPersonName
  };

  // Save vendor in the database
  Vendor.create(vendor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// Retrieve all vendors from the database.
exports.findAll = (req, res) => {
    const Id = req.query.id;
    //var condition = 
  
    Vendor.findAll({ where: {id:Id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vendors."
        });
      });
};

// Find a single vendor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Project.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving vendor with id=" + id
        });
      });  
};

// Update a Vendor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Vendor.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vendor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Project with id=" + id
        });
      });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Vendor.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vendor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Vendor with id=${id}. Maybe Vendor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Vendor with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Vendor.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Vendors were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all vendors."
          });
        });
};