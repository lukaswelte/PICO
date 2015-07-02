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
        } else if (entry.id) {
            previewImage = <img src={"/api/entry/image/"+entry.id} />
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
                  <a className="col-md-10" href={entry.url} style={{"paddingLeft": "0", "paddingRight": "0"}}>
                    <h4 style={{"marginTop": "0"}}>{entry.title}</h4>
                  </a>
                  <div className="col-md-2" style={{"paddingRight": "2pt"}}>
                    <Link to="showEntry" params={{id: entry.id}} className="glyphicon glyphicon-info-sign float-right" style={{"textDecoration": "none"}} />
                  </div>
                </div>
                <div className="width-100p">{previewImage}</div>
                <div style={containerStyles}>
                    {entry.labels.map(function(label, index){ return <div key={index} style={labelItemStyle}><LabelItem label={label} /></div>})}
                </div>
            </div>
        );
    }
});
