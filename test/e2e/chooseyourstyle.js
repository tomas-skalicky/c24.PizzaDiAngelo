'use strict';

describe('Scenario: Choose your style.', function(){
  beforeEach(function(){
    browser().navigateTo('/');
  });

  it('should give me a dropdown list to choose styles from', function(){
    expect(element('select').count()).toEqual(1);
  });

  it('should give me a button to confirm my chosen style', function(){
    expect(element('input').count()).toEqual(1);
  });
});
