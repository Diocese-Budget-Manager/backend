const express = require("express");
const {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} = require("phone-number-validator");

// Middleware for phone number validation
const validatePhoneNumber = (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  if (!isPossiblePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  next();
};
module.exports = { validatePhoneNumber };
