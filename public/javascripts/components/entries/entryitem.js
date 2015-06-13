var EntryItem = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        entry: React.PropTypes.object.isRequired
    },

    render: function() {
        var entry = this.props.entry;

        var previewImage;
        if (entry.previewImage) {
            previewImage = <img src={"data:image/png;base64,".concat(entry.previewImage)} />;
        } else {
            previewImage = <img src={"/api/entry/previewimage/"+encodeURIComponent(entry.url)} />;
        }

        return(
            <div className="box">
                <a href={entry.url}><h2>{entry.title}</h2></a>
                <div><Link to="showEntry" params={{id: entry.id}}>Show Detail</Link></div>
                <div className="width-50p">{previewImage}</div>
                <div>
                    {entry.labels.map(function(label, index){ return <LabelItem key={index} label={label} />})}
                </div>
            </div>
        );
    }
});
