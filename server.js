const express = require('express');
const bodyParser = require('body-parser');

const AWS = require('aws-sdk')
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

AWS.config.update({
    region: "ap-northeast-2",
    //endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
// 테이블 생성 시

var docClient = new AWS.DynamoDB.DocumentClient();
// 지정 테이블의 행 개수 받아오기
    // dynamodb.describeTable({ TableName: "Editor_Post" }, function (err, result) {
    //     if (!err) {

    //         console.log('result is ' + result.Table.ItemCount);
    //         console.log('success');
    //     }
    //     else {

    //         console.log("err is " + err);
    //     }
    // });

// 사용자 권한을 얻어오는 get
app.get('/api/qualification', (req, res) => {
    let user_id = req.query.user_id;

    var user_signUp_verify_params = {
        TableName: 'Qualification', // give it your table name 
        Key: {
            "user_id": user_id
        }
    };
    docClient.get(user_signUp_verify_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("[" + JSON.stringify(data, null, 2) + "]");
        }
    });
});

// 회원 가입
app.post('/api/commonSignUp', (req, res) => {
    console.log(req.body);
    
    let user_id = req.body.user_id;
    let user_name = req.body.user_name;
    let user_age = req.body.user_age;
    let user_phone_number = req.body.user_phone_number;
    let user_gender = req.body.user_gender;
    let preffered_category1 = req.body.preffered_category1;
    let preffered_category2 = req.body.preffered_category2;
    let preffered_category = [preffered_category1, preffered_category2];
    console.log(preffered_category);
    
    //let following_list = req.body.following_list;
    let user_profile_url = req.body.user_profile_url;
    
    let qualification = req.body.user_qualification

    // 사용자 게시물 등록
    var user_common_params = {
        TableName: "User_Common_Profile",
        Item: {
            "user_id": user_id,
            "user_name": user_name,
            "user_age": user_age,
            "user_phone_number": user_phone_number,
            "user_gender": user_gender,
            "preffered_category": preffered_category,
            "user_profile_url": user_profile_url
        }
    };
    docClient.put(user_common_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var qualification_params = {
                TableName: "Qualification",
                Item: {
                    "user_id": user_id,
                    "qualification": qualification
                }
            };

            docClient.put(qualification_params, function (err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    if (qualification === "editor" || qualification === "youtuber") {
                        var post_count_params = {
                            TableName: "Post_Count",
                            Item: {
                                "user_id": user_id,
                                "post_count": 0,
                            }
                        };
                        docClient.put(post_count_params, function (err, data) {
                            if (err) {
                                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                            } else {
                                res.send("success");
                            }
                        });
                    }
                    
                }
            });
        }
    });

});


// 공통 정보 수정
app.post('/api/commonDataModify', (req, res) => {
    let user_id = req.body.user_id;
    let user_name = req.body.user_name;
    let user_age = req.body.user_age;
    let user_phone_number = req.body.user_phone_number;
    let preffered_category1 = req.body.preffered_category1;
    let preffered_category2 = req.body.preffered_category2;
    let preffered_category = [preffered_category1, preffered_category2];
    let user_profile_url = req.body.user_profile_url;
    console.log(preffered_category);

    // 사용자 게시물 등록
    var user_common_params = {
        TableName: "User_Common_Profile",
        Key:{
            "user_id": user_id
        },
        UpdateExpression: "set user_name = :n, user_age=:a, user_phone_number=:p, preffered_category=:c, user_profile_url=:u", 
        ExpressionAttributeValues:{
            ":n": user_name,
            ":a": user_age,
            ":p": user_phone_number,
            ":c": preffered_category,
            ":u": user_profile_url
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(user_common_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("success");
        }
    });

});

