/**
 * Created by nijat on 10/13/15.
 */
app.factory('loadIcon', function(usSpinnerService){
  return{
    show: function(){
      usSpinnerService.spin('spinner-1');
      //console.log('start spin');
    },
    hide: function(){
      usSpinnerService.stop('spinner-1');
      //console.log('stop spin');
    }
  }
})
