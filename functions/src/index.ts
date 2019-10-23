import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();
//const ref = db.ref("/TechAuth20191016/ALLUSERS");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.simpleDbFunction = functions.https.onRequest(async (_,res: any) => {
    //ref.once("value", function(data) {
      //do some stuff once
      //const ALLUSERS = data.val();
      //for (const num of ALLUSERS){
        //if(typeof(ALLUSERS) === "object"){
          const REFDAY = db.ref("/TechAuth20191016/12DATEDAY");
          const REFMONTH = db.ref("/TechAuth20191016/12DATEMONTH");
          const REFYEAR = db.ref("/TechAuth20191016/12DATEYEAR");
          REFDAY.once("value",function(day){
            REFMONTH.once("value",function(month){
              REFYEAR.once("value",function(year){
                let DAYSTR = day.val();
                let MONTHSTR = month.val();
                let YEARSTR = year.val();
                DAYSTR = DAYSTR.replace("[","");
                DAYSTR = DAYSTR.replace("]","");
                MONTHSTR = MONTHSTR.replace("[","");
                MONTHSTR = MONTHSTR.replace("]","");
                YEARSTR = YEARSTR.replace("[","");
                YEARSTR = YEARSTR.replace("]","");
                const DAYARRAY = DAYSTR.split(",");
                const MONTHARRAY = MONTHSTR.split(",");
                const YEARARRAY = YEARSTR.split(",");
                const FULLDATEARRAY = []
                let FULLDATESTR = "["
                for (let num1 = 0; num1 < DAYARRAY.length; num1 ++){
                  //if(typeof(DAYARRAY) === "object" && typeof(MONTHARRAY) === "object" && typeof(YEARARRAY) === "object"){
                    const FULLDATE = (new Date(YEARARRAY[num1] + "-" + MONTHARRAY[num1] + "-" + DAYARRAY[num1] + "T00:00:00")).getTime()
                    FULLDATEARRAY.push(FULLDATE)
                  //}
                }
                for (const ADATE of FULLDATEARRAY){
                  FULLDATESTR = FULLDATESTR + `${ADATE}` + ","
                }
                FULLDATESTR = FULLDATESTR.slice(0, -1);
                FULLDATESTR += "]"
                db.ref("/TechAuth20191016/" + "12" + "FULLDATE").set(FULLDATESTR)
                .then(res.send("no data")).catch(err => console.log(err));
              }).catch(err => console.log(err));;
            }).catch(err => console.log(err));;
          }).catch(err => console.log(err));;
        //};
      //};
    //}).catch(err => console.log(err));;
  });
