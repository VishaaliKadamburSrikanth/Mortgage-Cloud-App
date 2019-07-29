/**
 * MBRController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    // loginmbr019: function(req,res){
    //     var uname = req.query.username;
    //     var pwd = req.query.password;
    //     if(uname == ""){
    //         res.send("No username");
    //     }
	// 	if(uname == "" && pwd == "") {
	// 		res.send("No username or password specified!");
    //     }
    //     else{
    //         MBR.find( { "employeeID": uname , "password": pwd}).exec(function(err,result){
    //             console.log("result",result);
    //         if (err) {
    //             sails.log.debug('Some error occurred ' + err);
    //             return res.json(300, { error: 'Some error occurred' });
    //         }
    //         else
    //         {
    //             if(result != ""){
    //             sails.log.debug('Success', JSON.stringify(result));
    //             return res.json({ success: 'Login Successful' });
    //             }
    //             else
    //             {
    //             return res.json({ error: 'Some error occurred' });
    //             }
    //         } 
    //   });

    // }
    // },
    loginmbr019: function(req,res){
        var mort_id = req.query.id;
        var pwd = req.query.password;
        console.log(pwd)
        if(mort_id == ""){
            res.send("No Id");
        }
		if(mort_id == "" && pwd == "") {
			res.send("No Mortgage Id or password specified!");
        }
        else{
            PersonalInfo.find( { "id": mort_id}).exec(function(err,result){
                if(err){
                    console.log("error",err);
                }
                if(result == ""){
                    res.json({ mortgageStatus: "ID not found"});
                }
                if(result[0].Password != pwd){
                    res.json({ mortgageStatus: "Id and Password Doesnt Match"});
                }
                else
                {
                    if(result != ""){
                        fetched_user = result;
                        var olddate = new Date();
                        var newDateObj = new Date(olddate.getTime() +60000);
                        req.session.cookie.expires = newDateObj;
                        req.session.authenticated = true;
                        console.log(req.session);
                    // sails.log.debug('Success', JSON.stringify(result));
                        return res.json({ success: 'Login Successful',
                                        id: result[0].id });
                    }
                    else
                    {
                        return res.json({ error: 'Some error occurred' });
                    }
                } 
                });

            }
    },
    onloadpersonalInfo: function(req,res){
        var mort_id = req.query.id;
        if(mort_id == ""){
            res.send("No Id");
        }
        else{
            PersonalInfo.find( { "id": mort_id}).exec(function(err,result){
                if(err){
                    console.log("error",err);
                }
                if(result == ""){
                    res.json({ mortgageStatus: "ID not found"});
                }
                else{
                    if(result != ""){
                        return res.json({ name: result[0].name,         
                                        mortgage_value: result[0].mortgage_value,
                                        MISID: result[0].MISID,
                                        Employer_name:result[0].Employer_name,
                                        RE_status:result[0].RE_status,
                                        employeer_status:result[0].employeer_status});
                        }
                }
            });
        }
    },
    personalinfo019: function(req, res){

        var name = req.query.name;
        var mortgage_value = req.query.mortgage_value;
        var MISID = req.query.MISID;
        var Employer_name = req.query.Employer_name;
        var Password = req.query.Password;
        // please provide alert for the below errors da anu
        if(name == ""){
            res.send("No name",500);
        }
        if(mortgage_value == ""){
            res.send("No Mortage value",500);
        }
        if(MISID == ""){
            res.send("No MISID",500);
        }
        if(Employer_name == ""){
            res.send("No Employeer Details",500);
        }
        if(Password == ""){
            res.send("No Password",500);
        }
        PersonalInfo.find({"MISID":MISID}).exec(function(err,result){
            if(result.length>0){
                res.json({result: "MISID aleardy taken"});
            }
            else{
                PersonalInfo.create({name: name, mortgage_value: mortgage_value, MISID:MISID, Employer_name:Employer_name, Password:Password}).exec(function(err){
                    if(err){
                        console.log("error",err);
                    }
                    PersonalInfo.find( {"name": name,"MISID":MISID}).exec(function(err,result){
                        console.log(result);
                        if(result.length <=0){
                            res.json({result: false});
                        }
                        res.json({result: 'Successfully Saved all details',
                                    appid: result[0].id,
                                    webservice: "https://prod-29.canadacentral.logic.azure.com:443/workflows/17dc5a6fb1fc44f294e45298b92d38c4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZTKHLHeZ2Jj-eWAbey1FGbgQuiDGoKbmOiQh6bZgBCY"});
                    });
                });
            }
        });
    },
    getStatus: function(req,res){
        var appid =req.query.id;
        // var Password = req.query.Password;
        PersonalInfo.find({"id":appid}).exec(function(err,result){
            if(err){
                console.log("error",err);
            }
            if(result == ""){
                res.json({ mortgageStatus: "ID not found"});
            }
            // if(result[0].Password != Password){
            //     res.json({ mortgageStatus: "Password Doesnt Match"});
            // }
            else{            
                res.json({ RE_status: result[0].RE_status,
                            employeer_status: result[0].employeer_status,
                            insurance_value:result[0].insurance_value});
        }
        });
    },
    updateREstatus: function(req,res){
        var appno =req.body.appno;
        var RE_status =req.body.status;
        PersonalInfo.find({"id":appno}).exec(function(err,result){
                if(err){
                    console.log("error",err);
                }
                if(result == ""){
                    res.json({ applicationid: "ID not found"});
                }
                else{            
                    PersonalInfo.updateOne({"id" : appno}).set({RE_status : RE_status}).exec(function(err,result){
                        console.log(result);
                        if(err){
                            console.log("error",err);
                        }
                        else if(result != ""){  
                            res.ok();
                        }
                        else{
                            res.json({ statusupdate : "ID not found"});
                        }
                    });
            }
        });
    },
    updateEmployeerstatus: function(req,res){
        var appno =req.body.appno;
        var emp_status =req.body.status;
        PersonalInfo.find({"id":appno}).exec(function(err,result){
                if(err){
                    console.log("error",err);
                }
                if(result == ""){
                    res.json({ applicationid: "ID not found"});
                }
                else{            
                    PersonalInfo.updateOne({"id" : appno}).set({employeer_status : emp_status}).exec(function(err,result){
                        console.log(result);
                        if(err){
                            console.log("error",err);
                        }
                        else if(result != ""){  
                            res.ok();
                        }
                        else{
                            res.json({ statusupdate : "ID not found"});
                        }
                    });
            }
        });
    },
    updateinsurancestatus:function(req,res){
        var appno =req.body.appno;
        var ins_valu =req.body.value;
        PersonalInfo.find({"id":appno}).exec(function(err,result){
                if(err){
                    console.log("error",err);
                }
                if(result == ""){
                    res.json({ applicationid: "ID not found"});
                }
                else{            
                    PersonalInfo.updateOne({"id" : appno}).set({insurance_value : ins_valu}).exec(function(err,result){
                        console.log(result);
                        if(err){
                            console.log("error",err);
                        }
                        else if(result != ""){  
                            res.ok();
                        }
                        else{
                            res.json({ statusupdate : "ID not found"});
                        }
                    });
            }
        });
    },
};