// 유튜버가 개인 정보 수정을 통해 Youtuber_Profile 테이블에 등록하는 함수
app.post('/api/youtuberDataModify', (req, res) => {
    
    let user_id = req.body.user_id;
    let business_address = req.body.business_address;
    let youtube_name = req.body.youtube_name;
    let youtube_url = req.body.youtube_url;
    let self_introduction = req.body.self_introduction;

    if(business_address == "") {
        var user_common_params = {
            TableName: "Youtuber_Profile",
            Key:{
                "user_id": user_id
            },
            UpdateExpression: "set business_address = :b, youtube_name=:n, youtube_url=:u, self_introduction=:i", 
            ExpressionAttributeValues:{
                ":b": null,
                ":n": youtube_name,
                ":u": youtube_url,
                ":i": self_introduction
            },
            ReturnValues:"UPDATED_NEW"
        };
    } else {
        var user_common_params = {
            TableName: "Youtuber_Profile",
            Key:{
                "user_id": user_id
            },
            UpdateExpression: "set business_address = :b, youtube_name=:n, youtube_url=:u, self_introduction=:i", 
            ExpressionAttributeValues:{
                ":b": business_address,
                ":n": youtube_name,
                ":u": youtube_url,
                ":i": self_introduction
            },
            ReturnValues:"UPDATED_NEW"
        };
    }
    docClient.update(user_common_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("success");
        }
    });

});    

// 편집자가 개인 정보 수정을 통해 Editor_Profile 테이블에 등록하는 함수
app.post('/api/editorDataModify', (req, res) => {
    
    let user_id = req.body.user_id;
    let hope_pay_per_case = req.body.hope_pay_per_case;
    let career = req.body.career;
    let edit_tools = req.body.edit_tools;
    let self_introduction = req.body.self_introduction;
    console.log("career : " + career);
    

    if(career == "") {
        var user_common_params = {
            TableName: "Editor_Profile",
            Key:{
                "user_id": user_id
            },
            UpdateExpression: "set hope_pay_per_case = :b, career=:n, edit_tools=:u, self_introduction=:i", 
            ExpressionAttributeValues:{
                ":b": hope_pay_per_case,
                ":n": [],
                ":u": edit_tools,
                ":i": self_introduction
            },
            ReturnValues:"UPDATED_NEW"
        };
    } else {
        var user_common_params = {
            TableName: "Editor_Profile",
            Key:{
                "user_id": user_id
            },
            UpdateExpression: "set hope_pay_per_case = :b, career=:n, edit_tools=:u, self_introduction=:i", 
            ExpressionAttributeValues:{
                ":b": hope_pay_per_case,
                ":n": career,
                ":u": edit_tools,
                ":i": self_introduction
            },
            ReturnValues:"UPDATED_NEW"
        };
    }
    docClient.update(user_common_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("success");
        }
    });

});    

// 유튜버 정보를 얻어옴
app.get('/api/getYoutuberProfile', (req, res) => {
    
    var youtuber_profile_params = {
        TableName: 'Youtuber_Profile', // give it your table name 
        Key:{
            "user_id" : req.query.user_id
        }
    };
    

    docClient.get(youtuber_profile_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(data.Item);
        }
    });
});

// 편집자 정보를 얻어옴
app.get('/api/getEditorProfile', (req, res) => {
    
    var editor_profile_params = {
        TableName: 'Editor_Profile', // give it your table name 
        Key:{
            "user_id" : req.query.user_id
        }
    };
    

    docClient.get(editor_profile_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(data.Item);
            
            res.send(data.Item);
        }
    });
});

// 편집자가 개인 정보 수정을 통해 Editor_Profile 테이블에 등록하는 함수
app.post('/api/editorDataModify', (req, res) => {
    console.log("sd :" + req.body.business_address);
    
    let user_id = req.body.user_id;
    let business_address = req.body.business_address;
    let youtube_name = req.body.youtube_name;
    let youtube_url = req.body.youtube_url;
    let self_introduction = req.body.self_introduction;

    if(business_address == "") {
        var user_common_params = {
            TableName: "Youtuber_Profile",
            Key:{
                "user_id": user_id
            },
            UpdateExpression: "set business_address = :b, youtube_name=:n, youtube_url=:u, self_introduction=:i", 
            ExpressionAttributeValues:{
                ":b": null,
                ":n": youtube_name,
                ":u": youtube_url,
                ":i": self_introduction
            },
            ReturnValues:"UPDATED_NEW"
        };
    } else {
        var user_common_params = {
            TableName: "Youtuber_Profile",
            Key:{
                "user_id": user_id
            },
            UpdateExpression: "set business_address = :b, youtube_name=:n, youtube_url=:u, self_introduction=:i", 
            ExpressionAttributeValues:{
                ":b": business_address,
                ":n": youtube_name,
                ":u": youtube_url,
                ":i": self_introduction
            },
            ReturnValues:"UPDATED_NEW"
        };
    }
    docClient.update(user_common_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("success");
        }
    });

});    

