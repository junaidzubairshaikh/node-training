const chai=require('chai');
const sinon=require('sinon');
let https = require('https');
const PassThrough = require('stream').PassThrough;
chai.use(require('chai-as-promised'));
chai.should();

let gitJson={login:'junaid'};
let reposJson=[{
  id:232323,
  name:'Repo 1'
}]

let gitService = require('../../services/gitService')() ;

describe('GitService', function() {
  
  describe('GitService Get User', function() {
    beforeEach(function(){
      this.myRequest=sinon.stub(https,'request');
    });
    it('Get User', function() {
        this.timeout(2500);

        let gitResponse = new PassThrough();
        gitResponse.write(JSON.stringify(gitJson));
        gitResponse.end();


        let repoJson = new PassThrough();
        repoJson.write(JSON.stringify(reposJson));
        repoJson.end();

        // console.log('Console lOG', this.myRequest);
        
        this.myRequest
        .onFirstCall().callsArgWith(1,gitResponse).returns(new PassThrough())
        .onSecondCall().callsArgWith(1,repoJson).returns(new PassThrough());
        
        return gitService.getUser('junaid').then((user)=>{
          // console.log('REQuset stup---> ',this.myRequest); 
          
          this.myRequest.calledTwice.should.be.true;
          let params= this.myRequest.getCall(0).args;
          console.log('Params-->',params[0].headers);
          params[0].headers['User-Agent'].should.be.equal('gitExample')
          user.login.should.be.equal('junaid');
          user.should.have.property('repos');
        });


    });

    afterEach(function(){
      // console.log('AFter EACH ', this.myRequest);
          // this.myRequest.calledTwice.should.be.true; 

      this.myRequest.restore();
    });
  });
});
