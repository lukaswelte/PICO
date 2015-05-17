var PureRenderMixin = React.addons.PureRenderMixin;
var NotFound = React.createClass({
    mixins: [PureRenderMixin],
		
    render: function() {
        return(
            <p>We have not found this page.</p>
        );
    }
});
