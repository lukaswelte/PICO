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

        var containerStyles = {
          "display": "-ms-flexbox",
          "display": "-webkit-flex",
          "display": "flex",
          "marginTop": "5pt"
        };

        var labelItemStyle = {
          "WebkitFlex": "0 1 auto",
          "MsFlex": "0 1 auto",
          "flex": "0 1 auto",
          "paddingRight": "5pt"
        };

        return(
            <div className="box">
                <div className="row">
                  <a className="col-md-9" href={entry.url}><h3 style={{"marginTop": "0"}}>{entry.title}</h3></a>
                  <div className="col-md-3"><Link to="showEntry" params={{id: entry.id}} className="glyphicon glyphicon-info-sign float-right" /></div>
                </div>
                <div className="width-100p">{previewImage}</div>
                <div style={containerStyles}>
                    {entry.labels.map(function(label, index){ return <div style={labelItemStyle}><LabelItem key={index} label={label} /></div>})}
                </div>
            </div>
        );
    }
});
