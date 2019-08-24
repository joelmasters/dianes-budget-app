import React from 'react';
import './App.css';
import MainList from './MainList';
import NavBar from './NavBar';
import NewBucket from './NewBucket';
import EditBucket from './EditBucket';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewBucketScreen: false,
      showEditBucketScreen: false,
      activeBucket: {},
      todaysDate: '',
      prevDate: '',
      buckets: [
        {
          name: "Personal",
          left: "100",
          set: "100",
          endOfMonth: "rollover",
          history: [],
        },
        {
          name: "Baby Expenses",
          left: "250",
          set: "250",
          endOfMonth: "rollover",
          history: [],
        },
        {
          name: "Groceries",
          left: "400",
          set: "400",
          endOfMonth: "rollover",
          history: [],
        },
        {
          name: "Dining Out",
          left: "100",
          set: "100",
          endOfMonth: "rollover",
          history: [],
        },
      ]
    };
  }

  showNewBucketScreen = () => {
    this.setState({ 
      showNewBucketScreen: true,
      showEditBucketScreen: false
    });
  }
  createNewBucket = (newBucket) => {
    let buckets = [...this.state.buckets];
    buckets.push(newBucket);
    this.setState({ 
      buckets: buckets,
      showNewBucketScreen: false,
      showEditBucketScreen: false }, this.storeToLocalStorage);
  }
  bucketClicked = (bucket) => {
    this.setState({ 
      showNewBucketScreen: false, 
      activeBucket: bucket }, this.setState({ showEditBucketScreen: true }));
  }
  editBucket = (edittedBucket, toggle=true) => {
    let buckets = [...this.state.buckets];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].name === edittedBucket.name) {
        buckets[i] = edittedBucket;
        break;
      }
    }
    let showEditBucketScreen = toggle ? false : true;

    this.setState({ 
      buckets: buckets,
      showEditBucketScreen: showEditBucketScreen }, this.storeToLocalStorage);
  }
  deleteBucket = (deletedBucket) => {
    let buckets = [...this.state.buckets];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].name === deletedBucket.name) {
        buckets.splice(i, 1);
        break;
      }
    }
    this.setState({ 
      buckets: buckets,
      showEditBucketScreen: false }, this.storeToLocalStorage);
  }

  hydrateStateWithLocalStorage = () => {
    let store = JSON.parse(localStorage.getItem("state"));
    if (!store) {
      console.log("No localStorage found, using default state");
      store = {...this.state};
    }
    let d = new Date();
    let dd = d.getDate();
    let m = d.getMonth() + 1;
    let y = d.getFullYear();

    let todaysDate = m + "/" + dd + "/" + y;

    if (dd === 1) {
      let prevDay = parseInt(store.prevDate.split("/")[1]);
      if (prevDay !== 1) {
        store = this.updateForNewMonth(store);
      }
    }

    store.todaysDate = todaysDate;
    store.prevDate = todaysDate;

    this.setState(store);
  }

  updateForNewMonth = (currStore) => {
    let store = {...currStore};
    for (let i = 0; i < store.buckets.length; i++) {
      if (store.buckets[i].endOfMonth === "rollover") {
        store.buckets[i].left = parseInt(store.buckets[i].left) + parseInt(store.bucekts[i].set);
      } else {
        store.buckets[i].left = parseInt(store.buckets[i].set);
      }
    }
  }

  componentDidMount = () => {
    this.hydrateStateWithLocalStorage();
  }

  storeToLocalStorage = () => {
    let currState = {...this.state};
    localStorage.setItem("state", JSON.stringify(currState));
  }

  render() {

    return (
      <div className="App">
        {/*<header className="App-header">
          Diane's Budget App
    </header>*/}
        <NavBar 
          showNewBucketScreen={this.showNewBucketScreen}/>
        <h3 style={styles.date}>{this.state.todaysDate}</h3>
        <MainList 
          buckets={this.state.buckets}
          bucketClicked={this.bucketClicked}
        />
        <NewBucket 
          showScreen={this.state.showNewBucketScreen}
          createNewBucket={this.createNewBucket} />
        {this.state.activeBucket.hasOwnProperty('history') ? 
          <EditBucket 
            bucket={this.state.activeBucket}
            showScreen={this.state.showEditBucketScreen}
            editBucket={this.editBucket}
            deleteBucket={this.deleteBucket} />
            : ''
        }
      </div>
    );
  }
}

export default App;

const styles = {
  date: {
    textAlign: 'left',
    marginLeft: '10px',
  }
}