// 팔로우
app.put('/api/addFollow', (req, res) => {
    
    let user_id = req.body.data.user_id;
    let the_user_id = req.body.data.the_user_id;
    let following_list = [];
    
    
    // 현재 팔로우 데이터 얻어오기.
    var get_follow_params = {
        TableName: "User_Common_Profile",
        ProjectionExpression: "#u_id, following_list",
        KeyConditionExpression: "#u_id = :u_id",
        ExpressionAttributeNames: {
            "#u_id": "user_id"
        },
        ExpressionAttributeValues: {
            ":u_id": user_id
        }
    }

    docClient.query(get_follow_params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            if(data.Items[0].following_list == undefined) {
                following_list.push(the_user_id);
            }
            else {
                data.Items[0].following_list.forEach(function(item) {
                    following_list.push(item);
                });
                following_list.push(the_user_id);
            }

            // 팔로우 데이터 추가해서 update

            var add_follow_params = {
                TableName: 'User_Common_Profile',
                Key: {
                    "user_id": user_id
                },
                UpdateExpression: "set following_list = :fl",
                ExpressionAttributeValues:{
                    ":fl": 	following_list
                },
                ReturnValues: "UPDATED_NEW"
            };
        
            docClient.update(add_follow_params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    res.send("success");
                }
            });
        }
    });
});

// 팔로우 삭제
app.delete('/api/deleteFollow', (req, res) => {
    console.log(req.body);
    
    let user_id = req.body.user_id;
    let the_user_id = req.body.the_user_id;
    console.log(user_id);
    
    let following_list = [];
    
    // 현재 팔로우 데이터 얻어오기.
    var get_follow_params = {
        TableName: "User_Common_Profile",
        ProjectionExpression: "#u_id, following_list",
        KeyConditionExpression: "#u_id = :u_id",
        ExpressionAttributeNames: {
            "#u_id": "user_id"
        },
        ExpressionAttributeValues: {
            ":u_id": user_id
        }
    }

    docClient.query(get_follow_params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            // 반복문을 돌며 일치하는 아이디를 제외하고 새로운 배열에 저장
            data.Items[0].following_list.forEach(function(item, index, object) {
                if(item !== the_user_id) {
                    following_list.push(item);
                }
                else {
                }
            });

            //새로운 배열을 put시킴
            var add_follow_params = {
                TableName: 'User_Common_Profile',
                Key: {
                    "user_id": user_id
                },
                UpdateExpression: "set following_list = :fl",
                ExpressionAttributeValues:{
                    ":fl": 	following_list
                },
                ReturnValues: "UPDATED_NEW"
            };
        
            docClient.update(add_follow_params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    res.send("success");
                }
            });
            
        }
    });
});

// 팔로우 목록 얻어오기
app.get('/api/selectFollowComponent', (req, res) => {
    
    let user_id = req.query.user_id;
    let the_user_id = req.query.the_user_id;
    let response = "not_exist";
    // 현재 팔로우 데이터 얻어오기.
    var get_follow_params = {
        TableName: "User_Common_Profile",
        ProjectionExpression: "#u_id, following_list",
        KeyConditionExpression: "#u_id = :u_id",
        ExpressionAttributeNames: {
            "#u_id": "user_id"
        },
        ExpressionAttributeValues: {
            ":u_id": user_id
        }
    }

    docClient.query(get_follow_params, function(err, data) {
        if (err) {
            console.error("Unable to query2. Error:", JSON.stringify(err, null, 2));
        } else {
            if(data.Items[0].following_list == undefined) {
                response = "not_exist";
            }
            else {
                data.Items[0].following_list.forEach(function (item) {
                    if (item === the_user_id) {
                        response = "exist";
                        return true;
                    }
                });
            }
            
            res.send(response);
            
        }
    });
});

// 팔로우 리스트를 얻어오는 쿼리문
app.get('/api/getFollowingList', (req, res) => {
    var user_id = req.query.user_id;

    var follow_editor_post_list_params = {
        TableName: "User_Common_Profile",
        ProjectionExpression: "following_list",
        KeyConditionExpression: "#ui = :ui",
        ExpressionAttributeNames: {
            "#ui": "user_id"
        },
        ExpressionAttributeValues: {
            ":ui": user_id,
        }
    };
    
    docClient.query (follow_editor_post_list_params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.send("[" + JSON.stringify(data, null, 2) + "]");
        }
            
    });
    
});

