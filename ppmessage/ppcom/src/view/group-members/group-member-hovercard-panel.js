View.$groupMemberHovercardPanel = (function() {

    var classPrefix = 'pp-group-member-hovercard-panel';

    function GroupMemberHovercardPanel() {
        View.Div.call(this, {
            id: classPrefix,
            'class': classPrefix + ' pp-box-sizing'
        });
    }
    extend(GroupMemberHovercardPanel, View.Div);

    return {
        build: build,

        show: show,
        hide: hide
    }

    function build() {
        return new GroupMemberHovercardPanel();
    }

    function show() {
        $( '#' + classPrefix ).show();
    }

    function hide() {
        $( '#' + classPrefix ).hide();
    }

}());
