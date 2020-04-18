
describe.skip('Testing chai with obj',()=>{
    it('Object should have property name',()=>{
        let obj={name:'Tim',role:'admin'};
        obj.should.have.property('name')
    });

    it('name should be TIM ',()=>{
        let obj={name:'Tim',role:'admin'};
        obj.should.have.property('name').equal('Tim');
    });


    it('two object should be equal deep ',()=>{
        let objA={name:'Tim',role:'admin'};
        let objB={name:'Tim',role:'admin'};

        objA.should.deep.equal(objB);
    });

    it('Obj should exist  ',()=>{
        let obj='null';
        obj.should.exist;
        // objA.should.deep.equal(objB);
    });

})