// 영상 게시물 조회 시 데이터를 받아오는 get
app.get('/api/editorPost', (req, res) => {
    
    var editor_post_params = {
        TableName: 'Editor_Post', // give it your table name 
        Key:{
            "post_id" : req.query.editor_post_id
        }
    };
    

    docClient.get(editor_post_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var get_name_params = {
                TableName: "User_Common_Profile",
                ProjectionExpression: "user_name",
                KeyConditionExpression: "#ui = :ui",
                ExpressionAttributeNames: {
                    "#ui": "user_id"
                },
                ExpressionAttributeValues: {
                    ":ui": data.Item.editor_id,
                }
            };
            
            docClient.query(get_name_params, function(err, data2) {
                if (err) {
                    console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    data.Item.user_name = data2.Items[0].user_name;
                    res.send("[" + JSON.stringify(data, null, 2) + "]");
                }
            });
            
            
        }
    });
});

// 나의 영상 게시물 목록 조회시 데이터를 받아오는 get
app.get('/api/myEditorPostList', (req, res) => {
    let = user_id = req.query.user_id;
    let = user_name = '';
    var get_name_params = {
        TableName: "User_Common_Profile",
        ProjectionExpression: "user_name",
        KeyConditionExpression: "#ui = :ui",
        ExpressionAttributeNames: {
            "#ui": "user_id"
        },
        ExpressionAttributeValues: {
            ":ui": user_id,
        }
    };
    
    docClient.query(get_name_params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            data.Items[0].user_name;
            
            //res.send("[" + JSON.stringify(data, null, 2) + "]");

            var params = {
                TableName: "Editor_Post",
                ProjectionExpression: "#pi, title, content, youtube_post_thumbnail_url, upload_date",
                FilterExpression: "#pi between :letter1 and :letter2",
                ExpressionAttributeNames: {
                    "#pi": "post_id"
                },
                ExpressionAttributeValues: {
                    ":letter1": user_id,
                    ":letter2": user_id + "100000"
                }
            };
            docClient.scan(params, onScan);
        
            function onScan(err, data2) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    // 날짜 비교
                    // var data1 = "2020-05-13-10-10-10";
                    // var data2 = "2020-10-13-10-10-10";
        
                    // if(data1 > data2) {
                    //     console.log("data1 win");
                    // } else {
                    //     console.log("data2 win");
        
                    // }
        
                    // continue scanning if we have more movies, because
                    // scan can retrieve a maximum of 1MB of data
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        params.ExclusiveStartKey = data2.LastEvaluatedKey;
                        docClient.scan(params, onScan);
                    }
                    //data2.Items.user_name = data.Items[0].user_name;
                    data2.Items.forEach(function(item, index, object) {
                        item.user_name = data.Items[0].user_name;
                    });
                    
                    res.send(data2.Items);
                }
            }
        }
    });
    
    
});

// 권한이 누구인지 알아내는 쿼리문
app.get('/api/getQualification', (req, res) => {
    var user_id = req.query.user_id;

    var get_qualification_params = {
        TableName: "Qualification",
        ProjectionExpression: "qualification",
        KeyConditionExpression: "#ui = :ui",
        ExpressionAttributeNames: {
            "#ui": "user_id"
        },
        ExpressionAttributeValues: {
            ":ui": user_id
        }
    };
    
    docClient.query(get_qualification_params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.send("[" + JSON.stringify(data, null, 2) + "]");
        }
    });
    
});

// 사용자 이름을 받아오는 쿼리문
app.get('/api/getUserName', (req, res) => {
    var user_id = req.query.user_id;

    var get_qualification_params = {
        TableName: "User_Common_Profile",
        ProjectionExpression: "user_name",
        KeyConditionExpression: "#ui = :ui",
        ExpressionAttributeNames: {
            "#ui": "user_id"
        },
        ExpressionAttributeValues: {
            ":ui": user_id
        }
    };
    
    docClient.query(get_qualification_params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.send("[" + JSON.stringify(data, null, 2) + "]");
        }
    });
    
});

