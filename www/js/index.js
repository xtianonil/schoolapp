/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "196690309665"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            //var parentElement = document.getElementById('registration');
            //var listeningElement = parentElement.querySelector('.waiting');
            //var receivedElement = parentElement.querySelector('.received');

            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');

            //register device: save deviceID to DB
            var reg_id = data.registrationId;
            var dataString = "reg_id=" + reg_id + "&register=";
            $.ajax({
                type: "POST",
                url: "http://192.168.0.16/school_connect_server/get_regid.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    //do something while waiting to connect
                },
                success: function(data) {
                    if (data == "success") {
                        //alert("registered");
                    } else if (data == "error") {
                        //alert("error");
                    }
                }
            });
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );

            //do something when device receives the notification?
            //ts_delivered
            var reg_id = data.registrationId;
            /*
            var dataString = "reg_id=" + reg_id + "&push_notif_received=";
            $.ajax({
                type: "POST",
                url: "http://192.168.1.14/school_connect_server/push_notif_received.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    //do something while waiting to connect
                },
                success: function(data) {
                    if (data == "success") {
                        alert("registered");
                    } else if (data == "error") {
                        alert("error");
                    }
                }
            });//end of $,ajax
            */
       });//end of push.on('notif')
    }//end of setupPush: function()
};
