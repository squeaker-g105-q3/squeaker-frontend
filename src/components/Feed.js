import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddPost from './AddPost'
import Post from './Post'
import Search from './Search'
import FoundProfile from './FoundProfile'
import axios from 'axios'
import Spinner from 'reactjs-simple-spinner'
const url = process.env.REACT_APP_API_URL
export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      posts:[],
      searchedPosts:[],
      urlparams: '',
      loggedin: '',
      isLoading: true,
      search:'',
      data:[],
      submittedSearch: false,
      loggedinId: ''
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`${url}/accounts`)
      const account = await response.data.find(user => user.username === this.props.username)

      this.setState({
        id: account.id,
        loggedin: this.props.user.username,
        loggedinId: this.props.user.id
      })
      return account
    } catch(err) {
      console.log(err)
    }
  }

  getPosts = async () => {
    try {
      const account = await this.getAccount()
      const posts = await axios.get(`${url}/accounts/${account.id}/posts`)

      this.setState({
        posts: [...posts.data.reverse()],
        isLoading: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  addPost = async (post) => {
    try {
      const account = await this.getAccount()
      await axios.post(`${url}/accounts/${account.id}/posts`, post)

      this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  deletePost = async (id) => {
    try {
      const account = await this.getAccount()
      await axios.delete(`${url}/accounts/${account.id}/posts/${id}`)

      this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  handleSearchSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.get(`${url}/accounts`)
      const data = await response.data.filter(post =>
        Object.values(post).reduce((i, b) => i || (typeof b === 'string' ?
          b.toLowerCase().includes(this.state.search.toLowerCase()) : false), false)
      )
      this.setState({
        searchedPosts: data,
        submittedSearch: true
      })

      if(this.state.search.length <2) {
        this.setState({
          submittedSearch:false
        })
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  render() {
    if (this.state.loggedin && this.state.isLoading) {
      return (
      <div className="main col-sm-8 mt-4">
       <Spinner size="massive" lineSize={12} className="center" />
      </div>
      )
    }

    if (!this.state.loggedin && this.state.isLoading) {
      return (
        <div className="main col-sm-8 mt-4 text-center">
          <p className="lead">
            Please <Link to="/">login</Link> to see <span className="username">{this.props.username}'s</span> full profile.
          </p>
        </div>
      )
    }

    return (
      <div className="main col-sm-12 col-md-8 mt-4">
        <Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange} />
        <div className={this.state.submittedSearch ? "card-group justify-content-left border rounded position-absolute shadow-sm" : undefined}>
          {
            this.state.submittedSearch && this.state.searchedPosts.map(post =>
              <FoundProfile
                profilepic={post.profilepic}
                username={post.username}
                type={post.type}
                age={post.age}
                bio={post.bio} />)
          }
        </div>
        {
          this.state.loggedin === this.props.username &&
          <AddPost addPost={this.addPost} />
        }
        {
          this.state.loggedin && !this.state.loading && this.state.posts.length > 0 ?
            this.state.posts.map(post =>
              <Post
                getPosts={this.getPosts}
                key={post.id}
                id={post.id}
                username={this.props.username}
                loggedInPerson={this.state.loggedin}
                loggedinId={this.state.loggedinId}
                created_at={post.created_at}
                content={post.content}
                deletePost={this.deletePost}
                reactions={this.state.reactions}
              />
            )
            :
            <p className="lead text-center">
              {
                this.state.loggedin === this.props.username ?
                  <span className="text-muted">you don't have any posts yet</span>
                  :
                  <span className="text-muted">{this.props.username} doesn't have any posts yet</span>
              }
            </p>
        }
      </div>
    )
  }
}
