const { response } = require("express");

class Response {
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Transaction successful",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Transaction successful",
    });
  }

  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Transaction failed!",
    });
  }

  error400(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Transaction failed!",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Unauthorized!",
    });
  }

  error404(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Not defined!",
    });
  }

  error429(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Too many request!",
    });
  }
}

module.exports = Response;
