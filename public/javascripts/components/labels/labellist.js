var LabelList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LabelStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.stores.LabelStore.getAllLabels();
    },

    render: function() {
        return(
            <div>
                {this.state.labels.map(function(label, index){
                    return <LabelItem key={index} label={label} />
                })}
            </div>
        );
    }
});

