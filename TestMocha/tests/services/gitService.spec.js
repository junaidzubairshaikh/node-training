const chai=require('chai');
const sinon=require('sinon');
let https = require('https');
const PassThrough = require('stream').PassThrough;
chai.should();

const gitResponse={login:'junaid'};

const gitService = require('../../services/gitService')() ;

describe('GitService', function() {
  
  describe('GitService Get User', function() {
    beforeEach(function(){
      this.request=sinon.stub(https,'request');
    });
    it('Get User', function() {
        this.timeout(10000);

        let passThrough = new PassThrough();
        passThrough.write(JSON.stringify(gitResponse));
        passThrough.end();

        this.request.callsArgWith(1,passThrough).returns(new PassThrough());
        return gitService.getUser('junaidzubairshaikh').then(function(user){
          console.log(user);
          user.login.should.be.equal('junaidzubairshaikh');
          user.should.have.property('repos');
        })
    });

    afterEach(function(){
      console.log('AFter EACH ', this.request);
      this.request.restore();
    });
  });
});