// 해당 아이디의 영상 게시물 목록을 가지고 오는 함수
app.get('/api/getEditorPostList', (req, res) => {
    var user_id = req.query.user_id;
    
    var get_editor_post_list_params = {
        TableName: "Editor_Post",
        ProjectionExpression: "#pi, title, content, youtube_post_thumbnail_url, upload_date",
        FilterExpression: "#pi between :letter1 and :letter2",
        ExpressionAttributeNames: {
            "#pi": "post_id"
        },
        ExpressionAttributeValues: {
            ":letter1": user_id,
            ":letter2": user_id + "100000"
        }
    };

    docClient.scan(get_editor_post_list_params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {

            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
            res.send(data.Items);
        }

    }
});

//  사용자 id와 권한을 모두 가지고 오는 scan
app.get('/api/getAllOfUserId', (req, res) => {
    var params = {
        TableName: "Qualification",
        ProjectionExpression: "#ui, #q",
        ExpressionAttributeNames: {
            "#ui": "user_id",
            "#q": "qualification"
        },
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {

            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
        res.send(data.Items);

        
    }
});


// 영상 게시물 업로드
app.post('/api/editorPostUpload', (req, res) => {
    let date = new Date();
    //let editor_post_id = req.body.editor_post_id;
    //let editor_id = req.body.editor_id;var str = 'https://www.youtube.com/watch?v=YWwoO3_RnFM';
    var str = (String)(req.body.youtube_post_url);
    
    var str2 = str.substr(str.length - 11, 11);
    var str3 = "https://img.youtube.com/vi/";
    var str4 = "/0.jpg";
    var result = str3.concat(str2 + str4);
    let editor_id = req.body.editor_id;
    let title = req.body.title;
    let content = req.body.content;
    let category = req.body.category;
    let average_satisfaction = req.body.average_satisfaction;
    let upload_date = date.getFullYear() + "-" + 
                        Number(date.getMonth() + 1) + "-" + 
                        Number(date.getDate())+ "-" + 
                        date.getHours() + "-" + date.getMinutes() + 
                        "-" + date.getSeconds();
    let youtube_post_url = req.body.youtube_post_url;
    let youtube_post_thumbnail_url = result;
    let view_count = req.body.view_count;
    let is_open = req.body.is_open;
    let count = 0;

    //원자성 카운트 증가 -> 게시물 id 계산에 사용
    var post_count_params = {
        TableName: 'Post_Count',
        Key:{
            "user_id" : editor_id
        },
        UpdateExpression: "set post_count = post_count + :val",
        ExpressionAttributeValues:{
            ":val": 1
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(post_count_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            count = (Number)(data.Attributes.post_count);

            // 사용자 게시물 등록
            var editor_post_params = {
                TableName: "Editor_Post",
                Item: {
                    "post_id": (String)(editor_id) + "-" + (String)(count),
                    "editor_id": editor_id,
                    "title": title,
                    "content": content,
                    "category": category,
                    "average_satisfaction": average_satisfaction,
                    "upload_date": upload_date,
                    "youtube_post_url": youtube_post_url,
                    "youtube_post_thumbnail_url": youtube_post_thumbnail_url,
                    "view_count": view_count,
                    "is_open": is_open,
                }
            };
            docClient.put(editor_post_params, function (err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    // post_id 등록
                    var personal_post_id_params = {
                        TableName: "Personal_Post_Id",
                        Item: {
                            "user_id": editor_id,
                            "user_post_id": (String)(editor_id) + "-" + (String)(count)
                        }
                    };

                    docClient.put(personal_post_id_params, function (err, data) {
                        if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            // res.send("[" + JSON.stringify(data, null, 2) + "]");
                            res.send("success");
                        }
                    });
                }
            });
        }
    });
});

