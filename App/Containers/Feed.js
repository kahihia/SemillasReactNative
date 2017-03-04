import React, { PropTypes } from 'react';
import {
  ListView,
  RefreshControl,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { connect } from 'react-redux';

class Feed extends React.Component {
  static propTypes = {
    // Assume data shape looks like:
    // {items: ["item1", "item2"], nextUrl: null, isFetching: false}
    listData: PropTypes.object.isRequired,

    // dispatch is automatically provided by react-redux, and is used to
    // interact with the store.
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
    };

    // Update the data store with initial data.
    this.state.dataSource = this.getUpdatedDataStore(props);
  }

  async componentWillMount() {
    // Initial fetch for data, assuming that listData is not yet populated.
    this._loadMoreContentAsync();
  }

  componentWillReceiveProps(nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data).
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps),
    });
  }

  getUpdatedDataSource(props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let rows = props.listData.items;

    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.props.listData.isFetching}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    );
  }

  _loadMoreContentAsync = async () => {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.listData.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    this.props.dispatch(fetchMoreContent(this.props.listData.nextUrl));
  }

  render() {
    return (
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={this.state.dataSource}
        renderRow={() => <Text>row</Text>}
        refreshControl={this._renderRefreshControl()}
        canLoadMore={!!this.props.listData.nextUrl}
        onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {listData: state.listData};
};

export default connect(mapStateToProps)(Feed);
