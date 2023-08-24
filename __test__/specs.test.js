const request = require("supertest");
var app = require("../app");

var agent = request.agent(app);//to persist session
var superagent = require('superagent');


//test data is saved in database
//test that user object is returned

describe("given a username and password", () => {
    var cookie;
    test("Successfull login with status 200 for /login", async () => {
        var result = await agent.post("/login").send({
            username: "sssss",
            password: "sssss"
        }).expect(200)



    })



    test("/login should respond with a json object containg the user id",
        (done) => {

            var response = agent.post("/login")
                .set('Content-type', 'application/json')
                .send({
                    username: "sssss",
                    password: "sssss"
                }).end(function (err, res) {
                    cookie = res.headers['set-cookie']; //Setting the cookie


                    if (err) return done(err);
                    expect(res.body.id).toBe(1);
                    done();
                });;

            // agent.saveCookies(response) 





        })

    test("when authenticated,and accessing /profile, a status code 200 should be received", async () => {
        var res = await agent.get('/profile').set('Cookie', cookie[0]);
        expect(res.statusCode).toBe(200);
    })
    test("when authenticated, and accessing /profile, profile data should display when authenticated",
        (done) => {

            var res = agent.get("/profile").set('Cookie', cookie[0]).end(function (err, res) {


                if (err) return done(err);

                expect(res.body.id).toBe(1);
                done();
            });
        })

    test("When authenticated, and accessing profile ensure that json type is specified in content-type",async()=>{

    var res= await agent.get("/profile").set('Cookie', cookie[0]);
    expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    test("when authenticated,and accessing /Service1, a status code 200 should be received", async () => {
        var res = await agent.get("/service1").set('Cookie', cookie[0]);
        expect(res.statusCode).toBe(200);
    })
    test("when authenticated, and accessing /Service,Service 1 shoulf display when authenticated",
        async () => {

            var res = await agent.get("/service1").set('Cookie', cookie[0]).expect(200);
            expect(res.text).toBe("service1");








        })

})