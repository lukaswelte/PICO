var RecommendationItem = React.createClass({
    mixins: [FluxMixin],

    propTypes:{
        recommendation: React.PropTypes.object.isRequired
    },



    render: function() {
        var recommendation = this.props.recommendation;

        var previewImage;
        if (recommendation.previewImage) {
            previewImage = <img src={"data:image/png;base64,".concat(recommendation.previewImage)} />;
        } else {
            previewImage = <img src={"/api/entry/previewimage/"+encodeURIComponent(recommendation.url)} />;
        }

        return (
            <div className="box">
                <a href={recommendation.url}><h2>{recommendation.url}<div className="width-50p">{previewImage}</div></h2></a>

                </div>


        );
    }
});