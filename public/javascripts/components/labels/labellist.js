var LabelList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LabelStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.stores.LabelStore.getAllLabels();
    },

    render: function() {
        return(
            <div>
                {this.state.labels.map(function(label){
                    return <div>
                        <LabelItem name={label.name}></LabelItem>
                        </div>
                })}
            </div>
        );
    }
});