// 영상 게시물 수정
app.post('/api/editorPostModify', (req, res) => {
    let date = new Date();
    //let editor_post_id = req.body.editor_post_id;
    //let editor_id = req.body.editor_id;var str = 'https://www.youtube.com/watch?v=YWwoO3_RnFM';
    var str = (String)(req.body.youtube_post_url);
    
    var str2 = str.substr(str.length - 11, 11);
    var str3 = "https://img.youtube.com/vi/";
    var str4 = "/0.jpg";
    var result = str3.concat(str2 + str4);
    let post_id = req.body.editor_post_id;
    let editor_id = req.body.editor_id;
    let title = req.body.title;
    let content = req.body.content;
    let category = req.body.category;
    let average_satisfaction = req.body.average_satisfaction;
    let upload_date = req.body.upload_date;
    
    let youtube_post_url = req.body.youtube_post_url;
    let youtube_post_thumbnail_url = result;
    let view_count = req.body.view_count;
    let is_open = req.body.is_open;
    let count = 0;

    // 사용자 게시물 등록
    var editor_post_params = {
        TableName: "Editor_Post",
        Item: {
            "post_id": post_id,
            "editor_id": editor_id,
            "title": title,
            "content": content,
            "category": category,
            "average_satisfaction": average_satisfaction,
            "upload_date": upload_date,
            "youtube_post_url": youtube_post_url,
            "youtube_post_thumbnail_url": youtube_post_thumbnail_url,
            "view_count": view_count,
            "is_open": is_open,
        }
    };
    docClient.put(editor_post_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("success");
        }
    });
});

// 영상 만족도 평가
app.post('/api/satisfactionUpload', (req, res) => {
    
    let editor_post_id = req.body.editor_post_id;
    let user_id = req.body.user_id;
    let satisfaction = req.body.satisfaction;
    
    var editor_post_satisfaction_params = {
        TableName: "Editor_Post_Satisfaction", 
        Item:{
            "editor_post_id": editor_post_id,
            "user_id": user_id,
            "satisfaction": satisfaction
        }
    };

    docClient.put(editor_post_satisfaction_params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            
            var for_average_params = {
                TableName : "Editor_Post_Satisfaction",
                KeyConditionExpression: "#e_id = :e_id",
                ExpressionAttributeNames:{
                    "#e_id": "editor_post_id"
                },
                ExpressionAttributeValues: {
                    ":e_id": editor_post_id
                }
            };
        
            docClient.query(for_average_params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    let num = 0;
                    let satisfaction_sum = 0;
                    data.Items.forEach(function(item) {
                        satisfaction_sum = (Number)(satisfaction_sum) + (Number)(item.satisfaction);
                        num = num + 1;
                    });
                    let satisfaction_average = satisfaction_sum / num;
                    satisfaction_average = satisfaction_average.toFixed(1);
                    

                    var editor_post_params = {
                        TableName: 'Editor_Post',
                        Key: {
                            "post_id": editor_post_id
                        },
                        UpdateExpression: "set average_satisfaction = :as",
                        ExpressionAttributeValues:{
                            ":as": 	(Number)(satisfaction_average)
                        },
                        ReturnValues: "UPDATED_NEW"
                    };
                
                    docClient.update(editor_post_params, function (err, data) {
                        if (err) {
                            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            res.send("success");
                        }
                    });
                }
            });
        }
    });
});

// 영상 게시물 조회수 증가
app.put('/api/editorPostUpload/increaseViewCount', (req, res) => {
    let post_id = req.body.editor_post_id;
    let view_count = req.body.view_count;

    var params = {
        TableName: 'Editor_Post',
        Key: {
            "post_id": post_id
        },
        UpdateExpression: "set view_count = :v",
        ExpressionAttributeValues: {
            ":v": view_count
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
        }
    });
});

// 영상 게시물 삭제
app.delete('/api/editorPostDelete', (req, res) => {
    let post_id = req.body.editor_post_id;
    var params = {
        TableName: 'Editor_Post', // give it your table name 
        Key:{
            "post_id" : post_id
        }
    };

    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            res.send("fail");
        } else {
            res.send("success");
        }
    });
});

