var PureRenderMixin = React.addons.PureRenderMixin;
var Home = React.createClass({
    mixins: [PureRenderMixin],	
	
    render: function() {
        return(
            <p>This is the home page</p>
        );
    }
});
