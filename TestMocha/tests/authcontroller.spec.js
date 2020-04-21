const assert =require('assert');
const authController=require('../controllers/auth.controller');

const expect=require('chai').expect;
const chai=require('chai');

const sinon=require('sinon');
chai.use(require('chai-as-promised'));
chai.should();

describe('Auth Controller',()=>{
    it('Check is Authorized should be false',()=>{
        assert.equal(false,authController.isAuthorized(['user'],'admin'));
    });

    it('Check is Authorized should be true',()=>{
        let isAuth=authController.isAuthorized(['user','admin'],'admin')
        // assert.equal(true,authController.isAuthorized(['user','admin'],'admin'));
        expect(isAuth).to.be.true;
        isAuth.should.be.true;
    });
    
    it('Check is AuthorizedAsync should be false',function(done){
        this.timeout(2500);
        authController.isAuthorizedAsync(['user'],'admin',function(isAuth){
                assert.equal(false,isAuth);
                done();
        })
    });

    it('Check is AuthorizedPromised should be false',function(){
      return authController.isAuthorizedPromised(['user'],'admin').should.eventually.be.false;
    });


    describe('Sinon spy',function(){
        let user={};
        beforeEach(()=>{
            user={
                roles:['user'],
                isAuthorized:function(neededRole){
                    return this.roles.indexOf(neededRole)>-1;
                }
            }
        })
        it.skip('Auth controller getIndex should be called',function(){
            
            const req={user:user};
            let res = {
                renderME:sinon.spy()
            };

            authController.getIndex(req,res);
            res.renderME.calledOnce.should.be.true;
        });
        it.skip('Auth controller getINdex with index arg should be called',function(){
            let isAuth=sinon.stub(user,'isAuthorized').returns(true);
            
            const req = {user:user};
            let res = {
                renderME:function(){}
            };

            let mock=sinon.mock(res);
            mock.expects('renderME').once().withExactArgs('index');

            authController.getIndex(req,res);
            isAuth.calledOnce.should.be.true;

            mock.verify();
  
        });
    })
})