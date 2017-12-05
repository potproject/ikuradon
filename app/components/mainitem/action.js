import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';
import I18n from '../../i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionActions from '../../actions/actioncreators/action';

class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      style: props.style
    }
    this.handlePress = this.handlePress.bind(this);
  }
  render() {
    return (
      <TouchableOpacity style={this.state.style} onPress={this.onPress.bind(this)}>
        <FontAwesome name="ellipsis-h" size={20} color="gray" />
        <ActionSheet
          ref={component => this.ActionSheet = component}
          options={[ I18n.t("action_openinbrowser"), I18n.t("action_share"), I18n.t("action_copy"), I18n.t("action_mention"), I18n.t("action_hide"), I18n.t("global_cancel")]}
          cancelButtonIndex={5}
          destructiveButtonIndex={4}
          onPress={this.handlePress}
        />
      </TouchableOpacity>
    );
  }
  onPress() {
    this.ActionSheet.show();
  }
  handlePress(i) {
    switch(i){
      case 0: //Open in Browser
        this.props.ActionActions.openinbrowser(this.state.id);
        return;
      case 1: //Share
        this.props.ActionActions.share(this.state.id);
        return;
      case 2: //Copy
        this.props.ActionActions.copy(this.state.id);
        return;
      case 3: //Mention
        this.props.ActionActions.mention(this.state.id);
        return;
      case 4: //Hide
        this.props.ActionActions.hide(this.state.id);
        return;
    }
  }
}

export default connect(state => state,
  (dispatch) => ({
    ActionActions: bindActionCreators(ActionActions, dispatch)
  })
)(Action);