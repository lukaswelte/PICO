var EntryDetail = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin("EntryStore")],

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
        return {entry: flux.stores.EntryStore.getEntryById(1)};
    },

    render: function () {
        return (
            <div>
                Diese Details kommen auf die Show Entry Seite.
                {this.state.entry.id}
            </div>
        );
    }


});