const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors.noprofile);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create users profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFileds = {};
    profileFileds.user = req.user.id;
    if (req.body.handle) profileFileds.handle = req.body.handle;
    if (req.body.company) profileFileds.company = req.body.company;
    if (req.body.website) profileFileds.website = req.body.website;
    if (req.body.location) profileFileds.location = req.body.location;
    if (req.body.bio) profileFileds.bio = req.body.bio;
    if (req.body.status) profileFileds.status = req.body.status;
    if (req.body.githubusername)
      profileFileds.githubusername = req.body.githubusername;

    // Skills - Split into array
    if (req.body.skills !== "undefined") {
      profileFileds.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFileds.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFileds.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFileds.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFileds.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFileds.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFileds },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFileds.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(erorrs);
          }

          // Save Profile
          new Profile(profileFileds).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
