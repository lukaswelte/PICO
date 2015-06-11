var apiCommonActions = {
  httpRequest: function(url, options) {
      $.ajax(url, {
          type: options.type,
          contentType: 'application/json',
          data: JSON.stringify(options.data),
          processData: false,
          dataType: 'json',
          success: function(response){
              if(response != null){
                  options.success(response);
              } else {
                  options.error(response);
              }
          }.bind(this),
          error: function(response){
              //for debugging print response to the console
              console.log("HTTP Request error: "+JSON.stringify(response));

              options.error(response);
          }.bind(this)
      });
  }
};
