import React from 'react';
import { connect } from 'react-redux';
import ImageCard from './components/ImageCard';
import Spinner from './components/Spinner';
import { loadMoreItemsRequest } from './redux';
import './App.scss';

class App extends React.Component {
  state = {
    page: 0
  }

  componentDidMount() {
    const { onLoadMoreItems } = this.props;
    const { page } = this.state;
    window.addEventListener('scroll', this.handleOnScroll)
    onLoadMoreItems(page);
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  handleOnScroll = () => {
    const { loading } = this.props;
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !loading) {
      this.setState((state) => ({ page: state.page + 1 }),
        () => {
          const { onLoadMoreItems } = this.props;
          const { page } = this.state;
          onLoadMoreItems(page)
        });
    }
  }



  render() {
    const { cards, loading } = this.props;
    return (
      <div className="app" >
        <h1>Image Gallery</h1>
        <div className="cards">
          {
            cards.map(card => <ImageCard item={card} key={card.id} />)
          }
        </div>
        {loading && <Spinner />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  onLoadMoreItems: (page) => dispatch(loadMoreItemsRequest(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
