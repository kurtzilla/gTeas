
app.filter('booleanToYesNo', function(){
  return function(input) {
    return (input.toString() === 'true') ? 'Yes' : 'No';
  };
});

app.filter('addDecimalAndCurrency', function($filter){
  return function(input){
    return $filter('currency')(Number(input) * .01);
  };
});