///////////////////////////////////////////////////// 영상 게시물
// 유튜브 게시물 업로드
app.post('/api/youtuberPostUpload', (req, res) => {
    let date = new Date();
    let user_id = req.body.user_id;
    let title = req.body.title;
    let pay_per_case = req.body.pay_per_case;
    let category = req.body.category;
    let task = req.body.task;
    let edit_tool = req.body.edit_tool;
    let work_form = req.body.work_form;
    let require_experience = req.body.require_experience;
    let work_period = req.body.work_period;
    let content = req.body.content;
    let upload_date = date.getFullYear() + "-" + 
                        Number(date.getMonth() + 1) + "-" + 
                        Number(date.getDate())+ "-" + 
                        date.getHours() + "-" + date.getMinutes() + 
                        "-" + date.getSeconds();
    let view_count = 0;
    let is_open = req.body.is_open;
    let count = 0;
    let current_state = "before_start" // before_start , working, complete 

    //원자성 카운트 증가 -> 게시물 id 계산에 사용
    var post_count_params = {
        TableName: 'Post_Count',
        Key:{
            "user_id" : user_id
        },
        UpdateExpression: "set post_count = post_count + :val",
        ExpressionAttributeValues:{
            ":val": 1
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(post_count_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            count = (Number)(data.Attributes.post_count);

            // 사용자 게시물 등록
            var editor_post_params = {
                TableName: "Youtuber_Post",
                Item: {
                    "post_id": (String)(user_id) + "-" + (String)(count),
                    "youtuber_id": user_id,
                    "title": title,
                    "pay_per_case": pay_per_case,
                    "category": category,
                    "task": task,
                    "edit_tool": edit_tool,
                    "work_form": work_form,
                    "require_experience": require_experience,
                    "work_period": work_period,
                    "content": content,
                    "upload_date": upload_date,
                    "view_count": view_count,
                    "is_open": is_open,
                    "current_state": current_state,
                }
            };
            docClient.put(editor_post_params, function (err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    // post_id 등록
                    var personal_post_id_params = {
                        TableName: "Personal_Post_Id",
                        Item: {
                            "user_id": user_id,
                            "user_post_id": (String)(user_id) + "-" + (String)(count)
                        }
                    };

                    docClient.put(personal_post_id_params, function (err, data) {
                        if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            // res.send("[" + JSON.stringify(data, null, 2) + "]");
                            res.send("success");
                        }
                    });
                }
            });
        }
    });
});

//유튜버 게시물 수정
app.post('/api/youtuberPostModify', (req, res) => {
    
    let post_id = req.body.youtuber_post_id;
    let youtuber_id = req.body.youtuber_id;
    let title = req.body.title;
    let pay_per_case = req.body.pay_per_case;
    let category = req.body.category;
    let task = req.body.task;
    let edit_tool = req.body.edit_tool;
    let work_form = req.body.work_form;
    let require_experience = req.body.require_experience;
    let work_period = req.body.work_period;
    let content = req.body.content;
    let upload_date = req.body.upload_date;
    let view_count = 0;
    let is_open = req.body.is_open;
    let current_state = "before_start" // before_start , working, complete 


    // 사용자 게시물 등록
    var editor_post_params = {
        TableName: "Youtuber_Post",
        Item: {
            "post_id": post_id,
            "youtuber_id": youtuber_id,
            "title": title,
            "pay_per_case": pay_per_case,
            "task": task,
            "edit_tool": edit_tool,
            "work_form": work_form,
            "require_experience": require_experience,
            "work_period": work_period,
            "content": content,
            "category": category,
            "upload_date": upload_date,
            "view_count": view_count,
            "is_open": is_open,
            "current_state": current_state,
        }
    };
    docClient.put(editor_post_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("success");
        }
    });
});


// 영상 게시물 조회수 증가
app.put('/api/youtuberPostUpload/increaseViewCount', (req, res) => {
    let post_id = req.body.post_id;
    let view_count = req.body.view_count;

    var params = {
        TableName: 'Youtuber_Post',
        Key: {
            "post_id": post_id
        },
        UpdateExpression: "set view_count = :v",
        ExpressionAttributeValues: {
            ":v": view_count
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
        }
    });
});

// 유튜버 게시물 조회 시 데이터를 받아오는 get
app.get('/api/youtuberPost', (req, res) => {
    
    var youtuber_post_params = {
        TableName: 'Youtuber_Post', // give it your table name 
        Key:{
            "post_id" : req.query.post_id
        }
    };
    

    docClient.get(youtuber_post_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            
            var get_name_params = {
                TableName: "User_Common_Profile",
                ProjectionExpression: "user_name",
                KeyConditionExpression: "#ui = :ui",
                ExpressionAttributeNames: {
                    "#ui": "user_id"
                },
                ExpressionAttributeValues: {
                    ":ui": data.Item.youtuber_id,
                }
            };
            
            docClient.query(get_name_params, function(err, data2) {
                if (err) {
                    console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    data.Item.youtuber_name = data2.Items[0].user_name;
                    res.send("[" + JSON.stringify(data, null, 2) + "]");
                }
            });
        }
    });
});

