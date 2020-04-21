const rewire=require('rewire');
const GitCtrl= rewire('../../controllers/gitController');
const gitControler=GitCtrl();
const chai=require('chai');
const sinon=require('sinon');

chai.should();

let getUser;
describe.skip('should get user and repos from git service',function(){
    
        beforeEach(function(){
            let gitService = GitCtrl.__get__('gitService');
            getUser = sinon.spy(gitService,'getUser');
            GitCtrl.__set__('gitService', gitService);
        });

        it('should be get called user',function(done){
            this.timeout(2000);
            let req = {params:{userId:'junaidzubairshaikh'}};
            let res = {
                json:test
            };

            function test(user){
                    // console.log('GitCTRL--->', getUser.getCall(0).args[0]);
                    getUser.calledOnce.should.be.true
                    user.login.should.equal('junaidzubairshaikh');
                    done();
            };

            gitControler.userGet(req,res);

        })

    })