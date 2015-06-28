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

              options.error(response);
          }.bind(this)
      });
  },

  httpRequestWithId: function(id, url, options) {
      var token = "";
      if (flux && flux.stores && flux.stores.UserStore) {
          token = flux.stores.UserStore.getToken();
      }
      $.ajax(id, url, {
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

              options.error(response);
          }.bind(this)
      });
  }

};
