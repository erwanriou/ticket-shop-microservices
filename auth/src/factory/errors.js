const validator = require("express-validator")

// BASE CLASS
class CustomError extends Error {
  constructor(message) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

// CHILDREN CLASS
class RequestValdationError extends CustomError {
  statusCode = 500

  constructor(errors) {
    super("Invalid request parameters")
    this.errors = errors
    Object.setPrototypeOf(this, RequestValdationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(error => ({
      message: error.msg,
      field: error.param
    }))
  }
}

// CHILDREN CLASS
class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = "Error connecting to database"

  constructor(errors) {
    super("Invalid database connection")
    this.errors = errors
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}

// CHILDREN CLASS
class NotFoundError extends CustomError {
  statusCode = 404
  reason = "This path doesn't exist"

  constructor(errors) {
    super("Route not found")
    this.errors = errors
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}

exports.CustomError = CustomError
exports.RequestValdationError = RequestValdationError
exports.DatabaseConnectionError = DatabaseConnectionError
exports.NotFoundError = NotFoundError