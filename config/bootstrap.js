/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  "strict mode"

  var checkIfUserHasProfile = (userId, callback)=> {
    "use strict";
    let query = `select count(@rid) from user where @rid='${userId}' and outE('ownsProfile').size() > 0 limit 1`;
    //console.log(query);
    User.query(query)
      .then((res, err)=> {
        //console.log(JSON.stringify(res));
        if (err) {
          console.error(err);
        }
        callback(res && res.length && res[0].count > 0, err);
      });
  };

  var createProfile = (user, callback) => {
    Profile.create({type: 'system', name: 'Admin', sections: [{type: 'Personal'}, {type: 'Address'}]})
      .then((profile, err)=> {
        "use strict";
        User.createEdge(user.id, profile.id, {'@class': 'ownsProfile'})
          .then((edge, err)=> {
            if (!err)
              console.log(`System profile has been created user: ${user.email}`);
            callback(profile, err);
          });
      });
  };

  var checkAndCreateProfile = (user, callback)=> {
    "use strict";
    checkIfUserHasProfile(user.id, (exists, err)=> {
      "use strict";
      if (exists) {
        console.log(`A profile is already exists for user: ${user.email}`);
      } else {
        createProfile(user, (profile, err)=> {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`A default profile has been created for user: ${user.email}`);
          callback && callback(profile, err);
        });
      }
    });
  }


  // Create a user
  User.findOne({email: 'me@gmail.com'}, function (err, user) {
    if (!user) {
      User.create({
        email: 'me@gmail.com',
        password: 'password'
      }).exec(function (err, user) {
        if (err) {
          console.log("Default user creation failed with following error message:");
          console.log(err.message);
        }
        console.log("Default user created");
        console.log("- username: " + user.email);
        console.log("- password: password");

        checkAndCreateProfile(user);

      });
    } else {

      checkAndCreateProfile(user);

      console.log('Default user already exists');
      console.log("- username: " + user.email);
      console.log("- password: password");
    }
  });

  // Create a trusted application
  Client.findOne({'name': 'trustedTestClient'}, function (err, client) {
    if (err) {
      console.log(err.message);
    } else {
      if (!client) {
        Client.create({
          name: 'trustedTestClient',
          redirectURI: 'http://localhost:1338',
          trusted: true
        }).exec(function (err, client) {
          if (err) {
            console.log(err.message);
          } else {
            console.log("trustedTestClient created");
            console.log("- client_id: " + client.clientId);
            console.log("- client_secret: " + client.clientSecret);
            console.log("- redirectURI: " + client.redirectURI);
          }
        });
      } else {
        console.log('trustedTestClient already exists');
        console.log("- client_id: " + client.clientId);
        console.log("- client_secret: " + client.clientSecret);
        console.log("- redirectURI: " + client.redirectURI);
      }
    }
  });

  // Create an untrusted application
  Client.findOne({'name': 'untrustedTestClient'}, function (err, client) {
    if (err) {
      console.log(err.message);
    } else {
      if (!client) {
        Client.create({
          name: 'untrustedTestClient',
          redirectURI: 'http://localhost:1339'
        }).exec(function (err, client) {
          if (err) {
            console.log(err.message);
          } else {
            console.log("untrustedTestClient created");
            console.log("- client_id: " + client.clientId);
            console.log("- client_secret: " + client.clientSecret);
            console.log("- redirectURI: " + client.redirectURI);
          }
        });
      } else {
        console.log('untrustedTestClient already exists');
        console.log("- client_id: " + client.clientId);
        console.log("- client_secret: " + client.clientSecret);
        console.log("- redirectURI: " + client.redirectURI);
      }
    }
  });

  cb();
};
