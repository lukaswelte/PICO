var apiCommonActions = {
  httpRequest: function(url, options) {
      var token = "";
      if (flux && flux.stores && flux.stores.UserStore) {
          token = flux.stores.UserStore.getToken();
      }
      $.ajax(url, {
          type: options.type,
          headers: {
              "Access-Token": token
          },
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
              if (response.status == 401) {
                //Unoauthorized so go to login screen
                flux.actions.user.logoutUser();
              }

              if (options.error) {
                options.error(response);
              }
          }.bind(this)
      });
  }

};
