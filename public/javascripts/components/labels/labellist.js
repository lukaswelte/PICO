var LabelList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LabelStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        // Our entire state is made up of the TodoStore data. In a larger
        // application, you will likely return data from multiple stores, e.g.:
        //
        //   return {
        //     todoData: flux.store("TodoStore").getState(),
        //     userData: flux.store("UserStore").getData(),
        //     fooBarData: flux.store("FooBarStore").someMoreData()
        //   };
        return flux.stores.LabelStore.getAllLabels();
    },

    render: function() {
        return(
            <div>
                {this.state.labels.map(function(label, i){
                    return <div>
                        <LabelItem name={label.name}></LabelItem>
                        </div>
                })}
            </div>
        );
    }
});

