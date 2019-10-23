import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();
const ref = db.ref("/TechAuth20191016/ALLUSERS");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.simpleDbFunction = functions.https.onRequest(async (_,res: any) => {
    ref.once("value", function(data) {
      //do some stuff once
      let ALLUSERSSTR = data.val();
      ALLUSERSSTR = ALLUSERSSTR.replace("[","");
      ALLUSERSSTR = ALLUSERSSTR.replace("]","");
      const ALLUSERSARRAY = ALLUSERSSTR.split(",");
      for (const USERNUM of ALLUSERSARRAY){
        //if(typeof(ALLUSERS) === "object"){
          const REFDAY = db.ref("/TechAuth20191016/" + `${USERNUM}`+ "DATEDAY");
          const REFMONTH = db.ref("/TechAuth20191016/" + `${USERNUM}`+ "DATEMONTH");
          const REFYEAR = db.ref("/TechAuth20191016/" + `${USERNUM}`+ "DATEYEAR");
          const CURRENTDATE = (new Date()).getTime();
          enum DATEDUE {No, Soon, Yes};
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
                const DATEDUEARRAY = []
                let FULLDATESTR = "["
                let DATEDUESTR = "["
                for (let num1 = 0; num1 < DAYARRAY.length; num1 ++){
                  //if(typeof(DAYARRAY) === "object" && typeof(MONTHARRAY) === "object" && typeof(YEARARRAY) === "object"){
                    const FULLDATE = (new Date(YEARARRAY[num1] + "-" + MONTHARRAY[num1] + "-" + DAYARRAY[num1] + "T00:00:00")).getTime()
                    if((FULLDATE-CURRENTDATE)>2592000000){
                      DATEDUEARRAY.push(DATEDUE.No);
                    }
                    else if(2592000000>=(FULLDATE-CURRENTDATE) && (FULLDATE-CURRENTDATE)>0){
                      DATEDUEARRAY.push(DATEDUE.Soon);
                    }
                    else{
                      DATEDUEARRAY.push(DATEDUE.Yes);
                    }
                    FULLDATEARRAY.push(FULLDATE)
                  //}
                }
                for (const ADATE of FULLDATEARRAY){
                  FULLDATESTR = FULLDATESTR + `${ADATE}` + ","
                }
                FULLDATESTR = FULLDATESTR.slice(0, -1);
                FULLDATESTR += "]"
                for (const ADUE of DATEDUEARRAY){
                  DATEDUESTR = DATEDUESTR + `${ADUE}` + ","
                }
                DATEDUESTR = DATEDUESTR.slice(0, -1);
                DATEDUESTR += "]"
                db.ref("/TechAuth20191016/" + `${USERNUM}`+ "FULLDATE").set(FULLDATESTR).catch(err => console.log(err));
                db.ref("/TechAuth20191016/" + `${USERNUM}`+ "DATEDUE").set(DATEDUESTR).then(res.send("no data")).catch(err => console.log(err));
              }).catch(err => console.log(err));;
            }).catch(err => console.log(err));;
          }).catch(err => console.log(err));;
        };
      //};
    }).catch(err => console.log(err));;
  });