// 해당 구인 게시물에 해당 편집자가 신청을 했는지 판단해주는 함수
app.get('/api/selectJobApplication', (req, res) => {
    
    var youtuber_post_id = req.query.youtuber_post_id;
    var editor_id = req.query.editor_id;
    
    var select_job_application_params = {
        TableName: "Job_Application",
        Key:{
            "youtuber_post_id": youtuber_post_id,
            "editor_id": editor_id
        }
    };

    docClient.get(select_job_application_params, function(err, data) {
        if (err) {
            console.error("Unable tod read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            if(data.Item != undefined) {
                res.send("exist");
            }
            else {
                res.send("not_exist");
            }
        }
    });
});

// 해당 아이디의 유튜버 게시물 목록을 가지고 오는 함수
app.get('/api/getYoutuberPostList', (req, res) => {
    var user_id = req.query.user_id;
    
    
    var get_editor_post_list_params = {
        TableName: "Youtuber_Post",
        ProjectionExpression: "#pi, is_open, title, require_experience, upload_date, work_period",
        FilterExpression: "#pi between :letter1 and :letter2",
        ExpressionAttributeNames: {
            "#pi": "post_id"
        },
        ExpressionAttributeValues: {
            ":letter1": user_id,
            ":letter2": user_id + "100000"
        }
    };

    docClient.scan(get_editor_post_list_params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {

            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
            res.send(data.Items);
        }

    }
});

// 유튜버 게시물 삭제
app.delete('/api/youtuberPostDelete', (req, res) => {
    let post_id = req.body.youtuber_post_id;
    var params = {
        TableName: 'Youtuber_Post', // give it your table name 
        Key:{
            "post_id" : post_id
        }
    };

    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            res.send("fail");
        } else {
            res.send("success");
        }
    });
});


// 편집자 -> 유튜버 구직 신청
app.post('/api/jopApplication', (req, res) => {
    
    let youtuber_post_id = req.body.youtuber_post_id;
    let youtuber_id = req.body.youtuber_id;
    let editor_id = req.body.editor_id;
    let application_state = "신청";
    

    var job_application_params = {
        TableName: "Job_Application",
        Item: {
            "youtuber_post_id": youtuber_post_id,
            "editor_id": editor_id,
            "youtuber_id": youtuber_id,
            "application_state": application_state
        }
    };

    docClient.put(job_application_params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // res.send("[" + JSON.stringify(data, null, 2) + "]");
            res.send("success");
        }
    });
});

// 편집자 -> 유튜버 구직 신청 취소
app.delete('/api/jopApplicationCancel', (req, res) => {
    let youtuber_post_id = req.body.youtuber_post_id;
    let editor_id = req.body.editor_id;

    var job_application_cancel_params = {
        TableName: 'Job_Application', // give it your table name 
        Key:{
            "youtuber_post_id" : youtuber_post_id,
            "editor_id" : editor_id
        }
    };

    docClient.delete(job_application_cancel_params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            res.send("fail");
        } else {
            res.send("success");
        }
    });
});

//구직 신청 목록을 받아오는 함수
app.get('/api/getAllApplication', (req, res) => {
    console.log(req.query.youtuber_post_id);

    var youtuber_post_params = {
        TableName: "Job_Application",
        KeyConditionExpression: "#pi = :pi",
        ExpressionAttributeNames: {
            "#pi": "youtuber_post_id"
        },
        ExpressionAttributeValues: {
            ":pi": req.query.youtuber_post_id
        }
    };

    docClient.query(youtuber_post_params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.send(data.Items)
        }
    });

});

// 유저의 공통 정보를 가져오는 함수
app.get('/api/getCommonUserInfo', (req, res) => {

    var common_user_params = {
        TableName: 'User_Common_Profile', // give it your table name 
        Key: {
            "user_id": req.query.user_id
        }
    };

    docClient.get(common_user_params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(data.Item);
        }
    });
});



///////////////////////////////////////////////////// 사용자 관리

app.listen(port, () => console.log(`listening on port ${port}`));