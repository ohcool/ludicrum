/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * These settings provide transparent access to the options for Sails'
 * encapsulated WebSocket server, as well as some additional Sails-specific
 * configuration layered on top.
 *
 * For more information on sockets configuration, including advanced config options, see:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.sockets.html
 */

module.exports.sockets = {


  /***************************************************************************
  *                                                                          *
  * Node.js (and consequently Sails.js) apps scale horizontally. It's a      *
  * powerful, efficient approach, but it involves a tiny bit of planning. At *
  * scale, you'll want to be able to copy your app onto multiple Sails.js    *
  * servers and throw them behind a load balancer.                           *
  *                                                                          *
  * One of the big challenges of scaling an application is that these sorts  *
  * of clustered deployments cannot share memory, since they are on          *
  * physically different machines. On top of that, there is no guarantee     *
  * that a user will "stick" with the same server between requests (whether  *
  * HTTP or sockets), since the load balancer will route each request to the *
  * Sails server with the most available resources. However that means that  *
  * all room/pubsub/socket processing and shared memory has to be offloaded  *
  * to a shared, remote messaging queue (usually Redis)                      *
  *                                                                          *
  * Luckily, Socket.io (and consequently Sails.js) apps support Redis for    *
  * sockets by default. To enable a remote redis pubsub server, uncomment    *
  * the config below.                                                        *
  *                                                                          *
  * Worth mentioning is that, if `adapter` config is `redis`, but host/port  *
  * is left unset, Sails will try to connect to redis running on localhost   *
  * via port 6379                                                            *
  *                                                                          *
  ***************************************************************************/
  // adapter: 'memory',

  //
  // -OR-
  //

  // adapter: 'redis',
  // host: '127.0.0.1',
  // port: 6379,
  // db: 'sails',
  // pass: '<redis auth password>'



 /***************************************************************************
  *                                                                          *
  * Whether to expose a 'get /__getcookie' route with CORS support that sets *
  * a cookie (this is used by the sails.io.js socket client to get access to *
  * a 3rd party cookie and to enable sessions).                              *
  *                                                                          *
  * Warning: Currently in this scenario, CORS settings apply to interpreted  *
  * requests sent via a socket.io connection that used this cookie to        *
  * connect, even for non-browser clients! (e.g. iOS apps, toasters, node.js *
  * unit tests)                                                              *
  *                                                                          *
  ***************************************************************************/

  // grant3rdPartyCookie: true,



  /***************************************************************************
  *                                                                          *
  * `beforeConnect`                                                          *
  *                                                                          *
  * This custom beforeConnect function will be run each time BEFORE a new    *
  * socket is allowed to connect, when the initial socket.io handshake is    *
  * performed with the server.                                               *
  *                                                                          *
  * By default, when a socket tries to connect, Sails allows it, every time. *
  * (much in the same way any HTTP request is allowed to reach your routes.  *
  * If no valid cookie was sent, a temporary session will be created for the *
  * connecting socket.                                                       *
  *                                                                          *
  * If the cookie sent as part of the connetion request doesn't match any    *
  * known user session, a new user session is created for it.                *
  *                                                                          *
  * In most cases, the user would already have a cookie since they loaded    *
  * the socket.io client and the initial HTML pageyou're building.           *
  *                                                                          *
  * However, in the case of cross-domain requests, it is possible to receive *
  * a connection upgrade request WITHOUT A COOKIE (for certain transports)   *
  * In this case, there is no way to keep track of the requesting user       *
  * between requests, since there is no identifying information to link      *
  * him/her with a session. The sails.io.js client solves this by connecting *
  * to a CORS/jsonp endpoint first to get a 3rd party cookie(fortunately this*
  * works, even in Safari), then opening the connection.                     *
  *                                                                          *
  * You can also pass along a ?cookie query parameter to the upgrade url,    *
  * which Sails will use in the absense of a proper cookie e.g. (when        *
  * connecting from the client):                                             *
  * io.sails.connect('http://localhost:1337?cookie=smokeybear')              *
  *                                                                          *
  * Finally note that the user's cookie is NOT (and will never be) accessible*
  * from client-side javascript. Using HTTP-only cookies is crucial for your *
  * app's security.                                                          *
  *                                                                          *
  ***************************************************************************/
  // beforeConnect: function(handshake, cb) {
  //   // `true` allows the connection
  //   return cb(null, true);
  //
  //   // (`false` would reject the connection)
  // },


  /***************************************************************************
  *                                                                          *
  * This custom afterDisconnect function will be run each time a socket         *
  * disconnects                                                              *
  *                                                                          *
  ***************************************************************************/
  // afterDisconnect: function(session, socket, cb) {
  //   // By default: do nothing.
  //   return cb();
  // },

  authorization: true,

  // Match string representing the origins that are allowed to connect to the Socket.IO server
  origins: '*:*',

  // Should we use heartbeats to check the health of Socket.IO connections?
  heartbeats: true,

  // When client closes connection, the # of seconds to wait before attempting a reconnect.
  // This value is sent to the client after a successful handshake.
  'close timeout': 60,

  // The # of seconds between heartbeats sent from the client to the server
  // This value is sent to the client after a successful handshake.
  'heartbeat timeout': 60,

  // The max # of seconds to wait for an expcted heartbeat before declaring the pipe broken
  // This number should be less than the `heartbeat timeout`
  'heartbeat interval': 25,

  // The maximum duration of one HTTP poll-
  // if it exceeds this limit it will be closed.
  'polling duration': 20,

  // Enable the flash policy server if the flashsocket transport is enabled
  // 'flash policy server': true,

  // By default the Socket.IO client will check port 10843 on your server
  // to see if flashsocket connections are allowed.
  // The Adobe Flash Player normally uses 843 as default port,
  // but Socket.io defaults to a non root port (10843) by default
  //
  // If you are using a hosting provider that doesn't allow you to start servers
  // other than on port 80 or the provided port, and you still want to support flashsockets
  // you can set the `flash policy port` to -1
  'flash policy port': 10843,

  // Used by the HTTP transports. The Socket.IO server buffers HTTP request bodies up to this limit.
  // This limit is not applied to websocket or flashsockets.
  'destroy buffer size': '10E7',

  // Do we need to destroy non-socket.io upgrade requests?
  'destroy upgrade': true,

  // Should Sails/Socket.io serve the `socket.io.js` client?
  // (as well as WebSocketMain.swf for Flash sockets, etc.)
  'browser client': true,

  // Cache the Socket.IO file generation in the memory of the process
  // to speed up the serving of the static files.
  'browser client cache': true,

  // Does Socket.IO need to send a minified build of the static client script?
  'browser client minification': false,

  // Does Socket.IO need to send an ETag header for the static requests?
  'browser client etag': false,

  // Adds a Cache-Control: private, x-gzip-ok="", max-age=31536000 header to static requests,
  // but only if the file is requested with a version number like /socket.io/socket.io.v0.9.9.js.
  'browser client expires': 315360000,

  // Does Socket.IO need to GZIP the static files?
  // This process is only done once and the computed output is stored in memory.
  // So we don't have to spawn a gzip process for each request.
  'browser client gzip': false,

  // Optional override function to serve all static files,
  // including socket.io.js et al.
  // Of the form :: function (req, res) { /* serve files */ }
  'browser client handler': false,

  // Meant to be used when running socket.io behind a proxy.
  // Should be set to true when you want the location handshake to match the protocol of the origin.
  // This fixes issues with terminating the SSL in front of Node
  // and forcing location to think it's wss instead of ws.
  'match origin protocol': false,

  // Direct access to the socket.io MQ store config
  // The 'adapter' property is the preferred method
  // (`undefined` indicates that Sails should defer to the 'adapter' config)
  store: undefined,

  // A logger instance that is used to output log information.
  // (`undefined` indicates deferment to the main Sails log config)
  logger: undefined,

  // The amount of detail that the server should output to the logger.
  // (`undefined` indicates deferment to the main Sails log config)
  'log level': undefined,

  // Whether to color the log type when output to the logger.
  // (`undefined` indicates deferment to the main Sails log config)
  'log colors': undefined,

  // A Static instance that is used to serve the socket.io client and its dependencies.
  // (`undefined` indicates use default)
  'static': undefined,

  // The entry point where Socket.IO starts looking for incoming connections.
  // This should be the same between the client and the server.
  resource: '/socket.io'



  // More configuration options for Sails+Socket.io:
  // http://sailsjs.org/#/documentation/reference/sails.config/sails.config.sockets.html

};
